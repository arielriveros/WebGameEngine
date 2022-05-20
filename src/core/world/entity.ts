import { Rotator, Vector3 } from "math";
import { Shape } from "../rendering/graphics/shapes";

export class Entity {
    private _name: string;
    private _position: Vector3;
    private _rotation: Rotator;
    private _shape!: Shape | null;

    public constructor(name: string, position: Vector3 = new Vector3(), rotation: Rotator = new Rotator(), shape: Shape | null = null) {
        this._name = name;
        this._position = position;
        this._rotation = rotation;
        this.shape = shape;
    }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    public get position(): Vector3 { return this._position; }
    public set position(value: Vector3) { this._position = value; }

    public get rotation(): Rotator { return this._rotation; }
    public set rotation(value: Rotator) { this._rotation = value; }

    public get shape(): Shape | null { return this._shape; }
    public set shape(shape: Shape | null) { 
        if(shape) {
            this._shape = shape;
            this._shape.position = this._position;
            this._shape.rotation = this._rotation;
        }
    }
    
    public move(delta: Vector3): void {
        this._position.add(delta);
    }

    public rotate(delta: Rotator): void {
        this._rotation.add(delta);
    }
}