import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

let cached: SupabaseClient<Database> | null = null;

// Last-resort fallbacks (public values) to keep preview/published builds working
// even if env injection is temporarily missing.
const FALLBACK_PROJECT_ID = "qgnfrgtrolwmdhbkoswh";
const FALLBACK_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnbmZyZ3Ryb2x3bWRoYmtvc3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMTMxNzcsImV4cCI6MjA3ODY4OTE3N30.GjS9f34jHF1XVK1xSaKjJSGdHXpql3_18W1uxfehoSg";

function resolveBackendUrl(): string | undefined {
  const direct =
    (import.meta.env.VITE_SUPABASE_URL as string | undefined) ??
    (import.meta.env.SUPABASE_URL as string | undefined);
  if (direct) return direct;

  const projectId =
    (import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined) ??
    (import.meta.env.SUPABASE_PROJECT_ID as string | undefined) ??
    FALLBACK_PROJECT_ID;

  return projectId ? `https://${projectId}.supabase.co` : undefined;
}

function resolveBackendKey(): string | undefined {
  return (
    (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
    (import.meta.env.SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
    (import.meta.env.SUPABASE_ANON_KEY as string | undefined) ??
    FALLBACK_ANON_KEY
  );
}

/**
 * Lazily creates the backend client so missing env vars won't crash the app on import.
 */
export function getBackendClient(): SupabaseClient<Database> {
  if (cached) return cached;

  const url = resolveBackendUrl();
  const key = resolveBackendKey();

  if (!url || !key) {
    throw new Error(
      "Backend configuration missing (URL/key). Please reload the preview or republish the app.",
    );
  }

  cached = createClient<Database>(url, key, {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return cached;
}
