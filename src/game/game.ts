import { GameBase } from './gameInterface';
import { PerspectiveCamera, Scene, InputManager, Shapes, OrthographicCamera, ObjectEntity } from 'core';
import { LOG } from 'utils';
import { Vector3, Rotator, randomNumber } from 'math';

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

    private addGrid(size: number = 10)
    {
        for(let i = -size; i <= size; i++)
        {
            this.scene.addEntity(
                new ObjectEntity(
                    `line-${i}h`, 
                    new Vector3(i, 0, size), 
                    new Rotator(0, 90, 0), 
                    new Vector3(1, 1, 1),
                    new Shapes.Line({base:2 * size, color: [0.4, 0.4, 0.4]})
                )
            );
            this.scene.addEntity(
                new ObjectEntity(
                    `line-${i}v`,
                    new Vector3(-size, 0, i),
                    new Rotator(0, 0, 0),
                    new Vector3(1, 1, 1),
                    new Shapes.Line({base:2 * size, color: [0.75, 0.75, 0.75]})
                )
            );
        }
    }

    private addAxis()
    {
        this.scene.addEntity(
            new ObjectEntity(
                `axis-x`,
                new Vector3(0, 0.001, 0),
                new Rotator(0, 0, 0),
                new Vector3(1, 1, 1),
                new Shapes.Line({base:1.5, color: [1, 0, 0]})
            )
        );
        this.scene.addEntity(
            new ObjectEntity(
                `axis-y`,
                new Vector3(0, 0, 0),
                new Rotator(0, 0, 90),
                new Vector3(1, 1, 1),
                new Shapes.Line({base:1.5, color: [0, 1, 0]}
                )
            )
        );
        this.scene.addEntity(
            new ObjectEntity(
                `axis-z`,
                new Vector3(0, 0.001, 0),
                new Rotator(0, -90, 0),
                new Vector3(1, 1, 1),
                new Shapes.Line({base:1.5, color: [0, 0, 1]}) 
            )
        );
    }

    private addRandomCubes(count: number)
    {
        for(let i = 0; i < count; i++)
        {
            let newCube = new Shapes.Cube({ 
                base: randomNumber(0.2, 1.5), 
                color: [randomNumber(), randomNumber(), randomNumber()]})
            this.scene.addEntity(
                new ObjectEntity(
                    `randCube-${i}`,
                    new Vector3(randomNumber(10, -10), randomNumber(10, -10), randomNumber(10, -10)),
                    new Rotator(randomNumber(360), randomNumber(360), randomNumber(360)),
                    new Vector3(randomNumber(0.5, 1.5), randomNumber(0.5, 1.5), randomNumber(0.5, 1.5)),
                    newCube
                )
            )
        }
    }

    private addRandomtriangles(count: number)
    {
        for(let i = 0; i < count; i++)
        {
            let newTriangle = new Shapes.Triangle({
                base: randomNumber(0.2, 1.5),
                height: randomNumber(0.2, 1.5),
                color: [randomNumber(), randomNumber(), randomNumber()]})
            this.scene.addEntity(
                new ObjectEntity(
                    `randTriangle-${i}`,
                    new Vector3(randomNumber(10, -10), randomNumber(10, -10), randomNumber(10, -10)),
                    new Rotator(randomNumber(360), randomNumber(360), randomNumber(360)),
                    new Vector3(randomNumber(0.5, 1.5), randomNumber(0.5, 1.5), randomNumber(0.5, 1.5)),
                    newTriangle
                )
            )
        }
    }

    private addRandomTexturedCubes(count: number)
    {
        for(let i = 0; i < count; i++)
        {
            let newCube = new Shapes.TexturedCube(
                    document.getElementById('roma-texture') as HTMLImageElement, 
                    { base: randomNumber(0.2, 1.5) }
                )
            this.scene.addEntity(
                new ObjectEntity(
                    `randTexCube-${i}`,
                    new Vector3(randomNumber(10, -10), randomNumber(10, -10), randomNumber(10, -10)),
                    new Rotator(randomNumber(360), randomNumber(360), randomNumber(360)),
                    new Vector3(randomNumber(0.5, 1.5), randomNumber(0.5, 1.5), randomNumber(0.5, 1.5)),
                    newCube
                )
            )
        }
    }


    private addControllable()
    {
        this.scene.addEntity(
            new ObjectEntity(
                'controllable',
                new Vector3(),
                new Rotator(),
                new Vector3(0.75, 2.5, 0.75),
                new Shapes.TexturedCube(
                    document.getElementById('roma-texture') as HTMLImageElement, 
                    {base: 0.5}
                )
            )
        );
    }

    public override start(): void
    {
        let previousTime = performance.now()
        this.addGrid();
        this.addAxis();
        LOG(`Grid - Axis ${(performance.now() - previousTime).toFixed(3)} ms`);

        previousTime = performance.now()
        this.addRandomCubes(50);
        LOG(`Random cubes ${(performance.now() - previousTime).toFixed(3)} ms`);

        previousTime = performance.now()
        this.addRandomTexturedCubes(50);
        LOG(`Random textured cubes ${(performance.now() - previousTime).toFixed(3)} ms`);
        
        previousTime = performance.now()
        this.addRandomtriangles(100);
        LOG(`Random triangles ${(performance.now() - previousTime).toFixed(3)} ms`);

        this.addControllable();
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