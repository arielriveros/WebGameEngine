import { Rotator, Transform, Vector3, Matrix4x4 } from "math";
import { LOG } from "utils";
import { GeometryParameters } from "../rendering/graphics/mesh";

export class Loader
{
    public constructor() {}

    public static loadImage(path: string): Promise<HTMLImageElement>
    {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => {
                resolve(img);
            }
            img.onerror = (error) => {
                LOG("Error loading image source file", "error", true)
                reject(error);
            }
            img.src = path; 
        });
    }; 

    public static loadText(path: string): string | undefined
    {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", path, false);
        xhr.send(null);

        if (xhr.status == 200) {
            return xhr.responseText
        }
        else {
            LOG("Error loading source shader file", "error", true);
            return;
        }
    }; 

    public static loadJSON(path: string): Promise<any>{
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", path, false);
            xhr.send(null);

            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            }
            else {
                LOG("Error loading source shader file", "error", true);
                reject();
            }
        });
    }

    public static async loadJSONMesh(path: string): Promise<GeometryParameters[]>
    {
        let json = await Loader.loadJSON(path);
        let meshes: GeometryParameters[] = [];
        for(let i in json.rootnode.children)
        {
            if("meshes" in json.rootnode.children[i])
            {
                let index = json.rootnode.children[i].meshes[0];
                let meshInfo = json.meshes[index];
                let vertices = meshInfo.vertices;
                let indices = [].concat.apply([], meshInfo.faces);
                let normals = null;
                if(meshInfo.normals)
                {
                    normals = meshInfo.normals;
                }
                let uvs = null;
                if(meshInfo.texturecoords)
                {
                    uvs = meshInfo.texturecoords[0];
                }

                let transformMatrix = new Matrix4x4();
                transformMatrix.data = json.rootnode.children[i].transformation;
                let transform = new Transform({initMatrix: transformMatrix});
                meshes.push({ vertices, indices, normals, uvs, transform });
            }            
        }
        return meshes;
    }
}