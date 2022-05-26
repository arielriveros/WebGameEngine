import { Matrix4x4, Rotator, Vector3 } from "math";

export class Transform
{
    private _position: Vector3;
    private _rotation: Rotator;
    private _scale: Vector3;
    private _matrix: Matrix4x4;

    public constructor(
        position: Vector3 = new Vector3(),
        rotation: Rotator = new Rotator(),
        scale: Vector3 = new Vector3(1, 1, 1))
    {
        this._position = position;
        this._rotation = rotation;
        this._scale = scale;
        this._matrix = new Matrix4x4();
    }

    public get position(): Vector3 { return this._position; }
    public set position(pos: Vector3) { this._position = pos; }

    public get rotation(): Rotator { return this._rotation; }
    public set rotation(rot: Rotator) { this._rotation = rot; }

    public get scale(): Vector3 { return this._scale; }
    public set scale(scale: Vector3) { this._scale = scale; }

    public get matrix(): Matrix4x4 { 
        this.applyTransform(this._matrix);
        return this._matrix;
    }

    private applyTransform(out: Matrix4x4 = new Matrix4x4()): Matrix4x4 {
        Matrix4x4.translate(out, new Matrix4x4(), this._position);
        Matrix4x4.rotateWithRotator(out, out, this._rotation);
        Matrix4x4.scale(out, out, this._scale);
        return out;
    }
}