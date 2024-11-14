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
