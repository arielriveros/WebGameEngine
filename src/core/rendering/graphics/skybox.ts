import { CompoundShape } from "./compoundShape";

class Skybox extends CompoundShape
{
    /**
     * Cube Basic 3D Shape. Rendered at origin. Consists of 6 Quads for each face.
     */
    public constructor(texturePath?: string)
    {
        let base: number = 1000;
        let color: number[] = [1, 1, 1];
        super(texturePath);
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
        // VERTEX POSITION  COLOR                           TEXTURE
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
    }
}