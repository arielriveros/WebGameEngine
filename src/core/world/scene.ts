import { Camera } from "./camera";
import { ObjectEntity } from "./objectEntity";

export class Scene
{
    private _objects: ObjectEntity[];
    private _camera!: Camera;

    public constructor()
    {
        this._objects = [];
    }

    public get entities()
    {
        return this._objects;
    }

    public get camera()
    {
        return this._camera;
    }

    public addEntity(entity: ObjectEntity): void
    {
        entity.renderable?.load();
        this._objects.push(entity);
    }

    public removeEntity(entityName: string): void
    { 
        for (let i = 0; i < this._objects.length; i++)
        {
            if (this._objects[i].name === entityName)
            {
                this._objects[i].delete();
                this._objects.splice(i, 1);
                break;
            }
        }
    }

    public getEntity(entityName: string): ObjectEntity | null
    {
        for (const e of this._objects)
        {
            if (e.name === entityName)
            {
                return e;
            }
        }
        return null;
    }

    public initialize(camera: Camera): void
    {
        this._camera = camera;
    }

    public update(): void { }
}