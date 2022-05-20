import { LOG } from "../../logger";
import { gl } from "../render";

export class Shader {
    private _program: WebGLProgram;
    private _debug: boolean;
    public get program(): WebGLProgram {
        return this._program;
    }

    public constructor(vs: string, fs: string, debug: boolean = false) {
        this._debug = debug;
        let vertexShader: WebGLShader = this.loadSource(vs, gl.VERTEX_SHADER);
        let fragmentShader: WebGLShader = this.loadSource(fs, gl.FRAGMENT_SHADER);
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

    private loadSource(sourceUrl: string, type: number): WebGLShader {
        let source = this.getSourceSync(`./shaders/${sourceUrl}`);
        let shader: WebGLShader|null = gl.createShader(type);
        if(shader) {
            // Sets shader source and compiles it
            gl.shaderSource(shader, source as string);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                LOG(`Error compiling vertex shader.\n${gl.getShaderInfoLog(shader)}`, 'error', true);
            }else {
                if(this._debug){
                    LOG(`Shader compiled successfully`, 'normal')
                }
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
            LOG(`Error linking WebGL program.\n${gl.getProgramInfoLog(program)}`, 'error', true);
        }

        if(this._debug) {
            // Program validation, only use in debugging mode for performance reasons
            gl.validateProgram(program);
            if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                LOG(`Error validating WebGL program.\n${gl.getProgramInfoLog(program)}`, 'error', true);
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
            LOG(`No uniform of name ${uniform} found.`, 'error', true)
            throw new Error()
        }
    }

    public use(): void {
        gl.useProgram(this._program);
    }
}

export class SimpleShader extends Shader {
    public constructor() {
        super('simple.vs.glsl', 'simple.fs.glsl')
    }
}
 
export class SimpleShaderTest extends Shader {
    public constructor() {
        super('simpleTest.vs.glsl', 'simple.fs.glsl')
    }
}
