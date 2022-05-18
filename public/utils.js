function filterConsole(entryType) {
    let entries = document.getElementsByClassName("console-entry");
    for (let i = 0; i < entries.length; i++) {
        let entry = entries[i];
        if(entry.getElementsByClassName('console-text')[0].classList.contains(entryType)) {
            entry.style.display = "flex";
        }
        else {
            entry.style.display = "none";
        }
    }
}