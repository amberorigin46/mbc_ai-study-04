
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
      setError(err instanceof Error ? err.message : '추천에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [theme]);

  const reset = () => {
    setHasSearched(false);
    setSongs([]);
    setTheme('');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
      <main className="max-w-xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        {!hasSearched ? (
          <div className="flex flex-col items-center text-center space-y-8 py-12 animate-in fade-in duration-1000">
            <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl shadow-indigo-100/50 group">
              <img 
                src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1000" 
                alt="Music vibes" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-8 text-left">
                <h1 className="text-white text-3xl font-bold tracking-tighter">Commute Vibes</h1>
                <p className="text-white/80 text-sm font-medium">Daily 7 Soundtracks</p>
              </div>
            </div>
            
            <div className="w-full space-y-6">
              <h2 className="text-2xl font-light tracking-tight text-slate-400">
                오늘의 <span className="text-slate-900 font-bold">출퇴근 테마</span>는 무엇인가요?
              </h2>
              
              <form 
                onSubmit={(e) => { e.preventDefault(); fetchSongs(); }}
                className="relative group"
              >
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="예: 비 오는 창밖, 활기찬 아침..."
                  className="w-full pl-6 pr-24 py-5 bg-slate-50 border-none rounded-2xl text-lg focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !theme.trim()}
                  className="absolute right-3 top-3 bottom-3 px-6 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:bg-slate-200 transition-all active:scale-95 flex items-center"
                >
                  {isLoading ? '...' : '추천'}
                </button>
              </form>

              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {['시티팝', '드라이브', '퇴근길 위로', 'Lo-fi'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setTheme(tag)}
                    className="text-xs px-4 py-2 bg-white border border-slate-100 rounded-full text-slate-400 hover:text-indigo-500 hover:border-indigo-100 transition-all"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
              <div>
                <button onClick={reset} className="text-xs font-bold text-slate-300 hover:text-slate-900 transition-colors uppercase tracking-widest mb-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
                  Back
                </button>
                <h2 className="text-2xl font-bold tracking-tight">Today's <span className="text-indigo-600">7</span> Picks</h2>
              </div>
              <button 
                onClick={fetchSongs}
                disabled={isLoading}
                className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all"
                title="Refresh"
              >
                <svg className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {songs.map((song, index) => (
                <MusicCard key={`${song.title}-${index}`} song={song} index={index} />
              ))}
            </div>
            
            <p className="text-center text-[10px] text-slate-300 mt-12 font-bold uppercase tracking-[0.3em]">
              Powered by Gemini Flash
            </p>
          </div>
        )}

        {error && (
          <div className="text-center text-xs text-red-400 mt-4 font-medium">{error}</div>
        )}
      </main>
    </div>
  );
};

export default App;
