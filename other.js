// Shortcut to get document element by id
function deId(id) {
    return document.getElementById(id);
}

// Wait for the specified duration asynchronously
async function asyncSleep(duration) {
    await new Promise((resolve) => setTimeout(resolve, duration));
}

// Report failure as UIkit modal
function reportFailure(title, details) {
    let html = `
<h2>${title}</h2>
<p>Error: '${details}'</p>
    `;
    UIkit.modal.alert(html);
}

// Report success as UIkit notification
//
// A tiny delay is used to overcome the conflict of UIkit and CLDController
function reportSuccess(text, timeout = 5000) {
    setTimeout(
        () => {
            UIkit.notification({
                message: text,
                status: "success",
                timeout: timeout,
            });
        },
        0
    );
}

// Return result similar to `fromNow()` of `Day.js` (up to elapsed hours)
// https://day.js.org/docs/en/display/from-now
function strago(dt) {
    let now = new Date();
    let d = Math.round((now - dt) / 1000);
    if (d < 45) {
        return "A few seconds ago";
    } else if (d >= 45 && d < 90) {
        return "A minute ago";
    } else if (d >= 90 && d < 45 * 60) {
        let mins = Math.round(d / 60);
        return `${mins} minutes ago`;
    } else if (d >= 45 * 60 && d < 90 * 60) {
        return "An hour ago";
    } else if (d >= 90 * 60 && d < 22 * 60 * 60) {
        let hours = Math.round(d / 60 / 60);
        return `${hours} hours ago`;
    } 
    return dt.toLocaleString();
}
