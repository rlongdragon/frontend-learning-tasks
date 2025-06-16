import React, { useState, useEffect, createContext, useContext } from 'react';

interface AchievementData {
  progress: string; // `${page}:${part}`
  points: number;
  unlockedHints: string[]; // `${page}:${part}-${n}`
}

interface AchievementContextType {
  data: AchievementData;
  getCurrentProgress: () => string;
  setCurrentProgress: (progress: string) => void;
  resetProgress: () => void;
  getPoints: () => number;
  addPoints: (points: number) => void;
  removePoints: (points: number) => void;
  isHintUnlocked: (hint: string) => boolean;
  unlockHint: (hint: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

const useAchievementData = (): AchievementContextType => {
  const storedData = localStorage.getItem('achievementData');
  const initialData = storedData ? JSON.parse(storedData) : {
    progress: '0:0',
    points: 0,
    unlockedHints: [],
  };
  const [data, setData] = useState<AchievementData>(initialData);

  const [currentPageState, setCurrentPageState] = useState<number>(data.progress.split(':')[0] ? parseInt(data.progress.split(':')[0]) : 0);

  // 儲存資料到 localStorage
  useEffect(() => {
    localStorage.setItem('achievementData', JSON.stringify(data));
  }, [data]);

  const getCurrentProgress = () => data.progress;
  const setCurrentProgress = (progress: string) => {
    setData({ ...data, progress });
  };
  const resetProgress = () => {
    setData({ ...data, progress: '' });
  };
  const getPoints = () => data.points;
  const addPoints = (points: number) => {
    setData({ ...data, points: data.points + points });
  };
  const removePoints = (points: number) => {
    setData({ ...data, points: data.points - points });
  };
  const isHintUnlocked = (hint: string) => data.unlockedHints.includes(hint);
  const unlockHint = (hint: string) => {
    if (!data.unlockedHints.includes(hint)) {
      setData({ ...data, unlockedHints: [...data.unlockedHints, hint] });
    }
  };

  const setCurrentPage = (page: number) => {
    setCurrentPageState(page);
  };


  return {
    data,
    getCurrentProgress,
    setCurrentProgress,
    resetProgress,
    getPoints,
    addPoints,
    removePoints,
    isHintUnlocked,
    unlockHint,
    currentPage: currentPageState,
    setCurrentPage
  };
};

const useAchievementContext = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error("useAchievementContext must be used within a AchievementProvider");
  }
  return context;
};

interface AchievementProviderProps {
  children: React.ReactNode;
}

const AchievementProvider: React.FC<AchievementProviderProps> = ({ children }) => {
  const achievementData = useAchievementData();
  return (
    <AchievementContext.Provider value={achievementData}>
      {children}
    </AchievementContext.Provider>
  );
};

export { useAchievementData, useAchievementContext, AchievementProvider };
