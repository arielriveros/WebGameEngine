import { Shaders } from "core";
import { Options, Shape, SimpleShape, TexturedShape } from "./shape";

export class Cube extends SimpleShape {
    public constructor(options: Options = {}) {
        let base: number = options.base || 1;
        let color: number[] = options.color || [0, 0, 0];
        super(options.position, options.rotation);
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
        //   X   Y    Z   R         G         B
            // TOP
            -l2,  l2, -l2, color[0], color[1], color[2],
            -l2,  l2,  l2, color[0], color[1], color[2],
             l2,  l2,  l2, color[0], color[1], color[2],
             l2,  l2, -l2, color[0], color[1], color[2],
 
            // LEFT
            -l2,  l2,  l2, color[0], color[1], color[2],
            -l2, -l2,  l2, color[0], color[1], color[2],
            -l2, -l2, -l2, color[0], color[1], color[2],
            -l2,  l2, -l2, color[0], color[1], color[2],

            // Right
             l2,  l2,  l2, color[0], color[1], color[2],
             l2, -l2,  l2, color[0], color[1], color[2],
             l2, -l2, -l2, color[0], color[1], color[2],
             l2,  l2, -l2, color[0], color[1], color[2],

            // Front
            l2,  l2,  l2, color[0], color[1], color[2],
            l2, -l2,  l2, color[0], color[1], color[2],
           -l2, -l2,  l2, color[0], color[1], color[2],
           -l2,  l2,  l2, color[0], color[1], color[2],

            // Back
            l2,  l2, -l2, color[0], color[1], color[2],
            l2, -l2, -l2, color[0], color[1], color[2],
           -l2, -l2, -l2, color[0], color[1], color[2],
           -l2,  l2, -l2, color[0], color[1], color[2],

            // Bottom
           -l2, -l2, -l2, color[0], color[1], color[2],
           -l2, -l2,  l2, color[0], color[1], color[2],
            l2, -l2,  l2, color[0], color[1], color[2],
            l2, -l2, -l2, color[0], color[1], color[2],
        ];
    }
}

export class ColorCube extends Cube {
    public constructor(options: Options) {
        super(options);
        this._shader = new Shaders.SimpleShaderTest();
        const l2 = options.base ? options.base/2 : 0.5;
        this.vertices = [
        //   X   Y    Z    R    G    B
            // TOP
            -l2,  l2, -l2, 1.0, 0.0, 0.0,
            -l2,  l2,  l2, 1.0, 0.0, 0.0,
             l2,  l2,  l2, 1.0, 0.0, 0.0,
             l2,  l2, -l2, 1.0, 0.0, 0.0,
    
            // LEFT
            -l2,  l2,  l2, 0.0, 1.0, 0.0,
            -l2, -l2,  l2, 0.0, 1.0, 0.0,
            -l2, -l2, -l2, 0.0, 1.0, 0.0,
            -l2,  l2, -l2, 0.0, 1.0, 0.0,

            // Right
             l2,  l2,  l2, 0.0, 0.0, 1.0,
             l2, -l2,  l2, 0.0, 0.0, 1.0,
             l2, -l2, -l2, 0.0, 0.0, 1.0,
             l2,  l2, -l2, 0.0, 0.0, 1.0,

            // Front
            l2,  l2,  l2, 1.0, 1.0, 0.0,
            l2, -l2,  l2, 1.0, 1.0, 0.0,
           -l2, -l2,  l2, 1.0, 1.0, 0.0,
           -l2,  l2,  l2, 1.0, 1.0, 0.0,

            // Back
            l2,  l2, -l2, 1.0, 0.0, 1.0,
            l2, -l2, -l2, 1.0, 0.0, 1.0,
           -l2, -l2, -l2, 1.0, 0.0, 1.0,
           -l2,  l2, -l2, 1.0, 0.0, 1.0,

            // Bottom
           -l2, -l2, -l2, 0.0, 1.0, 1.0,
           -l2, -l2,  l2, 0.0, 1.0, 1.0,
            l2, -l2,  l2, 0.0, 1.0, 1.0,
            l2, -l2, -l2, 0.0, 1.0, 1.0,
        ];
    }
}

export class TexturedCube extends TexturedShape {
    public constructor(texture: HTMLImageElement, options: Options) {
        super(options.position, options.rotation, texture);
        const l2 = options.base ? options.base/2 : 0.5;
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
        //   X     Y     Z     U     V
            // TOP
            -l2,  l2, -l2, 0.0, 0.0,
            -l2,  l2,  l2, 0.0, 1.0,
             l2,  l2,  l2, 1.0, 1.0,
             l2,  l2, -l2, 1.0, 0.0,

            // LEFT
            -l2,  l2,  l2, 0.0, 1.0,
            -l2, -l2,  l2, 0.0, 0.0,
            -l2, -l2, -l2, 1.0, 0.0,
            -l2,  l2, -l2, 1.0, 1.0,

            // Right
             l2,  l2,  l2, 1.0, 1.0,
             l2, -l2,  l2, 1.0, 0.0,
             l2, -l2, -l2, 0.0, 0.0,
             l2,  l2, -l2, 0.0, 1.0,

            // Front
            l2,  l2,  l2, 1.0, 1.0,
            l2, -l2,  l2, 1.0, 0.0,
           -l2, -l2,  l2, 0.0, 0.0,
           -l2,  l2,  l2, 0.0, 1.0,

            // Back
            l2,  l2, -l2, 1.0, 0.0,
            l2, -l2, -l2, 1.0, 1.0,
           -l2, -l2, -l2, 0.0, 1.0,
           -l2,  l2, -l2, 0.0, 0.0,

            // Bottom
           -l2, -l2, -l2, 0.0, 0.0,
           -l2, -l2,  l2, 0.0, 1.0,
            l2, -l2,  l2, 1.0, 1.0,
            l2, -l2, -l2, 1.0, 0.0,
        ];
    }
}