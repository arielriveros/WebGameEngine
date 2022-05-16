import { Vector3 } from "../math/vector";
import { Shape } from "../rendering/graphics/shape";

export class Scene {
    private _shapes: Shape[];
    private _controllable!: Shape;

    public constructor() {
        this._shapes = [];
    }

    public get shapes() {
        return this._shapes;
    }

    public get controllable() {
        return this._controllable;
    }
    
    public addControllable(controllable: Shape): void {
        if(!this._controllable) {
            this._controllable = controllable;
            this.addShape(controllable);
        }
    }

    public moveControllable(delta: Vector3): void {
        this._controllable.move(delta);
    }

    public addShape(shape: Shape): void {
        this._shapes.push(shape);
    }

    public initialize(): void {
        for (const i of this._shapes) {
            i.load();
        }
    }

    public update(): void {
        for (const i of this._shapes) {
            i.update();
        }
    }
}