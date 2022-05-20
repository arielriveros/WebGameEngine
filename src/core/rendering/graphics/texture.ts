import { gl } from "../render";

export class Texture{
    private _image: HTMLImageElement;
    private _texture!: WebGLTexture;

    public constructor(image: HTMLImageElement){
        this._image = image;
    }

    public get image(): HTMLImageElement { return this._image; }
    public get texture(): WebGLTexture { return this._texture; }

    public load(): void {
        this._texture = gl.createTexture() as WebGLTexture;
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
        gl.activeTexture(gl.TEXTURE0);
    } 
    
    public unload(): void {
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.deleteTexture(this._texture);
    }
}