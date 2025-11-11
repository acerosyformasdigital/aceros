import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateStory = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a world-class, imaginative storyteller. Write a short, compelling story (around 150-200 words) based on this prompt: "${prompt}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating story:", error);
    if (error instanceof Error) {
        return `An error occurred while generating the story: ${error.message}. Please check your API key and try again.`;
    }
    return "An unknown error occurred while generating the story.";
  }
};
