import { Matrix4x4 } from "../../math/matrix";
import { Shader } from "../shaders/shader";
import { gl } from "../render";
import { Vector3 } from "../../math/vector";
import { Scene } from "../../world/scene";

export class Camera {

    private _scene!: Scene;
    private _camPosition: Vector3;
    private _focalPosition: Vector3;

    private _worldMatrix: Matrix4x4;
    private _viewMatrix: Matrix4x4;
    private _projectionMatrix: Matrix4x4;

    private _uWorld!: WebGLUniformLocation;
    private _uView!: WebGLUniformLocation;
    private _uProj!: WebGLUniformLocation;

    public constructor(initialPosition: Vector3 = new Vector3(0.0, 0.0, 0.0), orthographic: boolean = false) {
        this._camPosition = initialPosition;
        this._focalPosition = new Vector3(0, 0, 0);

        this._worldMatrix = new Matrix4x4();
        this._viewMatrix = new Matrix4x4();

        if(orthographic) {
            this._projectionMatrix = Matrix4x4.orthographic(new Matrix4x4(), -1, 1, -1, 1, 0.01, 1000.0);
        }
        else {
            this._projectionMatrix = Matrix4x4.perspective(new Matrix4x4(), 1.1, window.innerWidth/window.innerHeight, 0.01, 1000.0);
        }
    }

    public move(delta: Vector3): void {
        this._camPosition.add(delta);
    }

    private updateLookAt(focalPoint: Vector3): void {
        Matrix4x4.lookAt(this._viewMatrix, this._camPosition, focalPoint, new Vector3(0, 1, 0));
        gl.uniformMatrix4fv(this._uView, false, this._viewMatrix.toFloat32Array());
    }

    /**
     * Runs every frame.
     */
    public update(): void {
        for (const s of this._scene.shapes){
            s.shader.use();
            this.updateLookAt(this._focalPosition);
        }
    }

    /**
     * Initializes Camera shader and uniforms.
     */
    public initialize(scene: Scene): void {
        this._scene = scene;
        for (const s of this._scene.shapes){
            s.shader.use();
            this._uWorld = s.shader.getUniformLocation('u_world');
            this._uView = s.shader.getUniformLocation('u_view');
            this._uProj = s.shader.getUniformLocation('u_proj');
            gl.uniformMatrix4fv(this._uWorld, false, this._worldMatrix.toFloat32Array());
            gl.uniformMatrix4fv(this._uView, false, this._viewMatrix.toFloat32Array());
            gl.uniformMatrix4fv(this._uProj, false, this._projectionMatrix.toFloat32Array());
        }
        
    }
}