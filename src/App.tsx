import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const PatchNotes = lazy(() => import("./pages/PatchNotes"));
const Wheel = lazy(() => import("./pages/Wheel"));
const Richness = lazy(() => import("./pages/Richness"));
const Serious = lazy(() => import("./pages/Serious"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Suspense
          fallback={
            <div className="min-h-screen bg-background text-foreground grid place-items-center">
              <div className="text-sm text-muted-foreground">Loading…</div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/patch-notes" element={<PatchNotes />} />
            <Route path="/wheel" element={<Wheel />} />
            <Route path="/richness" element={<Richness />} />
            <Route path="/serious" element={<Serious />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
