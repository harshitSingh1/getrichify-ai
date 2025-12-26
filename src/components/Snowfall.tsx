import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

interface Star {
  id: number;
  left: number;
  top: number;
  delay: number;
  size: number;
}

export const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate snowflakes
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 8,
      size: 4 + Math.random() * 8,
      opacity: 0.3 + Math.random() * 0.7,
    }));
    setSnowflakes(flakes);

    // Generate twinkling stars
    const starArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 60,
      delay: Math.random() * 5,
      size: 1 + Math.random() * 3,
    }));
    setStars(starArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-christmas-midnight/50" />
      
      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-christmas-snow animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            boxShadow: `0 0 ${star.size * 2}px hsl(var(--christmas-snow))`,
          }}
        />
      ))}

      {/* Snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-christmas-snow/90 animate-snowfall"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            boxShadow: `0 0 ${flake.size}px hsl(var(--christmas-snow) / 0.5)`,
          }}
        />
      ))}

      {/* Subtle aurora effect at the top */}
      <div className="absolute top-0 left-0 right-0 h-64 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-christmas-green/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-christmas-red/20 via-transparent to-transparent" />
      </div>
    </div>
  );
};
