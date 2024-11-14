import { Player } from "./Player"
import { Set } from "./Set";

export class Score {
    player1: Player;
    player2: Player;
    sets: Set[];

    constructor(
        player1: Player,
        player2: Player,
        sets: Set[],
    ) {
        this.player1 = player1;
        this.player2 = player2;
        this.sets = sets;
    }

    getPlayerScores(
        player: Player
    ) {
        return this.sets.map((set) => set.getPlayerScore(player));
    }

    getServer() {
        const points =  this.sets.map((set) => set.points).flat();
        return points.length === 0 ? undefined : points.at(-1)?.winner;
    }
}