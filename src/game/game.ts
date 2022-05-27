import { GameBase } from './gameInterface';
import { PerspectiveCamera, Scene, InputManager, Shapes, OrthographicCamera, ObjectEntity } from 'core';
import { LOG } from 'utils';
import { Vector3, Rotator, randomNumber } from 'math';
import { addGrid, addAxis, addRandomCubes, addRandomTexturedCubes, addRandomtriangles, addControllable } from './sceneSetup';

export class Game extends GameBase
{
    private _cameraOptions = {cameraSpeed: 0.1, cameraRotationScale: 1.5};

    public override setUp(): void
    {
        let perspectiveCamera = new PerspectiveCamera({position: new Vector3(-1, 1, 2), fovy: 1.6});
        let orthographicCamera = new OrthographicCamera({position: new Vector3(-1, 1, 2), left: -3, right: 3, bottom: -3, top: 3, near: 0.01, far: 100});
        this.camera = perspectiveCamera;
        this.scene = new Scene();
    }

    

    public override start(): void
    {
        let previousTime = performance.now()
        addGrid(this._scene);
        addAxis(this._scene);
        LOG(`Grid - Axis ${(performance.now() - previousTime).toFixed(3)} ms`);

        previousTime = performance.now()
        addRandomCubes(this._scene, 50);
        LOG(`Random cubes ${(performance.now() - previousTime).toFixed(3)} ms`);

        previousTime = performance.now()
        addRandomTexturedCubes(this._scene, 50);
        LOG(`Random textured cubes ${(performance.now() - previousTime).toFixed(3)} ms`);
        
        previousTime = performance.now()
        addRandomtriangles(this._scene, 100);
        LOG(`Random triangles ${(performance.now() - previousTime).toFixed(3)} ms`);

        addControllable(this._scene);

        this._scene.addEntity(
            new ObjectEntity(
                'Line',
                new Vector3(0, 0, 0),
                new Rotator(),
                new Vector3(1, 1, 1),
                new Shapes.Line({color: [1, 0, 1]}, new Vector3(0, 0.5, 0), new Vector3(1, 1, 1))
            )
        )
    }

    public override onUpdate(): void { }

    public override inputListen(input: InputManager): void
    {
        
        if(input.isKeyDown('Numpad4'))
        {
            this.camera.move(new Vector3(-this._cameraOptions.cameraSpeed, 0));
        }
        if(input.isKeyDown('Numpad6'))
        {
            this.camera.move(new Vector3(this._cameraOptions.cameraSpeed, 0, 0));
        }
        if(input.isKeyDown('Numpad8'))
        {
            this.camera.move(new Vector3(0, this._cameraOptions.cameraSpeed, 0));
        }
        if(input.isKeyDown('Numpad2'))
        {
            this.camera.move(new Vector3(0, -this._cameraOptions.cameraSpeed, 0));
        }
        if(input.isKeyDown('Numpad1'))
        {
            this.camera.move(new Vector3(0, 0, this._cameraOptions.cameraSpeed));
        }
        if(input.isKeyDown('Numpad3'))
        {
            this.camera.move(new Vector3(0, 0, -this._cameraOptions.cameraSpeed));
        }
        if(input.isKeyDown('Numpad7'))
        {
            this.camera.rotate(new Rotator(0, this._cameraOptions.cameraSpeed * 10, 0));
        }
        if(input.isKeyDown('Numpad9'))
        {
            this.camera.rotate(new Rotator(0, -this._cameraOptions.cameraSpeed * 10, 0));
        }
        
        if(input.isKeyDown('KeyA'))
        {
            this.scene.getEntity('controllable')?.move(new Vector3(-0.02, 0, 0));
        }
        if(input.isKeyDown('KeyD'))
        {
            this.scene.getEntity('controllable')?.move(new Vector3(0.02, 0, 0));
        }
        if(input.isKeyDown('KeyW'))
        {
            this.scene.getEntity('controllable')?.move(new Vector3(0, 0.02, 0));
        }
        if(input.isKeyDown('KeyS'))
        {
            this.scene.getEntity('controllable')?.move(new Vector3(0, -0.02, 0));
        }
        if(input.isKeyDown('KeyE'))
        {
            this.scene.getEntity('controllable')?.move(new Vector3(0, 0, 0.02));
        }
        if(input.isKeyDown('KeyQ'))
        {
            this.scene.getEntity('controllable')?.move(new Vector3(0, 0, -0.02));
        }

        if(input.isKeyDown('Digit1'))
        {
            this.scene.getEntity('controllable')?.rotate(  new Rotator(2, 0, 0));
        }
        if(input.isKeyDown('Digit2'))
        {
            this.scene.getEntity('controllable')?.rotate( new Rotator(-2, 0, 0));
        }
        if(input.isKeyDown('Digit3'))
        {
            this.scene.getEntity('controllable')?.rotate(  new Rotator(0, 2, 0));
        }
        if(input.isKeyDown('Digit4'))
        {
            this.scene.getEntity('controllable')?.rotate( new Rotator(0, -2, 0));
        }
        if(input.isKeyDown('Digit5'))
        {
            this.scene.getEntity('controllable')?.rotate(  new Rotator(0, 0, 2));
        }
        if(input.isKeyDown('Digit6'))
        {
            this.scene.getEntity('controllable')?.rotate( new Rotator(0, 0, -2));
        }

        if(input.isKeyDown('Space'))
        {
            let c = this.scene.getEntity('controllable');
            if(c)
            {
                this.camera.position = new Vector3(c.position.x, c.position.y + 1, c.position.z + 2);
                this.camera.focalPoint = c.position;
            }
        }

        if(input.isKeyDown('KeyY'))
        {
            this.scene.getEntity('controllable')?.rescale(new Vector3(0, 0.1, 0));
        }

        if(input.isKeyDown('KeyT'))
        {
            this.scene.getEntity('controllable')?.rescale(new Vector3(0, -0.1, 0));
        }

        if(input.isKeyDown('KeyX'))
        {
            //let c = this.scene.getEntity('controllable');
            let c = this.camera;
            if(c)
            {
                //LOG(`(${c.getWorldPosition().x.toFixed(2)}, ${c.getWorldPosition().y.toFixed(2)}, ${c.getWorldPosition().z.toFixed(2)})
                LOG(`(${c.position.x.toFixed(2)}, ${c.position.y.toFixed(2)}, ${c.position.z.toFixed(2)})
                     (${c.rotation.pitch.toFixed(2)}, ${c.rotation.yaw.toFixed(2)}, ${c.rotation.roll.toFixed(2)})`);
            }
        }
        if(input.isKeyDown('KeyR'))
        {
            let c = this.scene.getEntity('controllable');
            if(c)
            {
                this.scene.removeEntity(c.name);
            }
        }

        if( input.isMouseMoving() && input.isMouseButtonPressed('Left'))
        {
            let scale = this._cameraOptions.cameraRotationScale;
            this.camera.rotate( 
                new Rotator(
                    0, 
                    input.getMouseSpeed().x * scale, 
                    0, 
                ) 
            );
        }
    }
}