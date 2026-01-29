"use client"
import { useState, useMemo } from 'react'

const MAINE_STEPS = [
  { id: 1, label: 'Initial Filing', desc: 'Submit FM-004 and FM-040 to the Clerk.' },
  { id: 2, label: 'Service of Process', desc: 'Papers delivered to the other party.' },
  { id: 3, label: 'Financial Disclosure', desc: 'File FM-042 (Financial Statement).' },
];

export default function FilingTracker({ onBack }: { onBack: () => void }) {
  const [completed, setCompleted] = useState<number[]>([])
  const [serviceDate, setServiceDate] = useState<string>('')

  const deadlines = useMemo(() => {
    if (!serviceDate) return null;
    
    const start = new Date(serviceDate);
    
    const adjustForWeekend = (date: Date) => {
      const day = date.getDay();
      if (day === 6) date.setDate(date.getDate() + 2);
      if (day === 0) date.setDate(date.getDate() + 1);
      return date;
    };

    const addDays = (d: number) => {
      let date = new Date(start);
      date.setDate(date.getDate() + d);
      return adjustForWeekend(date).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      });
    };

    return {
      response: addDays(21),
      financial: addDays(30),
    };
  }, [serviceDate]);

  const toggleStep = (id: number) => {
    setCompleted(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className='max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500'>
      <div className='flex justify-between items-center border-b border-white/5 pb-6'>
        <div>
          <h2 className='text-2xl font-bold text-white'>Deadline Tracker</h2>
          <p className='text-slate-500 text-sm'>Maine Rules of Civil Procedure 6(a) compliant.</p>
        </div>
        <button onClick={onBack} className='btn-modern btn-secondary px-4 py-2 text-xs font-bold uppercase'>Back</button>
      </div>

      <div className='bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4'>
        <label className='block text-xs font-black text-slate-400 uppercase tracking-widest'>
          When was the other party served?
        </label>
        <input
          type='date'
          className='w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-red-500 transition-all'
          onChange={(e) => setServiceDate(e.target.value)}
        />
      </div>

      {deadlines && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-white/5 border border-white/10 p-5 rounded-2xl'>
            <p className='text-[10px] text-red-500 font-bold uppercase mb-1 tracking-tighter'>Answer Due Date</p>
            <p className='text-white font-bold'>{deadlines.response}</p>
          </div>
          <div className='bg-white/5 border border-white/10 p-5 rounded-2xl'>
            <p className='text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-tighter'>FM-042 Deadline</p>
            <p className='text-white font-bold'>{deadlines.financial}</p>
          </div>
        </div>
      )}

      <div className='space-y-4'>
        {MAINE_STEPS.map((step) => (
          <div
            key={step.id}
            onClick={() => toggleStep(step.id)}
            className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 ${completed.includes(step.id) ? 'bg-red-500/10 border-red-500/50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
          >
            <div className='flex items-center gap-4'>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${completed.includes(step.id) ? 'bg-red-500 border-red-500' : 'border-slate-700'}`}>
                {completed.includes(step.id) && <span className='text-white text-[10px]'>✓</span>}
              </div>
              <div>
                <h4 className={`font-bold transition-colors ${completed.includes(step.id) ? 'text-red-400' : 'text-white'}`}>
                  {step.label}
                </h4>
                <p className='text-slate-500 text-xs mt-1'>{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
