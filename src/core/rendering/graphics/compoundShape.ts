import { GLArrayBuffer, AttributeInformation } from "../gl/arrayBuffer";
import { GLElementArrayBuffer } from "../gl/elementArrayBuffer";
import { gl } from "../render";
import { Shader } from "../shaders/shader";
import { Renderable } from "./renderable";
import { Texture } from "./texture";

export class CompoundShape extends Renderable
{
    private _texture: Texture;

    public constructor(texturePath?: string)
    {
        super("textured");
        this._texture = new Texture(texturePath);
    }

    public override load(shader: Shader): void
    {
        this._vertexBuffer = new GLArrayBuffer(3, gl.FLOAT, gl.TRIANGLES );
        
        let positionAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_position"),
            size: 3,
            offset: 0 };
        this._vertexBuffer.addAttribLocation(positionAttribute);
        this._vertexBuffer.pushData(this._vertices);
        this._vertexBuffer.upload();

        if(this._colors)
        {
            this._colorBuffer = new GLArrayBuffer(3, gl.FLOAT, gl.TRIANGLES);
            let colorAttribute:AttributeInformation = {
                location: shader.getAttributeLocation("a_color"),
                size: 3,
                offset: 0 };
            this._colorBuffer.addAttribLocation(colorAttribute);
            this._colorBuffer.pushData(this._colors);
            this._colorBuffer.upload();
        }

        
        if(this._uvs)
        {
            this._uvBuffer = new GLArrayBuffer(2, gl.FLOAT, gl.TRIANGLES);
            let textureAttribute:AttributeInformation = {
                location: shader.getAttributeLocation("a_texCoord"),
                size: 2, 
                offset: 0 };

            this._uvBuffer.addAttribLocation(textureAttribute);
            this._uvBuffer.pushData(this._uvs);
            this._uvBuffer.upload();
        }
        this._texture.load();

        if(this._normals)
        {
            this._normalBuffer = new GLArrayBuffer(3, gl.FLOAT, gl.TRIANGLES);
            let normalAttribute:AttributeInformation = {
                location: shader.getAttributeLocation("a_normal"),
                size: 3, 
                offset: 0 };

            this._normalBuffer.addAttribLocation(normalAttribute);
            this._normalBuffer.pushData(this._normals);
            this._normalBuffer.upload();
        }

        if(this._indices)
        {
            this._indexBuffer = new GLElementArrayBuffer(gl.UNSIGNED_SHORT, gl.TRIANGLES);
            this._indexBuffer.pushData(this._indices);
            this._indexBuffer.upload();
        }
    }
        
    /**
     * Draws data from the shape's buffers.
     */
     public override draw(): void
     {
        this._vertexBuffer.bind();
        this._texture.bind();
        if(this.normals) { this._normalBuffer.bind(); }
        if(this.colors) { this._colorBuffer.bind(); }
        if(this.uvs) { this._uvBuffer.bind(); }
        if(this._indices) { this._indexBuffer.bind(); this._indexBuffer.draw(); }
        else { this._vertexBuffer.draw(); }
     }
}
