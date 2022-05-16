import { Vector3 } from '../core/math/vector';
import { Camera } from '../core/rendering/graphics/camera';
import { Scene } from '../core/world/scene';
import * as SHAPE from '../core/rendering/graphics/shape'
import { InputManager } from '../core/input/manager';
import { GameBase } from './gameInterface';
import { SimpleShaderTest } from '../core/rendering/shaders/shader';

export class Game extends GameBase{

    public override setUp(): void {
        this.camera = new Camera(new Vector3(0, 0, 1));
        this.scene = new Scene();
    }

    public override start(): void { 
        let controllable = new SHAPE.ColorCube({ base: 0.2,color: [0, 0.5, 0.5], position: new Vector3(0, 0.2, 0.0), shader: new SimpleShaderTest() });
        this.scene.addControllable(controllable);
        this.scene.addShape(new SHAPE.Triangle({ color: [0, 0.5, 0.5], position: new Vector3(0, 0, 0.5) }));
        this.scene.addShape(new SHAPE.Quad());
        this.scene.addShape(new SHAPE.Shape(new Vector3(0, 0, 0.001)));
    }

    public override inputListen(input: InputManager): void {
        if(input.isKeyDown('ArrowLeft')) {
            this.camera.move(new Vector3(-0.02, 0));
        }
        if(input.isKeyDown('ArrowRight')) {
            this.camera.move(new Vector3(0.02, 0, 0));
        }
        if(input.isKeyDown('ArrowUp')) {
            this.camera.move(new Vector3(0, 0.02, 0));
        }
        if(input.isKeyDown('ArrowDown')) {
            this.camera.move(new Vector3(0, -0.02, 0));
        }
        if(input.isKeyDown('ControlLeft')) {
            this.camera.move(new Vector3(0, 0, 0.02));
        }
        if(input.isKeyDown('AltLeft')) {
            this.camera.move(new Vector3(0, 0, -0.02));
        }

        if(input.isKeyDown('KeyA')) {
            this.scene.controllable.move(new Vector3(-0.02, 0, 0));
        }
        if(input.isKeyDown('KeyD')) {
            this.scene.controllable.move(new Vector3(0.02, 0, 0));
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
            let index = Math.floor(Math.random() * this.scene.shapes.length);
            let selectedShape = this.scene.shapes[index];
            this.scene.setControllable(selectedShape);
            this.camera.setFocalPoint(this.scene.controllable.position);
        }
    }
}