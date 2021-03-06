import { Vector3, Matrix4x4, Rotator } from "math";
import { Entity } from "./entity";

export abstract class Camera extends Entity
{
    private _viewMatrix: Matrix4x4;
    private _projectionMatrix!: Matrix4x4;

    protected _near: number;
    protected _far: number;

    public constructor( position: Vector3 = new Vector3(), rotation: Rotator = new Rotator(), near: number = 0.01, far: number = 1000)
    {
        super('camera', {position: position, rotation: rotation});
        this._viewMatrix = new Matrix4x4();
        this._near = near;
        this._far = far;
    }

    public get viewMatrix(): Matrix4x4
    {
        Matrix4x4.multiply(this._viewMatrix, this.worldMatrix, this._viewMatrix);
        Matrix4x4.lookAt(this._viewMatrix, this.position, this.getWorldForward(), new Vector3(0, 1, 0));
        return this._viewMatrix;
     }

    public get projectionMatrix(): Matrix4x4 { return this._projectionMatrix; }
    protected set projectionMatrix(newMatrix: Matrix4x4) { this._projectionMatrix = newMatrix; }
    
    /**
     * Gets the View Projection Matrix given the current camera settings.
     * @param worldMatrix The world matrix of an object.
     * @returns 
     */
    public getViewProjection(worldMatrix: Matrix4x4): Matrix4x4
    {
        let out = new Matrix4x4();
        Matrix4x4.multiply(out, this.viewMatrix, worldMatrix);
        Matrix4x4.multiply(out, this.projectionMatrix, out);
        return out;
    }

    /**
     * Camera follows the given entity.
     * @param entity Entity to follow
     */
    public follow(entity: Entity): void
    {
        //this._focalPosition = entity.position;
    }

    public override update(): void
    {
        super.update();
        if(this.transformStruct.rotation.pitch >= 90)
        {
            this.transformStruct.rotation.pitch = 89.9999;
        }

        else if(this.transformStruct.rotation.pitch <= -90)
        {
            this.transformStruct.rotation.pitch = -89.9999;
        }
    }
    
    public refreshProjection(): void { }

    /**
     * Initializes Camera shader and uniforms.
     */
    public override initialize(): void
    {
        this.refreshProjection(); 
    }
}

interface PerspectiveCameraOptions
{
    position?: Vector3;
    rotation?: Rotator;
    fovy?: number;
    near?: number;
    far?: number;
}

export class PerspectiveCamera extends Camera {
    private _fovy: number;

    public constructor( options: PerspectiveCameraOptions) {
        super(options.position, options.rotation, options.near, options.far);
        this._fovy = options.fovy || 1.1;
    }

    public override refreshProjection(): void {
        this.projectionMatrix = Matrix4x4.perspective(new Matrix4x4(), this._fovy, window.innerWidth/window.innerHeight, this._near, this._far);
    }
}

interface OrthographicCameraOptions {
    position?: Vector3;
    rotation?: Rotator;
    left?: number;
    right?: number;
    bottom?: number;
    top?: number;
    near?: number;
    far?: number;
}

export class OrthographicCamera extends Camera {
    private _left: number;
    private _right: number;
    private _bottom: number;
    private _top: number;

    public constructor( options: OrthographicCameraOptions) {
        super(options.position, options.rotation, options.near, options.far);
        this._left = options.left || -1;
        this._right = options.right || 1;
        this._bottom = options.bottom || -1;
        this._top = options.top || 1;
    }

    public override refreshProjection(): void {
        this.projectionMatrix = Matrix4x4.orthographic
        (new Matrix4x4(), 
        this._left * window.innerWidth/window.innerHeight, 
        this._right * window.innerWidth/window.innerHeight, 
        this._bottom, this._top, this._near, this._far
        );
    }
}