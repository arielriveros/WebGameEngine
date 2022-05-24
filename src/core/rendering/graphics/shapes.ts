import { Renderable } from "./renderable";
import { Line } from "./fiberShape";
import { Triangle, ColorTriangle, Quad } from "./planarShapes";
import { Cube, ColorCube, TexturedCube } from "./volumeShapes";

export { 
    Renderable as Shape, 
    Triangle, ColorTriangle, Quad, Line,
    Cube, ColorCube, TexturedCube};