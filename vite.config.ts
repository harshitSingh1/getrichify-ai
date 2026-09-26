import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Ensure Lovable Cloud-provided secrets are available to the client bundle.
  // In some environments, `process.env` may be empty; `loadEnv` reads from .env files.
  const env = loadEnv(mode, process.cwd(), "");

  const supabaseUrl =
    env.VITE_SUPABASE_URL ??
    env.SUPABASE_URL ??
    process.env.VITE_SUPABASE_URL ??
    process.env.SUPABASE_URL ??
    "";

  const supabaseKey =
    env.VITE_SUPABASE_PUBLISHABLE_KEY ??
    env.SUPABASE_PUBLISHABLE_KEY ??
    env.VITE_SUPABASE_ANON_KEY ??
    env.SUPABASE_ANON_KEY ??
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.VITE_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    "";

  const defineEnv: Record<string, string> = {};
  if (supabaseUrl) {
    defineEnv["import.meta.env.VITE_SUPABASE_URL"] = JSON.stringify(supabaseUrl);
  }
  if (supabaseKey) {
    defineEnv["import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY"] = JSON.stringify(supabaseKey);
  }

  return {
    envPrefix: ["VITE_", "SUPABASE_", "LOVABLE_"],
    define: defineEnv,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
