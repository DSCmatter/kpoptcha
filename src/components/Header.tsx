import React from 'react';
import { Trophy, Database } from 'lucide-react';

interface HeaderProps {
    score: number;
    globalCount: number;
}

const Header: React.FC<HeaderProps> = ({ score, globalCount }) => {
    return (
        <header className="w-full max-w-2xl flex justify-between items-center mb-6 p-4 md:p-6 bg-slate-800/50 rounded-xl backdrop-blur border border-slate-700">
            {/* Responsive Text: text-xl on mobile, text-3xl on computer */}
            <h1 className="text-xl md:text-3xl font-bold tracking-wider text-white flex items-center gap-2 md:gap-3">
                Kpoptcha 
                <span className="text-[10px] md:text-sm font-bold text-pink-500 border border-pink-500 px-1 md:px-2 py-0.5 rounded tracking-normal">
                    STAN
                </span>
            </h1>
            
            {/* Responsive Stats: Smaller text and icons on mobile */}
            <div className="flex gap-3 md:gap-6 text-sm md:text-lg font-mono text-pink-400">
                <span className="flex items-center gap-1 md:gap-2">
                    <Trophy className="w-4 h-4 md:w-5 md:h-5" /> {score}
                </span>
                <span className="flex items-center gap-1 md:gap-2">
                    <Database className="w-4 h-4 md:w-5 md:h-5" /> {1204 + globalCount}
                </span>
            </div>
        </header>
    );
};

export default Header;