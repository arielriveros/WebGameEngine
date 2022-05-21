import { Camera } from "../rendering/graphics/camera";
import { Entity } from "./entity";

export class Scene {
    private _entities: Entity[];
    private _camera!: Camera;

    public constructor() {
        this._entities = [];
    }

    public get entities() {
        return this._entities;
    }

    public addEntity(entity: Entity): void {
        entity.shape?.load();
        this._entities.push(entity);
    }

    public removeEntity(entityName: string): void { 
        for (let i = 0; i < this._entities.length; i++) {
            if (this._entities[i].name === entityName) {
                this._entities.splice(i, 1);
                break;
            }
        }
    }

    public getEntity(entityName: string): Entity | null {
        for (const e of this._entities) {
            if (e.name === entityName) {
                return e;
            }
        }
        return null;
    }

    public initialize(camera: Camera): void {
        this._camera = camera;
    }

    public update(): void {
        for (const i of this._entities) {
            i.shape?.update();
            i.shape?.draw(this._camera);
        }
    }
}