import { Player } from './Player';
import { Set } from './Set';

export class Match {
    player1: Player;
    player2: Player;
    sets: Set[];

    constructor(
        player1: Player = new Player(),
        player2: Player = new Player(), 
        sets: Set[] = []
    ) {
        this.player1 = player1;
        this.player2 = player2;
        this.sets = sets;
    }
}