import { ObjectEntity, Scene, Shapes } from "core";
import { randomNumber, Rotator, Vector3 } from "math";


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

function addRandomCubes(scene: Scene, count: number)
{
    for(let i = 0; i < count; i++)
    {
        let newCube = new Shapes.Cube({ 
            base: randomNumber(0.2, 1.5), 
            color: [randomNumber(), randomNumber(), randomNumber()]})
        scene.addEntity(
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

function addRandomtriangles(scene: Scene, count: number)
{
    for(let i = 0; i < count; i++)
    {
        let newTriangle = new Shapes.Triangle({
            base: randomNumber(0.2, 1.5),
            height: randomNumber(0.2, 1.5),
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

function addRandomTexturedCubes(scene: Scene, count: number)
{
    for(let i = 0; i < count; i++)
    {
        let newCube = new Shapes.TexturedCube(
                document.getElementById('roma-texture') as HTMLImageElement, 
                { base: randomNumber(0.2, 1.5) }
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

function addControllable(scene: Scene)
{
    scene.addEntity(
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

export { addGrid, addAxis, addRandomCubes, addRandomtriangles, addRandomTexturedCubes, addControllable };