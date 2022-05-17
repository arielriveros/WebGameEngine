export function LOG(input: string, type: string = 'normal', onBrowser: boolean = false) {
    let entry: HTMLDivElement = document.createElement('div');
    entry.className = 'console-entry';

    let text: HTMLDivElement = document.createElement('div');
    switch(type){
        case 'error': 
            text.className = 'console-error'; 
            if(onBrowser){
                console.error(input);
            }
            break;
        case 'info':
            text.className = 'console-info';
            if(onBrowser){
                console.info(input);
            }
            break;
        case 'warning':
            text.className = 'console-warning';
            if(onBrowser){
                console.warn(input);
            }
            break;
        case 'normal':
        default:
            text.className = 'console-text';
            if(onBrowser){
                console.log(input);
            }
            break;

    }
    
    text.innerHTML = input;

    const date = new Date();
    let time: HTMLDivElement = document.createElement('div');
    time.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    time.className = 'console-time';

    entry.appendChild(text);
    entry.appendChild(time);

    let debugConsole = document.getElementById('console');
    debugConsole?.append(entry);
    debugConsole?.scrollTo(0, debugConsole.scrollHeight);
}