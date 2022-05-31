import { Renderable } from "src/core/rendering/graphics/renderable";
import { pipelineManager } from "../../rendering/render";
import { Entity } from "../entity";
import { Component } from "./component";

export class RenderableComponent extends Component
{
    private _renderable: Renderable | null;

    public constructor(entity: Entity, name: string, renderable: Renderable | null)
    {
        super(entity, name);
        this._renderable = renderable;
        if(this._renderable)
        {
            this._renderable.worldMatrix = this.entity.worldMatrix;
        }
    }

    public get renderable(): Renderable | null { return this._renderable; }
    public set renderable(newRenderable: Renderable | null)
    { 
        if(newRenderable)
        {
            this._renderable = newRenderable;
            this._renderable.worldMatrix = this.entity.worldMatrix;
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

    public override initialize(): void
    {
        if(this._renderable)
        {
            pipelineManager.loadToPipeLine(this._renderable.type, this._renderable);
        }
    }
}