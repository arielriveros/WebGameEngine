import { gl } from "../render";

export class Shader {
    private _program: WebGLProgram;

    public get program(): WebGLProgram {
        return this._program;
    }

    public constructor(vs: string, fs: string) {
        let vertexShader: WebGLShader = this.loadSource(vs, gl.VERTEX_SHADER);
        let fragmentShader: WebGLShader = this.loadSource(fs, gl.FRAGMENT_SHADER);
        this._program = this.createProgram(vertexShader, fragmentShader);    
    }

    private getSourceSync(url: string) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send(null);
        return (xhr.status == 200) ? xhr.responseText : null;
      }; 

    private loadSource(sourceUrl: string, type: number): WebGLShader {
        let source = this.getSourceSync(`./shaders/${sourceUrl}`);
        let shader: WebGLShader|null = gl.createShader(type);
        if(shader) {
            // Sets shader source and compiles it
            gl.shaderSource(shader, source as string);
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
/* 
export class SimpleShader extends Shader {
    public constructor() {
        super(
            // Vertex Shader
            `
            precision mediump float;

            attribute vec3 a_position;
            attribute vec3 a_color;
        
            varying vec3 v_color;

            uniform mat4 u_world;
            uniform mat4 u_view;
            uniform mat4 u_proj;
        
            void main() {
                v_color = a_color;
                mat4 model_view = u_proj * u_view * u_world;
                gl_Position = model_view * vec4(a_position, 1.0);
            }`
            ,
            // Fragment Shader
            `
            precision mediump float;

            varying vec3 v_color;

            void main() {
                gl_FragColor = vec4(v_color, 1.0);
            }`
        )
    }
} */


export class SimpleShader extends Shader {
    public constructor() {
        super('simple.vs.glsl', 'simple.fs.glsl')
    }
}

export class SimpleShaderTest extends Shader {
    public constructor() {
        super('simple.vs.glsl', 'simple.fs.glsl')
    }
}

/* export class SimpleShaderTest extends Shader {
    public constructor() {
        super(
            // Vertex Shader
            `
            precision mediump float;

            attribute vec3 a_position;
            attribute vec3 a_color;
        
            varying vec3 v_color;
        
            uniform vec3 u_trans;
            uniform mat4 u_world;
            uniform mat4 u_view;
            uniform mat4 u_proj;
        
            void main() {
                v_color = a_color + u_trans;
                mat4 model_view = u_proj * u_view * u_world;
                gl_Position = model_view * vec4(u_trans + a_position, 1.0);
            }`
            ,
            // Fragment Shader
            `
            precision mediump float;

            varying vec3 v_color;

            void main() {
                gl_FragColor = vec4(v_color, 0.7);
            }`
        )
    }
} */