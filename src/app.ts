import { Engine } from './core/engine';

let engine: Engine;

// main application the browser runs
window.onload = () => {
    engine = new Engine();
    engine.start();
}

window.onresize = () => {
    engine.resize();
}