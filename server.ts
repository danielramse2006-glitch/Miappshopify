import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint for generating Shopify Liquid sections
app.post("/api/generate-liquid", async (req, res) => {
  const { prompt, fileContext } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "El prompt es requerido para generar código Liquid." });
  }

  if (!ai) {
    return res.status(500).json({
      error: "La clave API de Gemini no está configurada. Por favor, configúrala en Settings > Secrets.",
    });
  }

  try {
    const systemPrompt = `Eres un experto de primer nivel en desarrollo de temas de Shopify Liquid, especializado en el tema "Horizon v3.5.1" y tiendas de moda, joyería y cosméticos de lujo como "Soft Glamour".
Tu tarea es generar secciones de Shopify Liquid (.liquid) altamente legibles, seguras, optimizadas y que cumplan con la sintaxis de bloque/esquema moderna de Shopify (sección con {% schema %}, {% style %}, {% javascript %} si aplica y etiquetas HTML semánticas).

Debes generar una respuesta JSON que contenga las siguientes propiedades:
1. "suggestedFileName": Un nombre de archivo recomendado para la sección (debe terminar en .liquid, por ejemplo: "sections/review-carousel.liquid").
2. "liquidCode": Todo el código de la sección Liquid, comentado y estructurado elegantemente con Tailwind o clases genéricas que representen el estilo Soft Glamour (paleta rosa suave, oro, carbón, tipografía elegante).
3. "explanation": Una explicación detallada en español que incluye:
   - Instrucciones paso a paso para colocar el archivo en la carpeta "sections/" de su proyecto de Shopify en GitHub or Online panel.
   - Detalle de cómo configurar las opciones en el editor de temas de Shopify (los settings declarados en el JSON del schema de la sección).
   - Consejos de diseño para mantener la sintonía estética "Soft Glamour" (por ejemplo, colores #FFF8F6, #D4AF37, etc.).

Importante: Respeta estrictamente el esquema de salida JSON solicitado. No agregues texto fuera del JSON.`;

    const userPrompt = `Necesito crear una sección de Shopify Liquid basada en este requerimiento: "${prompt}"
${fileContext ? `Contexto del archivo actual / esquema del tema:\n${fileContext}` : ""}

Por favor genera la sección Shopify Liquid adaptada a la tienda de lujo de cosméticos y complementos "Soft Glamour".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["suggestedFileName", "liquidCode", "explanation"],
          properties: {
            suggestedFileName: {
              type: Type.STRING,
              description: "The recommended path/filename (e.g. sections/customer-reviews.liquid).",
            },
            liquidCode: {
              type: Type.STRING,
              description: "The complete valid Shopify Liquid file code.",
            },
            explanation: {
              type: Type.STRING,
              description: "Instructions, schema explanations and design tips in Spanish.",
            },
          },
        },
      },
    });

    const resultText = response.text || "{}";
    const data = JSON.parse(resultText);

    res.json(data);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: `Error al generar Liquid: ${error.message || error}`,
    });
  }
});

// Root API Healthcheck
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    theme: "Horizon v3.5.1",
    store: "Soft Glamour Store",
    time: new Date().toISOString(),
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
