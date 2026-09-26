import { useEffect, useState } from "react";

export const MoneyRain = () => {
  const [coins, setCoins] = useState<{ id: number; left: number; delay: number }[]>([]);

  useEffect(() => {
    const newCoins = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setCoins(newCoins);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute text-4xl animate-money-rain"
          style={{
            left: `${coin.left}%`,
            animationDelay: `${coin.delay}s`,
          }}
        >
          💰
        </div>
      ))}
    </div>
  );
};
