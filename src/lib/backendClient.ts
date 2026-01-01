import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

let cached: SupabaseClient<Database> | null = null;

function resolveBackendUrl(): string | undefined {
  const direct =
    (import.meta.env.VITE_SUPABASE_URL as string | undefined) ??
    (import.meta.env.SUPABASE_URL as string | undefined);
  if (direct) return direct;

  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined;
  return projectId ? `https://${projectId}.supabase.co` : undefined;
}

function resolveBackendKey(): string | undefined {
  return (
    (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
    (import.meta.env.SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
    (import.meta.env.SUPABASE_ANON_KEY as string | undefined)
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
    throw new Error("Backend configuration missing (URL/key)");
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
