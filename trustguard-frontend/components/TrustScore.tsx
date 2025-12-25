import React from 'react';
import { EnhancedAnalyzeResponse } from '@/app/utils/api';
import {
    ShieldCheck, ShieldAlert, ShieldX
} from 'lucide-react';
import clsx from 'clsx';
import FeedbackComponent from './Feedback';

interface TrustScoreProps {
    result: EnhancedAnalyzeResponse;
    jobUrl?: string;
    jobText?: string;
}

export default function TrustScore({ result, jobUrl, jobText }: TrustScoreProps) {
    const {
        trust_score,
        label,
        reasons,
        recommended_action,
        company_verified,
        company_trust_score,
        company_name,
        company_info,
        combined_trust_score
    } = result;

    const displayScore = combined_trust_score ?? trust_score;

    // SCAM / RISK (Red/Pink replaced with Muted Earthy Red or Orange)
    let colorClass = 'text-red-400';
    let borderClass = 'border-red-500/30';
    let bgClass = 'bg-red-900/10';
    let Icon = ShieldX;

    // SAFE (Emerald Green)
    if (displayScore >= 60) {
        colorClass = 'text-emerald-400';
        borderClass = 'border-emerald-500/30';
        bgClass = 'bg-emerald-900/10';
        Icon = ShieldCheck;
    }
    // MEDIUM (Amber)
    else if (displayScore >= 30) {
        colorClass = 'text-amber-400';
        borderClass = 'border-amber-500/30';
        bgClass = 'bg-amber-900/10';
        Icon = ShieldAlert;
    }

    return (
        <div className="w-full font-serif">

            <div className="flex flex-col md:flex-row gap-12">

                {/* Score Indicator */}
                <div className="w-full md:w-1/2">
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Calculated Trust Index</div>
                    <div className="flex items-baseline gap-4 mb-6">
                        <h2 className="text-8xl font-medium text-white/90">
                            {displayScore}
                        </h2>
                        <span className="text-xl text-white/40 font-light">/100</span>
                    </div>

                    <div className={clsx("inline-block px-4 py-2 border rounded-full text-sm tracking-wide uppercase mb-8", borderClass, bgClass, colorClass)}>
                        {label}
                    </div>

                    <div className="h-px bg-white/10 w-full mb-8"></div>

                    <p className="text-lg text-white/80 font-sans font-light leading-relaxed">
                        {recommended_action}
                    </p>
                </div>

                {/* Details Column */}
                <div className="w-full md:w-1/2 font-sans font-light">
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-6">Analysis Vectors</div>

                    <div className="space-y-6">
                        {reasons.map((reason, idx) => (
                            <div key={idx} className="flex gap-4 group">
                                <div className={clsx("w-1 h-1 mt-2.5 rounded-full shrink-0 transition-all group-hover:scale-150", colorClass.replace('text-', 'bg-'))}></div>
                                <p className="text-white/70 leading-relaxed text-sm">{reason}</p>
                            </div>
                        ))}
                        {reasons.length === 0 && <p className="text-white/30 italic">No anomalies detected in content pattern.</p>}
                    </div>

                    {company_verified && company_info && (
                        <div className="mt-12 pt-12 border-t border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <div className="text-xs uppercase tracking-widest text-white/40">Verified Entity</div>
                                {company_trust_score !== undefined && (
                                    <div className="text-xs text-white/60">Domain Score: {company_trust_score}</div>
                                )}
                            </div>

                            <h3 className="text-2xl font-serif text-white/90 mb-2">{company_name}</h3>
                            <a href={`https://${company_info.domain}`} target="_blank" className="text-emerald-500 hover:text-emerald-400 text-sm mb-6 block">{company_info.domain}</a>

                            <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
                                <div><span className="block text-xs text-white/30 uppercase mb-1">Industry</span>{company_info.industry || 'Unknown'}</div>
                                <div><span className="block text-xs text-white/30 uppercase mb-1">Location</span>{company_info.location || 'Unknown'}</div>
                            </div>
                        </div>
                    )}

                    {/* Feedback Integration */}
                    <div className="mt-12 pt-8 border-t border-white/5">
                        <FeedbackComponent
                            analysisResult={result}
                            jobUrl={jobUrl}
                            jobText={jobText}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
