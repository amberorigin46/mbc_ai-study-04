
import { GoogleGenAI, Type } from "@google/genai";
import { Song, RecommendationResponse } from "../types";

export const getMusicRecommendations = async (theme: string): Promise<Song[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    사용자의 음악 취향/테마: "${theme}"
    이 테마를 바탕으로 출퇴근 시간(지하철, 버스 등)에 듣기 좋은 음악 7곡을 추천해줘.
    
    규칙:
    1. 총 7곡을 추천할 것.
    2. 한국 음악(K-Pop, K-Indie, K-Ballad 등)과 해외 음악의 비율을 7:3으로 할 것 (즉, 한국 음악 5곡, 해외 음악 2곡).
    3. 각 곡마다 왜 이 곡이 출퇴근길에 어울리는지 짧은 설명(한국어)을 포함할 것.
    4. 결과는 반드시 JSON 형식이어야 함.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          songs: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Song title" },
                artist: { type: Type.STRING, description: "Artist name" },
                isKorean: { type: Type.BOOLEAN, description: "True if it is a Korean song" },
                description: { type: Type.STRING, description: "Why it suits the commute" },
                genre: { type: Type.STRING, description: "Genre of the song" },
              },
              required: ["title", "artist", "isKorean", "description", "genre"],
            },
          },
        },
        required: ["songs"],
      },
    },
  });

  try {
    const data: RecommendationResponse = JSON.parse(response.text);
    return data.songs;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("추천 목록을 불러오는 중 오류가 발생했습니다.");
  }
};
