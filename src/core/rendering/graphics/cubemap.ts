import { Loader } from "../../loaders/loader";
import { gl } from "../render";

export class Cubemap{
    private _imagesPaths: string[];
    private _images: HTMLImageElement[];
    private _texture!: WebGLTexture;

    public constructor(imagesPaths: string[]){
        this._imagesPaths = imagesPaths;
        this._images = [];
    }


    /**
     * Load the source image into the texture.
     */
    public async load(): Promise<any>{
        if(this._imagesPaths){
            for(let i = 0; i < this._imagesPaths.length; i++)
            {
                console.log(this._imagesPaths[i]);
                this._images[i] = await Loader.loadImage(this._imagesPaths[i]);
            }
        }
        // Before creating a texutres flips (u,v) coords to match (x,y) coords
        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        // Creates a texture webgl object
        this._texture = gl.createTexture() as WebGLTexture;
        // Binds the texture data to the webgl texture object
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);
        // Tex coordinates clamping to edge
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // Mipmapping
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        //gl.generateMipmap(gl.TEXTURE_CUBE_MAP);

        // Uploads the image data to the texture object

        if(this._images)
        {
            for(let i = 0; i < this._images.length; i++)
            {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._images[i]);
            }
        }

        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    }

    public get image(): HTMLImageElement[] | null { return this._images; }
    public get texture(): WebGLTexture { return this._texture; }

    /**
     * Binds the texture to the shader program.
     */
    public bind(): void
    {
        // Active Texture
        //gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);

    }

    /**
     * Unbind and delete the texture from the shader program.
     */
    public unload(): void {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        gl.deleteTexture(this._texture);
    }
}