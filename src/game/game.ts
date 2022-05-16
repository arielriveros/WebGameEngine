import { Vector3 } from '../core/math/vector';
import { Camera } from '../core/rendering/graphics/camera';
import { Scene } from '../core/world/scene';
import * as SHAPE from '../core/rendering/graphics/shape'
import { InputManager } from '../core/input/manager';
import { GameInterface } from './gameInterface';
import { SimpleShaderTest } from '../core/rendering/shaders/shader';

export class Game extends GameInterface{

    public override start(): void {
        this._camera = new Camera(new Vector3(0.5, 0, 0.5));
        this._scene = new Scene();
        let controllable = new SHAPE.ColorCube('test0', { base: 0.2,color: [0, 0.5, 0.5], position: new Vector3(0, 0.2, 0.0), shader: new SimpleShaderTest() });
        this._scene.addControllable(controllable);
        this._scene.addShape(new SHAPE.Triangle('test1', { color: [0, 0.5, 0.5], position: new Vector3(0, 0, 0.5) }));
        this._scene.addShape(new SHAPE.Quad("test2"));
        this._scene.addShape(new SHAPE.Shape('test0', new Vector3(0, 0, 0.001)));
    }

    public override inputListen(input: InputManager): void {
        if(input.isKeyDown('ArrowLeft')) {
            this.camera.move(new Vector3(0, 0, 0.02));
        }
        if(input.isKeyDown('ArrowRight')) {
            this.camera.move(new Vector3(0, 0, -0.02));
        }
        if(input.isKeyDown('ArrowUp')) {
            this.camera.move(new Vector3(0, 0.02, 0));
        }
        if(input.isKeyDown('ArrowDown')) {
            this.camera.move(new Vector3(0, -0.02, 0));
        }

        if(input.isKeyDown('KeyA')) {
            this.scene.controllable.move(new Vector3(-0.01, 0, 0));
        }
        if(input.isKeyDown('KeyD')) {
            this.scene.controllable.move(new Vector3(0.01, 0, 0));
        }
        if(input.isKeyDown('KeyW')) {
            this.scene.controllable.move(new Vector3(0, 0.02, 0));
        }
        if(input.isKeyDown('KeyS')) {
            this.scene.controllable.move(new Vector3(0, -0.02, 0));
        }

        if(input.isKeyDown('KeyQ')) {
            this.scene.controllable.move(new Vector3(0, 0, 0.02));
        }
        if(input.isKeyDown('KeyE')) {
            this.scene.controllable.move(new Vector3(0, 0, -0.02));
        }

        if(input.isKeyDown('Space')) {
            console.log("Space");
            this.camera.setFocalPoint(this.scene.controllable.position);
        }
    }
}