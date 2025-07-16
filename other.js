// Shortcut to get document element by id
function deId(id) {
    return document.getElementById(id);
}

// Wait for the specified duration asynchronously
async function asyncSleep(duration) {
    await new Promise((resolve) => setTimeout(resolve, duration));
}

// Report failure as a modal
function reportFailure(title, details) {
    let html = `
<h2>${title}</h2>
<p>Error: '${details}'</p>
    `;
    UIkit.modal.alert(html);
}

// Report success with a slight delay
//
// The delay is necessary to overcome the conflict of UIkit and CLDController
function reportSuccess(text) {
    setTimeout(
        () => {
            UIkit.notification({
                message: text,
                status: "success",
            });
        },
        0
    );
}
