import { Matrix4x4, Rotator, Vector3 } from "math";

/**
 * Parameters for a transformation
 * @param position Vector3 position of the object.
 * @param rotation Rotator rotation of the object.
 * @param scale Vector3 scale of the object.
 * @param initMatrix Matrix4x4 initial matrix of the object.
 */
export interface TransformParameters
{
    position?: Vector3;
    rotation?: Rotator;
    scale?: Vector3;
    initMatrix?: Matrix4x4;
}

export class Transform
{
    private _position: Vector3;
    private _rotation: Rotator;
    private _scale: Vector3;
    private _matrix: Matrix4x4;
    private _initMatrix: Matrix4x4 | undefined;

    /**
     * Transform Matrix for position-rotation-scaling object handling.
     */
    public constructor( parameters: TransformParameters = {} )
    {
        this._position = parameters.position || new Vector3();
        this._rotation = parameters.rotation || new Rotator();
        this._scale = parameters.scale || new Vector3(1, 1, 1);
        this._matrix = new Matrix4x4();
        this._initMatrix = parameters.initMatrix;
    }

    public get position(): Vector3 { return this._position; }
    public set position(pos: Vector3) { this._position = pos; }

    public get rotation(): Rotator { return this._rotation; }
    public set rotation(rot: Rotator) { this._rotation = rot; }

    public get scale(): Vector3 { return this._scale; }
    public set scale(scale: Vector3) { this._scale = scale; }

    public get matrix(): Matrix4x4 { return this._matrix; }

    public get initMatrix(): Matrix4x4 | undefined { return this._initMatrix; }
    public get inverseTransposedMatrix(): Matrix4x4 {
        let out = this.matrix.clone();
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
        if(this._initMatrix)
            return Matrix4x4.multiply(this._matrix, this._matrix, this._initMatrix);

        return this._matrix; 
        
    }

    public applyToVector(out: Vector3): Vector3 {
        let pos = this._position.clone();
        out.add(pos)
        Matrix4x4.multiplyVector(out, this.matrix, out);
        return out;
    }

    public apply(out: Transform, input: Transform): Transform
    {
       Matrix4x4.multiply( out.matrix, out.matrix, input.matrix );
       return out;
    }

    public get forward(): Vector3
    { 
        let x: number =  Math.cos(this.rotation.getRadiansPitch()) * Math.sin(this.rotation.getRadiansYaw());
        let y: number = -Math.sin(this.rotation.getRadiansPitch());
        let z: number =  Math.cos(this.rotation.getRadiansPitch()) * Math.cos(this.rotation.getRadiansYaw());
        return new Vector3(x, y, z);
    }

    public get worldForward(): Vector3 {
        let out: Vector3 = this.forward.clone();
        out.add(this.position);
        return out;
    }

    public get right(): Vector3
    {
        let x: number = -Math.cos(this.rotation.getRadiansYaw());
        let z: number = Math.sin(this.rotation.getRadiansYaw());
        return new Vector3(x, 0, z);
    }

    public get up(): Vector3
    {
        let x: number = Math.sin(this.rotation.getRadiansYaw()) * Math.cos(this.rotation.getRadiansPitch());
        let y: number = Math.cos(this.rotation.getRadiansPitch());
        let z: number = Math.sin(this.rotation.getRadiansYaw()) * Math.sin(this.rotation.getRadiansPitch());
        return new Vector3(x, y, z);
    }
}