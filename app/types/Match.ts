import { Player } from './Player';
import { Set } from './Set';
import { StartState } from './StartState';

export class Rules {
    discipline: "MS" | "WS" | "MD" | "WD" | "XD";
    maxSets: number;
    maxPoints: number;
    setting: number;

    constructor(
        discipline?: "MS" | "WS" | "MD" | "WD" | "XD",
        maxSets?: number,
        maxPoints?: number,
        setting?: number,
    ) {
        this.discipline = discipline ?? "MS";
        this.maxSets = maxSets ?? 3;
        this.maxPoints = maxPoints ?? 21;
        this.setting = setting ?? 30;
    }
}

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
    startState: StartState | null;
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
        this.startState = null;
        this.endState = null;
        this.state = state ?? "Not Started";
        this.rules = rules ?? new Rules();
    }

    start (
        servingPlayer: Player = this.player1,
        nearPlayer: Player = this.player1,
        farPlayer: Player = this.player2,
    ) {
        this.startState = new StartState(servingPlayer, nearPlayer, farPlayer);
        this.state = "Playing";
        this.sets = [new Set(this.startState, [], this.rules)];
    }

    increment (
        winner: Player
    ) {
        if (this.state === "Not Started") {
            throw new Error("Match has not started");
        } else if (this.state === "Finished") {
            throw new Error("Match has ended");
        } else {
            try {
                this.sets.at(-1)!.increment(winner);
                this.checkDone();
            } catch (e) {
                this.createNewSet();
            }
        }
    }

    createNewSet() {
        this.sets.push(new Set(
            new StartState(
                this.sets.at(-1)?.getLeader()!, 
                this.startState?.farPlayer!, 
                this.startState?.nearPlayer!)
        ));
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
                if (this.sets.length % 2 === 0) {
                    this.sets.at(-1)!.setPoints(player1, player2, score1[i], score2[i]);
                } else {
                    this.sets.at(-1)!.setPoints(player1, player2, score1[i], score2[i]);
                }
                this.checkDone()
                
                if (this.sets.at(-1)?.isDone() && this.state === "Playing") {
                    this.createNewSet();
                }
            }
        }
    }

    getScore () {
        return this.sets.map((set) => set.getPoints());
    }

    checkDone() {
        if (this.sets.filter(set => set.isDone()).length === this.sets.length &&
            (this.sets.filter(set => (
                set.getLeader() 
                && 
                (set.getLeader() === this.player1)
            )).length >= Math.round(this.rules.maxSets/2)) ||
            (this.sets.filter(set => (
                set.getLeader() 
                && 
                (set.getLeader() === this.player2)
            )).length >= Math.round(this.rules.maxSets/2))
        ) {
            this.state = "Finished";
        }
    }
}