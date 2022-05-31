import { Renderable } from "src/core/rendering/graphics/renderable";
import { pipelineManager } from "../../rendering/render";
import { Component } from "./component";

export class RenderableComponent extends Component
{
    private _renderable: Renderable | null;

    /**
     * A renderable component is a component that can handle a renderable.
     * @param name Name of the component.
     * @param renderable Renderable that this component handles.
     */
    public constructor(name: string, renderable: Renderable | null)
    {
        super(name);
        this._renderable = renderable;
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
            pipelineManager.unloadFromPipeline(this._renderable.name);
            this._renderable = null;
        }
    }

    public override initialize(): void
    {
        if(this._renderable)
        {
            this._renderable.worldMatrix = this.entity.worldMatrix;
            pipelineManager.loadToPipeline(this._renderable.type, this._renderable);
        }
    }
}