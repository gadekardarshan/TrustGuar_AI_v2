'use client';
import { useState } from 'react';
import { MessageSquarePlus, Check, X } from 'lucide-react';

interface FeedbackProps {
    jobUrl?: string;
    jobText?: string;
    analysisResult: any;
}

export default function FeedbackComponent({ jobUrl, jobText, analysisResult }: FeedbackProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [feedbackType, setFeedbackType] = useState<'false_positive' | 'false_negative' | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!feedbackType) return;
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8081/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    original_text: jobText || jobUrl || "No text provided",
                    user_correction: feedbackType === 'false_positive' ? "safe" : "scam",
                    comments: "User reported inaccuracy via UI"
                })
            });

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => { setIsOpen(false); setSubmitted(false); }, 3000);
            }
        } catch (e) {
            console.error("Feedback failed", e);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="text-xs text-white/30 hover:text-emerald-500 transition-colors flex items-center gap-2 mt-8"
            >
                <MessageSquarePlus className="w-4 h-4" />
                Report Inaccuracy
            </button>
        );
    }

    if (submitted) {
        return (
            <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3 text-emerald-400 text-sm">
                <Check className="w-5 h-5" />
                Thank you! System memory updated.
            </div>
        );
    }

    return (
        <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white/20 hover:text-white">
                <X className="w-4 h-4" />
            </button>

            <h4 className="text-sm font-medium text-white/80 mb-4">Help Improve TrustGuard</h4>
            <p className="text-xs text-white/40 mb-4">Was this analysis incorrect? Your feedback trains our local memory.</p>

            <div className="flex gap-3">
                <button
                    onClick={() => setFeedbackType('false_positive')}
                    className={`flex-1 py-3 px-4 rounded-lg text-xs font-medium border transition-all ${feedbackType === 'false_positive'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                            : 'bg-white/5 border-white/5 hover:bg-white/10 text-white/60'
                        }`}
                >
                    Actually Safe
                </button>
                <button
                    onClick={() => setFeedbackType('false_negative')}
                    className={`flex-1 py-3 px-4 rounded-lg text-xs font-medium border transition-all ${feedbackType === 'false_negative'
                            ? 'bg-red-500/20 border-red-500 text-red-400'
                            : 'bg-white/5 border-white/5 hover:bg-white/10 text-white/60'
                        }`}
                >
                    Actually Scam
                </button>
            </div>

            <button
                onClick={handleSubmit}
                disabled={!feedbackType || loading}
                className="w-full mt-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-widest rounded transition-colors"
            >
                {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
        </div>
    );
}
