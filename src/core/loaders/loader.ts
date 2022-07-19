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

    public static loadJSON(path: string): any
    {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", path, false);
        xhr.send(null);

        if (xhr.status == 200) {
            return JSON.parse(xhr.responseText);
        }
        else {
            LOG("Error loading source shader file", "error", true);
            return;
        }
    }

    public static loadJSONMesh(path: string): GeometryParameters
    {
        let json = Loader.loadJSON(path);
        let vertices = json.meshes[0].vertices;
        let indices = [].concat.apply([], json.meshes[0].faces);
        let normals = json.meshes[0].normals;
        let uvs = json.meshes[0].texturecoords[0];
        return { vertices, indices, normals, uvs };
    }
}