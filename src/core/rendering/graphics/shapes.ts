import { PI, Transform, Vector3 } from "math";
import { CompoundShape } from "./compoundShape";
import { Options } from "./renderable";
import { SimpleShape } from "./simpleShape";

class Line extends SimpleShape {

    public constructor(options: Options = {}, origin?: Vector3, end?: Vector3) {
        let base: number = options.base || 1;
        let color: number[] = options.color || [0, 0, 0];
        let transform: Transform = options.transform || new Transform();

        let x_0 = origin ? origin.x : 0;
        let y_0 = origin ? origin.y : 0;
        let z_0 = origin ? origin.z : 0;

        let x_1 = end ? end.x : base;
        let y_1 = end ? end.y : 0;
        let z_1 = end ? end.z : 0;

        super(transform);
        this.vertices = [
        //  X    Y    Z   
            x_0, y_0, z_0,
            x_1, y_1, z_1,];
        this.colors = [
            color[0], color[1], color[2],
            color[0], color[1], color[2]];
        }
}

class Triangle extends CompoundShape
{
    /**
     * Triangle Basic 2D Shape. Rendered at origin.
     */
    public constructor(options: Options = {})
    {
        let base: number = options.base || 1;
        let height: number = options.height || base;
        let color: number[] = options.color || [1, 1, 1];
        let transform: Transform = options.transform || new Transform();
        super(transform, options.texturePath);
        this.vertices = [
        // VERTEX POSITION        
        // X       Y          Z
          -base/2, -height/2, 0.0,
           base/2, -height/2, 0.0,
           0.0,     height/2, 0.0
        ];
        this.normals = [
          // NORMALS
          // x   y    z
          0.0, 0.0, 1.0,
          0.0, 0.0, 1.0,
          0.0, 0.0, 1.0
        ];
        this.colors = [
          // COLORS
          // R     G     B
          color[0], color[1], color[2],
          color[0], color[1], color[2],
          color[0], color[1], color[2]
        ];
        this.uvs = [
          // UV
          // u     v
          0.0, 1.0,
          1.0, 1.0,
          0.5, 0.0
        ];
      }
}

class Quad extends CompoundShape {

    /**
     * Quad Basic 2D Shape. Rendered at origin. Consists of 2 adyacent Triangles.
     */
    public constructor(options: Options = {})
    {
      let base: number = options.base || 1;
      let height: number = options.height || 1;
      let color: number[] = options.color || [1, 1, 1];
      let transform: Transform = options.transform || new Transform();
      super(transform, options.texturePath);
      this.vertices = [
      // VERTEX POSITION        
      // X        Y         Z   
        -base/2, -height/2, 0.0,
         base/2, -height/2, 0.0,
        -base/2,  height/2, 0.0,

        -base/2,  height/2, 0.0,
         base/2, -height/2, 0.0,
         base/2,  height/2, 0.0
      ];
      this.normals = [
        // NORMALS
        // x   y    z
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0
      ];

      this.colors = [
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2]
      ];

      this.uvs = [
        // UV
        // u     v
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0
      ];
  }
}

