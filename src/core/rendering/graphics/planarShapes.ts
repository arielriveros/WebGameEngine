import { LineShape, Options, SimpleShape } from "./renderable";

export class Triangle extends SimpleShape {

    /**
     * Triangle Basic 2D Shape. Rendered in origin.
     */
    public constructor(options: Options = {}) {
        let base: number = options.base || 1;
        let height: number = options.height || base;
        let color: number[] = options.color || [0, 0, 0];
        super(options.position, options.rotation);
        this.vertices = [
        //  X       Y          Z    R         G         B
           -base/2, -height/2, 0.0, color[0], color[1], color[2],
            base/2, -height/2, 0.0, color[0], color[1], color[2],
            0.0,     height/2, 0.0, color[0], color[1], color[2]];
        }
}

export class ColorTriangle extends SimpleShape {

    /**
     * Triangle Basic 2D Shape. Rendered in origin.
     */
    public constructor(options: Options = {}) {
        let base: number = options.base || 1;
        let height: number = options.height || 1;
        super(options.position, options.rotation);
        this.vertices = [
        //  X       Y          Z    R    G    B
           -base/2, -height/2, 0.0, 1.0, 0.0, 0.0,
            base/2, -height/2, 0.0, 0.0, 1.0, 0.0,
            0.0,     height/2, 0.0, 0.0, 0.0, 1.0];
        }
}

export class Quad extends SimpleShape {

    /**
     * Quad Basic 2D Shape. Rendered in origin. Consists of 2 adyacent Triangles.
     */
    public constructor(options: Options = {}) {
        let base: number = options.base || 1;
        let height: number = options.height || 1;
        let color: number[] = options.color || [0, 0, 0];
        super(options.position, options.rotation);
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

export class Line extends LineShape {

    /**
     * Triangle Basic 2D Shape. Rendered in origin.
     */
    public constructor(options: Options = {}) {
        let base: number = options.base || 1;
        let color: number[] = options.color || [0, 0, 0];
        super(options.position, options.rotation);
        this.vertices = [
        //  X Y  Z  R         G         B
        0,    0, 0, color[0], color[1], color[2],
        base, 0, 0, color[0], color[1], color[2]];
        }
}