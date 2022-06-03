import { LOG } from "utils";
import { gl } from "../render";

export abstract class Shader {
    private _program!: WebGLProgram;
    private _debug: boolean;

    private vs: string;
    private fs: string;

    public get program(): WebGLProgram {
        return this._program;
    }

    public constructor(vs: string, fs: string, debug: boolean = false) {
        this._debug = debug;

        this.vs = vs;
        this.fs = fs;
    }

    public initialize(): void
    {
        let vertexShader: WebGLShader = this.loadSource(this.vs, gl.VERTEX_SHADER);
        let fragmentShader: WebGLShader = this.loadSource(this.fs, gl.FRAGMENT_SHADER);
        this._program = this.createProgram(vertexShader, fragmentShader);
    }

    private getSourceSync(url: string) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send(null);

        if (xhr.status == 200) {
            return xhr.responseText
        }
        else {
            LOG("Error loading source shader file", "error", true);
            return;
        }
      }; 

    private loadSource(sourceUrl: string, type: number): WebGLShader
    {
        let source = this.getSourceSync(`./shaders/${sourceUrl}`);
        let shader: WebGLShader|null = gl.createShader(type);
        if(shader)
        {
            // Sets shader source and compiles it
            gl.shaderSource(shader, source as string);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
            {
                LOG(`Error compiling vertex shader.\n${gl.getShaderInfoLog(shader)}`, 'error', true);
            }
            else if(this._debug)
            {
                LOG(`Shader compiled successfully`, 'normal')
            }
            
        }
        return shader as WebGLShader;
    }

    private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader, debug: boolean = false): WebGLProgram
    {
        let program = gl.createProgram() as WebGLProgram;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        // WebGL Program linking and error catching
        gl.linkProgram(program);
        if(!gl.getProgramParameter(program, gl.LINK_STATUS))
        {
            LOG(`Error linking WebGL program.\n${gl.getProgramInfoLog(program)}`, 'error', true);
        }

        if(this._debug)
        {
            // Program validation, only use in debugging mode for performance reasons
            gl.validateProgram(program);
            if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
            {
                LOG(`Error validating WebGL program.\n${gl.getProgramInfoLog(program)}`, 'error', true);
            }
        }
        
        return program;
    }

    public getAttributeLocation(attrib:string): number
    {
        return gl.getAttribLocation(this._program, attrib);
    }

    public getUniformLocation(uniform:string): WebGLUniformLocation | null
    {
        return gl.getUniformLocation(this._program, uniform);
    }

    public setUniform(uniform: string, type: string, value: Int32Array | Float32Array): void
    {
        let location: WebGLUniformLocation | null = this.getUniformLocation(uniform);
        switch(type)
        {
            case "1fv":
                gl.uniform1fv(location, value);
                break;
            case "2fv":
                gl.uniform2fv(location, value);
                break;
            case "3fv":
                gl.uniform3fv(location, value);
                break;
            case "4fv":
                gl.uniform4fv(location, value);
                break;
            case "1iv":
                gl.uniform1iv(location, value);
                break;
            case "2iv":
                gl.uniform2iv(location, value);
                break;
            case "3iv":
                gl.uniform3iv(location, value);
                break;
            case "4iv":
                gl.uniform4iv(location, value);
                break;
            case "Matrix3fv":
                gl.uniformMatrix3fv(location, false, value);
                break;
            case "Matrix4fv":
                gl.uniformMatrix4fv(location, false, value);
                break;
            default:
                LOG(`Uniform type ${type} not supported.`, 'error', true);
        }
    }

    public use(): void
    {
        gl.useProgram(this._program);
    }

    public remove(): void
    {
        gl.deleteProgram(this._program);
    }
}

export class SimpleShader extends Shader
{
    public constructor()
    {
        super('simple.vs.glsl', 'simple.fs.glsl')
    }
}

export class TextureShader extends Shader
{
    public constructor()
    {
        super('textured.vs.glsl', 'textured.fs.glsl')
    }
}
