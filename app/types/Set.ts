import { Rules } from './Rules';
import { Player } from './Player';
import { Point } from './Point';
import { Shot } from './Shot';

export class Set {
    points: Point[];
    player1: Player;
    player2: Player;
    rules: Rules;

    constructor(
        player1: Player,
        player2: Player,
        rules?: Rules,
        points?: Point[],
    ) {
        this.points = points ?? [];
        this.player1 = player1;
        this.player2 = player2;
        this.rules = rules ?? new Rules();

    }

    increment(winner: Player, path: Shot[] = []) {
        if (this.isDone()) {
            throw new Error("Set is done");
        }
    
        const server = this.points.length === 0 ? this.player1 : this.points.at(-1)!.winner;
        this.points.push(new Point(server, winner, path));
    }
    

    getPlayerScore (
        player: Player
    ): number {
        return this.points.filter(point => point.winner === player).length;
    }

    isDone(): boolean {
        const pointDifference = Math.abs(this.getPlayerScore(this.player1) - this.getPlayerScore(this.player2));
        return (
            (this.eitherPlayerReaches(this.rules.maxPoints) && pointDifference > 1) ||
            this.eitherPlayerReaches(this.rules.setting)
        );
    }
    

    eitherPlayerReaches(limit: number): boolean {
        return this.getPlayerScore(this.player1) >= limit || this.getPlayerScore(this.player2) >= limit;
    }
    

    setPoints(player1: Player, player2: Player, score1: number, score2: number) {
        this.points = [];
    
        while (this.points.length < score1 + score2) {
            if (this.getPlayerScore(player1) < score1 && !this.isDone()) {
                this.increment(player1);
            }
            if (this.getPlayerScore(player2) < score2 && !this.isDone()) {
                this.increment(player2);
            }
        }
    }
    

    getLeader(): Player | null {
        const scoreNear: number = this.getPlayerScore(this.player1);
        const scoreFar: number = this.getPlayerScore(this.player2);
        if (scoreNear === scoreFar) {
            return null;
        } else if (scoreNear > scoreFar) {
            return this.player1;
        } else {
            return this.player2;
        }
    }

    getPoints(): number[] {
        return [this.getPlayerScore(this.player1), this.getPlayerScore(this.player2)]
    }
}