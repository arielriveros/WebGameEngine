import { DirectionalLight } from "core";
import { Camera } from "src/core/world/camera";
import { Renderable } from "../graphics/renderable";
import { Shader } from "../shaders/shader";
import { Pipeline } from "./pipeline";

export class PipelineManager
{
    private _pipelines: Pipeline[];

    /**
     * A PipelineManager provides functionality for handling different pipelines.
     */
    public constructor(){
        this._pipelines = [];
    }

    public get pipelines(): Pipeline[] { return this._pipelines; }
    public set pipelines(newPipelines: Pipeline[]) { this._pipelines = newPipelines; }

    /**
     * Adds a pipeline to the manager.
     * @param name Name of the pipeline.
     * @param shader Shader the new pipeline will use.
     */
    public addPipeline(name: string, shader: Shader): void
    {
        let pipeline = new Pipeline(name, shader);
        this._pipelines.push(pipeline);
    }

    /**
     * Gets a pipeline from the manager.
     * @param name Name of the pipeline to find.
     * @returns The pipeline with the given name or null if it doesn't exist.
     */
    public getPipeline(name: string): Pipeline | null
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

    /**
     * Removes a pipeline from the manager.
     * @param name Name of the pipeline to be removed.
     */
    public removePipeline(name: string): void
    {
        const pipeline = this.getPipeline(name);
        if(pipeline)
        {
            pipeline.delete();
            this._pipelines = this._pipelines.filter(p => p !== pipeline);
        }
    }

    /**
     * Loads a renderable to a given pipeline.
     * @param name Name of the pipeline to load the renderable into.
     * @param renderable The renderable to load.
     */
    public loadToPipeline(name: string, renderable: Renderable): void
    {
        const pipeline = this.getPipeline(name);
        if(pipeline)
        {
            pipeline.loadRenderable(renderable);
        }
    }

    /**
     * Unloads a renderable from a the pipelines.
     * @param name Name of the renderable to be unloaded.
     */
    public unloadFromPipeline(name: string): void
    {
        for(let pipeline of this._pipelines)
        {
            pipeline.unloadRenderable(name);
        }
    }

    /**
     * Initializes all pipelines.
     */
    public initialize(): void
    {
        for(let pipeline of this._pipelines)
        {
            pipeline.initialize();
        }
    }

    /**
     * Updates all pipelines.
     */
    public update(): void
    {
        for(let pipeline of this._pipelines)
        {
            pipeline.update();
        }
    }

    /**
     * Sets a common camera for all pipelines that utilize it.
     * @param camera Camera to be used by the pipelines.
     */
    public setCamera( camera: Camera): void
    {
        for(let pipeline of this._pipelines)
        {
            pipeline.camera = camera;
        }
    }

    public setDirectionalLight( directionalLight: DirectionalLight ): void
    {
        for(let pipeline of this._pipelines)
        {
            pipeline.directionalLight = directionalLight;
        }
    }
}