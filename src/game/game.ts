import { GameBase } from './gameInterface';
import { Vector3, Camera, Scene, InputManager, Shapes, Shaders } from 'core';
import { Rotator } from 'math';

export class Game extends GameBase{

    private _cameraSpeed = 0.1;

    public override setUp(): void {
        this.camera = new Camera(new Vector3(0, 0, 1));
        this.scene = new Scene();
    }

    private addGrid(scene: Scene) {
        for(let i = -10; i < 10; i++) {
            scene.addShape(new Shapes.Line({position: new Vector3(i, 0, 0), rotation: new Rotator(45, 0, 0), base:10}));
            scene.addShape(new Shapes.Line({position: new Vector3(0, 0, i), rotation: new Rotator(0, 0, 0), base: 10, color: [0.7, 0.7, 0.7]}));
        }
    }

    public override start(): void { 
        let controllable = new Shapes.ColorCube({ base: 0.2,color: [0, 0.5, 0.5], position: new Vector3(0, 0.2, 0.0), shader: new Shaders.SimpleShaderTest() });
        this.scene.addControllable(controllable);
        this.camera.setFocalPoint(this.scene.controllable.position);
        this.scene.addShape(new Shapes.Triangle({ color: [0, 0.5, 0.5], position: new Vector3(0, 1, -0.5) }));
        this.scene.addShape(new Shapes.Quad());
        this.scene.addShape(new Shapes.ColorTriangle({position: new Vector3(0, 0, 0.001)}));
    //  this.scene.addShape(new Shapes.Line({base: 1, color: [0.2, 0, 0.8]}))
        this.addGrid(this.scene);
        for(let i = 0; i < 9; i++) {
            this.scene.addShape(new Shapes.Cube({ 
                base: 0.1, 
                position: new Vector3(
                    (Math.random()-Math.random()) * 10,
                    (Math.random()-Math.random()) * 10,
                    (Math.random()-Math.random()) * 10
                    ),
                color: [Math.random(), Math.random(), Math.random()]}))
        }
    }

    public override onUpdate(): void { }

    public override inputListen(input: InputManager): void {
        
        if(input.isKeyDown('Numpad4')) {
            this.camera.move(new Vector3(-this._cameraSpeed, 0));
        }
        if(input.isKeyDown('Numpad6')) {
            this.camera.move(new Vector3(this._cameraSpeed, 0, 0));
        }
        if(input.isKeyDown('Numpad8')) {
            this.camera.move(new Vector3(0, this._cameraSpeed, 0));
        }
        if(input.isKeyDown('Numpad2')) {
            this.camera.move(new Vector3(0, -this._cameraSpeed, 0));
        }
        if(input.isKeyDown('Numpad3')) {
            this.camera.move(new Vector3(0, 0, this._cameraSpeed));
        }
        if(input.isKeyDown('Numpad1')) {
            this.camera.move(new Vector3(0, 0, -this._cameraSpeed));
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

        if(input.isKeyDown('Digit1')) {
            this.scene.controllable.rotate(  new Rotator(10, 0, 0));
        }
        if(input.isKeyDown('Digit2')) {
            this.scene.controllable.rotate( new Rotator(-10, 0, 0));
        }
        if(input.isKeyDown('Digit3')) {
            this.scene.controllable.rotate(  new Rotator(0, 10, 0));
        }
        if(input.isKeyDown('Digit4')) {
            this.scene.controllable.rotate( new Rotator(0, -10, 0));
        }
        if(input.isKeyDown('Digit5')) {
            this.scene.controllable.rotate(  new Rotator(0, 0, 10));
        }
        if(input.isKeyDown('Digit6')) {
            this.scene.controllable.rotate( new Rotator(0, 0, -10));
        }

        if(input.isKeyDown('Space')) {
            let index = Math.floor(Math.random() * this.scene.shapes.length);
            let selectedShape = this.scene.shapes[index];
            this.scene.setControllable(selectedShape);
            this.camera.setFocalPoint(this.scene.controllable.position);
        }
    }
}