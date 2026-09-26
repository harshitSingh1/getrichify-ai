import { Gift } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
          <Gift className="w-5 h-5 text-primary-foreground" />
        </div>
        {/* Decorative snow on top */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-christmas-snow rounded-full opacity-80" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-black gradient-text leading-tight">GetRichify</span>
        <span className="text-[10px] text-christmas-gold font-medium tracking-wider">HOLIDAY EDITION</span>
      </div>
    </div>
  );
};
