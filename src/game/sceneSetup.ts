import { ObjectEntity, Scene, Shapes } from "core";
import { randomNumber, Rotator, Transform, Vector3 } from "math";
import { RigidBody } from "../core/world/components/rigidBody";
import { LOG } from "utils";
import { RenderableComponent } from "../core/world/components/renderableComponent";
import { Mesh } from "../core/rendering/graphics/mesh";
import { Loader } from "../core/loaders/loader";


function addGrid(scene: Scene, size: number = 10)
{
    for(let i = -size; i <= size; i++)
    {
        scene.addEntity(
            new ObjectEntity(
                `line-${i}h`, 
                new Vector3(i, 0, size), 
                new Rotator(0, 90, 0), 
                new Vector3(1, 1, 1),
                new Shapes.Line({base:2 * size, color: [0.4, 0.4, 0.4]})
            )
        );
        scene.addEntity(
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

function addAxis(scene: Scene)
{
    scene.addEntity(
        new ObjectEntity(
            `axis-x`,
            new Vector3(0, 0.001, 0),
            new Rotator(0, 0, 0),
            new Vector3(1, 1, 1),
            new Shapes.Line({base:1.5, color: [1, 0, 0]})
        )
    );
    scene.addEntity(
        new ObjectEntity(
            `axis-y`,
            new Vector3(0, 0, 0),
            new Rotator(0, 0, 90),
            new Vector3(1, 1, 1),
            new Shapes.Line({base:1.5, color: [0, 1, 0]}
            )
        )
    );
    scene.addEntity(
        new ObjectEntity(
            `axis-z`,
            new Vector3(0, 0.001, 0),
            new Rotator(0, -90, 0),
            new Vector3(1, 1, 1),
            new Shapes.Line({base:1.5, color: [0, 0, 1]}) 
        )
    );
}

function addRandomtriangles(scene: Scene, count: number)
{
    for(let i = 0; i < count; i++)
    {
        let texFlag = randomNumber(0, 1);
        let newTriangle = new Shapes.Triangle({
            base: randomNumber(0.2, 1.5),
            height: randomNumber(0.2, 1.5),
            texturePath: texFlag > 0.6667 ? 'assets/textures/wall.png' : (texFlag  < 0.3333 ? 'assets/textures/roma.png' : undefined),
            color: [randomNumber(), randomNumber(), randomNumber()]})
        scene.addEntity(
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

function addRandomCubes(scene: Scene, count: number)
{
    for(let i = 0; i < count; i++)
    {
        let texFlag = randomNumber(0, 1);
        let newCube = new Shapes.Cube(
                { base: randomNumber(0.2, 1.5), 
                  color: [randomNumber(), randomNumber(), randomNumber()],
                  texturePath: texFlag > 0.6667 ? 'assets/textures/sky_cube_map.jpg' : (texFlag  < 0.3333 ? 'assets/textures/dirt_cube.png' : undefined)
                }
            )
        scene.addEntity(
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

async function addControllable(scene: Scene)
{
    let suzanneGeometry = await Loader.loadJSONMesh('assets/models/Suzanne.json');
    let suzanne = new Mesh(new Transform(new Vector3(0, 1, 0), new Rotator(-90, 0, 0)), suzanneGeometry[0], 'assets/textures/SusanTexture.png');
    let controllableEntity = new ObjectEntity(
        'controllable',
        new Vector3(),
        new Rotator(),
        new Vector3(1, 1, 1),
        suzanne
    )
    let forwardLine = new RenderableComponent('renderable-component', 
        new Shapes.Line({color: [0.5, 0, 0]}, new Vector3(), new Vector3(0, 0, 1) ));
    controllableEntity.addComponent(forwardLine);

    let rigidBody = new RigidBody();
    rigidBody.enableGravity = false;
    controllableEntity.addComponent(rigidBody);
    scene.addEntity(controllableEntity);
}

function addRandomLines(scene: Scene, count: number)
{
    for(let i = 0; i < count; i++)
    {
        scene.addEntity(
            new ObjectEntity(
                'Line',
                new Vector3(0, 0, 0),
                new Rotator(),
                new Vector3(1, 1, 1),
                new Shapes.Line({color: [1, 0, 1]}, )
            )
        )
        scene.addEntity(
            new ObjectEntity(
                `randLine-${i}`,
                new Vector3(),
                new Rotator(),
                new Vector3(1, 1, 1),
                new Shapes.Line
                (
                    { color: [randomNumber(), randomNumber(), randomNumber()] },
                    new Vector3(randomNumber(10, -10), randomNumber(10, -10), randomNumber(10, -10)),
                    new Vector3(randomNumber(10, -10), randomNumber(10, -10), randomNumber(10, -10))
                )
            )
        )
    }
}

function randomScene(scene: Scene)
{
    let previousTime = performance.now()
    addRandomCubes(scene, 250);
    LOG(`Random cubes ${(performance.now() - previousTime).toFixed(3)} ms`);
    
    previousTime = performance.now()
    addRandomtriangles(scene, 250);
    LOG(`Random triangles ${(performance.now() - previousTime).toFixed(3)} ms`);
    previousTime = performance.now()
    addRandomLines(scene, 10);
    LOG(`Random Lines ${(performance.now() - previousTime).toFixed(3)} ms`);
}

function physicsScene( scene: Scene )
{
    let amount: number = 100;
    for(let i = 0; i < amount; i++)
    {
        //let cube = new Shapes.Cube({texturePath: "assets/textures/roma.png"} );
        let cube = new Shapes.Cube({color: [randomNumber(1), randomNumber(1), randomNumber(1)]} );
        let cubeEntity = new ObjectEntity(
        'Rigid-Entity',
        new Vector3(randomNumber(10, -10), randomNumber(amount), randomNumber(10, -10)),
        new Rotator(randomNumber(360), randomNumber(360), randomNumber(360)),
        new Vector3(1, 1, 1),
        cube
        );
        let rigidBody = new RigidBody();
        rigidBody.enableGravity = true;
        cubeEntity.addComponent(rigidBody);
        scene.addEntity(cubeEntity);
    }
}

function simpleScene( scene:Scene)
{
    for(let i = -10; i < 10; i+=5)
    {
        for(let j = -10; j < 10; j+=5)
        {
            let cube = new Shapes.Cube({color: [randomNumber(1), randomNumber(1), randomNumber(1)]} );
            let cubeEntity = new ObjectEntity(
                `Rigid-Entity=${i}`,
                new Vector3(i, 0, j),
                new Rotator(0, 0, 0),
                new Vector3(1, 1, 1),
                cube
            );
            let rigidBody = new RigidBody();
            rigidBody.enableGravity = false;
            cubeEntity.addComponent(rigidBody);
            scene.addEntity(cubeEntity);
        }
    }
}

async function houseScene(scene: Scene)
{
    /* Houses */
    let houseGeometry = await Loader.loadJSONMesh('assets/models/cottage.json');
    for(let i = -20; i <= 20; i+=20)
    {
        for(let j = -20; j <= 20; j+=20)
        {
            if(i != 0 || j != 0)
            {
                let houseEntity = new ObjectEntity(
                    'House',
                    new Vector3(i, 1, j),
                    new Rotator(-90, 180, 0),
                    new Vector3(3, 3, 1),
                    new Mesh(new Transform(), houseGeometry[0], 'assets/textures/cottage_diffuse.png')
                    );
                let rigidBody = new RigidBody();
                houseEntity.addComponent(rigidBody);
                scene.addEntity(houseEntity);
            }
        }
    }

    /* Well */
    let wellGeometry = Loader.loadJSONMesh('assets/models/well.json');
    console.log(wellGeometry);

    /* Ground */
    let ground = new Shapes.Quad({color: [0.65, 0.88, 0.24], texturePath: 'assets/textures/grass.jpg'});
    let groundEntity = new ObjectEntity(
        'Ground',
        new Vector3(0, 0.05, 0),
        new Rotator(-90, 0, 0),
        new Vector3(50, 50, 1),
        ground
    );
    let rigidBodyGround = new RigidBody();
    groundEntity.addComponent(rigidBodyGround);
    scene.addEntity(groundEntity);
}

function addSkybox(scene: Scene)
{
    scene.addEntity(
        new ObjectEntity(
            'Skybox',
            new Vector3(),
            new Rotator(),
            new Vector3(1, 1, 1),
            new Shapes.Skybox( 
                ['assets/textures/sky_right.png', 'assets/textures/sky_left.png', 'assets/textures/sky_top.png',
                 'assets/textures/sky_bottom.png','assets/textures/sky_back.png', 'assets/textures/sky_front.png'
            ])
        )
    )
}

export function setScene(scene: Scene)
{
    //addGrid(scene, 100);
    //addAxis(scene);
    addSkybox(scene);

    //randomScene(scene);
    //physicsScene(scene);
    //simpleScene(scene);
    houseScene(scene);

    addControllable(scene);
}