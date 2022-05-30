import { Camera } from "src/core/world/camera";
import { Renderable } from "../graphics/renderable";
import { Shader } from "../shaders/shader";
import { PipeLine } from "./pipeline";

export class PipeLineManager
{
    private _pipelines: PipeLine[];

    public constructor(){
        this._pipelines = [];
    }

    public get pipelines(): PipeLine[] { return this._pipelines; }
    public set pipelines(newPipelines: PipeLine[]) { this._pipelines = newPipelines; }

    public addPipeline(name: string, shader: Shader): void
    {
        let pipeline = new PipeLine(name, shader);
        this._pipelines.push(pipeline);
    }

    public getPipeline(name: string): PipeLine | null
    {
        for(let pipeline of this._pipelines)
        {
            if(pipeline.name === name)
            {
                return pipeline;
            }
        }
        return null;
    }

    public removePipeline(name: string): void
    {
        const pipeline = this.getPipeline(name);
        if(pipeline)
        {
            pipeline.delete();
            this._pipelines = this._pipelines.filter(p => p !== pipeline);
        }
    }

    public loadToPipeLine(name: string, renderable: Renderable): void
    {
        const pipeline = this.getPipeline(name);
        if(pipeline)
        {
            pipeline.loadRenderable(renderable);
        }
    }

    public initialize(): void
    {
        for(let pipeline of this._pipelines)
        {
            pipeline.initialize();
        }
    }

    public update(): void
    {
        for(let pipeline of this._pipelines)
        {
            pipeline.update();
        }
    }

    public setCamera( camera: Camera): void
    {
        for(let pipeline of this._pipelines)
        {
            pipeline.camera = camera;
        }
    }
}