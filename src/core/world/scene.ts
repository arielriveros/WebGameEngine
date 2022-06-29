import { Entity } from "./entity";
import { DirectionalLight, Light } from "./light";
import { ObjectEntity } from "./objectEntity";

export class Scene
{
    private _objects: Entity[];
    private _directionalLight!: DirectionalLight ;

    /**
     * A Scene object is a collection of Entities that handles inner functionalities for each entity in a scene.
     */
    public constructor()
    {
        this._objects = [];
    }

    public get entities() { return this._objects; }

    public get directionalLight() { return this._directionalLight; }
    public set directionalLight(value: DirectionalLight ) { this._directionalLight = value; }

    /**
     * Adds an entity object to the scene.
     * @param entity Entity to be added to the scene.
     */
    public addEntity(entity: Entity): void
    {
        entity.initialize();
        if(entity instanceof ObjectEntity)
        {
            this._objects.push(entity);
        }

        else if (entity instanceof DirectionalLight)
        {
            this._directionalLight = entity;
        }
    }

    /**
     * Removes an entity object from the scene.
     * @param entityName Name of the Entity to be removed from the scene.
     */
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

    /**
     * Gets an entity object from the scene.
     * @param entityName Name of the object to get from the scene.
     * @returns Entity object from the scene if it exists, null otherwise.
     */
    public getEntity(entityName: string): Entity | null
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

    /**
     * Initialization function for the scene.
     */
    public initialize(): void { }

    /**
     * Runs every frame.
     */
    public update(delta: number = 0): void {
        for (const e of this._objects)
        {
            e.update(delta); // Each entity updates itself every frame.
        }
    }
}