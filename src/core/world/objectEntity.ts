import { Renderable } from "../rendering/graphics/shapes";
import { Entity } from "./entity";
import { Rotator, Vector3 } from "math";

export class ObjectEntity extends Entity {

    private _renderable: Renderable | null;

    public constructor(name: string, position: Vector3 = new Vector3(), rotation: Rotator = new Rotator(), shape: Renderable | null = null)
    {
        super(name, position, rotation);
        this._renderable = shape;
        this.shape = shape;
    }

    public get shape(): Renderable | null { return this._renderable; }
    public set shape(shape: Renderable | null)
    { 
        if(shape)
        {
            this._renderable = shape;
            this._renderable.position = this.position;
            this._renderable.rotation = this.rotation;
        }
    }

    public override delete(): void
    {
        this._renderable?.unload();
        this._renderable = null;
    }
}