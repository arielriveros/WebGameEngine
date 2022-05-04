import { Matrix4x4 } from "../../math/matrix";
import { Shader } from "../shaders/shader";
import { gl } from "../render";
import { Vector3 } from "../../math/vector";

export class Camera {

    private _camPosition: Vector3;
    private _focalPosition: Vector3;

    private _worldMatrix: Matrix4x4;
    private _viewMatrix: Matrix4x4;
    private _projectionMatrix: Matrix4x4;

    private _worldUniformLocation: WebGLUniformLocation;
    private _viewUniformLocation: WebGLUniformLocation;
    private _projectionUniformLocation: WebGLUniformLocation;

    private _angle: number = 0;

    public constructor(shader: Shader) {
        this._camPosition = new Vector3(-3, 1, 0);
        this._focalPosition = new Vector3(0, 0, 0);

        this._worldMatrix = Matrix4x4.identity();
        this._viewMatrix = Matrix4x4.lookAt(
            this._camPosition,
            this._focalPosition,
            new Vector3(0, 1, 0),
            );
        this._projectionMatrix = Matrix4x4.orthographic(-1, 1, -1, 1, 0.01, 1000.0);

        this._worldUniformLocation = shader.getUniformLocation('u_world');
        this._viewUniformLocation = shader.getUniformLocation('u_view');
        this._projectionUniformLocation = shader.getUniformLocation('u_proj');
    }

    private updateUniformMatrices(){
        gl.uniformMatrix4fv(this._worldUniformLocation, false, this._worldMatrix.toFloat32Array());
        gl.uniformMatrix4fv(this._viewUniformLocation, false, this._viewMatrix.toFloat32Array());
        gl.uniformMatrix4fv(this._projectionUniformLocation, false, this._projectionMatrix.toFloat32Array());
    }

    public update(){
        this._angle = performance.now() / 1000.0 / 6.0 * 1.0 * Math.PI;
        Matrix4x4.rotate(this._worldMatrix, Matrix4x4.identity(), this._angle, new Vector3(0.1, 0.7, 0.5));
        //Matrix4x4.translate(this._worldMatrix, Matrix4x4.identity(), new Vector3(this._angle, 0.2, 0.3))
        this.updateUniformMatrices();
    }
}