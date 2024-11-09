import { Shot } from './Shot';

export class Point {
    serverId: number;
    winnerId: number;
    loserId: number;
    path: Shot[];

    constructor (
        serverId: number,
        winnerId: number,
        loserId: number,
        path: Shot[]
    ) {
        this.serverId = serverId;
        this.winnerId = winnerId;
        this.loserId = loserId;
        this.path = path;
    }
}