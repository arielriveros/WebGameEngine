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
        this._buffer = new GLArrayBuffer(11, gl.FLOAT, gl.TRIANGLES );
        
        if(this._indices)
        {
            this._indexBuffer = new GLElementArrayBuffer(gl.UNSIGNED_SHORT, gl.TRIANGLES);
            this._indexBuffer.bind();
            this._indexBuffer.pushData(this._indices);
            this._indexBuffer.upload();
        }
        
        let positionAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_position"),
            size: 3,
            offset: 0 };
            this._buffer.addAttribLocation(positionAttribute);

        let colorAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_color"),
            size: 3, 
            offset: 3 };
        this._buffer.addAttribLocation(colorAttribute);
            
        this._texture.load();
        let textureAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_texCoord"),
            size: 2, 
            offset: 6 };
        this._buffer.addAttribLocation(textureAttribute);

        let normalAttribute:AttributeInformation = {
            location: shader.getAttributeLocation("a_normal"),
            size: 3, 
            offset: 8 };
        this._buffer.addAttribLocation(normalAttribute);
        
        this._buffer.pushData(this._vertices);
        this._buffer.upload();
    }

    /**
     * Draws data from the shape's buffers.
     */
     public override draw(): void
     {
         this._buffer.bind();
         this._texture.draw();
         if(this._indices) { this._indexBuffer.draw(); }
         else { this._buffer.draw(); }
     }
}
