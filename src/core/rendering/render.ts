import { Shader } from "./shaders/shader";
import { Matrix4x4 } from "../math/matrix";
import { Vector3 } from "../math/vector";
import * as SHAPE from "./graphics/shape";


/**
 * WebGL Global interface for rendering context
 */
export let gl: WebGLRenderingContext; 

export class Render{

    private _canvas!:HTMLCanvasElement ;
    private _shader!:Shader;

    private _shapes:SHAPE.Shape[] = [];

    private angle: number = 0;
    private worldMatrix!: Matrix4x4;
    private identity: Matrix4x4 = Matrix4x4.identity();
    private worldUniformLocation!:WebGLUniformLocation;

    public constructor(){
        console.log("New Render Instance")
    }

    public get canvas() { return this._canvas; }

    /**
    * Initializes WebGL rendering context. 
    * @param elementID Id of the canvas element to render in.
    */
    public initialize(elementID?: string): void {
        let canvas: HTMLCanvasElement;
        
        if (elementID !== undefined) {
            canvas = document.getElementById(elementID) as HTMLCanvasElement;
            if (canvas === undefined) {
                throw new Error(`No canvas element of id ${elementID}`);
            }
        }

        else {
            // If there is no element of id elementID then its created and appended
            canvas = document.createElement("canvas") as HTMLCanvasElement;
            document.body.appendChild(canvas);
        }
        
        this._canvas = canvas;

        if (!this._canvas.getContext("webgl")) {
            throw new Error("Cannot initialize WebGL by the browser");
        }

        // gets webGL context object from the canvas and stores it in _context
        gl = this._canvas.getContext("webgl") as WebGLRenderingContext; 
        // Dark gray initial color
        gl.clearColor(0.2, 0.2, 0.2, 1.0);
        this.resize();

        // ===================== S H A D E R S =====================

        this._shader = new Shader();
        this._shader.use();

        //this._shapes.push(new SHAPE.Shape(this._shader, 'test0'));
        //this._shapes.push(new SHAPE.Triangle(this._shader, 'test1', 1, 2, [0.0, 0.0, 0.0]));
        //this._shapes.push(new SHAPE.Quad(this._shader, "test2", 1, 1, [0.5, 0.2, 1.0]));
        this._shapes.push(new SHAPE.Cube(this._shader, 'test0'));
        this._shapes.forEach( s => {s.load()});
        
        // ===================== R O T A T I O N =====================
        this.worldUniformLocation = this._shader.getUniformLocation('u_world');
        let viewUniformLocation = this._shader.getUniformLocation('u_view');
        let projectionUniformLocation = this._shader.getUniformLocation('u_proj');
        this.worldMatrix = Matrix4x4.identity();
        let viewMatrix = Matrix4x4.lookAt(
            new Vector3(-2, 2, 0),
            new Vector3(0, 0, 0),
            new Vector3(0, 1, 0),
            );
        let projectionMatrix = Matrix4x4.orthographic(-2, 2, -2, 2, 0.01, 1000.0);
        gl.uniformMatrix4fv(this.worldUniformLocation, false, this.worldMatrix.toFloat32Array());
        gl.uniformMatrix4fv(viewUniformLocation, false, viewMatrix.toFloat32Array());
        gl.uniformMatrix4fv(projectionUniformLocation, false, projectionMatrix.toFloat32Array());
        // ===========================================================
    }

    /**
     * Gets called every frame
     */
    public update(){
        // clears buffers to preset values.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        
        
        this.angle = performance.now() / 1000.0 / 6.0 * 3.0 * Math.PI;
        Matrix4x4.rotate(this.worldMatrix, this.identity, this.angle, new Vector3(0.1, 0.7, 0.5));
        gl.uniformMatrix4fv(this.worldUniformLocation, false, this.worldMatrix.toFloat32Array());
        
        this._shapes.forEach( s => {s.draw()});
    }

    /**
     * Resizes canvas to fit window.
     */
    public resize(){
        if (this._canvas) {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            gl.viewport(-1, 1, window.innerWidth, window.innerHeight);
        }
    }
}