import { Shape } from "../rendering/graphics/shape";

export class Scene {
    private _shapes: Shape[];

    public constructor() {
        this._shapes = [];
    }

    public addShape(shape: Shape): void {
        this._shapes.push(shape);
    }

    public load() {
        for (const i of this._shapes) {
            i.load();
        }
    }

    public update(): void {
        for (const i of this._shapes) {
            i.draw();
        }
    }

}