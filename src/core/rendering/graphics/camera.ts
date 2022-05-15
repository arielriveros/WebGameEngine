import { Matrix4x4 } from "../../math/matrix";
import { Shader } from "../shaders/shader";
import { gl } from "../render";
import { Vector3 } from "../../math/vector";

export class Camera {

    private _shader!: Shader;
    private _camPosition: Vector3;
    private _focalPosition: Vector3;

    private _worldMatrix: Matrix4x4;
    private _viewMatrix: Matrix4x4;
    private _projectionMatrix: Matrix4x4;

    private _worldUniformLocation!: WebGLUniformLocation;
    private _viewUniformLocation!: WebGLUniformLocation;
    private _projectionUniformLocation!: WebGLUniformLocation;

    public constructor(initialPosition: Vector3 = new Vector3(0.0, 0.0, 0.0), orthographic: boolean = false) {
        this._camPosition = initialPosition;
        this._focalPosition = new Vector3(0.0, 0.0, 0.0);

        this._worldMatrix = new Matrix4x4();
        this._viewMatrix = new Matrix4x4();
        this._projectionMatrix = new Matrix4x4();

        Matrix4x4.lookAt(this._viewMatrix, initialPosition, this._focalPosition, new Vector3(0, 0.1, 0));

        if(orthographic) {
            Matrix4x4.orthographic(this._projectionMatrix, -1, 1, -1, 1, 0.01, 1000.0);
        }
        else {
            Matrix4x4.perspective(this._projectionMatrix, 1.1, window.innerWidth/window.innerHeight, 0.01, 1000.0);
        }
    }

    public move(delta: Vector3): void {
        this._camPosition.add(delta);
    }

    private updatePosition(newPos: Vector3): void {
        this._shader.use();
        Matrix4x4.translate(this._worldMatrix, new Matrix4x4(), newPos);
        gl.uniformMatrix4fv(this._worldUniformLocation, false, this._worldMatrix.toFloat32Array());
    }

    private updateRotation(angle: number, axis: Vector3): void {
        this._shader.use();
        Matrix4x4.rotate(this._worldMatrix, new Matrix4x4(), angle, axis);
        gl.uniformMatrix4fv(this._worldUniformLocation, false, this._worldMatrix.toFloat32Array());
    }

    private updateLookAt(focalPoint: Vector3): void {
        this._shader.use();
        Matrix4x4.lookAt(this._viewMatrix, this._camPosition, focalPoint, new Vector3(0, 1, 0));
        gl.uniformMatrix4fv(this._viewUniformLocation, false, this._viewMatrix.toFloat32Array());
    }

    /**
     * Runs every frame.
     */
    public update(): void {
        this.updateLookAt(this._focalPosition);
    }

    /**
     * Initializes Camera shader and uniforms.
     */
    public initialize(): void {
        this._shader = new Shader();
        this._shader.use();
        this._worldUniformLocation = this._shader.getUniformLocation('u_world');
        this._viewUniformLocation = this._shader.getUniformLocation('u_view');
        this._projectionUniformLocation = this._shader.getUniformLocation('u_proj');
        gl.uniformMatrix4fv(this._worldUniformLocation, false, this._worldMatrix.toFloat32Array());
        gl.uniformMatrix4fv(this._viewUniformLocation, false, this._viewMatrix.toFloat32Array());
        gl.uniformMatrix4fv(this._projectionUniformLocation, false, this._projectionMatrix.toFloat32Array());
    }
}