"use client"
import { useState } from 'react'

export default function CustodyCalendar({ onBack }: { onBack: () => void }) {
  const [overnights, setOvernights] = useState<number[]>([]);
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const toggleDay = (day: number) => {
    setOvernights(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const percentage = ((overnights.length / 365) * 100).toFixed(1);
  const isShared = overnights.length >= 165;

  return (
    <div className='h-full flex flex-col animate-in fade-in duration-500'>
      <div className='flex items-center gap-4 mb-6'>
        <button onClick={onBack} className='text-slate-400 hover:text-white transition-colors'>← Back</button>
        <h2 className='text-xl font-serif text-white italic'>Custody Tracker</h2>
      </div>

      <div className='grid grid-cols-2 gap-4 mb-8'>
        <div className='p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl'>
          <p className='text-[10px] font-bold text-indigo-400 uppercase tracking-widest'>Your Overnights</p>
          <p className='text-3xl font-black text-white'>{overnights.length}</p>
        </div>
        <div className='p-4 bg-slate-800 border border-white/5 rounded-2xl'>
          <p className='text-[10px] font-bold text-slate-500 uppercase tracking-widest'>Care Split</p>
          <p className='text-3xl font-black text-white'>{percentage}%</p>
        </div>
      </div>

      {isShared && (
        <div className='mb-6 p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-400 text-xs font-bold text-center'>
          ✨ Substantially Equal Care Triggered (165+ Days)
        </div>
      )}

      <div className='bg-slate-800 p-4 rounded-3xl border border-slate-700'>
        <h3 className='text-white font-bold mb-4 text-center'>January 2026</h3>
        <div className='grid grid-cols-7 gap-2'>
          {['S','M','T','W','T','F','S'].map(d => (
            <div key={d} className='text-center text-[10px] font-black text-slate-600 mb-2'>{d}</div>
          ))}
          {daysInMonth.map(day => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`aspect-square rounded-xl text-xs font-bold transition-all ${
                overnights.includes(day)
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-105'
                : 'bg-slate-900 text-slate-500 hover:bg-slate-700'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <p className='mt-8 text-slate-500 text-[11px] italic leading-relaxed'>
        Tip: Maine courts define an "overnight" as where the child spends the majority of the night. Keep this log accurate for the FM-040-A Supplemental Worksheet.
      </p>

      <button className='mt-auto btn-primary bg-indigo-600 hover:bg-indigo-500 w-full py-4'>
        Sync to Case File
      </button>
    </div>
  );
}
