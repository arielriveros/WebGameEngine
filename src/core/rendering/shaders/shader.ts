import { SIMPLE_VERTEX_SHADER, SIMPLE_FRAGMENT_SHADER } from "./shaderSources";

export class Shader {
    private _gl: WebGLRenderingContext;
    private _program: WebGLProgram;

    public get program(): WebGLProgram {
        return this._program;
    }

    public constructor(renderingContext: WebGLRenderingContext) {
        this._gl = renderingContext;

        let vertexShader: WebGLShader = this.loadSource(SIMPLE_VERTEX_SHADER, this._gl.VERTEX_SHADER);
        let fragmentShader: WebGLShader = this.loadSource(SIMPLE_FRAGMENT_SHADER, this._gl.FRAGMENT_SHADER);
        this._program = this.createProgram(vertexShader, fragmentShader);    
    }

    private loadSource(source: string, type: number): WebGLShader {
        let shader: WebGLShader|null = this._gl.createShader(type);
        if(shader) {
            // Sets shader source and compiles it
            this._gl.shaderSource(shader, source);
            this._gl.compileShader(shader);
            if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
                throw new Error(`Error compiling vertex shader.\n${this._gl.getShaderInfoLog(shader)}`);
            }
        }
        return shader as WebGLShader;
    }

    private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader, debug: boolean = false): WebGLProgram {
        let program = this._gl.createProgram() as WebGLProgram;
        this._gl.attachShader(program, vertexShader);
        this._gl.attachShader(program, fragmentShader);

        // WebGL Program linking and error catching
        this._gl.linkProgram(program);
        if(!this._gl.getProgramParameter(program, this._gl.LINK_STATUS)) {
            throw new Error(`Error linking WebGL program.\n${this._gl.getProgramInfoLog(program)}`);
        }

        if(debug) {
            // Program validation, only use in debugging mode for performance reasons
            this._gl.validateProgram(program);
            if(!this._gl.getProgramParameter(program, this._gl.VALIDATE_STATUS)) {
                throw new Error(`Error validating WebGL program.\n${this._gl.getProgramInfoLog(program)}`);
            }

        }
        
        return program;
    }
}