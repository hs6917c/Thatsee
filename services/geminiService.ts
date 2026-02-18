import { GoogleGenAI, Type } from "@google/genai";
import { FilterState, ContentItem } from "../types";

// Initialize Gemini Client
// NOTE: In a production app, ensure this is handled securely.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getRecommendations = async (filters: FilterState): Promise<ContentItem[]> => {
  const model = "gemini-3-flash-preview";

  const prompt = `
    Recommend 4 specific content titles (Movies, Webtoons, Novels, Anime, or Drama) based on the following user preferences:
    - Category: ${filters.category || "Any (Mix of Movie, Webtoon, Novel, Anime, Drama)"}
    - Genre: ${filters.genre || "Any"}
    - Platform: ${filters.platform || "Any"}
    - Mood: ${filters.mood || "Any"}

    If specific filters are not provided, suggest generally popular "Masterpiece" (인생작) content popular in Korea among MZ generation.
    
    Ensure the response includes a tier rating (S, A, B) based on community reputation and a short 1-sentence reason why it fits the mood.
    Also, assume hypothetical funding or merchandise exists for these items.
    
    The description should be a brief synopsis in Korean.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              category: { type: Type.STRING, enum: ['Movie', 'Webtoon', 'Novel', 'Anime', 'Drama'] },
              tier: { type: Type.STRING, enum: ['S', 'A', 'B'] },
              rating: { type: Type.NUMBER, description: "Rating out of 5, e.g. 4.8" },
              reason: { type: Type.STRING, description: "A short sentence in Korean explaining why this is recommended" },
              description: { type: Type.STRING, description: "A short synopsis in Korean" },
              platform: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['title', 'category', 'tier', 'rating', 'reason', 'description', 'platform']
          }
        }
      }
    });

    const rawData = JSON.parse(response.text || "[]");
    
    // Map response to our ContentItem structure with placeholder images
    return rawData.map((item: any, index: number) => ({
      id: `rec-${index}-${Date.now()}`,
      title: item.title,
      category: item.category,
      imageUrl: `https://picsum.photos/seed/${item.title.replace(/\s/g, '')}/400/600`,
      tier: item.tier,
      rating: item.rating,
      reason: item.reason,
      description: item.description,
      platform: item.platform,
      fundingAvailable: Math.random() > 0.5, // Simulate funding availability
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return empty array or throw, handled by component
    return [];
  }
};
