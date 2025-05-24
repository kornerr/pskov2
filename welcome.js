//<!-- Setup -->
window.addEventListener("load", (e) => {
    welcomeSetup();
});

//<!-- Constants -->

TEMPLATE_WELCOME_HEADER = `<div class="uk-position-center-vertical uk-padding">Welcome to PSKOV2</div>`;
TEMPLATE_WELCOME_LEFT = `
<div>
    <ul class="uk-nav uk-nav-default">
        <li class="uk-nav-header">Welcome section</li>
        <li class="uk-nav-divider"></li>
        <li><a href="#"><span uk-icon="triangle-right"></span>What is PSKOV</a></li>
        <li><a href="#">What PSKOV is not</a></li>
    </ul>
</div>`;

//<!-- Context -->


//<!-- Shoulds -->


//<!-- Other -->

function welcomeSetup() {
    console.log("欢迎光临");
    let header = document.getElementById("panel-header");
    header.innerHTML += TEMPLATE_WELCOME_HEADER;
    let left = document.getElementById("panel-left");
    left.innerHTML += TEMPLATE_WELCOME_LEFT;
}
