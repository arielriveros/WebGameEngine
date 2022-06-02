import { Vector3 } from "math";
import { CompoundShape } from "./compoundShape";
import { Options } from "./renderable";
import { SimpleShape } from "./simpleShape";

class Line extends SimpleShape {

    public constructor(options: Options = {}, origin?: Vector3, end?: Vector3) {
        let base: number = options.base || 1;
        let color: number[] = options.color || [0, 0, 0];

        let x_0 = origin ? origin.x : 0;
        let y_0 = origin ? origin.y : 0;
        let z_0 = origin ? origin.z : 0;

        let x_1 = end ? end.x : base;
        let y_1 = end ? end.y : 0;
        let z_1 = end ? end.z : 0;

        super();
        this.vertices = [
        //  X    Y    Z    R         G         B
            x_0, y_0, z_0, color[0], color[1], color[2],
            x_1, y_1, z_1, color[0], color[1], color[2]];
        }
}

class Triangle extends CompoundShape
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
        // VERTEX POSITION          COLOR                           TEXTURE     NORMALS
        // X       Y          Z     R         G         B           u    v       x   y    z
          -base/2, -height/2, 0.0,  color[0], color[1], color[2],   0.0, 1.0,   0.0, 0.0, 1.0,
           base/2, -height/2, 0.0,  color[0], color[1], color[2],   1.0, 1.0,   0.0, 0.0, 1.0,
           0.0,     height/2, 0.0,  color[0], color[1], color[2],   0.5, 0.0,   0.0, 0.0, 1.0];
        }
}

class Quad extends CompoundShape {

    /**
     * Quad Basic 2D Shape. Rendered at origin. Consists of 2 adyacent Triangles.
     */
    public constructor(options: Options = {})
    {
        let base: number = options.base || 1;
        let height: number = options.height || 1;
        let color: number[] = options.color || [1, 1, 1];
        super(options.texturePath);
        this.vertices = [
        // VERTEX POSITION          COLOR                           TEXTURE     NORMALS
        // X        Y         Z     R         G         B           U    V      x    y    z
          -base/2, -height/2, 0.0,  color[0], color[1], color[2],   0.0, 0.0,   0.0, 0.0, 1.0,
           base/2, -height/2, 0.0,  color[0], color[1], color[2],   1.0, 0.0,   0.0, 0.0, 1.0,
          -base/2,  height/2, 0.0,  color[0], color[1], color[2],   0.0, 1.0,   0.0, 0.0, 1.0,

          -base/2,  height/2, 0.0,  color[0], color[1], color[2],   0.0, 1.0,   0.0, 0.0, 1.0,
           base/2, -height/2, 0.0,  color[0], color[1], color[2],   1.0, 0.0,   0.0, 0.0, 1.0,
           base/2,  height/2, 0.0,  color[0], color[1], color[2],   1.0, 1.0,   0.0, 0.0, 1.0];
        }
}

class Cube extends CompoundShape
{
    /**
     * Cube Basic 3D Shape. Rendered at origin. Consists of 6 Quads for each face.
     */
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
        // VERTEX POSITION  COLOR                           TEXTURE    NORMALS
        // X    Y    Z      R         G         B           U    V     x     y     z
        // TOP
          -l2,  l2, -l2,    color[0], color[1], color[2],   1/4, 0.0,  0.0,  1.0,  0.0,
          -l2,  l2,  l2,    color[0], color[1], color[2],   1/4, 1/4,  0.0,  1.0,  0.0,
           l2,  l2,  l2,    color[0], color[1], color[2],   1/2, 1/4,  0.0,  1.0,  0.0,
           l2,  l2, -l2,    color[0], color[1], color[2],   1/2, 0.0,  0.0,  1.0,  0.0,
        // LEFT
          -l2,  l2,  l2,    color[0], color[1], color[2],   1/4, 1/3, -1.0,  0.0,  0.0,
          -l2, -l2,  l2,    color[0], color[1], color[2],   1/4, 2/3, -1.0,  0.0,  0.0,
          -l2, -l2, -l2,    color[0], color[1], color[2],   0.0, 2/3, -1.0,  0.0,  0.0,
          -l2,  l2, -l2,    color[0], color[1], color[2],   0.0, 1/3, -1.0,  0.0,  0.0,
        // Right
           l2,  l2,  l2,    color[0], color[1], color[2],   1/2, 1/3,  1.0,  0.0,  0.0,
           l2, -l2,  l2,    color[0], color[1], color[2],   1/2, 2/3,  1.0,  0.0,  0.0,
           l2, -l2, -l2,    color[0], color[1], color[2],   3/4, 2/3,  1.0,  0.0,  0.0,
           l2,  l2, -l2,    color[0], color[1], color[2],   3/4, 1/3,  1.0,  0.0,  0.0,
        // Front
           l2,  l2,  l2,    color[0], color[1], color[2],   1/2, 1/3,  0.0,  0.0,  1.0,
           l2, -l2,  l2,    color[0], color[1], color[2],   1/2, 2/3,  0.0,  0.0,  1.0,
          -l2, -l2,  l2,    color[0], color[1], color[2],   1/4, 2/3,  0.0,  0.0,  1.0,
          -l2,  l2,  l2,    color[0], color[1], color[2],   1/4, 1/3,  0.0,  0.0,  1.0,
        // Back
           l2,  l2, -l2,    color[0], color[1], color[2],   3/4, 1/3,  0.0,  0.0, -1.0,
           l2, -l2, -l2,    color[0], color[1], color[2],   3/4, 2/3,  0.0,  0.0, -1.0,
          -l2, -l2, -l2,    color[0], color[1], color[2],   1.0, 2/3,  0.0,  0.0, -1.0,
          -l2,  l2, -l2,    color[0], color[1], color[2],   1.0, 1/3,  0.0,  0.0, -1.0,
        // Bottom
          -l2, -l2, -l2,    color[0], color[1], color[2],   1/4, 1.0,  0.0, -1.0,  0.0,
          -l2, -l2,  l2,    color[0], color[1], color[2],   1/4, 2/3,  0.0, -1.0,  0.0,
           l2, -l2,  l2,    color[0], color[1], color[2],   1/2, 2/3,  0.0, -1.0,  0.0,
           l2, -l2, -l2,    color[0], color[1], color[2],   1/2, 1.0,  0.0, -1.0,  0.0
        ];
    }
}

export { Renderable } from "./renderable";
export { Line, Triangle, Quad, Cube };