import { Camera } from "./graphics/camera";
import { Scene } from "../world/scene";
import { LOG } from "../logger";

/**
 * WebGL Global interface for rendering context
 */
export let gl: WebGLRenderingContext; 

export class Render{

    private _canvas!: HTMLCanvasElement ;
    private _camera!: Camera;
    private _scene!: Scene;

    public constructor() {
        LOG("New Render Instance", 'info')
    }

    public get canvas(): HTMLCanvasElement { return this._canvas; }

    /**
    * Initializes WebGL rendering context. 
    * @param elementID Id of the canvas element to render in.
    */
    public initialize(elementID: string): void {
        this.initializeContext(elementID);
    }

    /**
     * Renders the camera and scene.
     * @param camera
     * @param scene 
     */
    public render(camera: Camera, scene: Scene): void {
        this._scene = scene;
        this._scene.initialize();
        this._camera = camera;
        this._camera.initialize(this._scene);
    }

    /**
     * Gets called every frame
     */
    public update(): void {
        // clears buffers to preset values.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        this._camera.update();
        this._scene.update();
    }

    /**
     * Resizes canvas to fit window.
     */
    public resize(): void {
        if (this._canvas) {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            if(this._camera) {
                this._camera.setProjection();
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        }
    }

    private initializeContext(elementID: string): void {
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
        // gl.cullFace(gl.FRONT);
        this.resize();
    }
}