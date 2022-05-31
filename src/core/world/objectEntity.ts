import { Renderable } from "../rendering/graphics/shapes";
import { Entity } from "./entity";
import { Rotator, Vector3 } from "math";
import { RenderableComponent } from "./components/renderableComponent";

export class ObjectEntity extends Entity {

    public constructor(
        name: string,
        position: Vector3 = new Vector3(),
        rotation: Rotator = new Rotator(),
        scale: Vector3 = new Vector3(1, 1, 1),
        newRenderable: Renderable | null = null)
        {
            super(name, position, rotation, scale);
            let component = new RenderableComponent("renderable", newRenderable);
            this.addComponent(component);
        }
}