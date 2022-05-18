import { gl } from "../render";
import { Rotator, Vector3 } from "math";
import { Shaders } from "core";
import { Options, Shape } from "./shape";
import { GLArrayBuffer } from "../gl/arrayBuffer";
import { GLElementArrayBuffer } from "../gl/elementArrayBuffer";
import { AttributeInformation } from "../interfaces";

export class Triangle extends Shape {

    /**
     * Triangle Basic 2D Shape. Rendered in origin.
     */
    public constructor(options: Options = {}) {
        let base: number = options.base ? options.base : 1;
        let height: number = options.height ? options.height : 1;
        let color: number[] = options.color ? options.color : [0, 0, 0];
        let position: Vector3 = options.position ? options.position : new Vector3();
        let rotation: Rotator = options.rotation ? options.rotation : new Rotator();
        let shader: Shaders.Shader = options.shader ? options.shader : new Shaders.SimpleShader();
        super(position, rotation, shader);
        this.vertices = [
        //  X       Y          Z    R         G         B
           -base/2, -height/2, 0.0, color[0], color[1], color[2],
            base/2, -height/2, 0.0, color[0], color[1], color[2],
            0.0,     height/2, 0.0, color[0], color[1], color[2]];
        }
}

export class ColorTriangle extends Shape {

    /**
     * Triangle Basic 2D Shape. Rendered in origin.
     */
    public constructor(options: Options = {}) {
        let base: number = options.base ? options.base : 1;
        let height: number = options.height ? options.height : 1;
        let position: Vector3 = options.position ? options.position : new Vector3();
        let rotation: Rotator = options.rotation ? options.rotation : new Rotator();
        let shader: Shaders.Shader = options.shader ? options.shader : new Shaders.SimpleShader();
        super(position, rotation, shader);
        this.vertices = [
        //  X       Y          Z    R    G    B
           -base/2, -height/2, 0.0, 1.0, 0.0, 0.0,
            base/2, -height/2, 0.0, 0.0, 1.0, 0.0,
            0.0,     height/2, 0.0, 0.0, 0.0, 1.0];
        }
}

export class Quad extends Shape {

    /**
     * Quad Basic 2D Shape. Rendered in origin. Consists of 2 adyacent Triangles.
     */
    public constructor(options: Options = {}) {
        let base: number = options.base ? options.base : 1;
        let height: number = options.height ? options.height : 1;
        let color: number[] = options.color ? options.color : [0, 0, 0];
        let position: Vector3 = options.position ? options.position : new Vector3();
        let rotation: Rotator = options.rotation ? options.rotation : new Rotator();
        let shader: Shaders.Shader = options.shader ? options.shader : new Shaders.SimpleShader();
        super(position, rotation, shader);
        this.vertices = [
        //  X       Y          Z    R         G         B
           -base/2, -height/2, 0.0, color[0], color[1], color[2],
            base/2, -height/2, 0.0, color[0], color[1], color[2],
           -base/2,  height/2, 0.0, color[0], color[1], color[2],
        
           -base/2,  height/2, 0.0, color[0], color[1], color[2],
            base/2, -height/2, 0.0, color[0], color[1], color[2],
            base/2,  height/2, 0.0, color[0], color[1], color[2]];
        }
}

export class Line extends Shape {

    /**
     * Triangle Basic 2D Shape. Rendered in origin.
     */
    public constructor(options: Options = {}) {
        let base: number = options.base ? options.base : 1;
        let position: Vector3 = options.position ? options.position : new Vector3();
        let rotation: Rotator = options.rotation ? options.rotation : new Rotator();
        let color: number[] = options.color ? options.color : [0, 0, 0];
        let shader: Shaders.Shader = options.shader ? options.shader : new Shaders.SimpleShader();
        super(position, rotation, shader);
        this.vertices = [
        //  X                Y                Z    R         G         B
        position.x,        position.y, position.z, color[0], color[1], color[2],
        position.x + base, position.y, position.z, color[0], color[1], color[2]];
        }

        public override load(): void {
            this._shader.use();
            this._buffer = new GLArrayBuffer(6, gl.FLOAT, gl.LINES );
    
            let positionAttribute:AttributeInformation = {
                location: this._shader.getAttributeLocation("a_position"),
                size: 3,
                offset: 0 };
            this._buffer.addAttribLocation(positionAttribute);
    
            let colorAttribute:AttributeInformation = {
                location: this._shader.getAttributeLocation("a_color"),
                size: 3, 
                offset: 3 };
            this._buffer.addAttribLocation(colorAttribute);
    
            this._uWorld = this._shader.getUniformLocation('u_world');
            
            this._buffer.pushData(this._vertices);
            this._buffer.upload();
        }
}