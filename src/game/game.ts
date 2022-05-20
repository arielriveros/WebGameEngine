import { GameBase } from './gameInterface';
import { PerspectiveCamera, Scene, InputManager, Shapes, OrthographicCamera, Entity, LOG } from 'core';
import { Vector3, Rotator, randomNumber } from 'math';

export class Game extends GameBase{

    private _cameraOptions = {cameraSpeed: 0.1};

    public override setUp(): void {
        let perspectiveCamera = new PerspectiveCamera({position: new Vector3(-3, 3, 4), fovy: 1.6});
        let orthographicCamera = new OrthographicCamera({position: new Vector3(-3, 3, 4), left: -3, right: 3, bottom: -3, top: 3, near: 0.01, far: 100});
        this.camera = perspectiveCamera;
        this.scene = new Scene();
    }

    private addGrid(size: number = 10) {
        for(let i = -size; i <= size; i++) {
            this.scene.addEntity(new Entity(`line-${i}h`, new Vector3(i, 0, size), new Rotator(0, 90, 0), new Shapes.Line({base:2 * size, color: [0.4, 0.4, 0.4]}) ));
            this.scene.addEntity(new Entity(`line-${i}v`, new Vector3(-size, 0, i), new Rotator(0, 0, 0), new Shapes.Line({base:2 * size, color: [0.75, 0.75, 0.75]}) ));
        }
    }

    private addRandomCubes(count: number) {
        for(let i = 0; i < count; i++) {
            let newCube = new Shapes.Cube({ 
                base: 0.1, 
                color: [randomNumber(), randomNumber(), randomNumber()]})
            this.scene.addEntity(
                new Entity(
                    `randCube-${i}`,
                    new Vector3(randomNumber(10, -10), randomNumber(10, -10), randomNumber(10, -10)),
                    new Rotator(randomNumber(360), randomNumber(360), randomNumber(360)),
                    newCube
                )
            )
        }
    }

    private addRandomtriangles(count: number) {
        for(let i = 0; i < count; i++) {
            let newTriangle = new Shapes.Triangle({ 
                base: 0.5, 
                color: [randomNumber(), randomNumber(), randomNumber()]})
            this.scene.addEntity(
                new Entity(
                    `randTriangle-${i}`,
                    new Vector3(randomNumber(10, -10), randomNumber(10, -10), randomNumber(10, -10)),
                    new Rotator(randomNumber(360), randomNumber(360), randomNumber(360)),
                    newTriangle
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
                new Shapes.ColorCube({base: 0.5})
            )
        );
    }

    public override start(): void { 

        let previousTime = performance.now()
        this.addGrid();
        LOG(`Grid ${(performance.now() - previousTime).toFixed(3)} ms`);

        previousTime = performance.now()
        this.addRandomCubes(100);
        LOG(`Random cubes ${(performance.now() - previousTime).toFixed(3)} ms`);
        
        previousTime = performance.now()
        this.addRandomtriangles(100);
        LOG(`Random triangles ${(performance.now() - previousTime).toFixed(3)} ms`);

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

        if(input.isKeyDown('Space')) {
            let c = this.scene.getEntity('controllable');
            if(c) {
                this.camera.position = new Vector3(c.position.x, c.position.y, c.position.z + 2);
                this.camera.focalPoint = c.position;
            }
        }

        if(input.isKeyDown('KeyX')) {
            let c = this.scene.getEntity('controllable');
            if(c) {
                LOG(`(${c.position.x.toFixed(2)}, ${c.position.y.toFixed(2)}, ${c.position.z.toFixed(2)})
                     (${c.rotation.pitch.toFixed(2)}, ${c.rotation.yaw.toFixed(2)}, ${c.rotation.roll.toFixed(2)})`);
            }
        }
        if(input.isKeyDown('KeyR')) {
            let c = this.scene.getEntity('controllable');
            if(c) {
                this.scene.removeEntity(c.name);
            }
        }


    }
}