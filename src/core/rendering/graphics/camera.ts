import { Vector3, Matrix4x4, Rotator } from "math";

export abstract class Camera {

    private _position: Vector3;
    private _rotator: Rotator;
    private _focalPosition: Vector3;

    private _worldMatrix: Matrix4x4;
    private _viewMatrix: Matrix4x4;
    private _projectionMatrix!: Matrix4x4;

    protected _near: number;
    protected _far: number;

    public constructor( position: Vector3 = new Vector3(), near: number = 0.01, far: number = 1000)
    {
        this._position = position;
        this._rotator = new Rotator();
        this._focalPosition = new Vector3();
        this._worldMatrix = new Matrix4x4();
        this._viewMatrix = new Matrix4x4();
        this._near = near;
        this._far = far;
    }

    public get position(): Vector3 { return this._position; }
    public set position(newPos: Vector3) { this._position = newPos; }

    public get rotator(): Rotator { return this._rotator; }
    public set rotator(newRot: Rotator) { this._rotator = newRot; }

    public get worldMatrix(): Matrix4x4 { return this._worldMatrix; }
    public set worldMatrix(newMatrix: Matrix4x4) { this._worldMatrix = newMatrix; }

    public get viewMatrix(): Matrix4x4
    {
        Matrix4x4.lookAt(this._viewMatrix, this._position, this._focalPosition, new Vector3(0, 1, 0));
        Matrix4x4.rotate(this._viewMatrix, this._viewMatrix, this._rotator.getRadiansPitch(), new Vector3(1, 0, 0));
        Matrix4x4.rotate(this._viewMatrix, this._viewMatrix, this._rotator.getRadiansYaw(), new Vector3(0, 1, 0));
        Matrix4x4.rotate(this._viewMatrix, this._viewMatrix, this._rotator.getRadiansRoll(), new Vector3(0, 0, 1));
        return this._viewMatrix;
     }
    protected set viewMatrix(newMatrix: Matrix4x4) { this._viewMatrix = newMatrix; }

    public get projectionMatrix(): Matrix4x4 { return this._projectionMatrix; }
    protected set projectionMatrix(newMatrix: Matrix4x4) { this._projectionMatrix = newMatrix; }

    public move(delta: Vector3): void
    {
        this._position.add(delta);
    }
    
    public set focalPoint(focus: Vector3) { this._focalPosition = focus; }
    
    public refreshProjection(): void { }

    /**
     * Runs every frame.
     */
    public update(): void { }

    /**
     * Initializes Camera shader and uniforms.
     */
    public initialize(): void
    {
        this.refreshProjection(); 
    }
}

interface PerspectiveCameraOptions {
    position?: Vector3;
    fovy?: number;
    near?: number;
    far?: number;
}

export class PerspectiveCamera extends Camera {
    private _fovy: number;

    public constructor( options: PerspectiveCameraOptions) {
        super(options.position, options.near, options.far);
        this._fovy = options.fovy || 1.1;
    }

    public override refreshProjection(): void {
        this.projectionMatrix = Matrix4x4.perspective(new Matrix4x4(), this._fovy, window.innerWidth/window.innerHeight, this._near, this._far);
    }
}

interface OrthographicCameraOptions {
    position?: Vector3;
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
        super(options.position, options.near, options.far);
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