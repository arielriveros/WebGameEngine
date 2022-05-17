export function LOG(input: string, type: string = 'normal') {
    let entry: HTMLDivElement = document.createElement('div');
    entry.className = 'console-entry';

    let text: HTMLDivElement = document.createElement('div');
    switch(type){
        case 'error': 
            text.className = 'console-error'; 
            break;
        case 'info':
        text.className = 'console-info';
        break;
        case 'warning':
            text.className = 'console-warning';
            break;
        case 'normal':
        default:
            text.className = 'console-text';
            break;

    }
    
    text.innerHTML = input;

    const date = new Date();
    let time: HTMLDivElement = document.createElement('div');
    time.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    time.className = 'console-time';

    entry.appendChild(text);
    entry.appendChild(time);

    let console = document.getElementById('console');
    console?.append(entry);
    console?.scrollTo(0, console.scrollHeight);
}