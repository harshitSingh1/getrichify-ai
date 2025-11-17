import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send } from "lucide-react";

export default function Serious() {
  const [funnyMode, setFunnyMode] = useState(true);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setResult("");

    try {
      const { data, error } = await supabase.functions.invoke("serious-mode", {
        body: { message: input, funnyMode },
      });

      if (error) throw error;

      setResult(data.response);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to generate response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen relative pt-20 transition-colors ${funnyMode ? "" : "bg-blue-950"}`}>
      {funnyMode && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-money-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              💰
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-in">
            <h1 className={`page-heading mb-4 ${funnyMode ? "gradient-text" : "text-blue-200"}`}>
              {funnyMode ? "Funny Mode" : "Serious Mode"}
            </h1>
            <p className={`text-lg ${funnyMode ? "text-muted-foreground" : "text-blue-300"}`}>
              {funnyMode
                ? "Wild ideas and comedy gold"
                : "Actual viable business concepts"}
            </p>
          </div>

          {/* Mode Toggle */}
          <Card className={`p-8 mb-8 border-2 ${funnyMode ? "bg-card/50 backdrop-blur border-neon-lime/30" : "bg-blue-900/50 border-blue-400"}`}>
            <div className="flex items-center justify-center gap-4">
              <Label htmlFor="mode" className="text-2xl font-bold">
                😂 Funny
              </Label>
              <Switch
                checked={!funnyMode}
                onCheckedChange={(checked) => setFunnyMode(!checked)}
                id="mode"
                className="scale-150"
              />
              <Label htmlFor="mode" className="text-2xl font-bold">
                🧠 Serious
              </Label>
            </div>
          </Card>

          {/* Input */}
          <Card className={`p-8 mb-8 border-2 ${funnyMode ? "bg-card/50 backdrop-blur border-neon-lime/30" : "bg-blue-900/50 border-blue-400"}`}>
            <div className="space-y-4">
              <Label className="text-xl font-bold">
                Describe your idea or problem:
              </Label>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
                placeholder={funnyMode ? "e.g., I'm sad and broke..." : "e.g., Remote work productivity tools"}
                className={`text-lg py-6 ${funnyMode ? "bg-card/50 backdrop-blur border-neon-lime/50" : "bg-blue-950 border-blue-400"}`}
              />
              <Button
                onClick={handleGenerate}
                disabled={isLoading || !input.trim()}
                size="lg"
                className={`w-full ${funnyMode ? "bg-gradient-primary shadow-neon" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                {isLoading ? "Generating..." : funnyMode ? "Generate Wild Idea 🚀" : "Generate Business Plan 💼"}
                <Send className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Result */}
          {result && (
            <Card className={`p-8 border-2 animate-pop-in ${funnyMode ? "bg-card/50 backdrop-blur border-neon-gold shadow-neon" : "bg-blue-900/50 border-blue-400"}`}>
              <h3 className={`text-2xl font-bold mb-4 ${funnyMode ? "text-neon-gold" : "text-blue-200"}`}>
                {funnyMode ? "💡 Your Ridiculous Startup:" : "💡 Business Concept:"}
              </h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg whitespace-pre-wrap">{result}</p>
              </div>
            </Card>
          )}

          {/* Explanation */}
          {!result && (
            <Card className={`p-8 border-2 ${funnyMode ? "bg-card/50 backdrop-blur border-neon-purple/30" : "bg-blue-900/50 border-blue-400"}`}>
              <h3 className={`text-2xl font-bold mb-4 ${funnyMode ? "text-neon-purple" : "text-blue-200"}`}>
                How It Works:
              </h3>
              <div className="space-y-3 text-foreground/90">
                <p>
                  <strong>Funny Mode:</strong> Turns anything into an absurd, comedy-filled startup idea with fake valuations and ridiculous concepts.
                </p>
                <p>
                  <strong>Serious Mode:</strong> Provides genuine, thoughtful business ideas and analysis based on your input.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Toggle between modes to see the difference! 🎭
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
