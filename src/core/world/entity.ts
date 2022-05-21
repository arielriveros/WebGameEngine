import { Rotator, Vector3 } from "math";

export abstract class Entity {
    private _name: string;
    private _position: Vector3;
    private _rotation: Rotator;

    public constructor(name: string, position: Vector3 = new Vector3(), rotation: Rotator = new Rotator())
    {
        this._name = name;
        this._position = position;
        this._rotation = rotation;
    }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    public get position(): Vector3 { return this._position; }
    public set position(value: Vector3) { this._position = value; }

    public get rotation(): Rotator { return this._rotation; }
    public set rotation(value: Rotator) { this._rotation = value; }

    public move(delta: Vector3): void
    {
        this._position.add(delta);
    }

    public rotate(delta: Rotator): void
    {
        this._rotation.add(delta);
    }

    public delete(): void { }
}