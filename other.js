// Shortcut to get document element by id
function deId(id) {
    return document.getElementById(id);
}

// Wait for the specified duration asynchronously
async function asyncSleep(duration) {
    await new Promise((resolve) => setTimeout(resolve, duration));
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
