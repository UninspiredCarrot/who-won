import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Player {
    name: string;
}

export interface Shot {
    x: number;
    y: number;
}
  
export interface Match {
    team1: Player[];
    team2: Player[];
    sets: number[][];
    state: "Not Started" | "Playing" | "Finished";
    discipline: 'Singles' | 'Doubles';
    maxPoints: number;
    maxSets: number;
    setting: number;
    server: "team1" | "team2";
}

interface MatchState {
  currentMatch: Match | null;
}

const initialState: MatchState = {
  currentMatch: null,
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    initialiseMatch: (state, action: PayloadAction<{team1: Player[], team2: Player[], discipline: 'Singles' | 'Doubles', maxPoints: number, maxSets: number, setting: number, server: "team1" | "team2"}>) => {
      const { team1, team2, discipline } = action.payload;
      state.currentMatch = {
        team1,
        team2,
        sets: [],
        state: "Not Started",
        discipline,
        maxPoints: action.payload.maxPoints,
        maxSets: action.payload.maxSets,
        setting: action.payload.setting,
        server: action.payload.server
    }},
    startMatch: (state, action: PayloadAction<{match: Match}>) => {
        const match = state.currentMatch;
        match!.sets = [[0,0]];
        match!.state = "Playing";
        state.currentMatch = match;
    },
    incrementMatch: (state, action: PayloadAction<{winner: string, shots: Shot[]}>) => {

        const match = state.currentMatch;
        const currentSet = match!.sets[match!.sets.length - 1];
        const winner = action.payload.winner;
        if (match?.state === "Finished") return;
        // TODO SERVER LOGIC
        if (winner === "team1") {
            currentSet[0] += 1;
            match!.server = "team1";
        } else {
            currentSet[1] += 1;
            match!.server = "team2";
        };

        const pointDifference = Math.abs(currentSet[0] - currentSet[1]);

        if (
            (Math.max(currentSet[0], currentSet[1]) >= match!.maxPoints && pointDifference > 1)
            || Math.max(currentSet[0], currentSet[1]) >= match!.setting
        ) {
            if (match!.sets.length >= match!.maxSets) {
                match!.state = "Finished";
            } else {
                match?.sets.push([0,0]);
            }
        }

        state.currentMatch = match;

    },
}});

export const {
    initialiseMatch,
    startMatch,
    incrementMatch
} = matchSlice.actions;

export default matchSlice.reducer;
