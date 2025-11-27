import { useEffect, useState, useCallback } from 'react';
import { IDOL_DATABASE } from './data/idols';
import type { Task, Tile, Idol } from './types';
import Header from './components/Header';
import Grid from './components/Grid';

function App() {
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [selectedTiles, setSelectedTiles] = useState<Set<number>>(new Set());
    const [score, setScore] = useState(0);
    const [globalCount, setGlobalCount] = useState(1204); 
    const [verifying, setVerifying] = useState(false);
    const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);

    const generateTask = useCallback(() => {
        const targetIdol = IDOL_DATABASE[Math.floor(Math.random() * IDOL_DATABASE.length)];
        const correctCount = Math.floor(Math.random() * 3) + 3; 
        
        const getRandomImage = (idol: Idol) => idol.images[Math.floor(Math.random() * idol.images.length)];
        
        const newTiles: Tile[] = [];
        
        for (let i = 0; i < 9; i++) {
            const slotsRemaining = 9 - i;
            const currentCorrect = newTiles.filter(t => t.isTarget).length;
            const correctNeeded = correctCount - currentCorrect;
            
            const shouldBeTarget = correctNeeded > 0 && (Math.random() > 0.5 || correctNeeded === slotsRemaining);

            if (shouldBeTarget) {
                newTiles.push({
                    id: `tile_${i}_${Math.random()}`,
                    isTarget: true,
                    src: getRandomImage(targetIdol)
                });
            } else {
                const others = IDOL_DATABASE.filter(x => x.id !== targetIdol.id);
                const distractor = others[Math.floor(Math.random() * others.length)];
                newTiles.push({
                    id: `tile_${i}_${Math.random()}`,
                    isTarget: false,
                    src: getRandomImage(distractor)
                });
            }
        }
        
        const shuffledTiles = newTiles.sort(() => Math.random() - 0.5);
        setCurrentTask({ target: targetIdol, tiles: shuffledTiles });
        setSelectedTiles(new Set());
        setFeedback(null);
    }, []);

    useEffect(() => { 
        if (!currentTask) generateTask(); 
    }, [generateTask, currentTask]);

    const handleToggle = (index: number) => {
        if (verifying || feedback) return;
        const newSet = new Set(selectedTiles);
        if (newSet.has(index)) newSet.delete(index);
        else newSet.add(index);
        setSelectedTiles(newSet);
    };

    const handleVerify = () => {
        if (!currentTask) return;
        setVerifying(true);

        let mistakes = 0;
        let correctSelections = 0;
        const totalTargets = currentTask.tiles.filter(t => t.isTarget).length;

        currentTask.tiles.forEach((tile, index) => {
            const isSelected = selectedTiles.has(index);
            if (tile.isTarget && isSelected) correctSelections++;
            else if (tile.isTarget && !isSelected) mistakes++;
            else if (!tile.isTarget && isSelected) mistakes++;
        });

        const isSuccess = mistakes === 0 && correctSelections === totalTargets;

        if (isSuccess) {
            setFeedback('success');
            setScore(s => s + 10);
            setGlobalCount(prev => prev + 1);
            setTimeout(() => { 
                generateTask(); 
                setVerifying(false); 
            }, 1500);
        } else {
            setFeedback('error');
            setVerifying(false);
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    return (
        // Changed p-8 to p-4 for mobile, keeping md:p-8 for desktop
        <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 md:p-8">
            <Header score={score} globalCount={globalCount} />
            <Grid 
                currentTask={currentTask}
                selectedTiles={selectedTiles}
                feedback={feedback}
                verifying={verifying}
                onToggle={handleToggle}
                onVerify={handleVerify}
                onRefresh={generateTask}
            />
            
            <div className="mt-8 text-sm text-slate-500 text-center max-w-md">
                <p>
                    Built by{' '}
                    <a 
                        href="https://github.com/DSCmatter" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-pink-500 hover:text-pink-400 font-bold transition-colors border-b border-pink-500/30 hover:border-pink-500"
                    >
                        DSCmatter
                    </a>
                </p>
            </div>
        </div>
    );
}

export default App;