import { Loader } from "../../loaders/loader";
import { gl } from "../render";

export class Texture{
    private _imagePath?: string;
    private _image!: HTMLImageElement | null;
    private _texture!: WebGLTexture;

    public constructor(imagePath?: string){
        this._imagePath = imagePath;
    }


    /**
     * Load the source image into the texture.
     */
    public async load(): Promise<any>{
        // Load the image given a path, if no path is given, use the default image.
        this._image = this._imagePath ? await Loader.loadImage(this._imagePath) : null;
        // Before creating a texutres flips (u,v) coords to match (x,y) coords
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        // Creates a texture webgl object
        this._texture = gl.createTexture() as WebGLTexture;
        // Binds the texture data to the webgl texture object
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        // Tex coordinates clamping to edge
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // Mipmapping
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        //gl.generateMipmap(gl.TEXTURE_2D);

        // Uploads the image data to the texture object

        if(this._image)
        {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
        }
        else
        {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
        }

        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    public get image(): HTMLImageElement | null { return this._image; }
    public get texture(): WebGLTexture { return this._texture; }

    /**
     * Binds the texture to the shader program.
     */
    public draw(): void
    {
        // Active Texture
        //gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this._texture);

    }

    /**
     * Unbind and delete the texture from the shader program.
     */
    public unload(): void {
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.deleteTexture(this._texture);
    }
}