class Cube extends CompoundShape
{
    /**
     * Cube Basic 3D Shape. Rendered at origin. Consists of 6 Quads for each face.
     */
    public constructor(options: Options = {})
    {
        let base: number = options.base || 1;
        let color: number[] = options.color || [1, 1, 1];
        let transform: Transform = options.transform || new Transform();
        super(transform, options.texturePath);
        const l2 = base/2;
        this.indices = [
            // Top
            0, 1, 2,
            0, 2, 3,
            // Left
            5, 4, 6,
            6, 4, 7,
            // Right
            8, 9, 10,
            8, 10, 11,
            // Front
            13, 12, 14,
            15, 14, 12,
            // Back
            16, 17, 18,
            16, 18, 19,
            // Bottom
            21, 20, 22,
            22, 20, 23
        ];
        this.vertices = [
        // VERTEX POSITION
        // X    Y    Z
        // TOP
          -l2,  l2, -l2,
          -l2,  l2,  l2,
           l2,  l2,  l2,
           l2,  l2, -l2,
        // LEFT
          -l2,  l2,  l2,
          -l2, -l2,  l2,
          -l2, -l2, -l2,
          -l2,  l2, -l2,
        // Right
           l2,  l2,  l2,
           l2, -l2,  l2,
           l2, -l2, -l2,
           l2,  l2, -l2,
        // Front
           l2,  l2,  l2,
           l2, -l2,  l2,
          -l2, -l2,  l2,
          -l2,  l2,  l2,
        // Back
           l2,  l2, -l2,
           l2, -l2, -l2,
          -l2, -l2, -l2,
          -l2,  l2, -l2,
        // Bottom
          -l2, -l2, -l2,
          -l2, -l2,  l2,
           l2, -l2,  l2,
           l2, -l2, -l2,
        ];

        this.normals = [
        // NORMALS
        // x     y     z
          0.0,  1.0,  0.0,
          0.0,  1.0,  0.0,
          0.0,  1.0,  0.0,
          0.0,  1.0,  0.0,
         -1.0,  0.0,  0.0,
         -1.0,  0.0,  0.0,
         -1.0,  0.0,  0.0,
         -1.0,  0.0,  0.0,
          1.0,  0.0,  0.0,
          1.0,  0.0,  0.0,
          1.0,  0.0,  0.0,
          1.0,  0.0,  0.0,
          0.0,  0.0,  1.0,
          0.0,  0.0,  1.0,
          0.0,  0.0,  1.0,
          0.0,  0.0,  1.0,
          0.0,  0.0, -1.0,
          0.0,  0.0, -1.0,
          0.0,  0.0, -1.0,
          0.0,  0.0, -1.0,
          0.0, -1.0,  0.0,
          0.0, -1.0,  0.0,
          0.0, -1.0,  0.0,
          0.0, -1.0,  0.0
        ];

        this.colors = [
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        color[0], color[1], color[2],
        ];

        this.uvs = [
          1/4, 0.0,
          1/4, 1/4,
          1/2, 1/4,
          1/2, 0.0,
          1/4, 1/3,
          1/4, 2/3,
          0.0, 2/3,
          0.0, 1/3,
          1/2, 1/3,
          1/2, 2/3,
          3/4, 2/3,
          3/4, 1/3,
          1/2, 1/3,
          1/2, 2/3,
          1/4, 2/3,
          1/4, 1/3,
          3/4, 1/3,
          3/4, 2/3,
          1.0, 2/3,
          1.0, 1/3,
          1/4, 1.0,
          1/4, 2/3,
          1/2, 2/3,
          1/2, 1.0,
        ];
    }
}

class Sphere extends CompoundShape
{
  public constructor(options: Options = {})
  {
    let radius: number = options.base || 1;
    let color: number[] = options.color || [1, 1, 1];
    let transform: Transform = options.transform || new Transform();
    super(transform, options.texturePath);

    let i: number, j: number;
    let lats = 40;
    let longs = 40;
    let indicator = 0;
    for(i = 0; i <= lats; i++)
    {
       let lat0 = PI * (-0.5 + (i - 1) / lats);
       let z0  = Math.sin(lat0);
       let zr0 =  Math.cos(lat0);

       let lat1 = PI * (-0.5 + i / lats);
       let z1 = Math.sin(lat1);
       let zr1 = Math.cos(lat1);

      for(j = 0; j <= longs; j++) {
        let lng = 2 * PI * (j - 1) / longs;
        let x = Math.cos(lng);
        let y = Math.sin(lng);
        this.vertices.push(x * zr0);
        this.vertices.push(y * zr0);
        this.vertices.push(z0);
        this.vertices.push(color[0]);
        this.vertices.push(color[1]);
        this.vertices.push(color[2]);
        this.vertices.push(0);
        this.vertices.push(1);
        this.indices?.push(indicator);
        indicator++;
        this.vertices.push(x * zr1);
        this.vertices.push(y * zr1);
        this.vertices.push(z1);
        this.vertices.push(color[0]);
        this.vertices.push(color[1]);
        this.vertices.push(color[2]);
        this.vertices.push(1);
        this.vertices.push(1);
        this.indices?.push(indicator);
        indicator++;

        this.normals?.push(x * zr0);
        this.normals?.push(y * zr0);
        this.normals?.push(z0);
       }
       this.indices?.push(0);
   }

  }
}

export { Renderable } from "./renderable";
export { Skybox } from "./skybox";
export { Line, Triangle, Quad, Cube, Sphere };