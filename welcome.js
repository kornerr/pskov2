//<!-- Setup -->
window.addEventListener("load", (e) => {
    welcomeSetup();
});

//<!-- Constants -->

TEMPLATE_WELCOME_HEADER = `<div class="uk-position-center-vertical uk-padding">Welcome to PSKOV2</div>`;

//<!-- Context -->


//<!-- Shoulds -->


//<!-- Other -->

function welcomeSetup() {
    console.log("欢迎光临");
    let header = document.getElementById("panel-header");
    header.innerHTML = TEMPLATE_WELCOME_HEADER;
}
