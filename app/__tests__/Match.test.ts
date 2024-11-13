import { Match } from "../types/Match";
import { Player } from "../types/Player";
import { Set } from "../types/Set";

describe('Match Class', () => {
    it('should create a Match with player1, player2, sets, servingPlayer, playerSide, state, winner, loser', () => {
        const match = new Match();
        expect(match.player1).toBeInstanceOf(Player);
        expect(match.player2).toBeInstanceOf(Player);
        expect(match.state).toBe("Not Started");
        expect(match.sets).toEqual([]);
        expect(match.startState).toBeNull();
        expect(match.endState).toBeNull();
    });

    it("start a match", () => {
        const match = new Match();
        match.start(match.player1, match.player1, match.player2);
        expect(match.startState?.servingPlayer).toBe(match.player1);
        expect(match.startState?.nearPlayer).toBe(match.player1);
        expect(match.startState?.farPlayer).toBe(match.player2);
        expect(match.state).toBe("Playing");
        match.startState && expect(match.sets).toEqual([new Set(match.startState)]);
    })

    it("should start a match with undefined start state", () => {
        const match = new Match();
        match.start();
        expect(match.startState?.servingPlayer).toBe(match.player1);
        expect(match.startState?.nearPlayer).toBe(match.player1);
        expect(match.startState?.farPlayer).toBe(match.player2);
        expect(match.state).toBe("Playing");
        match.startState && expect(match.sets).toEqual([new Set(match.startState)]);
    })

    it("should switch player sides of starting state", () => {
        const match = new Match();
        match.start();
        match.startState?.switchSides();
        expect(match.startState?.nearPlayer).toBe(match.player2);
        expect(match.startState?.farPlayer).toBe(match.player1);
    })

    it("should switch server of starting state", () => {
        const match = new Match();
        match.start();
        match.startState?.switchServer(match.player2);
        expect(match.startState?.servingPlayer).toBe(match.player2);
    })

    it("should switch server of starting state without defining new server", () => {
        const match = new Match();
        match.start();
        match.startState?.switchServer();
        expect(match.startState?.servingPlayer).toBe(match.player2);
    })

    it("should initialise a match with certain rules", () => {
        const match = new Match();
        expect(match.rules.discipline).toBe("MS");
        expect(match.rules.maxPoints).toBe(21);
        expect(match.rules.maxSets).toBe(3);
        expect(match.rules.setting).toBe(30);
    })

    it("should increment a point in the match", () => {
        const match = new Match();
        expect(() => match.increment(match.player1)).toThrow("Match has not started");
        match.start();
        match.increment(match.player1);
        match.sets.at(0)?.setPoints(match.player1, match.player2, 24, 26);
        match.increment(match.player1);

    })

    it("should set a score", () => {
        const match = new Match();
        expect(() => match.setScore(match.player1, match.player2, [14], [8])).toThrow("Match has not started");
        match.start();
        match.setScore(match.player1, match.player2, [14], [8]);
        expect(match.getScore()).toEqual([[14,8]]);
        match.setScore(match.player1, match.player2, [20], [21]);
        match.increment(match.player2);
        match.increment(match.player2);
        match.setScore(match.player1, match.player2, [20], [21]);
        match.increment(match.player1);
        match.increment(match.player1);
        expect(match.getScore()).toEqual([[22,21]]);
        match.setScore(match.player1, match.player2, [21,29], [18,29]);
        match.increment(match.player1);
        expect(match.getScore()).toEqual([[21, 18],[29, 30]]);
        expect(match.state).toBe("Finished");
        match.setScore(match.player1, match.player2, [21,24], [18,22]);
        expect(match.state).toBe("Finished");
        expect(match.getScore()).toEqual([[21, 18],[22, 24]]);
        match.setScore(match.player1, match.player2, [21,22,20], [18,24,19]);
        match.increment(match.player1);
        expect(match.state).toBe("Finished");
    })
});
