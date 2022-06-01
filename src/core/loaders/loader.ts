import { LOG } from "utils";

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
}