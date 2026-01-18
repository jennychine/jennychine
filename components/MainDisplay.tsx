import React from 'react';
import { DAYS_ZH, BroadcastTemplate } from '../types';

interface MainDisplayProps {
  now: Date;
  status: { name: string, label: string, isClass: boolean };
  broadcast: BroadcastTemplate | null;
  calendarEvents?: string;
  isRefreshing?: boolean;
  onRefreshCalendar?: () => void;
  onCloseBroadcast: () => void;
}

const MainDisplay: React.FC<MainDisplayProps> = ({ now, status, broadcast, calendarEvents, isRefreshing, onRefreshCalendar, onCloseBroadcast }) => {
  const minguoYear = now.getFullYear() - 1911;
  const dateStr = `民國${minguoYear}年${(now.getMonth() + 1).toString().padStart(2, '0')}月${now.getDate().toString().padStart(2, '0')}日 ${DAYS_ZH[now.getDay()]}`;
  const timeStr = now.toLocaleTimeString('zh-TW', { hour12: false });

  if (broadcast) {
    return (
      <div className="flex flex-col items-center animate-in zoom-in duration-500 mt-52">
        <h2 className="text-pink-400 text-3xl font-black uppercase tracking-[0.3em] mb-12 drop-shadow-lg">
          <i className="fas fa-bullhorn mr-4"></i>
          系統廣播中
        </h2>
        <div className="text-[14rem] font-black leading-none text-pastel-cycle text-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
          {broadcast.title}
        </div>
        <div className="text-6xl text-slate-400 font-medium mt-8 tracking-widest">
          {broadcast.subtitle}
        </div>
        <button 
          onClick={onCloseBroadcast}
          className="mt-24 px-16 py-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-2xl font-bold transition-all btn-3d"
        >
          關閉廣播返回
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center animate-in fade-in duration-1000 mt-44">
      <div className="mb-6">
        <div className="text-[10rem] font-black leading-tight text-pastel-cycle drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
          {status.label}
        </div>
      </div>

      <div className="text-[18rem] font-mono font-bold tracking-tighter leading-none text-pastel-cycle mb-8 drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]">
        {timeStr}
      </div>

      {/* 手動刷新按鈕與行事曆顯示區 */}
      <button 
        onClick={onRefreshCalendar}
        disabled={isRefreshing}
        className={`group relative max-w-4xl w-full mb-12 px-10 py-6 bg-black/20 backdrop-blur-md border border-white/5 rounded-[2.5rem] shadow-