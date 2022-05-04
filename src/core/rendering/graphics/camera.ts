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

    private _angle: number = 0;

    public constructor() {
        this._camPosition = new Vector3(-3, 1, 0);
        this._focalPosition = new Vector3(0, 0, 0);

        this._worldMatrix = Matrix4x4.identity();
        this._viewMatrix = Matrix4x4.lookAt(
            this._camPosition,
            this._focalPosition,
            new Vector3(0, 1, 0),
            );
        this._projectionMatrix = Matrix4x4.orthographic(-1, 1, -1, 1, 0.01, 1000.0);
    }

    public updatePosition(newPos: Vector3){
        Matrix4x4.translate(this._worldMatrix, Matrix4x4.identity(), newPos);
        gl.uniformMatrix4fv(this._worldUniformLocation, false, this._worldMatrix.toFloat32Array());
    }

    public updateRotaton(angle: number, axis: Vector3) {
        Matrix4x4.rotate(this._worldMatrix, Matrix4x4.identity(), angle, axis);
        gl.uniformMatrix4fv(this._worldUniformLocation, false, this._worldMatrix.toFloat32Array());
    }  

    /**
     * Runs every frame.
     */
    public update(){
        this._angle = 3 * Math.sin( performance.now() / 500.0);
        this.updateRotaton(this._angle, new Vector3(0.0, 1.0, 0.0));
    }

    /**
     * Initializes Camera shader and uniforms.
     */
    public initialize(){
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