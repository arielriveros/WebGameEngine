import { GLArrayBuffer, AttributeInformation } from "../gl/arrayBuffer";
import { GLElementArrayBuffer } from "../gl/elementArrayBuffer";
import { gl } from "../render";
import { Shader } from "../shaders/shader";
import { Options, Renderable } from "./renderable";
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
        this._buffer = new GLArrayBuffer(8, gl.FLOAT, gl.TRIANGLES );
        
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


export class Triangle extends CompoundShape
{

    /**
     * Triangle Basic 2D Shape. Rendered at origin.
     */
    public constructor(options: Options = {})
    {
        let base: number = options.base || 1;
        let height: number = options.height || base;
        let color: number[] = options.color || [1, 1, 1];
        super(options.texturePath);
        this.vertices = [
        //  X       Y          Z    R         G         B         u    v
           -base/2, -height/2, 0.0, color[0], color[1], color[2], 0.0, 0.0,
            base/2, -height/2, 0.0, color[0], color[1], color[2], 1.0, 0.0,
            0.0,     height/2, 0.0, color[0], color[1], color[2], 0.5, 1.0];
        }
}

export class ColorTriangle extends CompoundShape
{
    /**
     * Triangle Basic 2D Shape. Rendered at origin.
     */
    public constructor(options: Options = {})
    {
        let base: number = options.base || 1;
        let height: number = options.height || 1;
        super();
        this.vertices = [
        //  X       Y          Z    R    G    B     U   V
           -base/2, -height/2, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
            base/2, -height/2, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0,
            0.0,     height/2, 0.0, 0.0, 0.0, 1.0, 0.5, 1.0];
        }
}

export class Quad extends CompoundShape {

    /**
     * Quad Basic 2D Shape. Rendered in origin. Consists of 2 adyacent Triangles.
     */
    public constructor(options: Options = {})
    {
        let base: number = options.base || 1;
        let height: number = options.height || 1;
        let color: number[] = options.color || [1, 1, 1];
        super(options.texturePath);
        this.vertices = [
        //  X       Y          Z    R         G         B          U     V
           -base/2, -height/2, 0.0, color[0], color[1], color[2], 0.0, 0.0,
            base/2, -height/2, 0.0, color[0], color[1], color[2], 1.0, 0.0,
           -base/2,  height/2, 0.0, color[0], color[1], color[2], 0.0, 1.0,
        
           -base/2,  height/2, 0.0, color[0], color[1], color[2], 0.0, 1.0,
            base/2, -height/2, 0.0, color[0], color[1], color[2], 1.0, 0.0,
            base/2,  height/2, 0.0, color[0], color[1], color[2], 1.0, 1.0];
        }
}

