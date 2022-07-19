import { Transform, Vector3 } from "math";
import { CollisionShape } from "./collisionShape";

export class AxisAlignedBouningBox extends CollisionShape
{
    private _width: number;
    private _height: number;
    private _depth: number;

    public constructor( transform: Transform, width: number, height: number, depth: number)
    {
        super(transform);
        this._width = width;
        this._height = height;
        this._depth = depth;
    }

    public get width(): number { return this._width; }
    public set width(value: number) { this._width = value; }

    public get height(): number { return this._height; }
    public set height(value: number) { this._height = value; }

    public get depth(): number { return this._depth; }
    public set depth(value: number) { this._depth = value; }

    public get min(): Vector3 { return new Vector3(this.position.x - this._width / 2, this.position.y - this._height / 2, this.position.z - this._depth / 2); }
    public get max(): Vector3 { return new Vector3(this.position.x + this._width / 2, this.position.y + this._height / 2, this.position.z + this._depth / 2); }

    public isPointInsideBox(point: Vector3): boolean
    {
        return point.x >= this.min.x && point.x <= this.max.x &&
               point.y >= this.min.y && point.y <= this.max.y &&
               point.z >= this.min.z && point.z <= this.max.z;
    }

    public override collides(other: CollisionShape): boolean
    {
        if (other instanceof AxisAlignedBouningBox)
        {
            let otherMin: Vector3 = other.min;
            let otherMax: Vector3 = other.max;

            return this.min.x <= otherMax.x && otherMin.x <= this.max.x && 
                   this.min.y <= otherMax.y && otherMin.y <= this.max.y && 
                   this.min.z <= otherMax.z && otherMin.z <= this.max.z  
        }
        return false;
    }
}