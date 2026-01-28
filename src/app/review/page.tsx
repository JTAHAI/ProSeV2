    "use client";

    import { useEffect, useState } from "react";
    import type { CaseBasics } from "@/lib/types";

    type PreviewDoc = { name: string; content: string };
    type PreviewResponse = {
      motionType: string;
      documents: PreviewDoc[];
      notes?: string[];
    };

    export default function ReviewPage() {
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [preview, setPreview] = useState<PreviewResponse | null>(null);

      useEffect(() => {
        async function run() {
          try {
            const raw = localStorage.getItem("caseBasics");
            if (!raw) {
              setError("No case information found. Please complete the wizard first.");
              setLoading(false);
              return;
            }

            const caseBasics = JSON.parse(raw) as CaseBasics;

            const res = await fetch("/api/packet/preview", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                motion: "incorporate_agreement",
                caseBasics,
              }),
            });

            if (!res.ok) {
              const msg = await res.text();
              throw new Error(msg);
            }

            const data = (await res.json()) as PreviewResponse;
            setPreview(data);
          } catch (e: any) {
            setError(e?.message ?? "Failed to generate preview");
          } finally {
            setLoading(false);
          }
        }

        run();
      }, []);

      return (
        <main className="max-w-4xl mx-auto p-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 shadow-lg">
            <div className="mb-6 border-b border-white/10 pb-4">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-100">
                Review Draft
              </h1>
              <p className="mt-2 text-slate-300 leading-relaxed">
                Review the draft text below. This is a preview (not legal advice).
              </p>
            </div>

            {loading && <p className="text-slate-300">Generating preview…</p>}

            {error && (
              <div className="border border-red-400/60 bg-red-500/10 p-4 rounded">
                <p className="text-red-200">{error}</p>
                <a className="underline text-slate-200" href="/wizard">Go back to Wizard</a>
              </div>
            )}

            {preview?.notes?.length ? (
              <ul className="list-disc pl-6 text-slate-300 mb-6">
                {preview.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            ) : null}

            {preview?.documents?.map((doc) => (
              <section key={doc.name} className="border border-white/10 bg-white/5 rounded p-4 mb-5">
                <h2 className="font-semibold text-slate-100 mb-3">{doc.name}</h2>
                <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-200">
                  {doc.content}
                </pre>
              </section>
            ))}

            <div className="pt-2">
              <a
                href="/download"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded"
              >
                Continue to Download
              </a>
            </div>

            <footer className="mt-10 text-xs text-slate-400 border-t border-white/10 pt-4">
  This application provides general information and document drafting assistance. It is not a lawyer and does not provide legal advice.
</footer>

          </div>
        </main>
      );
    }
