import React from 'react';
import { Trophy, Database } from 'lucide-react';

interface HeaderProps {
    score: number;
    globalCount: number;
}

const Header: React.FC<HeaderProps> = ({ score, globalCount }) => {
    return (
        <header className="w-full max-w-2xl flex justify-between items-center mb-8 p-6 bg-slate-800/50 rounded-xl backdrop-blur border border-slate-700">
            <h1 className="text-3xl font-bold tracking-wider text-white flex items-center gap-3">
                Kpoptcha 
                <span className="text-sm font-bold text-pink-500 border-2 border-pink-500 px-2 py-0.5 rounded tracking-normal">
                    STAN
                </span>
            </h1>
            <div className="flex gap-6 text-lg font-mono text-pink-400">
                <span className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" /> {score}
                </span>
                <span className="flex items-center gap-2">
                    <Database className="w-5 h-5" /> {1204 + globalCount}
                </span>
            </div>
        </header>
    );
};

export default Header;