import { Rotator, Transform, Vector3 } from "math";

export abstract class CollisionShape
{
    private _transform: Transform;

    public constructor(transform: Transform)
    {
        this._transform = transform;
    }

    public get position(): Vector3 { return this._transform.position; }
    public get rotation(): Rotator { return this._transform.rotation; }
    public get scale(): Vector3 { return this._transform.scale; }
    public get transform(): Transform { return this._transform; }

    public set transform(value: Transform) { this._transform = value; }

    public collides(other: CollisionShape): boolean { return false; }

    public update(): void {
    }

}