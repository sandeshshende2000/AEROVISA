import { GoogleGenAI } from "@google/genai";
import * as fs from 'fs';
import * as path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateLuxuryImage() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: 'A premium, ultra-realistic 4K cinematic wide-angle shot. A blended composition of a modern waterfront apartment skyline and a private tropical island with a luxury villa. Smooth cinematic transition between both elements. Golden sunset lighting with warm tones. Calm ocean or waterfront reflections. High-end architectural design. Luxury black and gold theme. Cinematic lighting and high contrast. Clean, minimal, and premium. Mood: exclusivity, rare opportunities, and high-value global investments for elite clients.',
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
      const base64Data = part.inlineData.data;
      const buffer = Buffer.from(base64Data, 'base64');
      const dir = path.join(process.cwd(), 'public', 'assets');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const filePath = path.join(dir, 'luxury-investment.png');
      fs.writeFileSync(filePath, buffer);
      console.log(`Image saved to ${filePath}`);
    }
  }
}

generateLuxuryImage();
