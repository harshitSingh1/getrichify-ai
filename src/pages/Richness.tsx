import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Snowfall } from "@/components/Snowfall";
import { Progress } from "@/components/ui/progress";
import { Star, Gift, Snowflake, Crown, Sparkles, TreePine } from "lucide-react";

const levels = [
  { name: "Coal Receiver", emoji: "🪨", min: 0, max: 20, color: "text-muted-foreground", icon: Snowflake },
  { name: "Nice List Hopeful", emoji: "📜", min: 20, max: 40, color: "text-christmas-ice", icon: TreePine },
  { name: "Elf Entrepreneur", emoji: "🧝", min: 40, max: 60, color: "text-christmas-green", icon: Gift },
  { name: "Reindeer Mogul", emoji: "🦌", min: 60, max: 80, color: "text-christmas-gold", icon: Star },
  { name: "Santa's Partner", emoji: "🎅", min: 80, max: 95, color: "text-christmas-red", icon: Sparkles },
  { name: "North Pole Overlord", emoji: "👑", min: 95, max: 100, color: "text-christmas-gold-light", icon: Crown },
];

export default function Richness() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(levels[0]);
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("getrichify-richness-date");
    const savedScore = localStorage.getItem("getrichify-richness-score");

    if (savedDate === today && savedScore) {
      const parsedScore = parseInt(savedScore);
      setScore(parsedScore);
      updateLevel(parsedScore);
      setLastUpdate(today);
    } else {
      const newScore = Math.floor(Math.random() * 100);
      setScore(newScore);
      updateLevel(newScore);
      localStorage.setItem("getrichify-richness-score", newScore.toString());
      localStorage.setItem("getrichify-richness-date", today);
      setLastUpdate(today);
    }
  }, []);

  const updateLevel = (score: number) => {
    const currentLevel = levels.find((l) => score >= l.min && score < l.max) || levels[levels.length - 1];
    setLevel(currentLevel);
  };

  return (
    <div className="min-h-screen relative pt-20">
      <Snowfall />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-in">
            <h1 className="page-heading gradient-text christmas-glow mb-4">
              Daily Richness Meter
            </h1>
            <p className="text-lg text-muted-foreground">
              Check your entrepreneurial fortune for today
            </p>
          </div>

          {/* Main Meter */}
          <Card className="festive-card border-christmas-gold/30 p-12 shadow-gold animate-pop-in mb-8">
            <div className="space-y-8">
              {/* Current Level */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="absolute -inset-8 bg-gradient-gold rounded-full opacity-20 blur-xl animate-glow-pulse" />
                  <div className="text-9xl mb-4 animate-bounce-slow relative">{level.emoji}</div>
                </div>
                <h2 className={`text-5xl font-black ${level.color} mb-2`}>
                  {level.name}
                </h2>
                <p className="text-3xl font-bold gradient-text">{score}% Rich</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-4">
                <div className="relative">
                  <Progress value={score} className="h-8 bg-card border border-christmas-snow/10" />
                  <div 
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-christmas-red via-christmas-gold to-christmas-green transition-all duration-1000"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Coal 🪨</span>
                  <span>Overlord 👑</span>
                </div>
              </div>

              {/* Info */}
              <div className="text-center space-y-2">
                <p className="text-lg text-muted-foreground">
                  Last Updated: {lastUpdate}
                </p>
                <p className="text-sm text-christmas-gold italic flex items-center justify-center gap-2">
                  <Star className="w-4 h-4 animate-twinkle" />
                  Come back tomorrow for a new reading!
                  <Star className="w-4 h-4 animate-twinkle" style={{ animationDelay: "0.5s" }} />
                </p>
              </div>
            </div>
          </Card>

          {/* All Levels */}
          <div>
            <h3 className="text-3xl font-bold text-center text-christmas-snow mb-6 flex items-center justify-center gap-2">
              <Gift className="w-8 h-8 text-christmas-gold" />
              The Holiday Richness Scale
            </h3>
            <div className="space-y-4">
              {levels.map((lvl, i) => {
                const IconComponent = lvl.icon;
                return (
                  <Card
                    key={i}
                    className={`festive-card p-6 transition-all duration-300 ${
                      lvl.name === level.name
                        ? "border-christmas-gold/50 shadow-gold scale-105"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl">{lvl.emoji}</span>
                        <div>
                          <h4 className={`text-2xl font-bold ${lvl.color} flex items-center gap-2`}>
                            <IconComponent className="w-5 h-5" />
                            {lvl.name}
                          </h4>
                          <p className="text-muted-foreground">
                            {lvl.min}% - {lvl.max}%
                          </p>
                        </div>
                      </div>
                      {lvl.name === level.name && (
                        <div className="text-4xl animate-sway">🎄</div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
