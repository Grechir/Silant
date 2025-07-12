export function handleEnter(event, callback) {
    if (event.key === 'Enter') {
        event.preventDefault();
        callback();
    }
}
