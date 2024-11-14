import React, { createContext, useContext, useMemo } from 'react';
import { Match } from '../types/Match';
import { Player } from '../types/Player';

export const MatchContext = createContext<Match | null>(null);

interface MatchProviderProps {
  children: React.ReactNode;
}

export const MatchProvider: React.FC<MatchProviderProps> = ({ children }) => {
  // Initialize players (ensure your Player class can handle initialization correctly)
  const player1 = useMemo(() => new Player(), []);
  const player2 = useMemo(() => new Player(), []);

  // Initialize the match
  const match = useMemo(() => {
    const newMatch = new Match(player1, player2);
    newMatch.start();  // Assuming `start()` is a method on Match class
    return newMatch;
  }, [player1, player2]);

  return (
    <MatchContext.Provider value={match}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return context;
};
