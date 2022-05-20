import { GameBase } from './gameInterface';
import { PerspectiveCamera, Scene, InputManager, Shapes, OrthographicCamera, Entity } from 'core';
import { Vector3, Rotator } from 'math';

export class Game extends GameBase{

    private _cameraOptions = {cameraSpeed: 0.1};

    public override setUp(): void {
        let perspectiveCamera = new PerspectiveCamera({position: new Vector3(0, 0, 1), fovy: 1.5});
        let orthographicCamera = new OrthographicCamera({position: new Vector3(0, 0, 1)});
        this.camera = perspectiveCamera;
        this.scene = new Scene();
    }

    private addGrid(size: number = 10) {
        for(let i = -size; i <= size; i++) {
            this.scene.addEntity(new Entity(`line-${i}h`, new Vector3(i, 0, size), new Rotator(90, 0, 0), new Shapes.Line({base:2 * size, color: [0.5, 0.5, 0.5]}) ));
            this.scene.addEntity(new Entity(`line-${i}v`, new Vector3(-size, 0, i), new Rotator(0, 0, 0), new Shapes.Line({base:2 * size, color: [0.7, 0.7, 0.7]}) ));
        }
    }

    private addRandomCubes(count: number) {
        for(let i = 0; i < count; i++) {
            let newCube = new Shapes.Cube({ 
                base: 0.1, 
                color: [Math.random(), Math.random(), Math.random()]})
            this.scene.addEntity(
                new Entity(
                    `randCube-${i}`,
                    new Vector3((Math.random()-Math.random()) * 10,
                                (Math.random()-Math.random()) * 10,
                                (Math.random()-Math.random()) * 10),
                    new Rotator(Math.random() * 360, Math.random() * 360, Math.random() * 360),
                    newCube
                )
            )
        }
    }

    private addControllable() {
        this.scene.addEntity(
            new Entity(
                'controllable',
                new Vector3(),
                new Rotator(),
                new Shapes.ColorCube({base: 2})
            )
        );
    }

    public override start(): void { 
        this.addGrid();
        this.addRandomCubes(100);
        this.addControllable();
    }

    public override onUpdate(): void { }

    public override inputListen(input: InputManager): void {
        
        if(input.isKeyDown('Numpad4')) {
            this.camera.move(new Vector3(-this._cameraOptions.cameraSpeed, 0));
        }
        if(input.isKeyDown('Numpad6')) {
            this.camera.move(new Vector3(this._cameraOptions.cameraSpeed, 0, 0));
        }
        if(input.isKeyDown('Numpad8')) {
            this.camera.move(new Vector3(0, this._cameraOptions.cameraSpeed, 0));
        }
        if(input.isKeyDown('Numpad2')) {
            this.camera.move(new Vector3(0, -this._cameraOptions.cameraSpeed, 0));
        }
        if(input.isKeyDown('Numpad1')) {
            this.camera.move(new Vector3(0, 0, this._cameraOptions.cameraSpeed));
        }
        if(input.isKeyDown('Numpad3')) {
            this.camera.move(new Vector3(0, 0, -this._cameraOptions.cameraSpeed));
        }

        if(input.isKeyDown('KeyA')) {
            this.scene.getEntity('controllable')?.move(new Vector3(-0.02, 0, 0));
        }
        if(input.isKeyDown('KeyD')) {
            this.scene.getEntity('controllable')?.move(new Vector3(0.02, 0, 0));
        }
        if(input.isKeyDown('KeyW')) {
            this.scene.getEntity('controllable')?.move(new Vector3(0, 0.02, 0));
        }
        if(input.isKeyDown('KeyS')) {
            this.scene.getEntity('controllable')?.move(new Vector3(0, -0.02, 0));
        }
        if(input.isKeyDown('KeyE')) {
            this.scene.getEntity('controllable')?.move(new Vector3(0, 0, 0.02));
        }
        if(input.isKeyDown('KeyQ')) {
            this.scene.getEntity('controllable')?.move(new Vector3(0, 0, -0.02));
        }

        if(input.isKeyDown('Digit1')) {
            this.scene.getEntity('controllable')?.rotate(  new Rotator(10, 0, 0));
        }
        if(input.isKeyDown('Digit2')) {
            this.scene.getEntity('controllable')?.rotate( new Rotator(-10, 0, 0));
        }
        if(input.isKeyDown('Digit3')) {
            this.scene.getEntity('controllable')?.rotate(  new Rotator(0, 10, 0));
        }
        if(input.isKeyDown('Digit4')) {
            this.scene.getEntity('controllable')?.rotate( new Rotator(0, -10, 0));
        }
        if(input.isKeyDown('Digit5')) {
            this.scene.getEntity('controllable')?.rotate(  new Rotator(0, 0, 10));
        }
        if(input.isKeyDown('Digit6')) {
            this.scene.getEntity('controllable')?.rotate( new Rotator(0, 0, -10));
        }

        /* if(input.isKeyDown('Space')) {
            let index = Math.floor(Math.random() * this.scene.shapes.length);
            let selectedShape = this.scene.shapes[index];
            this.scene.setControllable(selectedShape);
            this.camera.setFocalPoint(this.scene.controllable.position);
        } */


    }
}