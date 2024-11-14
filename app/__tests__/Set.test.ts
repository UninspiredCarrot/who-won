import { Set } from '../types/Set';
import { Player } from '../types/Player';
import { Rules } from '../types/Rules';
import { Shot } from '../types/Shot';

describe('Set Class', () => {
    let player1: Player;
    let player2: Player;
    let rules: Rules;
    let set: Set;

    beforeEach(() => {
        player1 = new Player('Player 1');
        player2 = new Player('Player 2');
        rules = new Rules();
        set = new Set(player1, player2, rules);
    });

    test('should initialize with correct default values', () => {
        expect(set.points).toEqual([]);
        expect(set.player1).toBe(player1);
        expect(set.player2).toBe(player2);
        expect(set.rules).toBe(rules);
    });

    test('should increment points for a player and update scores', () => {
        set.increment(player1);
        expect(set.getPlayerScore(player1)).toBe(1);
        expect(set.getPlayerScore(player2)).toBe(0);
    });

    test('should alternate server based on the previous point\'s winner', () => {
        set.increment(player1);
        expect(set.points[0].server).toBe(player1);

        set.increment(player2);
        expect(set.points[1].server).toBe(player1); // Player1 won first, so they serve again
    });

    test('should throw an error if increment is called after the set is complete', () => {
        // Simulate player1 winning the set
        for (let i = 0; i < rules.maxPoints; i++) {
            set.increment(player1);
        }

        expect(set.isDone()).toBe(true);
        expect(() => set.increment(player1)).toThrow('Set is done');
    });

    test('should correctly identify if a set is done based on rules', () => {
        // Player1 wins with maxPoints and point difference > 1
        for (let i = 0; i < rules.maxPoints; i++) {
            set.increment(player1);
        }
        expect(set.isDone()).toBe(true);
    });

    test('should correctly track leader of the set', () => {
        set.increment(player1);
        set.increment(player2);
        expect(set.getLeader()).toBe(null);  // Scores tied

        set.increment(player1);
        expect(set.getLeader()).toBe(player1);
    });

    test('should calculate correct score for each player', () => {
        set.increment(player1);
        set.increment(player2);
        set.increment(player1);
        expect(set.getPlayerScore(player1)).toBe(2);
        expect(set.getPlayerScore(player2)).toBe(1);
    });

    test('should set custom scores for players', () => {
        set.setPoints(player1, player2, 3, 2);
        expect(set.getPlayerScore(player1)).toBe(3);
        expect(set.getPlayerScore(player2)).toBe(2);
        expect(set.points.length).toBe(5);
    });

    test('should end set if a player reaches setting rule limit', () => {
        set.rules.setting = 15;

        for (let i = 0; i < 15; i++) {
            set.increment(player1);
        }

        expect(set.isDone()).toBe(true);
        expect(set.getPlayerScore(player1)).toBe(15);
    });

    test('should correctly check if either player reaches a point limit', () => {
        expect(set.eitherPlayerReaches(rules.maxPoints)).toBe(false);
        for (let i = 0; i < rules.maxPoints; i++) {
            set.increment(player1);
        }
        expect(set.eitherPlayerReaches(rules.maxPoints)).toBe(true);
    });

    test('should return correct points array for both players', () => {
        set.setPoints(player1, player2, 4, 3);
        expect(set.getPoints()).toEqual([4, 3]);
    });
});
