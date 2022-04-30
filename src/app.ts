import { Engine } from './core/engine';

let engine: Engine;

// main application the browser runs
window.onload = () => {
    engine = new Engine();
    console.log("A");
    engine.start();
}

window.onresize = () => {
    engine.resize();
}