import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MoneyRain } from "@/components/MoneyRain";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [shake, setShake] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load chat history from localStorage
    const saved = localStorage.getItem("getrichify-chat");
    if (saved) {
      setMessages(JSON.parse(saved));
    }

    // Initialize audio
    audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3");
  }, []);

  useEffect(() => {
    // Save chat history
    if (messages.length > 0) {
      localStorage.setItem("getrichify-chat", JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generatePatchNotes = (userMessage: string) => {
    const actions = JSON.parse(localStorage.getItem("getrichify-actions") || "0");
    localStorage.setItem("getrichify-actions", JSON.stringify(actions + 1));

    const patches = {
      buffs: [
        `Entrepreneurial Delusion +${Math.floor(Math.random() * 50)}%`,
        `Coffee Absorption +${Math.floor(Math.random() * 30)}%`,
        `Hustle Mode Duration +${Math.floor(Math.random() * 20)} minutes`,
      ],
      nerfs: [
        `Bank Balance -₹${Math.floor(Math.random() * 500)}`,
        `Sleep Quality -${Math.floor(Math.random() * 40)}%`,
        `Social Life -${Math.floor(Math.random() * 60)}%`,
      ],
      bugFixes: [
        "Stopped stalking ex's Instagram at 2 AM",
        "Fixed bug where you think you can change the world",
        "Removed tendency to check startup news 50 times a day",
      ],
      newFeatures: [
        "Unlocked: Founder Mode",
        "Added: Resistance to Bad Financial Decisions",
        "New Skill: Monetizing Everything",
      ],
    };

    const currentPatches = JSON.parse(localStorage.getItem("getrichify-patches") || "[]");
    currentPatches.unshift({
      timestamp: Date.now(),
      ...patches,
    });
    localStorage.setItem("getrichify-patches", JSON.stringify(currentPatches.slice(0, 10)));
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Easter eggs
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("sad")) {
      toast.success("💡 Monetize that sadness! Tears.io - The social network for crying!");
    } else if (lowerInput.includes("broke")) {
      toast.success("💪 Perfect! You're ready to hustle harder!");
    }

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: [...messages, userMessage] },
      });

      if (error) throw error;

      const aiMessage: Message = { role: "assistant", content: data.message };
      setMessages((prev) => [...prev, aiMessage]);

      // Effects
      if (soundEnabled && audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
      setShake(true);
      setTimeout(() => setShake(false), 500);

      generatePatchNotes(input);

      // Flash effect
      const flash = document.createElement("div");
      flash.className = "fixed inset-0 bg-neon-lime opacity-30 pointer-events-none z-50";
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 100);
    } catch (error: any) {
      console.error("Chat error:", error);
      toast.error(error.message || "Failed to generate response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative pt-20">
      <MoneyRain />

      <div className={`relative z-10 container mx-auto px-4 py-8 ${shake ? "animate-shake" : ""}`}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="page-heading gradient-text mb-4">
              AI Startup Generator
            </h1>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-5 py-2 rounded-full border border-primary/30">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="font-semibold text-sm">System Online</span>
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Switch
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
              id="sound"
            />
            <Label htmlFor="sound" className="text-lg font-bold cursor-pointer">
              {soundEnabled ? "🔊" : "🔇"} Cha-Ching Mode
            </Label>
          </div>

          {/* Messages */}
          <Card className="bg-card border border-border p-6 mb-6 min-h-[500px] max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-20">
                <p className="text-lg mb-4">Share any idea, concept, or random thought</p>
                <p className="text-sm">Our AI will transform it into a hilarious startup pitch</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-pop-in`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        msg.role === "user"
                          ? "bg-muted text-foreground"
                          : "bg-gradient-primary text-primary-foreground shadow-neon"
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-primary text-primary-foreground p-4 rounded-lg">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </Card>

          {/* Input */}
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Share any idea or thought..."
              className="flex-1 py-6 bg-card border-border focus:border-primary rounded-lg"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              size="lg"
              className="px-8 bg-gradient-primary hover:scale-105 transition-all shadow-neon"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
