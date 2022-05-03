import { SIMPLE_VERTEX_SHADER, SIMPLE_FRAGMENT_SHADER } from "./shaderSources";
import { gl } from "../render";

export class Shader {
    private _program: WebGLProgram;
    private _attributes: {[name:string]: number} = {};
    private _uniforms: {[name:string]: WebGLUniformLocation} = {};

    public get program(): WebGLProgram {
        return this._program;
    }

    public constructor() {

        let vertexShader: WebGLShader = this.loadSource(SIMPLE_VERTEX_SHADER, gl.VERTEX_SHADER);
        let fragmentShader: WebGLShader = this.loadSource(SIMPLE_FRAGMENT_SHADER, gl.FRAGMENT_SHADER);
        this._program = this.createProgram(vertexShader, fragmentShader);    
    }

    private loadSource(source: string, type: number): WebGLShader {
        let shader: WebGLShader|null = gl.createShader(type);
        if(shader) {
            // Sets shader source and compiles it
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw new Error(`Error compiling vertex shader.\n${gl.getShaderInfoLog(shader)}`);
            }
        }
        return shader as WebGLShader;
    }

    private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader, debug: boolean = false): WebGLProgram {
        let program = gl.createProgram() as WebGLProgram;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        // WebGL Program linking and error catching
        gl.linkProgram(program);
        if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(`Error linking WebGL program.\n${gl.getProgramInfoLog(program)}`);
        }

        if(debug) {
            // Program validation, only use in debugging mode for performance reasons
            gl.validateProgram(program);
            if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                throw new Error(`Error validating WebGL program.\n${gl.getProgramInfoLog(program)}`);
            }

        }
        
        return program;
    }

    public getAttributeLocation(attrib:string): number {
        return gl.getAttribLocation(this._program, attrib);
    }

    public getUniformLocation(uniform:string): WebGLUniformLocation {
        let outLocation:any = gl.getUniformLocation(this._program, uniform)
        if (outLocation) {
            return outLocation as WebGLUniformLocation;
        }
        else {
            throw new Error(`No uniform of name ${uniform} found.`)
        }
    }

    public use(): void {
        gl.useProgram(this._program);
    }
}