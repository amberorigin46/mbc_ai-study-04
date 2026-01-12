
import React from 'react';
import { Song } from '../types';

interface MusicCardProps {
  song: Song;
  index: number;
}

const MusicCard: React.FC<MusicCardProps> = ({ song, index }) => {
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${song.artist} ${song.title}`)}`;

  return (
    <div className="group flex items-center gap-4 bg-white hover:bg-gray-50 p-4 rounded-xl transition-all duration-300">
      <div className="text-[10px] font-bold text-gray-200 group-hover:text-blue-200 transition-colors w-4">
        0{index + 1}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-sm font-semibold text-gray-800 truncate leading-tight tracking-tight">
            {song.title}
          </h3>
          <span className={`text-[8px] px-1.5 py-0.5 rounded-sm border ${song.isKorean ? 'border-gray-100 text-gray-400' : 'border-blue-50 text-blue-300'} font-bold uppercase`}>
            {song.isKorean ? 'KR' : 'INT'}
          </span>
        </div>
        <p className="text-xs text-gray-400 truncate font-light">{song.artist}</p>
      </div>

      <a 
        href={youtubeSearchUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-red-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </a>
    </div>
  );
};

export default MusicCard;
