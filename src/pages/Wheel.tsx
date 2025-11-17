import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoneyRain } from "@/components/MoneyRain";

const fates = [
  "You'll sell pens to aliens 👽🖊️",
  "Your sadness becomes NFTs 😭💎",
  "PayRent: Pay rent with secrets 🤫💰",
  "BugBusters.ai - IPO instantly 🐛📈",
  "Your tears generate electricity ⚡😢",
  "Elon's emotional support human 🤗🚀",
  "Startup selling food to plants 🌱🍔",
  "Monetize your procrastination ⏰💸",
  "Dating app for houseplants 🪴❤️",
  "Sell bottled disappointment 🍾😔",
  "Uber for imaginary friends 👻🚗",
  "LinkedIn for pets 🐕💼",
  "Therapy sessions for furniture 🛋️💭",
  "Gym membership for ghosts 👻💪",
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

      // Confetti effect
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.textContent = ["💰", "🎉", "✨", "🚀", "💎"][Math.floor(Math.random() * 5)];
        confetti.className = "fixed text-4xl pointer-events-none";
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = "50%";
        confetti.style.animation = `money-rain ${1 + Math.random()}s linear forwards`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen relative pt-20">
      <MoneyRain />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12 animate-slide-in">
            <h1 className="page-heading gradient-text mb-4">
              Destiny Wheel
            </h1>
            <p className="text-lg text-muted-foreground">
              Spin the wheel to discover your entrepreneurial fate
            </p>
          </div>

          {/* Wheel */}
          <div className="mb-12 flex justify-center relative">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-primary shadow-lg" />
            </div>
            
            <div className="relative">
              <div
                className="w-80 h-80 rounded-full border-8 border-primary shadow-card bg-card relative overflow-hidden transition-transform duration-[3000ms] ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                {/* Wheel segments */}
                {fates.map((_, i) => {
                  const angle = (360 / fates.length) * i;
                  const hue = (360 / fates.length) * i;
                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 origin-left"
                      style={{
                        transform: `rotate(${angle}deg)`,
                        width: '50%',
                        height: '2px',
                      }}
                    >
                      <div 
                        className="w-full h-full"
                        style={{
                          background: `hsl(${hue}, 70%, 50%)`,
                        }}
                      />
                    </div>
                  );
                })}
                
                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-primary border-4 border-background flex items-center justify-center shadow-neon">
                  <div className="text-2xl font-black">$</div>
                </div>
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <Button
            onClick={spin}
            disabled={spinning}
            size="lg"
            className="text-xl px-12 py-6 rounded-lg bg-gradient-primary hover:scale-105 transition-all shadow-neon font-semibold mb-12"
          >
            {spinning ? "Spinning..." : "Spin the Wheel"}
          </Button>

          {/* Result */}
          {result && (
            <Card className="bg-card border border-primary p-8 shadow-neon animate-pop-in">
              <h2 className="text-2xl font-bold mb-4">
                Your Destiny
              </h2>
              <p className="text-3xl font-bold gradient-text mb-4">{result}</p>
              <p className="text-muted-foreground">
                Time to make it a reality
              </p>
            </Card>
          )}

          {/* All Possible Fates */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">
              All Possible Outcomes
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {fates.map((fate, i) => (
                <Card
                  key={i}
                  className="bg-card border border-border p-4 hover:border-primary hover:shadow-neon transition-all"
                >
                  <p className="font-medium">{fate}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
