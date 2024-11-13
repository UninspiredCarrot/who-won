import { Player } from "../types/Player";
import { Point } from "../types/Point";
import { Set } from "../types/Set";
import { StartState } from "../types/StartState";

describe('Set Class', () => {
    it("should start a new set", () => {
        const player1 = new Player();
        const player2 = new Player();
        const set = new Set(new StartState(player1, player2, player1));
        expect(set.points).toEqual([]);
    });
    it("should increment a point", () => {
        const player1 = new Player();
        const player2 = new Player();
        const set = new Set(new StartState(player1, player2, player1));
        set.increment(player2);
        expect(set.points).toEqual([new Point(player1, player2, [])]);
        // 0 - 1
        set.increment(player1);
        expect(set.points).toEqual([new Point(player1, player2, []), new Point(player2, player1, [])]);
        set.setPoints(player1, player2, 14, 8);
        expect(set.getPlayerScore(player1)).toBe(14);
        expect(set.getPlayerScore(player2)).toBe(8);
        set.setPoints(player1, player2, 21, 19);
        expect(() => set.increment(player1)).toThrow("Set is done");
        expect(() => set.increment(player2)).toThrow("Set is done");
        set.setPoints(player1, player2, 20, 20);
        set.increment(player2);
        set.increment(player2);
        expect(() => set.increment(player2)).toThrow("Set is done");
        set.setPoints(player1, player2, 29, 29);
        set.increment(player2);
        expect(() => set.increment(player2)).toThrow("Set is done");
    })
});