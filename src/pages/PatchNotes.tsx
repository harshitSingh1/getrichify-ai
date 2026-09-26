import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Snowfall } from "@/components/Snowfall";
import { Sparkles, TrendingUp, TrendingDown, Bug, Star } from "lucide-react";

interface PatchNote {
  timestamp: number;
  buffs: string[];
  nerfs: string[];
  bugFixes: string[];
  newFeatures: string[];
}

export default function PatchNotes() {
  const [patches, setPatches] = useState<PatchNote[]>([]);
  const [version, setVersion] = useState("1.0");

  useEffect(() => {
    const savedPatches = JSON.parse(localStorage.getItem("getrichify-patches") || "[]");
    setPatches(savedPatches);

    const actions = JSON.parse(localStorage.getItem("getrichify-actions") || "0");
    setVersion(`${Math.floor(actions / 10)}.${actions % 10}`);
  }, []);

  return (
    <div className="min-h-screen relative pt-20">
      <Snowfall />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-in">
            <h1 className="page-heading gradient-text christmas-glow mb-4">
              Your Patch Notes v{version}
            </h1>
            <p className="text-lg text-muted-foreground">
              Tracking your personal updates in real-time
            </p>
          </div>

          {patches.length === 0 ? (
            <Card className="festive-card p-12 text-center">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-christmas-gold animate-twinkle" />
              <p className="text-xl text-christmas-snow mb-4">
                No patch notes yet
              </p>
              <p className="text-muted-foreground">
                Start chatting to generate your first update
              </p>
            </Card>
          ) : (
            <div className="space-y-6">
              {patches.map((patch, index) => (
                <Card
                  key={index}
                  className="festive-card p-6 animate-pop-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      {new Date(patch.timestamp).toLocaleString()}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Buffs */}
                    <div>
                      <h3 className="text-2xl font-bold text-christmas-green mb-3 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6" />
                        Buffs
                      </h3>
                      <ul className="space-y-2">
                        {patch.buffs.map((buff, i) => (
                          <li key={i} className="text-christmas-snow/90 flex items-start gap-2">
                            <span className="text-christmas-green">+</span>
                            {buff}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Nerfs */}
                    <div>
                      <h3 className="text-2xl font-bold text-christmas-red mb-3 flex items-center gap-2">
                        <TrendingDown className="w-6 h-6" />
                        Nerfs
                      </h3>
                      <ul className="space-y-2">
                        {patch.nerfs.map((nerf, i) => (
                          <li key={i} className="text-christmas-snow/90 flex items-start gap-2">
                            <span className="text-christmas-red">-</span>
                            {nerf}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bug Fixes */}
                    <div>
                      <h3 className="text-2xl font-bold text-christmas-ice mb-3 flex items-center gap-2">
                        <Bug className="w-6 h-6" />
                        Bug Fixes
                      </h3>
                      <ul className="space-y-2">
                        {patch.bugFixes.map((fix, i) => (
                          <li key={i} className="text-christmas-snow/90 flex items-start gap-2">
                            <span className="text-christmas-ice">✓</span>
                            {fix}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* New Features */}
                    <div>
                      <h3 className="text-2xl font-bold text-christmas-gold mb-3 flex items-center gap-2">
                        <Star className="w-6 h-6" />
                        New Features
                      </h3>
                      <ul className="space-y-2">
                        {patch.newFeatures.map((feature, i) => (
                          <li key={i} className="text-christmas-snow/90 flex items-start gap-2">
                            <span className="text-christmas-gold">★</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
