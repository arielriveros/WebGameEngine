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

    public constructor(orthographic: boolean = false) {
        this._camPosition = new Vector3(-0.01, 0.01, 0);
        this._focalPosition = new Vector3(0, 0, 0);

        this._worldMatrix = new Matrix4x4();
        this._viewMatrix = new Matrix4x4();
        this._projectionMatrix = new Matrix4x4();

        Matrix4x4.lookAt(this._viewMatrix, this._camPosition, this._focalPosition, new Vector3(0, 1, 0));
        if(orthographic) {
            Matrix4x4.orthographic(this._projectionMatrix, -1, 1, -1, 1, 0.1, 100.0);
        }
        else {
            Matrix4x4.perspective(this._projectionMatrix, 1.1, window.innerWidth/window.innerHeight, 0.1, 100.0);
        }
    }

    public move(delta:any) {
        if ('x' in delta) {
            this._camPosition.x += delta.x;
        }
        if ('y' in delta) {
            this._camPosition.y += delta.y;
        }
        if ('z' in delta) {
            this._camPosition.z += delta.z;
        }
    }

    private updatePosition(newPos: Vector3){
        Matrix4x4.translate(this._worldMatrix, new Matrix4x4(), newPos);
        gl.uniformMatrix4fv(this._worldUniformLocation, false, this._worldMatrix.toFloat32Array());
    }

    private updateRotation(angle: number, axis: Vector3) {
        Matrix4x4.rotate(this._worldMatrix, new Matrix4x4(), angle, axis);
        gl.uniformMatrix4fv(this._worldUniformLocation, false, this._worldMatrix.toFloat32Array());
    }

    private updateLookAt(focalPoint: Vector3) {
        Matrix4x4.lookAt(this._viewMatrix, this._camPosition, focalPoint, new Vector3(0, 1, 0));
        gl.uniformMatrix4fv(this._viewUniformLocation, false, this._viewMatrix.toFloat32Array());
    }

    /**
     * Runs every frame.
     */
    public update(){
        this.updatePosition(this._camPosition);
        //this._angle = Math.sin( performance.now() / 500.0);
        //this.updateRotation(this._angle, new Vector3(0.0, 1.0, 0.0));
        //this.updateLookAt(new Vector3(0.0, this._angle, 0.0))
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