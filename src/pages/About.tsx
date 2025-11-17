import { Card } from "@/components/ui/card";
import { MoneyRain } from "@/components/MoneyRain";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative pt-20">
      <MoneyRain />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-in">
            <h1 className="page-heading gradient-text mb-4">
              About GetRichify
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              The world's most legitimate wealth generation tool
            </p>
            <p className="text-sm text-muted-foreground italic">*Disclaimer: Not actually legitimate</p>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border border-primary p-8 shadow-neon animate-pop-in">
              <h2 className="text-2xl font-bold mb-4">What is GetRichify?</h2>
              <p className="text-foreground/90 leading-relaxed">
                GetRichify uses AI to transform your ideas into exaggerated startup concepts. 
                Whether you're brainstorming or just having fun, we'll turn it into an entertaining pitch.
                Track your progress with patch notes, spin the destiny wheel, and check your daily richness score.
              </p>
            </Card>

            <Card className="bg-card/50 backdrop-blur p-8 border-2 border-neon-pink shadow-pink animate-pop-in">
              <h2 className="text-3xl font-bold text-neon-pink mb-4">✨ Features</h2>
              <ul className="space-y-3 text-lg text-foreground/90">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <strong>AI-Powered Chat:</strong> Turn ANY message into an absurd get-rich scheme
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📝</span>
                  <div>
                    <strong>Human Patch Notes:</strong> Track your life updates like a video game
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🎰</span>
                  <div>
                    <strong>Destiny Wheel:</strong> Spin to discover your billionaire path
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <strong>Richness Meter:</strong> Daily fortune readings (scientific accuracy: 0%)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <strong>Serious Mode:</strong> Toggle between comedy and actual business ideas
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="bg-card/50 backdrop-blur p-8 border-2 border-neon-purple shadow-purple animate-pop-in">
              <h2 className="text-3xl font-bold text-neon-purple mb-4">🎨 Tech Stack</h2>
              <div className="grid md:grid-cols-2 gap-4 text-lg text-foreground/90">
                <div>
                  <p><strong>Frontend:</strong> React + TypeScript</p>
                  <p><strong>Styling:</strong> Tailwind CSS + Neon Magic</p>
                  <p><strong>UI:</strong> Shadcn/ui Components</p>
                </div>
                <div>
                  <p><strong>Backend:</strong> Lovable Cloud</p>
                  <p><strong>AI:</strong> Lovable AI Gateway</p>
                  <p><strong>Storage:</strong> LocalStorage (No servers needed!)</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card/50 backdrop-blur p-8 border-2 border-neon-gold shadow-neon animate-pop-in">
              <h2 className="text-3xl font-bold text-neon-gold mb-4">⚠️ Disclaimer</h2>
              <p className="text-lg text-foreground/90 leading-relaxed mb-4">
                GetRichify is a humor project built for entertainment and hackathon purposes. 
                Nothing here will actually make you rich (sorry!). But you WILL laugh, and isn't 
                that worth more than money? (No, money is definitely better. But laughs are free!)
              </p>
              <p className="text-md text-muted-foreground italic">
                Side effects may include: excessive optimism, startup delusions, and an 
                uncontrollable urge to monetize everything. 😂
              </p>
            </Card>

            <div className="text-center py-8">
              <Button
                onClick={() => navigate("/chat")}
                size="lg"
                className="text-2xl px-12 py-8 rounded-full bg-gradient-primary hover:scale-110 transition-transform shadow-neon font-bold"
              >
                Start Getting Rich (Fake) Now! 💸
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
