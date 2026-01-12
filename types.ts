
export interface Song {
  title: string;
  artist: string;
  isKorean: boolean;
  description: string;
  genre: string;
}

export interface RecommendationResponse {
  songs: Song[];
}

export enum CommuteContext {
  SUBWAY = '지하철',
  BUS = '버스',
  WALKING = '도보'
}
