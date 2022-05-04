import { Shader } from "./shaders/shader";
import { Matrix4x4 } from "../math/matrix";
import { Vector3 } from "../math/vector";
import { Camera } from "./graphics/camera";
import * as SHAPE from "./graphics/shape";


/**
 * WebGL Global interface for rendering context
 */
export let gl: WebGLRenderingContext; 

export class Render{

    private _canvas!:HTMLCanvasElement ;
    private _shapes:SHAPE.Shape[] = [];
    private _camera!:Camera;

    public constructor(){
        console.log("New Render Instance")
    }

    public get canvas() { return this._canvas; }

    /**
    * Initializes WebGL rendering context. 
    * @param elementID Id of the canvas element to render in.
    */
    public initialize(elementID: string, camera: Camera): void {
        this.initializeContext(elementID);
        
        
        this._shapes.push(new SHAPE.Shape('test0'));
        this._shapes.push(new SHAPE.Triangle('test1', 1, 2, [0.0, 0.0, 0.0]));
        this._shapes.push(new SHAPE.Quad("test2", 1, 1, [0.5, 0.2, 1.0]));
        this._shapes.push(new SHAPE.ColorCube('test0'));
        this._shapes.forEach( s => {s.load()});
        
        this._camera = camera;
        this._camera.initialize();
    }

    /**
     * Gets called every frame
     */
    public update(){
        // clears buffers to preset values.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        this._shapes.forEach( s => {s.draw()});
        this._camera.update();
    }

    /**
     * Resizes canvas to fit window.
     */
    public resize(){
        if (this._canvas) {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        }
    }

    private initializeContext(elementID: string){
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
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
        //gl.cullFace(gl.FRONT);
        this.resize();
    }
}