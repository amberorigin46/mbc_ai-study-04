
import React, { useState, useCallback } from 'react';
import { Song } from './types';
import { getMusicRecommendations } from './services/geminiService';
import MusicCard from './components/MusicCard';

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const fetchSongs = useCallback(async () => {
    if (!theme.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await getMusicRecommendations(theme);
      setSongs(result);
      setHasSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100">
      <main className="max-w-xl mx-auto px-6 py-20">
        {/* Simplified Intro */}
        <section className={`transition-all duration-700 ${hasSearched ? 'mb-12' : 'py-20 text-center'}`}>
          <h1 className="text-3xl font-light tracking-tighter mb-2">Commute <span className="font-bold">Vibes</span></h1>
          <p className="text-sm text-gray-400 font-light">출퇴근길, 당신만의 7가지 사운드트랙</p>
        </section>

        {/* Floating Input */}
        <div className="mb-12 sticky top-8 z-50">
          <form 
            onSubmit={(e) => { e.preventDefault(); fetchSongs(); }} 
            className="group relative bg-white/70 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="분위기나 장르를 적어보세요..."
              className="w-full pl-6 pr-24 py-4 bg-transparent outline-none text-base font-light"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !theme.trim()}
              className="absolute right-2 top-2 bottom-2 px-4 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-blue-600 disabled:bg-gray-200 transition-all duration-300"
            >
              {isLoading ? '...' : '추천'}
            </button>
          </form>
        </div>

        {error && (
          <div className="text-center text-xs text-red-400 mb-8 animate-pulse">{error}</div>
        )}

        {/* Results */}
        {hasSearched && (
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center justify-between mb-6 px-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-300">Daily Playlist</span>
              <button 
                onClick={fetchSongs}
                className="text-[10px] uppercase tracking-widest font-bold text-blue-500 hover:text-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>
            
            <div className="space-y-3">
              {songs.map((song, index) => (
                <MusicCard key={`${song.title}-${index}`} song={song} index={index} />
              ))}
            </div>
          </div>
        )}

        {!hasSearched && !isLoading && (
          <div className="grid grid-cols-2 gap-2 mt-12 opacity-40">
            {['시티팝', '몽환적인 밤', '파이팅 월요일', '비 오는 차창 밖'].map(tag => (
              <button 
                key={tag} 
                onClick={() => { setTheme(tag); }}
                className="text-[11px] py-2 px-3 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
