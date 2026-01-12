
import React from 'react';
import { Song } from '../types';

interface MusicCardProps {
  song: Song;
  index: number;
}

const MusicCard: React.FC<MusicCardProps> = ({ song, index }) => {
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${song.artist} ${song.title}`)}`;

  return (
    <div className="group relative flex items-center gap-5 p-4 bg-white rounded-2xl transition-all duration-300 hover:bg-slate-50/50">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-300 font-bold text-xs rounded-xl group-hover:bg-indigo-50 group-hover:text-indigo-400 transition-colors">
        {(index + 1).toString().padStart(2, '0')}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-sm font-bold text-slate-900 truncate tracking-tight">{song.title}</h3>
          <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-black uppercase ${song.isKorean ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-400'}`}>
            {song.isKorean ? 'KR' : 'INT'}
          </span>
        </div>
        <p className="text-xs text-slate-400 font-medium truncate">{song.artist}</p>
      </div>

      <a 
        href={youtubeSearchUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white border border-slate-100 text-slate-400 rounded-full hover:border-red-200 hover:text-red-500 hover:shadow-lg hover:shadow-red-100 transition-all active:scale-90"
        title="Play on YouTube"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      </a>
    </div>
  );
};

export default MusicCard;
