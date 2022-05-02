import { SIMPLE_VERTEX_SHADER, SIMPLE_FRAGMENT_SHADER } from "./shaders/shaderSources";
import { Shader } from "./shaders/shader";

export class Render{

    private _context!:WebGLRenderingContext;
    private _canvas!:HTMLCanvasElement ;
    private _program!:WebGLProgram;

    public constructor(){
        console.log("New Render Instance")
    }

    public get gl(){ return this._context; }
    public get canvas(){ return this._canvas; }

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
        this._context = this._canvas.getContext("webgl") as WebGLRenderingContext; 
        // Dark gray initial color
        this._context.clearColor(0.2, 0.2, 0.2, 1.0);
        this.resize();

        // ===================== S H A D E R S =====================

        const simpleShader: Shader = new Shader(this._context);
        this._program = simpleShader.program;
    }

    /**
     * Gets called every frame
     */
    public update(){
        // clears buffers to preset values.
        this._context.clear(this._context.COLOR_BUFFER_BIT | this._context.DEPTH_BUFFER_BIT);
        // ===================== B U F F E R S =====================

        const gl:WebGLRenderingContext = this._context;

        let triangleVertices: number[] = [
            //  X     Y     Z     R    G    B
                -0.3, -0.5, 0.0,  1.0, 0.0, 0.0,
                0.3,  -0.5, 0.0,  0.0, 1.0, 0.0,
                0.0,  0.7,  0.0,  0.0, 0.0, 1.0
            ];
    
            let triangleBuffer: WebGLBuffer = gl.createBuffer() as WebGLBuffer;
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
            // TriangleVertices is not readable as it is, float32 conversion required
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    
            let positionAttribLocation = gl.getAttribLocation(this._program, 'vertex_position');
            let colorAttribLocation = gl.getAttribLocation(this._program, 'vertex_color');
            // Layout of attribute
            gl.vertexAttribPointer(
                positionAttribLocation,   // Attribute location
                3,                  // Number of elements of each attribute
                gl.FLOAT,           // Type of elements
                false,              // Normalized?
                6 * Float32Array.BYTES_PER_ELEMENT, // Size of a vertex
                0
            );

            gl.vertexAttribPointer(
                colorAttribLocation,   // Attribute location
                3,                  // Number of elements of each attribute
                gl.FLOAT,           // Type of elements
                false,              // Normalized?
                6 * Float32Array.BYTES_PER_ELEMENT, // Size of a vertex
                3 * Float32Array.BYTES_PER_ELEMENT
            );
    
            gl.enableVertexAttribArray(positionAttribLocation);
            gl.enableVertexAttribArray(colorAttribLocation);
            gl.useProgram(this._program);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    /**
     * Resizes canvas to fit window.
     */
    public resize(){
        if (this._canvas) {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            this._context.viewport(-1, 1, window.innerWidth, window.innerHeight);
        }
    }
}