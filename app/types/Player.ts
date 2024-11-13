export class Player {
    private static idCounter = 1;
    id: number;
    name: string;

    constructor(
        id?: number,
        name?: string,
    ) {
        this.id = id ?? Player.idCounter++;
        this.name = name ?? `Player ${this.id}`;
    }
}