import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getBackendClient } from "@/lib/backendClient";
import { toast } from "sonner";
import { Send, PartyPopper, Brain, Sparkles } from "lucide-react";
import { Snowfall } from "@/components/Snowfall";

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
      const supabase = getBackendClient();
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
    <div className="min-h-screen relative pt-20">
      <Snowfall />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-in">
            <h1 className={`page-heading mb-4 ${funnyMode ? "gradient-text christmas-glow" : "text-christmas-ice"}`}>
              {funnyMode ? "Festive Mode" : "Serious Mode"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {funnyMode
                ? "Wild holiday ideas and comedy gold"
                : "Actual viable business concepts"}
            </p>
          </div>

          {/* Mode Toggle */}
          <Card className={`festive-card p-8 mb-8 ${funnyMode ? "border-christmas-red/30" : "border-christmas-ice/30"}`}>
            <div className="flex items-center justify-center gap-4">
              <Label htmlFor="mode" className="text-2xl font-bold flex items-center gap-2 text-christmas-snow">
                <PartyPopper className="w-6 h-6 text-christmas-gold" />
                Festive
              </Label>
              <Switch
                checked={!funnyMode}
                onCheckedChange={(checked) => setFunnyMode(!checked)}
                id="mode"
                className="scale-150"
              />
              <Label htmlFor="mode" className="text-2xl font-bold flex items-center gap-2 text-christmas-snow">
                <Brain className="w-6 h-6 text-christmas-ice" />
                Serious
              </Label>
            </div>
          </Card>

          {/* Input */}
          <Card className={`festive-card p-8 mb-8 ${funnyMode ? "border-christmas-green/30" : "border-christmas-ice/30"}`}>
            <div className="space-y-4">
              <Label className="text-xl font-bold text-christmas-snow">
                Describe your idea or problem:
              </Label>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
                placeholder={funnyMode ? "e.g., I'm sad and broke..." : "e.g., Remote work productivity tools"}
                className="text-lg py-6 bg-card/50 backdrop-blur border-christmas-snow/20 focus:border-christmas-gold text-christmas-snow placeholder:text-muted-foreground"
              />
              <Button
                onClick={handleGenerate}
                disabled={isLoading || !input.trim()}
                size="lg"
                className={`w-full ${funnyMode ? "bg-gradient-primary shadow-glow" : "bg-christmas-ice/20 border border-christmas-ice/50 hover:bg-christmas-ice/30"}`}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {isLoading ? "Generating..." : funnyMode ? "Generate Holiday Idea 🎄" : "Generate Business Plan 💼"}
                <Send className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Result */}
          {result && (
            <Card className={`festive-card p-8 animate-pop-in ${funnyMode ? "border-christmas-gold/50 shadow-gold" : "border-christmas-ice/50"}`}>
              <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${funnyMode ? "text-christmas-gold" : "text-christmas-ice"}`}>
                <Sparkles className="w-6 h-6" />
                {funnyMode ? "Your Holiday Startup:" : "Business Concept:"}
              </h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg whitespace-pre-wrap text-christmas-snow/90">{result}</p>
              </div>
            </Card>
          )}

          {/* Explanation */}
          {!result && (
            <Card className={`festive-card p-8 ${funnyMode ? "border-christmas-gold/30" : "border-christmas-ice/30"}`}>
              <h3 className={`text-2xl font-bold mb-4 ${funnyMode ? "text-christmas-gold" : "text-christmas-ice"}`}>
                How It Works:
              </h3>
              <div className="space-y-3 text-christmas-snow/90">
                <p>
                  <strong className="text-christmas-red">Festive Mode:</strong> Turns anything into an absurd, holiday-themed startup idea with fake valuations and ridiculous concepts.
                </p>
                <p>
                  <strong className="text-christmas-ice">Serious Mode:</strong> Provides genuine, thoughtful business ideas and analysis based on your input.
                </p>
                <p className="text-sm text-muted-foreground italic flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-christmas-gold" />
                  Toggle between modes to see the difference!
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
