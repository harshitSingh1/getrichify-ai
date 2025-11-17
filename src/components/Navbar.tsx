import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <Button
                key={link.to}
                asChild
                variant={isActive(link.to) ? "default" : "ghost"}
                className={isActive(link.to) ? "shadow-neon" : ""}
              >
                <Link to={link.to}>{link.label}</Link>
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-slide-in">
            {links.map((link) => (
              <Button
                key={link.to}
                asChild
                variant={isActive(link.to) ? "default" : "ghost"}
                className={`w-full justify-start mb-2 ${
                  isActive(link.to) ? "shadow-neon" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Link to={link.to}>{link.label}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
