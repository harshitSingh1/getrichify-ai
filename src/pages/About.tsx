import { Card } from "@/components/ui/card";
import { Snowfall } from "@/components/Snowfall";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Gift, Star, MessageCircle, ScrollText, CircleDot, BarChart3, Brain, Sparkles, TreePine } from "lucide-react";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative pt-20">
      <Snowfall />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-in">
            <h1 className="page-heading gradient-text christmas-glow mb-4">
              About GetRichify
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              The world's most legitimate wealth generation tool
            </p>
            <p className="text-sm text-christmas-gold italic flex items-center justify-center gap-2">
              <Star className="w-4 h-4 animate-twinkle" />
              *Disclaimer: Not actually legitimate
              <Star className="w-4 h-4 animate-twinkle" style={{ animationDelay: "0.5s" }} />
            </p>
          </div>

          <div className="space-y-6">
            <Card className="festive-card border-christmas-gold/30 shadow-gold p-8 animate-pop-in">
              <h2 className="text-2xl font-bold mb-4 text-christmas-snow flex items-center gap-2">
                <Gift className="w-6 h-6 text-christmas-gold" />
                What is GetRichify?
              </h2>
              <p className="text-christmas-snow/90 leading-relaxed">
                GetRichify uses AI to transform your ideas into exaggerated startup concepts. 
                Whether you're brainstorming or just having fun, we'll turn it into an entertaining pitch.
                Track your progress with patch notes, spin the destiny wheel, and check your daily richness score.
              </p>
            </Card>

            <Card className="festive-card border-christmas-red/30 p-8 animate-pop-in" style={{ animationDelay: "100ms" }}>
              <h2 className="text-3xl font-bold text-christmas-red mb-6 flex items-center gap-2">
                <Sparkles className="w-8 h-8" />
                Features
              </h2>
              <ul className="space-y-4 text-lg text-christmas-snow/90">
                <li className="flex items-start gap-3">
                  <MessageCircle className="w-6 h-6 text-christmas-gold mt-1" />
                  <div>
                    <strong className="text-christmas-snow">AI-Powered Chat:</strong> Turn ANY message into an absurd get-rich scheme
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ScrollText className="w-6 h-6 text-christmas-green mt-1" />
                  <div>
                    <strong className="text-christmas-snow">Human Patch Notes:</strong> Track your life updates like a video game
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CircleDot className="w-6 h-6 text-christmas-gold mt-1" />
                  <div>
                    <strong className="text-christmas-snow">Destiny Wheel:</strong> Spin to discover your billionaire path
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="w-6 h-6 text-christmas-red mt-1" />
                  <div>
                    <strong className="text-christmas-snow">Richness Meter:</strong> Daily fortune readings (scientific accuracy: 0%)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Brain className="w-6 h-6 text-christmas-ice mt-1" />
                  <div>
                    <strong className="text-christmas-snow">Serious Mode:</strong> Toggle between comedy and actual business ideas
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="festive-card border-christmas-green/30 p-8 animate-pop-in" style={{ animationDelay: "200ms" }}>
              <h2 className="text-3xl font-bold text-christmas-green mb-6 flex items-center gap-2">
                <TreePine className="w-8 h-8" />
                Tech Stack
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-lg text-christmas-snow/90">
                <div className="space-y-2">
                  <p><strong className="text-christmas-gold">Frontend:</strong> React + TypeScript</p>
                  <p><strong className="text-christmas-gold">Styling:</strong> Tailwind CSS + Holiday Magic</p>
                  <p><strong className="text-christmas-gold">UI:</strong> Shadcn/ui Components</p>
                </div>
                <div className="space-y-2">
                  <p><strong className="text-christmas-gold">Backend:</strong> Lovable Cloud</p>
                  <p><strong className="text-christmas-gold">AI:</strong> Lovable AI Gateway</p>
                  <p><strong className="text-christmas-gold">Storage:</strong> LocalStorage (No servers needed!)</p>
                </div>
              </div>
            </Card>

            <Card className="festive-card border-christmas-gold/30 shadow-gold p-8 animate-pop-in" style={{ animationDelay: "300ms" }}>
              <h2 className="text-3xl font-bold text-christmas-gold mb-4 flex items-center gap-2">
                <Star className="w-8 h-8 animate-twinkle" />
                Disclaimer
              </h2>
              <p className="text-lg text-christmas-snow/90 leading-relaxed mb-4">
                GetRichify is a humor project built for entertainment and hackathon purposes. 
                Nothing here will actually make you rich (sorry!). But you WILL laugh, and isn't 
                that worth more than money? (No, money is definitely better. But laughs are free!)
              </p>
              <p className="text-md text-muted-foreground italic">
                Side effects may include: excessive optimism, startup delusions, and an 
                uncontrollable urge to monetize everything.
              </p>
            </Card>

            <div className="text-center py-8">
              <Button
                onClick={() => navigate("/chat")}
                size="lg"
                className="text-2xl px-12 py-8 rounded-2xl bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-glow font-bold group"
              >
                <Gift className="w-8 h-8 mr-2 group-hover:animate-bounce" />
                Start Getting Rich (Fake) Now!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
