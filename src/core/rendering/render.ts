import { SIMPLE_VERTEX_SHADER, SIMPLE_FRAGMENT_SHADER } from "./shaders/shaderSources";
import { Shader } from "./shaders/shader";
import { Matrix4x4 } from "../math/matrix";
import { Vector3 } from "../math/vector";

/**
 * WebGL Global interface for rendering context
 */
export let gl: WebGLRenderingContext; 

export class Render{

    private _canvas!:HTMLCanvasElement ;
    private _program!:WebGLProgram;

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

        const simpleShader: Shader = new Shader();
        this._program = simpleShader.program;

        // ===================== B U F F E R S =====================

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

        let positionAttribLocation = gl.getAttribLocation(this._program, 'a_position');
        let colorAttribLocation = gl.getAttribLocation(this._program, 'a_color');
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
        // ===================== R O T A T I O N =====================
        this.worldUniformLocation = gl.getUniformLocation(this._program, 'u_world') as WebGLUniformLocation;
        let viewUniformLocation = gl.getUniformLocation(this._program, 'u_view');
        let projectionUniformLocation = gl.getUniformLocation(this._program, 'u_proj');
        this.worldMatrix = Matrix4x4.identity();
        let viewMatrix = Matrix4x4.lookAt(
            Matrix4x4.identity(),
            new Vector3(0, 0, -2),
            new Vector3(0, 0, 0),
            new Vector3(0, 1, 0),
            );
        let projectionMatrix = Matrix4x4.orthographic(-2, 2, -2, 2, 0.1, 1000.0);
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
        
        this.angle = performance.now() / 1000.0 / 6.0 * 2.0 * Math.PI;
        
        Matrix4x4.rotate(this.worldMatrix, this.identity, this.angle, new Vector3(0, 1, 0));

        gl.uniformMatrix4fv(this.worldUniformLocation, false, this.worldMatrix.toFloat32Array());
        gl.drawArrays(gl.TRIANGLES, 0, 3);
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