import { gl } from '../gl/gl';

/**
 * WebGL Shader class representation.
 */
export class Shader {
    private _name:string;
    private _program!: WebGLProgram | null;
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
        if (this._program !== undefined){
            gl.useProgram(this._program);
        }
    }
    public getAttributeLocation(name:string): number {
        if (this._attributes[name] === undefined) {
            throw new Error(`Cannot find attribute "${name}" in shader "${this._name}"`);
        }
        return this._attributes[name];
    }
    public getUniformLocation(name:string): WebGLUniformLocation {
        if (this._uniforms[name] === undefined) {
            throw new Error(`Cannot find uniform "${name}" in shader "${this._name}"`);
        }
        return this._uniforms[name];
    }
    private loadShader(source: string, shaderType: number): WebGLShader {
        let shader: WebGLShader | null;
        shader = gl.createShader(shaderType);
        if(shader !== null){
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
        }
        else {
            throw new Error(`Shader "${this._name}" compiling error`)
        }
        return shader;        
    }
    private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
        this._program = gl.createProgram();
        if (this._program !== null){
            gl.attachShader(this._program, vertexShader);
            gl.attachShader(this._program, fragmentShader);
            gl.linkProgram(this._program);
        }
        else {
            throw new Error(`Shader "${this._name}" linking error`)
        }
    }
    private detectAttributes(): void {
        if (this._program !== null){
            let attributeCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);
            for(let i = 0; i < attributeCount; i++) {
                let info: WebGLActiveInfo | null = gl.getActiveAttrib(this._program, i);
                if (!info) {
                    break;
                }
                this._attributes[info.name] = gl.getAttribLocation(this._program, info.name);
            }
        }
        
    }
    private detectUniforms(): void {
        if (this._program !== null){
            let uniformCount = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
            for(let i = 0; i < uniformCount; i++) {
                let info: WebGLActiveInfo | null = gl.getActiveUniform(this._program, i);
                if (!info) {
                    break;
                }
                let uniforms:WebGLUniformLocation | null = gl.getUniformLocation(this._program, info.name);
                if(uniforms !== null){
                    this._uniforms[info.name] = uniforms;
                }
            }
        }
        
    }
}