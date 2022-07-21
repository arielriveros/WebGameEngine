import { Matrix4x4, Transform } from "math";
import { CompoundShape } from "./compoundShape";

export interface GeometryParameters
{
    vertices: number[],
    indices: number[] | null,
    normals: number[] | null,
    uvs: number[] | null,
    transformMatrix: Matrix4x4
} 

export class Mesh extends CompoundShape
{
    // TODO: CHANGE TRANSFORM TO BE PASSED DOWN BY THE GEOMETRYPARAMETERS OBJECT INSTEAD 
    public constructor(transform: Transform = new Transform(), geometry: GeometryParameters, texturePath?: string, )
    {
        super(texturePath);
        this.vertices = geometry.vertices;
        this.indices = geometry.indices;
        this.normals = geometry.normals;
        this.colors = geometry.vertices.map((v, i) => { return 1; });
        this.transform = new Transform(
            {
                position: transform.position,
                rotation: transform.rotation,
                scale: transform.scale,
                initMatrix: geometry.transformMatrix
            }
        );
        this.uvs = geometry.uvs;
    }
}