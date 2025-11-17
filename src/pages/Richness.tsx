import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { MoneyRain } from "@/components/MoneyRain";
import { Progress } from "@/components/ui/progress";

const levels = [
  { name: "Broke", emoji: "💀", min: 0, max: 20, color: "text-destructive" },
  { name: "Surviving", emoji: "😐", min: 20, max: 40, color: "text-muted-foreground" },
  { name: "Hustler", emoji: "😎", min: 40, max: 60, color: "text-neon-cyan" },
  { name: "Future Unicorn Founder", emoji: "🦄", min: 60, max: 80, color: "text-neon-purple" },
  { name: "Billionaire", emoji: "🤑", min: 80, max: 95, color: "text-neon-gold" },
  { name: "Intergalactic Money Overlord", emoji: "👽💸", min: 95, max: 100, color: "text-neon-lime" },
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
      <MoneyRain />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-in">
            <h1 className="page-heading gradient-text mb-4">
              Daily Richness Meter
            </h1>
            <p className="text-lg text-muted-foreground">
              Check your entrepreneurial fortune for today
            </p>
          </div>

          {/* Main Meter */}
          <Card className="bg-card border-2 border-primary p-12 shadow-card animate-pop-in mb-8">
            <div className="space-y-8">
              {/* Current Level */}
              <div className="text-center">
                <div className="text-9xl mb-4 animate-bounce-slow">{level.emoji}</div>
                <h2 className={`text-5xl font-black ${level.color} mb-2`}>
                  {level.name}
                </h2>
                <p className="text-3xl font-bold gradient-text">{score}% Rich</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-4">
                <Progress value={score} className="h-8" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Broke 💀</span>
                  <span>Overlord 👽💸</span>
                </div>
              </div>

              {/* Info */}
              <div className="text-center space-y-2">
                <p className="text-lg text-muted-foreground">
                  Last Updated: {lastUpdate}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Come back tomorrow for a new reading! 🔮
                </p>
              </div>
            </div>
          </Card>

          {/* All Levels */}
          <div>
            <h3 className="text-3xl font-bold text-center text-neon-cyan mb-6">
              The Richness Scale
            </h3>
            <div className="space-y-4">
              {levels.map((lvl, i) => (
                <Card
                  key={i}
                  className={`p-6 border-2 transition-all ${
                    lvl.name === level.name
                      ? "border-neon-lime bg-neon-lime/10 shadow-neon scale-105"
                      : "border-border/30 bg-card/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl">{lvl.emoji}</span>
                      <div>
                        <h4 className={`text-2xl font-bold ${lvl.color}`}>
                          {lvl.name}
                        </h4>
                        <p className="text-muted-foreground">
                          {lvl.min}% - {lvl.max}%
                        </p>
                      </div>
                    </div>
                    {lvl.name === level.name && (
                      <div className="text-4xl animate-pulse">👈</div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
