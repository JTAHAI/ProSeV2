"use client";
import { useState } from 'react'

const MAINE_2026_TABLE = [
  { combined: 30000, oneChild: 5200, twoChildren: 7800, threeChildren: 9600 },
  { combined: 60000, oneChild: 9400, twoChildren: 14200, threeChildren: 17500 },
  { combined: 90000, oneChild: 12100, twoChildren: 18300, threeChildren: 22600 },
  { combined: 150000, oneChild: 16200, twoChildren: 24400, threeChildren: 30100 },
];

export default function SupportWizard({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [data, setData] = useState({
    plaintiffName: '',
    defendantName: '',
    numChildren: 1,
    overnights: 0,
    myIncome: 0,
    otherIncome: 0,
    healthCost: 0,
    childcareCost: 0,
  })

  const calculate = () => {
    const combined = data.myIncome + data.otherIncome;
    const myShare = data.myIncome / (combined || 1);
    const row = MAINE_2026_TABLE.find(r => r.combined >= combined) || MAINE_2026_TABLE[MAINE_2026_TABLE.length - 1];
    
    let basic = data.numChildren === 1 ? row.oneChild : data.numChildren === 2 ? row.twoChildren : row.threeChildren;
    
    // Shared Custody Logic (165+ nights)
    const isShared = data.overnights >= 165;
    const totalAnnual = (isShared ? basic * 1.5 : basic) + (data.healthCost * 52) + (data.childcareCost * 52);
    const weekly = (totalAnnual * myShare) / 52;

    return { 
        weekly: weekly.toFixed(0),
        annual: totalAnnual.toFixed(0),
        share: (myShare * 100).toFixed(0)
    };
  }

  const result = calculate();

  const handleDownload = async () => {
    setIsGenerating(true);
    const response = await fetch('/api/generate-fm040', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, ...result }),
    });
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Maine_FM040_${data.defendantName}.pdf`;
      a.click();
    }
    setIsGenerating(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-xl font-bold text-white">Maine FM-040 Generator</h2>
        <button onClick={onBack} className="text-slate-500 hover:text-white transition-colors">Cancel</button>
      </div>

      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-8">
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Plaintiff" className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-white" value={data.plaintiffName} onChange={e => setData({...data, plaintiffName: e.target.value})}/>
              <input placeholder="Defendant" className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-white" value={data.defendantName} onChange={e => setData({...data, defendantName: e.target.value})}/>
            </div>
            <input type="number" placeholder="Overnights" className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 text-white" value={data.overnights} onChange={e => setData({...data, overnights: Number(e.target.value)})}/>
            <button onClick={() => setStep(2)} className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl">Next: Financials</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Your Income" className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-white" value={data.myIncome} onChange={e => setData({...data, myIncome: Number(e.target.value)})}/>
              <input type="number" placeholder="Other Income" className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-white" value={data.otherIncome} onChange={e => setData({...data, otherIncome: Number(e.target.value)})}/>
            </div>
            <button onClick={() => setStep(3)} className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl">Calculate</button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6">
            <h2 className="text-6xl font-black text-white">${result.weekly}</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Recommended Weekly Payment</p>
            <button 
                onClick={handleDownload} 
                disabled={isGenerating}
                className="w-full py-4 bg-white text-slate-950 font-black rounded-xl hover:bg-slate-200 transition-all disabled:opacity-50"
            >
              {isGenerating ? "Injecting Data..." : "Download Filled FM-040"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
