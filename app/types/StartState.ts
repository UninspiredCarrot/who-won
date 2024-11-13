import { Player } from "./Player";


export class StartState {
    servingPlayer: Player;
    nearPlayer: Player;
    farPlayer: Player;
    

    constructor(
        servingPlayer: Player,
        nearPlayer: Player,
        farPlayer: Player,
        
    ) {
        this.servingPlayer = servingPlayer;
        this.nearPlayer = nearPlayer;
        this.farPlayer = farPlayer;
    }

    switchServer (otherPlayer: Player = this.servingPlayer === this.nearPlayer ? this.farPlayer : this.nearPlayer) {
        this.servingPlayer = otherPlayer;
    }

    switchSides () {
        const temp: Player = this.nearPlayer;
        this.nearPlayer = this.farPlayer;
        this.farPlayer = temp;
    }

    getOtherPlayer (
        player: Player
    ) {
        if (player === this.nearPlayer) {
            return this.farPlayer;
        } else if (player === this.farPlayer) {
            return this.nearPlayer;
        }
    }
}