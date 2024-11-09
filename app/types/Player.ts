export class Player {
    private static idCounter = 1;
    id: number;
    name: string;
    handedness: "right" | "left";

    constructor(
        id: number = Player.idCounter++,
        name: string = `Player ${id}`,
        handedness: "right" | "left" = 'right'
    ) {
        this.id = id;
        this.name = name;
        this.handedness = handedness;
    }
}