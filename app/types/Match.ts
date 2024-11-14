import { Player } from './Player';
import { Set } from './Set';
import { Shot } from './Shot';
import { Rules } from './Rules';
import { Score } from './Score';


export class EndState {
    winner: Player;
    loser: Player;

    constructor(
        winner: Player,
        loser: Player,
    ) {
        this.winner = winner;
        this.loser = loser;
    }
}

export class Match {
    player1: Player;
    player2: Player;
    sets: Set[];
    endState: EndState | null;
    state: "Not Started" | "Playing" | "Finished";
    rules: Rules;

    constructor(
        player1?: Player,
        player2?: Player,
        sets?: Set[],
        state?: "Not Started" | "Playing" | "Finished",
        rules?: Rules,
    ) {
        this.player1 = player1 ??  new Player();
        this.player2 = player2 ??  new Player();
        this.sets = sets ?? [];
        this.endState = null;
        this.state = state ?? "Not Started";
        this.rules = rules ?? new Rules();
    }

    start () {
        this.state = "Playing";
        this.sets = [new Set(this.player1, this.player2, this.rules)];
    }

    increment(winner: Player, path: Shot[] = []) {
        if (this.state === "Not Started") throw new Error("Match has not started");
        if (this.state === "Finished") throw new Error("Match has ended");
    
        const currentSet = this.sets.at(-1)!;
        currentSet.increment(winner, path);
        this.checkDone();
        if (currentSet.isDone() && (this.state === "Playing")) this.sets.push(new Set(this.player1, this.player2, this.rules));
        
    }


    setScore (
        player1: Player,
        player2: Player,
        score1: number[],
        score2: number[]
    ) {
        if (this.state === "Not Started") {
            throw new Error("Match has not started");
        } else {
            this.start();
            for (let i = 0; i < score1.length; i++) {
                this.sets.at(-1)!.setPoints(player1, player2, score1[i], score2[i]);
                this.checkDone()
                
                if (this.sets.at(-1)?.isDone() && this.state === "Playing") {
                    this.sets.push(new Set(this.player1, this.player2, this.rules));
                }
            }
        }
    }

    getScore () {
        const score = new Score(this.player1, this.player2, this.sets);

        return score;
    }

    checkDone() {
        const player1Wins = this.sets.filter(set => set.isDone() && (set.getLeader() === this.player1)).length;
        const player2Wins = this.sets.filter(set => set.isDone() && (set.getLeader() === this.player2)).length;
        const requiredWins = Math.ceil(this.rules.maxSets / 2);
    
        if (player1Wins >= requiredWins || player2Wins >= requiredWins) {
            this.state = "Finished";
            this.endState = new EndState(
                player1Wins > player2Wins ? this.player1 : this.player2,
                player1Wins > player2Wins ? this.player2 : this.player1
            );
        }
    }
}