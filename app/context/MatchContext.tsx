import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { Match } from '../types/Match';
import { Player } from '../types/Player';
import { Shot } from '../types/Shot';
import { Score } from '../types/Score';

interface MatchContextType {
  match: Match;
  score: Score;
  incrementScore: (player: Player, shots: Shot[]) => void;
}

export const MatchContext = createContext<MatchContextType | null>(null);

interface MatchProviderProps {
  children: React.ReactNode;
}

export const MatchProvider: React.FC<MatchProviderProps> = ({ children }) => {
  const player1 = useMemo(() => new Player(), []);
  const player2 = useMemo(() => new Player(), []);
  const match = useMemo(() => new Match(player1, player2), [player1, player2]);

  // Initialize score state with the current match score
  const [score, setScore] = useState<Score>(match.getScore());

  // Start the match when the provider initializes
  useEffect(() => {
    match.start();
  }, [match]);

  const incrementScore = (player: Player, shots: Shot[]) => {
    match.increment(player, shots);
    setScore(match.getScore());  // Update score in React state
  };

  return (
    <MatchContext.Provider value={{ match, score, incrementScore }}>
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
