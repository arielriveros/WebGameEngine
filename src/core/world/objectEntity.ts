import { Renderable } from "../rendering/graphics/shapes";
import { Entity } from "./entity";
import { Rotator, Vector3 } from "math";
import { pipelineManager } from "../rendering/render";

export class ObjectEntity extends Entity {

    private _renderable: Renderable | null = null;

    public constructor(
        name: string,
        position: Vector3 = new Vector3(),
        rotation: Rotator = new Rotator(),
        scale: Vector3 = new Vector3(1, 1, 1),
        newRenderable: Renderable | null = null)
        {
            super(name, position, rotation, scale);
            this.renderable = newRenderable;
        }

    public get renderable(): Renderable | null { return this._renderable; }
    public set renderable(newRenderable: Renderable | null)
    { 
        if(newRenderable)
        {
            this._renderable = newRenderable;
            this._renderable.worldMatrix = this.worldMatrix;
        }
    }

    public override delete(): void
    {
        if(this._renderable)
        {
            pipelineManager.unloadFromPipeLine(this._renderable.name);
            this._renderable = null;
        }
    }

    public override initialize(): void {
        if(this._renderable)
        {
            pipelineManager.loadToPipeLine(this._renderable.type, this._renderable);
        }
    }
}