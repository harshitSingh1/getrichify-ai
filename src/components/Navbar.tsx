import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Snowflake, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useMusic } from "@/context/MusicContext";

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isMuted, toggleMute, isPlaying } = useMusic();

  const links = [
    { to: "/", label: "Home" },
    { to: "/chat", label: "Chat" },
    { to: "/patch-notes", label: "Patch Notes" },
    { to: "/wheel", label: "Destiny Wheel" },
    { to: "/richness", label: "Richness Meter" },
    { to: "/serious", label: "Serious Mode" },
    { to: "/about", label: "About" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-christmas-snow/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          {/* Desktop Menu & Audio Controller */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Button
                key={link.to}
                asChild
                variant={isActive(link.to) ? "default" : "ghost"}
                size="sm"
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive(link.to) 
                    ? "bg-gradient-primary shadow-glow text-primary-foreground" 
                    : "hover:bg-christmas-snow/5 hover:text-christmas-gold"
                }`}
              >
                <Link to={link.to} className="flex items-center gap-1">
                  {isActive(link.to) && <Snowflake className="w-3 h-3" />}
                  {link.label}
                </Link>
              </Button>
            ))}

            {/* Global Music Mute / Unmute Button */}
            <div className="ml-2 pl-2 border-l border-christmas-snow/15 flex items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMute}
                title={isMuted ? "Unmute holiday music" : "Mute holiday music"}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 text-xs font-semibold ${
                  isMuted
                    ? "border-muted-foreground/30 text-muted-foreground hover:text-christmas-snow hover:border-christmas-snow/40"
                    : "border-christmas-gold/40 bg-christmas-gold/10 text-christmas-gold shadow-glow"
                }`}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Volume2 className="w-4 h-4 text-christmas-gold animate-pulse" />
                )}
                <span>{isMuted ? "Muted" : isPlaying ? "Jingle Playing" : "Jingle Paused"}</span>
              </Button>
            </div>
          </div>

          {/* Mobile Right Controls: Mute Button & Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMute}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                isMuted
                  ? "border-muted-foreground/30 text-muted-foreground"
                  : "border-christmas-gold/40 bg-christmas-gold/10 text-christmas-gold"
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
              <span>{isMuted ? "Unmute" : "Mute"}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-christmas-snow/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="text-christmas-snow" /> : <Menu className="text-christmas-snow" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-slide-in">
            {links.map((link, index) => (
              <Button
                key={link.to}
                asChild
                variant={isActive(link.to) ? "default" : "ghost"}
                className={`w-full justify-start mb-2 transition-all duration-300 ${
                  isActive(link.to) 
                    ? "bg-gradient-primary shadow-glow" 
                    : "hover:bg-christmas-snow/5"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setIsOpen(false)}
              >
                <Link to={link.to} className="flex items-center gap-2">
                  {isActive(link.to) && <Snowflake className="w-4 h-4" />}
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

