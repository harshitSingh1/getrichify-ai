import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoneyRain } from "@/components/MoneyRain";
import capitalistCat from "@/assets/capitalist-cat.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MoneyRain />

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-slide-in">
            <h1 className="page-heading mb-6 gradient-text">
              Turn Your Ideas Into Billion Dollar Startups
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Our AI transforms any concept into an exaggerated, hilarious startup pitch. The more ridiculous your input, the funnier the output.
            </p>
            <Button
              onClick={() => navigate("/chat")}
              size="lg"
              className="text-lg px-8 py-6 rounded-lg bg-gradient-primary hover:scale-105 transition-all shadow-neon font-semibold"
            >
              Start Building Your Empire →
            </Button>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-neon transition-all">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Ideas</h3>
              <p className="text-muted-foreground">
                Get instant, hilarious startup pitches with valuations that'll make you laugh
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-pink transition-all">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
              <p className="text-muted-foreground">
                View your personal "patch notes" as you level up in the startup game
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-purple transition-all">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Destiny Wheel</h3>
              <p className="text-muted-foreground">
                Spin to discover your billion-dollar fate with our fortune wheel
              </p>
            </div>
          </div>

          {/* Mission Statement with Mascot */}
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
            <img
              src={capitalistCat}
              alt="Capitalist Cat - Your Financial Advisor"
              className="w-40 h-40 object-contain animate-float"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Meet Your Success Partner</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                GetRichify transforms ordinary ideas into extraordinary opportunities. Whether you're brainstorming your next venture or just exploring possibilities, our AI turns your thoughts into compelling business concepts with a twist of humor. Because the best ideas often start with a laugh.
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border/50">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Made with ambition and a sense of humor
              </p>
              <p className="text-sm text-muted-foreground/70">
                Disclaimer: GetRichify is for entertainment and brainstorming purposes. Actual results may vary wildly.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
