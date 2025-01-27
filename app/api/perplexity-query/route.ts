import { NextRequest, NextResponse } from "next/server";
import { saveInfluencersToDB } from "@/lib/utils/saveInfluencers";

// Verificar cada claim con Perplexity u otra API
async function verifyClaims(claims: { claim: string; category: string }[]) {
  const verifiedClaims = await Promise.all(
    claims.map(async (claimObj) => {
      try {
        const response = await fetch(
          "https://api.perplexity.ai/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "llama-3.1-sonar-large-128k-online",
              temperature: 0.3,
              max_tokens: 1000,
              messages: [
                {
                  role: "system",
                  content: `Eres un experto en análisis científico. Verifica si la siguiente declaración es respaldada por estudios científicos confiables buscados en paginas web de investigación. Devuelve un JSON con "status" ("Verified", "Questionable", "Debunked"), una breve "source" (URL o nombre del artículo) y un análisis breve en el campo "aiAnalysis".`,
                },
                {
                  role: "user",
                  content: `Declaración: "${claimObj.claim}"`,
                },
              ],
            }),
          }
        );

        if (!response.ok) throw new Error("Error verificando el claim.");

        const rawClaimData = await response.json();
        console.log("Respuesta Perplexity para claim:", rawClaimData);

        const claimContent = rawClaimData.choices[0].message.content;

        // Extraer resultado JSON (limpieza adicional)
        const jsonStartIndex = claimContent.indexOf("{");
        const jsonEndIndex = claimContent.lastIndexOf("}");
        const cleanedContent = claimContent.substring(jsonStartIndex, jsonEndIndex + 1);

        const jsonData = JSON.parse(cleanedContent);

        return {
          ...claimObj,
          status: jsonData.status || "Unknown",
          source: jsonData.source || "No source available",
          aiAnalysis: jsonData.aiAnalysis || "No analysis available",
        };
      } catch (error) {
        console.error("Error verificando claim:", error);
        return {
          ...claimObj,
          status: "Error",
          source: "No source available",
          aiAnalysis: "No analysis available due to an error.",
        };
      }
    })
  );

  return verifiedClaims;
}

// Extender el flujo POST
export async function POST(req: NextRequest) {
  try {
    const { count } = await req.json();

    if (!count || typeof count !== "number") {
      return NextResponse.json(
        { message: "Count must be a valid number" },
        { status: 400 }
      );
    }

  const influencerSystemPrompt = `Eres un experto en análisis de influencers. Genera una lista de influencers de salud con:
- Seguidores entre 10k y 2M
- Tasa de engagement 3-10%
- Especializados en: nutrición, fitness o salud mental
- Plataformas principales: Instagram/YouTube/Twitter/TikTok
- Asegúrate de que los influencers sean diferentes en términos de nombre, especialidad y ubicación geográfica.
- Incluir: nombre, usuario, plataforma, seguidores, engagement%, especialidad, contacto y hasta 3 declaraciones de salud con su categoría.
- Genera nombres originales y variados, evitando repetición con los datos proporcionados en otras respuestas.
- Solo genera un JSON válido. No agregues explicaciones ni formato adicional como títulos, comentarios o listas.
- Formato del JSON:
{
  "influencers": [
    {
      "name": "string",
      "username": "string",
      "platform": "string",
      "followers": number,
      "engagement": "number%",
      "specialty": "string",
      "contact": "string",
      "healthClaims": [
        {
          "claim": "string",
          "category": "string (e.g., Nutrition, Fitness, Mental Health)"
        }
      ]
    }
  ]
}`;


    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-huge-128k-online",
        temperature: 0.4,
        max_tokens: 2000,
        messages: [
          {
            role: "system",
            content: influencerSystemPrompt,
          },
          {
            role: "user",
            content: `Generar ${count} influencers de salud con los criterios solicitados`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          message: "Perplexity API Error",
          status: response.status,
          details: errorData.error?.message || "Unknown error",
        },
        { status: response.status }
      );
    }

    const rawData = await response.json();
    console.log("Respuesta Perplexity (Influencers):", rawData);

    const rawContent = rawData.choices[0].message.content;

    // Extraer JSON del contenido (elimina posibles delimitadores como ```json)
    const jsonMatch = rawContent.match(/```json\n([\s\S]*?)\n```/);
    const cleanedContent = jsonMatch ? jsonMatch[1] : rawContent;

    const influencersData = JSON.parse(cleanedContent);

    // Verificar claims
    const verifiedInfluencers = await Promise.all(
      influencersData.influencers.map(
        async (influencer: {
          name: string;
          username: string;
          platform: string;
          followers: number;
          engagement: string;
          specialty: string;
          contact: string;
          healthClaims: { claim: string; category: string }[];
        }) => {
          const verifiedClaims = await verifyClaims(influencer.healthClaims);
          return {
            ...influencer,
            healthClaims: verifiedClaims.map((claim) => ({
              ...claim,
              aiAnalysis: claim.aiAnalysis || "No analysis available", // Añadir el campo aiAnalysis
            })),
            trustScore:
              (verifiedClaims.filter(
                (c: {
                  claim: string;
                  category: string;
                  status: string;
                  source: string;
                }) => c.status === "Verified"
              ).length /
                verifiedClaims.length) *
              100,
          };
        }
      )
    );

    await saveInfluencersToDB(verifiedInfluencers);

    return NextResponse.json({ influencers: verifiedInfluencers });
  } catch (error) {
    console.error("Error en la generación/verificación:", error);
    return NextResponse.json(
      {
        message: "Error en la generación/verificación",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
