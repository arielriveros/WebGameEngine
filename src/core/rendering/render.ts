import { SIMPLE_VERTEX_SHADER, SIMPLE_FRAGMENT_SHADER } from "./shaders/shaderSources";

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

        const gl:WebGLRenderingContext = this._context;

        let vertexShader: WebGLShader|null = gl.createShader(gl.VERTEX_SHADER);
        let fragmentShader: WebGLShader|null = gl.createShader(gl.FRAGMENT_SHADER);

        let program: WebGLProgram = gl.createProgram() as WebGLProgram;

        if(vertexShader) {
            // Sets vertex shader source and compiles it
            gl.shaderSource(vertexShader, SIMPLE_VERTEX_SHADER);
            gl.compileShader(vertexShader);
            if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
                throw new Error(`Error compiling vertex shader.\n${gl.getShaderInfoLog(vertexShader)}`);
            }
            gl.attachShader(program, vertexShader);
        }

        if(fragmentShader) {
            // Sets fragment shader source and compiles it
            gl.shaderSource(fragmentShader, SIMPLE_FRAGMENT_SHADER);
            gl.compileShader(fragmentShader);
            if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
                throw new Error(`Error compiling vertex shader.\n${gl.getShaderInfoLog(fragmentShader)}`);
            }
            gl.attachShader(program, fragmentShader);
        }

        // WebGL Program linking and error catching
        gl.linkProgram(program);
        if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(`Error linking WebGL program.\n${gl.getProgramInfoLog(program)}`);
        }

        // Program validation, only use in debugging mode for performance reasons
        gl.validateProgram(program);
        if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            throw new Error(`Error validating WebGL program.\n${gl.getProgramInfoLog(program)}`);
        }

        this._program = program;
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
            //  X      Y      Z
                -0.5,  Math.random()/2,   0.0,
                0.5,   0.0,   0.0,
                0.0,   0.5,   0.0
            ];
    
            let triangleBuffer: WebGLBuffer = gl.createBuffer() as WebGLBuffer;
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
            // TriangleVertices is not readable as it is, float32 conversion required
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    
            let positionAttribLocation = gl.getAttribLocation(this._program, 'vertex_position');
            // Layout of attribute
            gl.vertexAttribPointer(
                positionAttribLocation,   // Attribute location
                3,                  // Number of elements of each attribute
                gl.FLOAT,           // Type of elements
                false,              // Normalized?
                3 * Float32Array.BYTES_PER_ELEMENT, // Size of a vertex
                0
            );
    
            gl.enableVertexAttribArray(positionAttribLocation);
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