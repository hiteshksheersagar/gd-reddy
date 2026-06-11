import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ChapterScores {
  doctor: number;
  movies: number;
  music: number;
  personality: number;
  discovery: number;
}

interface ChapterContextType {
  unlockedChapters: number[];
  currentChapter: number;
  scores: ChapterScores;
  title: string | null;
  unlockChapter: (chapter: number) => void;
  setCurrentChapter: (chapter: number) => void;
  updateScore: (category: keyof ChapterScores, points: number) => void;
  setTitle: (title: string) => void;
  getTotalScore: () => number;
  completedActivities: Record<string, boolean>;
  completeActivity: (activity: string) => void;
}

const ChapterContext = createContext<ChapterContextType | undefined>(undefined);

export function ChapterProvider({ children }: { children: ReactNode }) {
  const [unlockedChapters, setUnlockedChapters] = useState<number[]>([1]);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [scores, setScores] = useState<ChapterScores>({
    doctor: 0,
    movies: 0,
    music: 0,
    personality: 0,
    discovery: 0,
  });
  const [title, setTitle] = useState<string | null>(null);
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});

  const unlockChapter = useCallback((chapter: number) => {
    if (!unlockedChapters.includes(chapter)) {
      setUnlockedChapters((prev) => [...prev, chapter]);
    }
  }, [unlockedChapters]);

  const completeActivity = useCallback((activity: string) => {
    setCompletedActivities((prev) => ({ ...prev, [activity]: true }));
  }, []);

  const updateScore = useCallback((category: keyof ChapterScores, points: number) => {
    setScores((prev) => ({
      ...prev,
      [category]: Math.min(prev[category] + points, getMaxScore(category)),
    }));
  }, []);

  const getMaxScore = (category: keyof ChapterScores): number => {
    const maxScores: ChapterScores = {
      doctor: 20,
      movies: 25,
      music: 25,
      personality: 15,
      discovery: 15,
    };
    return maxScores[category];
  };

  const getTotalScore = useCallback((): number => {
    return Object.values(scores).reduce((sum, score) => sum + score, 0);
  }, [scores]);

  return (
    <ChapterContext.Provider
      value={{
        unlockedChapters,
        currentChapter,
        scores,
        title,
        unlockChapter,
        setCurrentChapter,
        updateScore,
        setTitle,
        getTotalScore,
        completedActivities,
        completeActivity,
      }}
    >
      {children}
    </ChapterContext.Provider>
  );
}

export function useChapters() {
  const context = useContext(ChapterContext);
  if (context === undefined) {
    throw new Error('useChapters must be used within a ChapterProvider');
  }
  return context;
}
