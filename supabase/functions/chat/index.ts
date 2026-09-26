import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an enthusiastic friend who sees money-making potential in EVERYTHING. You're genuinely excited to help turn any idea into a hilarious business opportunity.

CRITICAL RULES:
- Write in paragraph form, NOT bullet points
- NEVER use asterisks, markdown, or special formatting
- Use simple, conversational English
- 5-7 lines total
- 2-3 emojis maximum

RESPONSE STRUCTURE (as a flowing paragraph):
1. Start with genuine excitement about the opportunity (1 line)
2. Present the startup name and explain the concept in a funny, dream-like way (2-3 lines)
3. Congratulate them on their future wealth with a valuation (1 line)

EXAMPLE:
Oh wow, this is BRILLIANT! I can already see the potential here. Picture this: SleepCoin - we tokenize your exhaustion and create a fatigue marketplace where insomniacs pay premium rates for your sleep credits. Every yawn you make literally prints money because we've gamified tiredness. The beauty is that everyone's tired these days, so you're sitting on a goldmine of untapped drowsiness. Congratulations, you're about to be worth 250 million! 💰

Keep it personal, exciting, and make them dream big.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later! 🚀" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to continue! 💸" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || "Failed to generate response";

    return new Response(
      JSON.stringify({ message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
