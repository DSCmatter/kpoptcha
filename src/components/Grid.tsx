import React from 'react';
import { Check, CheckCircle, RefreshCw } from 'lucide-react';
import { Task } from '../types';

interface GridProps {
    currentTask: Task | null;
    selectedTiles: Set<number>;
    feedback: 'success' | 'error' | null;
    verifying: boolean;
    onToggle: (index: number) => void;
    onVerify: () => void;
    onRefresh: () => void;
}

const Grid: React.FC<GridProps> = ({ 
    currentTask, selectedTiles, feedback, verifying, onToggle, onVerify, onRefresh 
}) => {
    return (
        <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
            {/* Header Area */}
            <div className={`p-8 transition-colors duration-300 ${feedback === 'error' ? 'bg-red-900/30' : 'bg-blue-900/30'}`}>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Select all images of</h2>
                {currentTask && (
                    <div className="flex items-baseline gap-4">
                        <span className="text-5xl font-black text-white tracking-tight">{currentTask.target.name}</span>
                        <span className="text-lg text-pink-500 font-bold border-2 border-pink-500 px-3 py-1 rounded-md">{currentTask.target.group}</span>
                    </div>
                )}
            </div>

            {/* Image Grid */}
            <div className="p-4 bg-slate-100 relative">
                {feedback === 'success' && (
                    <div className="absolute inset-0 z-20 bg-emerald-500/95 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 text-white">
                        <CheckCircle className="w-24 h-24 mb-4" />
                        <p className="font-bold text-3xl">Verified!</p>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-3">
                    {currentTask?.tiles.map((tile, i) => (
                        <div 
                            key={tile.id} 
                            onClick={() => onToggle(i)} 
                            className={`
                                relative aspect-square cursor-pointer overflow-hidden transition-all duration-100 rounded-md bg-gray-300
                                ${selectedTiles.has(i) ? 'ring-[6px] ring-pink-500 transform scale-95 z-10' : 'hover:opacity-95'}
                            `}
                        >
                            <img 
                                src={tile.src} 
                                alt="idol"
                                className="w-full h-full object-cover" 
                                loading="lazy" 
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '[https://placehold.co/400x400?text=Missing](https://placehold.co/400x400?text=Missing)';
                                }}
                            />
                            {selectedTiles.has(i) && (
                                <div className="absolute top-2 left-2 bg-pink-500 rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                                    <Check className="w-7 h-7 text-white stroke-[3px]" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="p-6 bg-slate-800 flex justify-between items-center border-t border-slate-700">
                <button onClick={onRefresh} className="p-3 text-slate-400 hover:text-white transition-colors hover:bg-slate-700 rounded-full">
                    <RefreshCw className="w-8 h-8" />
                </button>
                
                <button 
                    onClick={onVerify} 
                    disabled={verifying || selectedTiles.size === 0} 
                    className={`
                        px-10 py-4 rounded-lg font-bold uppercase text-lg tracking-wider transition-all 
                        ${selectedTiles.size > 0 
                            ? 'bg-pink-600 text-white shadow-[0_0_20px_rgba(219,39,119,0.5)] hover:bg-pink-500 transform hover:-translate-y-1' 
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
                    `}
                >
                    {verifying ? 'Verifying...' : 'Verify'}
                </button>
            </div>
        </div>
    );
};

export default Grid;
