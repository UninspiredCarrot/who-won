import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { Player } from '../types/Player';
import { useMatch } from './MatchContext'; // Import Match context

interface SideContextType {
  nearPlayer: Player;
  farPlayer: Player;
  switchMapping: () => void;
}

const SideContext = createContext<SideContextType | null>(null);

interface SideProviderProps {
  children: React.ReactNode;
}

export const SideProvider: React.FC<SideProviderProps> = ({ children }) => {
  const { match } = useMatch(); // Access the match from MatchContext
  const [playersSwitched, setPlayersSwitched] = useState(false); // Track if players have been switched

  // Define the players for near and far sides based on the switch state
  const nearPlayer = useMemo(() => (playersSwitched ? match.player2 : match.player1), [match, playersSwitched]);
  const farPlayer = useMemo(() => (playersSwitched ? match.player1 : match.player2), [match, playersSwitched]);

  // Function to switch the near/far mapping
  const switchMapping = useCallback(() => {
    setPlayersSwitched((prevState) => !prevState); // Toggle the state to switch the players
    console.log('Switching player sides');
  }, []);

  return (
    <SideContext.Provider value={{ nearPlayer, farPlayer, switchMapping }}>
      {children}
    </SideContext.Provider>
  );
};

export const useSideContext = () => {
  const context = useContext(SideContext);
  if (!context) {
    throw new Error('useSideContext must be used within a SideProvider');
  }
  return context;
};
