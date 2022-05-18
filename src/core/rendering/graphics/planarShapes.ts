import { Rotator, Vector3 } from "math";
import { Shaders } from "core";
import { Options, Shape } from "./shape";

export class Triangle extends Shape {

    /**
     * Triangle Basic 2D Shape. Rendered in origin.
     * @param name  Custom name of this object.
     * @param base  Length of triangle base.
     * @param height Length from the base to the opposite vertex. i.e. Height of a triangle.
     * @param color RGB Color of the triangle.
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
     * @param name  Custom name of this object.
     * @param base  Length of triangle base.
     * @param height Length from the base to the opposite vertex. i.e. Height of a triangle.
     * @param color RGB Color of the triangle.
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
     * @param name  Custom name of this object.
     * @param base  Length of Quad base.
     * @param height Length of Quad height.
     * @param color RGB Color of the Quad.
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