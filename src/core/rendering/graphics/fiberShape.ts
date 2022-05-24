import { Options, LineShape } from "./renderable";

export class Line extends LineShape {

    /**
     * Triangle Basic 2D Shape. Rendered in origin.
     */
    public constructor(options: Options = {}) {
        let base: number = options.base || 1;
        let color: number[] = options.color || [0, 0, 0];
        super();
        this.vertices = [
        //  X Y  Z  R         G         B
        0,    0, 0, color[0], color[1], color[2],
        base, 0, 0, color[0], color[1], color[2]];
        }
}