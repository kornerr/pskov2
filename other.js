// Shortcut to get document element by id
function deId(id) {
    return document.getElementById(id);
}

// Wait for the specified duration asynchronously
async function asyncSleep(duration) {
    await new Promise((resolve) => setTimeout(resolve, duration));
}
