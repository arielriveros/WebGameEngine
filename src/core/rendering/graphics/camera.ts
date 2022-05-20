import { gl } from "../render";
import { Vector3, Matrix4x4 } from "math";
import { Scene } from "../../world/scene";

export abstract class Camera {

    private _scene!: Scene;
    private _camPosition: Vector3;
    private _focalPosition: Vector3;

    private _worldMatrix: Matrix4x4;
    private _viewMatrix: Matrix4x4;
    protected _projectionMatrix!: Matrix4x4;

    protected _near: number;
    protected _far: number;

    public constructor( initialPosition: Vector3 = new Vector3(), near: number = 0.01, far: number = 1000) {
            this._camPosition = initialPosition;
            this._focalPosition = new Vector3();
            this._worldMatrix = new Matrix4x4();
            this._viewMatrix = new Matrix4x4();
            this._near = near;
            this._far = far;
        }

    public move(delta: Vector3): void {
        this._camPosition.add(delta);
    }

    public setProjection(): void { }

    public setFocalPoint(focus: Vector3): void {
        this._focalPosition = focus;
    }

    /**
     * Runs every frame.
     */
    public update(): void {
        for (const s of this._scene.shapes){
            s.shader.use();
            Matrix4x4.lookAt(this._viewMatrix, this._camPosition, this._focalPosition, new Vector3(0, 1, 0));
            let uWorld: WebGLUniformLocation = s.shader.getUniformLocation('u_world');
            let uView: WebGLUniformLocation = s.shader.getUniformLocation('u_view');
            let uProj: WebGLUniformLocation = s.shader.getUniformLocation('u_proj');
            gl.uniformMatrix4fv(uWorld, false, this._worldMatrix.toFloat32Array());
            gl.uniformMatrix4fv(uView, false, this._viewMatrix.toFloat32Array());
            gl.uniformMatrix4fv(uProj, false, this._projectionMatrix.toFloat32Array());
        }
    }

    /**
     * Initializes Camera shader and uniforms.
     */
    public initialize(scene: Scene): void {
        this._scene = scene;      
        this.setProjection(); 
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

    public override setProjection(): void {
        this._projectionMatrix = Matrix4x4.perspective(new Matrix4x4(), this._fovy, window.innerWidth/window.innerHeight, this._near, this._far);
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

    public override setProjection(): void {
        this._projectionMatrix = Matrix4x4.orthographic(new Matrix4x4(), this._left, this._right, this._bottom, this._top, this._near, this._far);
    }
}