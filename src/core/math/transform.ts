import { Matrix4x4, Rotator, Vector3 } from "math";

export class Transform
{

    private _position: Vector3;
    private _rotation: Rotator;
    private _scale: Vector3;
    private _matrix: Matrix4x4;

    /**
     * Transform Matrix for position-rotation-scaling object handling.
     * @param position Vector3 position of the object.
     * @param rotation Rotator rotation of the object.
     * @param scale Vector3 scale of the object.
     */
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

    public get matrix(): Matrix4x4 { return this._matrix; }
    public get inverseTransposedMatrix(): Matrix4x4 {
        let out = this._matrix.clone();
        Matrix4x4.invert(out, out);
        Matrix4x4.transpose(out, out);
        return out; 
    }

    /**
     * Applies transform from the values contained in the transform object.
     * @returns Result of the transform operation.
     */
    public applyTransform(): Matrix4x4 {
        Matrix4x4.translate(this._matrix, new Matrix4x4(), this._position);
        Matrix4x4.rotateWithRotator(this._matrix, this._matrix, this._rotation);
        Matrix4x4.scale(this._matrix, this._matrix, this._scale);
        return this._matrix;
    }

    public applyToVector(out: Vector3): Vector3 {
        let pos = this._position.clone();
        out.add(pos)
        Matrix4x4.multiplyVector(out, this.matrix, out);
        return out;
    }

    public getForward(): Vector3
    { 
        let x: number =  Math.cos(this.rotation.getRadiansPitch()) * Math.sin(this.rotation.getRadiansYaw());
        let y: number = -Math.sin(this.rotation.getRadiansPitch());
        let z: number =  Math.cos(this.rotation.getRadiansPitch()) * Math.cos(this.rotation.getRadiansYaw());
        return new Vector3(x, y, z);
    }

    public getWorldForward(): Vector3 {
        let out: Vector3 = this.getForward().clone();
        out.add(this.position);
        return out;
    }

    public getRight(): Vector3
    {
        let x: number = -Math.cos(this.rotation.getRadiansYaw());
        let z: number = Math.sin(this.rotation.getRadiansYaw());
        return new Vector3(x, 0, z);
    }
}