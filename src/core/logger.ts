export function LOG(input: string, type: string = 'normal', onBrowser: boolean = false, overwrite: boolean = false): void {

    let debugConsole = document.getElementById('console') as HTMLDivElement;

    let entry: HTMLDivElement = document.createElement('div');
    entry.className = 'console-entry';

    let text: HTMLDivElement = document.createElement('div');
    switch(type){
        case 'error': 
            text.className = 'console-text console-error'; 
            if(onBrowser){
                console.error(input);
            }
            break;
        case 'info':
            text.className = 'console-text console-info';
            if(onBrowser){
                console.info(input);
            }
            break;
        case 'warning':
            text.className = 'console-text console-warning';
            if(onBrowser){
                console.warn(input);
            }
            break;
        case 'normal':
        default:
            text.className = 'console-text console-normal';
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

    debugConsole?.append(entry);
    debugConsole?.scrollTo(0, debugConsole.scrollHeight);
}