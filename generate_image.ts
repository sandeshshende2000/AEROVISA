import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateLuxuryImage() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: 'A premium, ultra-realistic 4K cinematic wide-angle shot of a modern luxury minimalist riverside villa at golden hour sunset. High-end architecture with large floor-to-ceiling glass windows revealing soft, warm interior lighting. The villa is situated on a calm riverbank with a perfect mirror reflection in the water. A sleek, high-end luxury car is subtly parked in the driveway. In the far distance, a faint, elegant city skyline is visible under a deep twilight sky. The color palette is dominated by deep blacks, rich golds, and neutral tones. High contrast with soft, long shadows. The image features an elegant text overlay in a minimal, modern luxury serif font. The main text "Bespoke Advisory for the Global Elite" is in a soft gold color, centered and balanced. Below it, a smaller subtitle "Tailored Residency & Investment Solutions for Global Citizens" is in a clean, soft white. The text is sophisticatedly spaced and clearly readable against the premium background. Mood: wealth, exclusivity, stability, and global elite lifestyle.',
        },
      ],
    },
    config: {
      imageConfig: {
            aspectRatio: "16:9",
            imageSize: "1K"
        },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      console.log(part.inlineData.data);
    }
  }
}

generateLuxuryImage();
