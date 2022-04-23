let engine: ENGINE.Engine;

// main application the browser runs
window.onload = () => {
    engine = new ENGINE.Engine();
    engine.start();
}

window.onresize = () => {
    engine.resize();
}