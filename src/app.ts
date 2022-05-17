import { Engine } from 'core';

export let GameInstance: Engine;

// main application the browser runs
window.onload = () => {
    GameInstance = new Engine();
    GameInstance.start();
}

window.onresize = () => {
    GameInstance.resize();
}