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

    public static loadText(path: string): string | undefined {
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
}