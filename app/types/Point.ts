import { Player } from './Player';
import { Shot } from './Shot';

export class Point {
    server: Player;
    winner: Player;
    path: Shot[];

    constructor (
        server: Player,
        winner: Player,
        path: Shot[]
    ) {
        this.server = server;
        this.winner = winner;
        this.path = path;
    }
}