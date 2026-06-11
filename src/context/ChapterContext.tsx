import { createContext, useContext, useState, ReactNode } from 'react';

interface ChapterContextType {
  unlockedChapters: number[];
  currentChapter: number;
  unlockChapter: (chapter: number) => void;
  setCurrentChapter: (chapter: number) => void;
  completedActivities: Record<string, boolean>;
  completeActivity: (activity: string) => void;
}

const ChapterContext = createContext<ChapterContextType | undefined>(undefined);

export function ChapterProvider({ children }: { children: ReactNode }) {
  const [unlockedChapters, setUnlockedChapters] = useState<number[]>([1]);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});

  const unlockChapter = (chapter: number) => {
    if (!unlockedChapters.includes(chapter)) {
      setUnlockedChapters((prev) => [...prev, chapter]);
    }
  };

  const completeActivity = (activity: string) => {
    setCompletedActivities((prev) => ({ ...prev, [activity]: true }));
  };

  return (
    <ChapterContext.Provider
      value={{
        unlockedChapters,
        currentChapter,
        unlockChapter,
        setCurrentChapter,
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
