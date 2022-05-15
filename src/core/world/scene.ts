import { Shape } from "../rendering/graphics/shape";
import { Shader } from "../rendering/shaders/shader";

export class Scene {
    private _shapes: Shape[];
    private _sceneShader!: Shader;

    public constructor() {
        this._shapes = [];
    }

    public get shader(): Shader {
        return this._sceneShader;
    }

    public addShape(shape: Shape): void {
        this._shapes.push(shape);
    }

    public initialize(shader: Shader = new Shader()): void {
        this._sceneShader = shader;
        for (const i of this._shapes) {
            i.load(this._sceneShader);
        }
    }

    public update(): void {
        for (const i of this._shapes) {
            i.update();
        }
    }
}