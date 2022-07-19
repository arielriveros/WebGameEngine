import { CompoundShape } from "./compoundShape";

export interface GeometryParameters
{
    vertices: number[],
    indices: number[] | null,
    normals: number[] | null,
    uvs: number[] | null
} 

export class Mesh extends CompoundShape
{
    public constructor(geometry: GeometryParameters, texturePath?: string)
    {
        super(texturePath);
        this.vertices = geometry.vertices;
        this.indices = geometry.indices;
        this.normals = geometry.normals;
        this.uvs = geometry.uvs;
    }
}