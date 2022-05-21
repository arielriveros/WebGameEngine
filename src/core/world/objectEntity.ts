import { Shape } from "../rendering/graphics/shapes";
import { Entity } from "./entity";
import { Rotator, Vector3 } from "math";

export class ObjectEntity extends Entity {

    private _shape: Shape | null;

    public constructor(name: string, position: Vector3 = new Vector3(), rotation: Rotator = new Rotator(), shape: Shape | null = null)
    {
        super(name, position, rotation);
        this._shape = shape;
        this.shape = shape;
    }

    public get shape(): Shape | null { return this._shape; }
    public set shape(shape: Shape | null)
    { 
        if(shape)
        {
            this._shape = shape;
            this._shape.position = this.position;
            this._shape.rotation = this.rotation;
        }
    }

    public override delete(): void
    {
        this._shape?.unload();
        this._shape = null;
    }
}