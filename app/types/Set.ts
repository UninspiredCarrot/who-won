import { Point } from './Point';

export class Set {
    points1: Point[];
    points2: Point[];

    constructor(
        points1: Point[] = [],
        points2: Point[] = []
    ) {
        this.points1 = points1;
        this.points2 = points2;
    }
}