export class Cube extends CompoundShape
{
    public constructor(options: Options = {})
    {
        let base: number = options.base || 1;
        let color: number[] = options.color || [1, 1, 1];
        super(options.texturePath);
        const l2 = base/2;
        this.indices = [
            // Top
            0, 1, 2,
            0, 2, 3,
            // Left
            5, 4, 6,
            6, 4, 7,
            // Right
            8, 9, 10,
            8, 10, 11,
            // Front
            13, 12, 14,
            15, 14, 12,
            // Back
            16, 17, 18,
            16, 18, 19,
            // Bottom
            21, 20, 22,
            22, 20, 23
        ];
        this.vertices = [
        //   X   Y    Z   R         G         B          U     V
            // TOP
            -l2,  l2, -l2, color[0], color[1], color[2], 0.0, 0.0,
            -l2,  l2,  l2, color[0], color[1], color[2], 0.0, 1.0,
             l2,  l2,  l2, color[0], color[1], color[2], 1.0, 1.0,
             l2,  l2, -l2, color[0], color[1], color[2], 1.0, 0.0,
 
            // LEFT
            -l2,  l2,  l2, color[0], color[1], color[2], 0.0, 1.0,
            -l2, -l2,  l2, color[0], color[1], color[2], 1.0, 1.0,
            -l2, -l2, -l2, color[0], color[1], color[2], 1.0, 0.0,
            -l2,  l2, -l2, color[0], color[1], color[2], 0.0, 0.0,

            // Right
             l2,  l2,  l2, color[0], color[1], color[2], 0.0, 1.0,
             l2, -l2,  l2, color[0], color[1], color[2], 1.0, 1.0,
             l2, -l2, -l2, color[0], color[1], color[2], 1.0, 0.0,
             l2,  l2, -l2, color[0], color[1], color[2], 0.0, 0.0,

            // Front
            l2,  l2,  l2, color[0], color[1], color[2], 0.0, 1.0,
            l2, -l2,  l2, color[0], color[1], color[2], 1.0, 1.0,
           -l2, -l2,  l2, color[0], color[1], color[2], 1.0, 0.0,
           -l2,  l2,  l2, color[0], color[1], color[2], 0.0, 0.0,

            // Back
            l2,  l2, -l2, color[0], color[1], color[2], 0.0, 1.0,
            l2, -l2, -l2, color[0], color[1], color[2], 1.0, 1.0,
           -l2, -l2, -l2, color[0], color[1], color[2], 1.0, 0.0,
           -l2,  l2, -l2, color[0], color[1], color[2], 0.0, 0.0,

            // Bottom
           -l2, -l2, -l2, color[0], color[1], color[2], 0.0, 1.0,
           -l2, -l2,  l2, color[0], color[1], color[2], 0.0, 0.0,
            l2, -l2,  l2, color[0], color[1], color[2], 1.0, 0.0,
            l2, -l2, -l2, color[0], color[1], color[2], 1.0, 1.0
        ];
    }
}

export class ColorCube extends Cube
{
    public constructor(options: Options) {
        super(options);
        const l2 = options.base ? options.base/2 : 0.5;
        this.vertices = [
        //   X   Y    Z    R    G    B    U    V
            // TOP
            -l2,  l2, -l2, 1.0, 0.0, 0.0, 0.0, 0.0,
            -l2,  l2,  l2, 1.0, 0.0, 0.0, 0.0, 1.0,
             l2,  l2,  l2, 1.0, 0.0, 0.0, 1.0, 1.0, 
             l2,  l2, -l2, 1.0, 0.0, 0.0, 1.0, 0.0,
    
            // LEFT
            -l2,  l2,  l2, 0.0, 1.0, 0.0, 0.0, 1.0,
            -l2, -l2,  l2, 0.0, 1.0, 0.0, 1.0, 1.0,
            -l2, -l2, -l2, 0.0, 1.0, 0.0, 1.0, 0.0,
            -l2,  l2, -l2, 0.0, 1.0, 0.0, 0.0, 0.0,

            // Right
             l2,  l2,  l2, 0.0, 0.0, 1.0, 0.0, 1.0,
             l2, -l2,  l2, 0.0, 0.0, 1.0, 1.0, 1.0,
             l2, -l2, -l2, 0.0, 0.0, 1.0, 1.0, 0.0,
             l2,  l2, -l2, 0.0, 0.0, 1.0, 0.0, 0.0,

            // Front
            l2,  l2,  l2, 1.0, 1.0, 0.0, 0.0, 1.0,
            l2, -l2,  l2, 1.0, 1.0, 0.0, 1.0, 1.0,
           -l2, -l2,  l2, 1.0, 1.0, 0.0, 1.0, 0.0,
           -l2,  l2,  l2, 1.0, 1.0, 0.0, 0.0, 0.0,

            // Back
            l2,  l2, -l2, 1.0, 0.0, 1.0, 0.0, 1.0,
            l2, -l2, -l2, 1.0, 0.0, 1.0, 1.0, 1.0,
           -l2, -l2, -l2, 1.0, 0.0, 1.0, 1.0, 0.0,
           -l2,  l2, -l2, 1.0, 0.0, 1.0, 0.0, 0.0,

            // Bottom
           -l2, -l2, -l2, 0.0, 1.0, 1.0, 0.0, 1.0,
           -l2, -l2,  l2, 0.0, 1.0, 1.0, 0.0, 0.0,
            l2, -l2,  l2, 0.0, 1.0, 1.0, 1.0, 0.0,
            l2, -l2, -l2, 0.0, 1.0, 1.0, 1.0, 1.0
        ];
    }
}
