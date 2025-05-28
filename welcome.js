//<!-- Context -->

function WelcomeContext() {
    this._construct = function() {
        this.didLaunch = false;
        this.selectedMenuId = 0;

        this.recentField = "";
    };
    this._construct();

    this.field = function(name) {
        if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "selectedMenuId") {
            return this.selectedMenuId;
        }

        return "unknown-field-name";
    };

    this.selfCopy = function() {
        let that = new WelcomeContext();
        that.didLaunch = this.didLaunch;
        that.selectedMenuId = this.selectedMenuId;
        that.recentField = this.recentField;
        return that;
    };

    this.setField = function(name, value) {
        if (name == "didLaunch") {
            this.didLaunch = value;
        } else if (name == "selectedMenuId") {
            this.selectedMenuId = value;
        }
    };
}

//<!-- Constants -->

let TEMPLATE_WELCOME_HEADER = `<div class="uk-position-center-vertical uk-padding">Welcome to PSKOV2</div>`;
let TEMPLATE_WELCOME_LEFT = `
<div class="uk-padding">
    <ul class="uk-nav uk-nav-default">
        <li class="uk-nav-header">Welcome section</li>
        <li class="uk-nav-divider"></li>
        <li><a href="#">What is PSKOV</a></li>
        <li><a href="#">What PSKOV is not</a></li>
    </ul>
</div>`;
let TEMPLATE_WELCOME_MAIN = `
<div class="uk-container uk-padding">
    <h1 class="uk-heading">Welcome to PSKOV2</h1>
    <p>Time to generate static sites from web-browser!</p>
</div>`;

//<!-- Component -->

function WelcomeComponent() {
    this._construct = function() {
        this.ctrl = new CLDController(new WelcomeContext());
        this.setupEvents();
        this.setupMenu();
    };

    this.setupEvents = function() {
        window.addEventListener("load", (e) => {
            this.ctrl.set("didLaunch", true);
        });
    };

    this.setupMenu = function() {
        let left = document.getElementById("panel-left");
        left.innerHTML += TEMPLATE_WELCOME_LEFT;
    };

    this._construct();
}





//<!-- Context -->


//<!-- Shoulds -->


//<!-- Other -->

function welcomeSetup() {
    console.log("欢迎光临");
    let header = document.getElementById("panel-header");
    header.innerHTML += TEMPLATE_WELCOME_HEADER;
    let main = document.getElementById("panel-main");
    main.innerHTML += TEMPLATE_WELCOME_MAIN;
}

//<!-- Setup -->

window.components.push(new WelcomeComponent());
