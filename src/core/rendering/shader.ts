namespace RENDER {
    /**
     * WebGL Shader class representation.
     */
    export class Shader {
        private _name:string;
        private _program: WebGLProgram;
        private _attributes: {[name: string]: number} = {};
        private _uniforms: {[name: string]: WebGLUniformLocation} = {};
        

        /**
         * Instance of a shader program.
         * @param name Name of the shader.
         * @param vertexSource Source of the vertex shader.
         * @param fragmentSource Source of the fragment shader.
         */
        public constructor(name:string, vertexSource: string, fragmentSource: string) {

            this._name = name;
            
            let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
            let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

            this.createProgram(vertexShader, fragmentShader);
            this.detectAttributes();
            this.detectUniforms();
        }

        public get name(): string {
            return this._name;
        }

        public use(): void {
            gl.useProgram(this._program);
        }

        public getAttributeLocation(name:string): number {
            if(this._attributes[name] === undefined) {
                throw new Error(`Cannot find attribute "${name}" in shader "${this._name}"`);
            }
            return this._attributes[name];
        }

        public getUniformLocation(name:string): WebGLUniformLocation {
            if(this._uniforms[name] === undefined) {
                throw new Error(`Cannot find uniform "${name}" in shader "${this._name}"`);
            }
            return this._uniforms[name];
        }

        private loadShader(source: string, shaderType: number): WebGLShader {
            let shader: WebGLShader = gl.createShader(shaderType);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            let err = gl.getShaderInfoLog(shader); // Captures shader errors
            if (err !== "") {
                throw new Error(`Shader "${this._name}" compiling error: ${err}`)
            }

            return shader;
        }

        private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
            this._program = gl.createProgram();
            gl.attachShader(this._program, vertexShader);
            gl.attachShader(this._program, fragmentShader);
            gl.linkProgram(this._program);

            let err = gl.getProgramInfoLog(this._program);
            if (err !== "") {
                throw new Error(`Shader "${this._name}" linking error: ${err}`)
            }
        }

        private detectAttributes(): void {
            let attributeCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);
            for(let i = 0; i < attributeCount; i++) {
                let info: WebGLActiveInfo = gl.getActiveAttrib(this._program, i);
                if(!info) {
                    break;
                }
                this._attributes[info.name] = gl.getAttribLocation(this._program, info.name);
            }
        }

        private detectUniforms(): void {
            let uniformCount = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
            for(let i = 0; i < uniformCount; i++) {
                let info: WebGLActiveInfo = gl.getActiveUniform(this._program, i);
                if(!info) {
                    break;
                }
                this._uniforms[info.name] = gl.getUniformLocation(this._program, info.name);
            }
        }
    }
}