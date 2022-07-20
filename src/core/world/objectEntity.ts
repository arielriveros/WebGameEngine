import { Renderable } from "../rendering/graphics/shapes";
import { Entity } from "./entity";
import { RenderableComponent } from "./components/renderableComponent";
import { TransformParameters } from "../math/transform";

export class ObjectEntity extends Entity {

    /**
     * An object entity is an entity that may contain a renderable component.
     * @param name Name of the entity.
     * @param position Position of the Entity
     * @param rotation Rotation of the Entity
     * @param scale Scale of the Entity
     * @param newRenderable Renderable to add to the entity.
     */
    public constructor(
        name: string,
        transformParameters: TransformParameters = {},
        newRenderable: Renderable | null = null)
        {
            super(name, transformParameters);
            let component = new RenderableComponent("renderable", newRenderable);
            this.addComponent(component);
        }
}