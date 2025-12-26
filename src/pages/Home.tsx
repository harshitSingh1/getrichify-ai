import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Snowfall } from "@/components/Snowfall";
import { Sparkles, Gift, TreePine, Star, ArrowRight } from "lucide-react";
import capitalistCat from "@/assets/capitalist-cat.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Snowfall />

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-slide-in">
            {/* Decorative badge */}
            <div className="inline-flex items-center gap-2 bg-christmas-red/20 px-4 py-2 rounded-full border border-christmas-red/30 mb-6">
              <Star className="w-4 h-4 text-christmas-gold animate-twinkle" />
              <span className="text-sm font-medium text-christmas-snow">Holiday Special Edition</span>
              <Star className="w-4 h-4 text-christmas-gold animate-twinkle" style={{ animationDelay: "1s" }} />
            </div>

            <h1 className="page-heading mb-6 gradient-text christmas-glow">
              Turn Your Ideas Into Billion Dollar Startups
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Our AI transforms any concept into an exaggerated, hilarious startup pitch. 
              The more ridiculous your input, the funnier the output.
            </p>
            <Button
              onClick={() => navigate("/chat")}
              size="lg"
              className="text-lg px-10 py-7 rounded-xl bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-glow font-bold group"
            >
              <Gift className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Unwrap Your Fortune
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="festive-card group hover:border-christmas-red/40 hover:shadow-glow">
              <div className="w-14 h-14 rounded-xl bg-christmas-red/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-christmas-gold" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-christmas-snow">AI-Powered Ideas</h3>
              <p className="text-muted-foreground">
                Get instant, hilarious startup pitches with valuations that'll make you laugh
              </p>
            </div>
            <div className="festive-card group hover:border-christmas-green/40 hover:shadow-green">
              <div className="w-14 h-14 rounded-xl bg-christmas-green/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TreePine className="w-7 h-7 text-christmas-green-light" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-christmas-snow">Track Your Progress</h3>
              <p className="text-muted-foreground">
                View your personal "patch notes" as you level up in the startup game
              </p>
            </div>
            <div className="festive-card group hover:border-christmas-gold/40 hover:shadow-gold">
              <div className="w-14 h-14 rounded-xl bg-christmas-gold/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gift className="w-7 h-7 text-christmas-gold" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-christmas-snow">Destiny Wheel</h3>
              <p className="text-muted-foreground">
                Spin to discover your billion-dollar fate with our fortune wheel
              </p>
            </div>
          </div>

          {/* Mission Statement with Mascot */}
          <div className="festive-card flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-primary rounded-full opacity-20 blur-xl animate-glow-pulse" />
              <img
                src={capitalistCat}
                alt="Capitalist Cat - Your Financial Advisor"
                className="w-40 h-40 object-contain animate-float relative z-10"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">Meet Your Success Partner</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                GetRichify transforms ordinary ideas into extraordinary opportunities. Whether you're brainstorming your next venture or just exploring possibilities, our AI turns your thoughts into compelling business concepts with a twist of humor. Because the best ideas often start with a laugh.
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-20 pt-10 border-t border-christmas-snow/10">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-christmas-gold">
                <Star className="w-4 h-4 animate-twinkle" />
                <span className="font-medium">Made with holiday spirit</span>
                <Star className="w-4 h-4 animate-twinkle" style={{ animationDelay: "0.5s" }} />
              </div>
              <p className="text-sm text-muted-foreground">
                Disclaimer: GetRichify is for entertainment and brainstorming purposes. Actual results may vary wildly.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
