import { LOG } from "../utilities/logger";
import { CollisionShape } from "./collisionShape";

export class CollisionManager
{
    private _collisionShapes: CollisionShape[] = [];

    public constructor() {}

    public addCollisionShape(collisionShape: CollisionShape): void
    {
        this._collisionShapes.push(collisionShape);
    }

    public removeCollisionShape(collisionShape: CollisionShape): void
    {
        let index: number = this._collisionShapes.indexOf(collisionShape);
        if (index > -1)
        {
            this._collisionShapes.splice(index, 1);
        }
    }

    public update(): void
    {
        for(let coll1 of this._collisionShapes)
        {
            for(let coll2 of this._collisionShapes)
            {
                if(coll1.collides(coll2) && coll1 !== coll2)
                {
                    LOG(`Collision detected at ${coll1.position}`);
                }
            }
        }
    }
}