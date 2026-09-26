import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Snowfall } from "@/components/Snowfall";
import { Gift, Star, Sparkles } from "lucide-react";

const fates = [
  "You'll sell gifts to elves 🎁🧝",
  "Your tears become snowflakes ❄️😢",
  "HolidayPay: Pay rent with cookies 🍪💰",
  "SleighShare.ai - IPO instantly 🛷📈",
  "Your joy generates electricity ⚡🎄",
  "Santa's emotional support human 🤗🎅",
  "Startup selling carrots to reindeer 🥕🦌",
  "Monetize your gift wrapping ⏰💸",
  "Dating app for snowmen ⛄❤️",
  "Sell bottled holiday cheer 🍾✨",
  "Uber for present delivery 🎁🚗",
  "LinkedIn for North Pole workers 🧝💼",
  "Therapy sessions for ornaments 🎄💭",
  "Gym membership for gingerbread men 🏃💪",
];

export default function Wheel() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setResult("");

    const spins = 5 + Math.random() * 3;
    const degrees = spins * 360 + Math.random() * 360;
    setRotation(degrees);

    setTimeout(() => {
      const randomFate = fates[Math.floor(Math.random() * fates.length)];
      setResult(randomFate);
      setSpinning(false);

      // Festive confetti effect
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.textContent = ["🎄", "🎁", "⭐", "❄️", "🔔"][Math.floor(Math.random() * 5)];
        confetti.className = "fixed text-4xl pointer-events-none";
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = "50%";
        confetti.style.animation = `snowfall ${1 + Math.random()}s linear forwards`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen relative pt-20">
      <Snowfall />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12 animate-slide-in">
            <h1 className="page-heading gradient-text christmas-glow mb-4">
              Destiny Wheel
            </h1>
            <p className="text-lg text-muted-foreground">
              Spin the wheel to discover your entrepreneurial fate
            </p>
          </div>

          {/* Wheel */}
          <div className="mb-12 flex justify-center relative">
            {/* Pointer - Christmas tree style */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
              <div className="relative">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-christmas-gold drop-shadow-lg" />
                <Star className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 text-christmas-gold animate-twinkle" />
              </div>
            </div>
            
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-christmas-red via-christmas-gold to-christmas-green opacity-30 blur-xl animate-glow-pulse" />
              
              <div
                className="w-80 h-80 rounded-full border-8 border-christmas-gold shadow-card bg-gradient-to-br from-card to-christmas-midnight relative overflow-hidden transition-transform duration-[3000ms] ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  boxShadow: "0 0 40px hsl(var(--christmas-gold) / 0.3), inset 0 0 60px hsl(var(--christmas-midnight) / 0.5)",
                }}
              >
                {/* Wheel segments */}
                {fates.map((_, i) => {
                  const angle = (360 / fates.length) * i;
                  const isRed = i % 2 === 0;
                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 origin-left"
                      style={{
                        transform: `rotate(${angle}deg)`,
                        width: '50%',
                        height: '3px',
                      }}
                    >
                      <div 
                        className="w-full h-full"
                        style={{
                          background: isRed 
                            ? `hsl(var(--christmas-red))` 
                            : `hsl(var(--christmas-green))`,
                          boxShadow: isRed 
                            ? "0 0 10px hsl(var(--christmas-red) / 0.5)"
                            : "0 0 10px hsl(var(--christmas-green) / 0.5)",
                        }}
                      />
                    </div>
                  );
                })}
                
                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-gold border-4 border-christmas-snow flex items-center justify-center shadow-gold">
                  <Gift className="w-8 h-8 text-christmas-midnight" />
                </div>
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <Button
            onClick={spin}
            disabled={spinning}
            size="lg"
            className="text-xl px-12 py-7 rounded-xl bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-glow font-bold mb-12 group"
          >
            <Sparkles className="w-6 h-6 mr-2 group-hover:animate-twinkle" />
            {spinning ? "Spinning..." : "Spin the Wheel"}
          </Button>

          {/* Result */}
          {result && (
            <Card className="festive-card border-christmas-gold/50 shadow-gold p-8 animate-pop-in">
              <h2 className="text-2xl font-bold mb-4 text-christmas-gold flex items-center justify-center gap-2">
                <Star className="w-6 h-6 animate-twinkle" />
                Your Destiny
                <Star className="w-6 h-6 animate-twinkle" style={{ animationDelay: "0.5s" }} />
              </h2>
              <p className="text-3xl font-bold gradient-text mb-4">{result}</p>
              <p className="text-muted-foreground">
                Time to make it a reality
              </p>
            </Card>
          )}

          {/* All Possible Fates */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-christmas-snow flex items-center justify-center gap-2">
              <Gift className="w-6 h-6 text-christmas-gold" />
              All Possible Gifts of Fate
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {fates.map((fate, i) => (
                <Card
                  key={i}
                  className="festive-card p-4 hover:border-christmas-gold/40 transition-all duration-300"
                >
                  <p className="font-medium text-christmas-snow">{fate}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
