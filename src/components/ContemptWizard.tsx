"use client"
import { useState } from 'react'

export default function ContemptWizard({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ violation: '', details: '', signature: '' })

  const next = () => setStep(s => s + 1)

  return (
    <div className='space-y-10 animate-in slide-in-from-right-8 duration-500'>
      <button onClick={onBack} className='text-xs font-black text-slate-500 uppercase'>← Back to Dashboard</button>

      {step === 1 && (
        <div className='space-y-6'>
          <h2 className='text-3xl font-serif italic text-white leading-tight'>What part of the court order was ignored?</h2>
          <div className='grid gap-3'>
            {['Child Support', 'Visitation Schedule', 'Medical Expenses'].map(item => (
              <button 
                key={item} 
                onClick={() => { setFormData({...formData, violation: item}); next(); }}
                className='w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-left text-white font-bold hover:border-indigo-500'
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className='space-y-6'>
          <h2 className='text-3xl font-serif italic text-white'>The Details</h2>
          <textarea 
            className='w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white h-64 outline-none focus:border-indigo-500'
            placeholder='Explain exactly what happened...'
            onChange={e => setFormData({...formData, details: e.target.value})}
          />
          <button onClick={next} className='w-full py-6 bg-indigo-600 text-white font-black rounded-3xl'>REVIEW FILING</button>
        </div>
      )}

      {step === 3 && (
        <div className='space-y-8'>
          <div className='p-8 bg-indigo-900/20 border border-indigo-500/30 rounded-3xl'>
            <p className='text-indigo-400 text-[10px] font-black uppercase mb-4'>Drafting FM-068</p>
            <p className='text-white text-xl italic mb-2'>{`${formData.violation} violation`}</p>
            <p className='text-slate-400 text-sm leading-relaxed'>{formData.details}</p>
          </div>
          <input 
            type='text' 
            placeholder='Type Full Legal Name to Sign'
            className='w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-2xl font-serif italic outline-none focus:border-indigo-500'
          />
          <button className='w-full py-8 bg-white text-black font-black text-xl rounded-[2.5rem] shadow-2xl shadow-indigo-500/40'>
            GENERATE & DOWNLOAD
          </button>
        </div>
      )}
    </div>
  )
}
