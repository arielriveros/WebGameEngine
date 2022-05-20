import { gl } from "../render";

export class Texture{
    private _image: HTMLImageElement;
    private _texture!: WebGLTexture;
    private _name: string;

    public constructor(image: HTMLImageElement, name: string){
        this._image = image;
        this._name = name;
    }

    public get image(): HTMLImageElement { return this._image; }
    public get name(): string { return this._name; }
    public get texture(): WebGLTexture { return this._texture; }

    public load(): void {
        this._texture = gl.createTexture() as WebGLTexture;
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    public unload(): void {
        gl.deleteTexture(this._texture);
    }
}