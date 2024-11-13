import { Rules } from './Match';
import { Player } from './Player';
import { Point } from './Point';
import { StartState } from './StartState';

export class Set {
    points: Point[];
    startState: StartState;
    rules: Rules;

    constructor(
        startState: StartState,
        points?: Point[],
        rules?: Rules,
    ) {
        this.points = points ?? [];
        this.startState = startState;
        this.rules = rules ?? new Rules();

    }

    increment(
        winner: Player
    ) {
        if (!this.isDone()) {
            let server: Player;
            if (this.points.length === 0) {
                server = this.startState.servingPlayer;
            } else {
                server = this.points.at(-1)!.winner;
            }
            this.points.push(new Point(server, winner, []));

        } else if (this.isDone()) {
            throw new Error("Set is done");
        }
        
    }

    getPlayerScore (
        player: Player
    ): number {
        return this.points.filter(point => point.winner === player).length;
    }

    isDone (): boolean {
        // if either player exceeds rules.maxPoints and pointDiff > 1 || either player exceeds rules.setting
        if (
            (
                this.eitherPlayerReaches(this.rules.maxPoints) && 
                (Math.abs(this.getPlayerScore(this.startState.nearPlayer) - this.getPlayerScore(this.startState.farPlayer)) > 1) ||
                this.eitherPlayerReaches(this.rules.setting)
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    eitherPlayerReaches(
        limit: number
    ): boolean {
        if (this.getPlayerScore(this.startState.nearPlayer) >= limit || this.getPlayerScore(this.startState.farPlayer) >= limit) {
            return true;
        } else {
            return false;
        }
    }

    setPoints(
        player1: Player,
        player2: Player,
        score1: number,
        score2: number, 
    ) {
        this.points = [];

        while (this.points.length < score1 + score2) {
            if (this.getPlayerScore(player1) < score1) {
                this.increment(player1);
            }
            if (this.getPlayerScore(player2) < score2) {
                this.increment(player2);
            }
        }
    }

    getLeader(): Player | null {
        const scoreNear: number = this.getPlayerScore(this.startState.nearPlayer);
        const scoreFar: number = this.getPlayerScore(this.startState.farPlayer);
        if (scoreNear === scoreFar) {
            return null;
        } else if (scoreNear > scoreFar) {
            return this.startState.nearPlayer;
        } else {
            return this.startState.farPlayer;
        }
    }

    getPoints(): number[] {
        return [this.getPlayerScore(this.startState.nearPlayer), this.getPlayerScore(this.startState.farPlayer)]
    }
}