import { GameBase } from './gameInterface';
import { PerspectiveCamera, Scene, InputManager, OrthographicCamera, DirectionalLight } from 'core';
import { LOG } from 'utils';
import { Vector3, Rotator } from 'math';
import { setScene } from './sceneSetup';

export class Game extends GameBase
{
    private _cameraOptions = {cameraSpeed: 0.1, cameraRotationScale: 0.75};
    private directionalLight!: DirectionalLight;

    public override setUp(): void
    {
        let perspectiveCamera = new PerspectiveCamera({position: new Vector3(-10, 5, 10), rotation: new Rotator(0, 135, 0), fovy: 1.2, far: 10000});
        let orthographicCamera = new OrthographicCamera({position: new Vector3(-1, 1, 2), rotation: new Rotator(0, 135, 0), left: -3, right: 3, bottom: -3, top: 3, near: 0.01, far: 10000});
        this.camera = perspectiveCamera;
        this.scene = new Scene();

        this.directionalLight = new DirectionalLight('directional-light', [1, 1, 1], 1);
        this.scene.directionalLight = this.directionalLight;
        this.scene.directionalLight.rotate(new Rotator(-45, -45, 0));
    }

    public override start(): void
    {
        setScene(this.scene);
    }

    public override onUpdate(delta: number): void {

    }

    public override inputListen(input: InputManager, delta: number): void
    {
        if(input.isKeyDown('KeyA'))
        {
            this.scene.getEntity('controllable')?.moveRight(-0.02 * delta / 10);
        }
        if(input.isKeyDown('KeyD'))
        {
            this.scene.getEntity('controllable')?.moveRight(0.02 * delta / 10);
        }
        if(input.isKeyDown('KeyW'))
        {
            this.scene.getEntity('controllable')?.moveForward(0.02 * delta / 10);
        }
        if(input.isKeyDown('KeyS'))
        {
            this.scene.getEntity('controllable')?.moveForward(-0.02 * delta / 10);
        }
        if(input.isKeyDown('KeyE'))
        {
            this.scene.getEntity('controllable')?.rotate( new Rotator(0, -2 * delta / 25, 0));
            
        }
        if(input.isKeyDown('KeyQ'))
        {
            this.scene.getEntity('controllable')?.rotate(  new Rotator(0, 2 * delta / 25, 0));
        }
        if(input.isKeyDown('Digit5'))
        {
            this.scene.getEntity('controllable')?.rotate( new Rotator(-2, 0, 0));
        }

        if(input.isKeyDown('Digit6'))
        {
            this.scene.getEntity('controllable')?.rotate(  new Rotator(2, 0, 0));
        }

        if(input.isKeyDown('Space'))
        {
            let c = this.scene.getEntity('controllable');
            if(c)
            {
                this.camera.position = new Vector3(c.position.x, c.position.y + 1, c.position.z + 2);
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

        if(input.isKeyDown('ArrowLeft'))
        {   
            this.directionalLight.rotate(new Rotator(0, -1, 0));
        }

        if(input.isKeyDown('ArrowRight'))
        {   
            this.directionalLight.rotate(new Rotator(0, 1, 0));
        }

        if(input.isKeyDown('ArrowUp'))
        {   
            this.directionalLight.rotate(new Rotator(-1, 0, 0));
        }

        if(input.isKeyDown('ArrowDown'))
        {   
            this.directionalLight.rotate(new Rotator(1, 0, 0));
        }

        if(input.isMouseMoving())
        {
            let bothPressed: boolean = input.isMouseButtonPressed('Left') && input.isMouseButtonPressed('Right')
            if(bothPressed)
            {
                let scale = this._cameraOptions.cameraRotationScale;
                this.camera.moveRight(input.getMouseSpeed().x * scale / 10);
                this.camera.moveUp(-input.getMouseSpeed().y * scale / 10);
            }
            else
            {

                if(input.isMouseButtonPressed('Left'))
                {
                let scale = this._cameraOptions.cameraRotationScale;
                this.camera.moveRight(input.getMouseSpeed().x * scale / 10);
                this.camera.moveForward(-input.getMouseSpeed().y * scale / 10);
            }
            
            if(input.isMouseButtonPressed('Right'))
            {
                let scale = this._cameraOptions.cameraRotationScale;
                this.camera.rotate( 
                    new Rotator(
                        input.getMouseSpeed().y * scale, 
                        -input.getMouseSpeed().x * scale, 
                        0
                        ) 
                        );
                    }
                }
        }
    }
}