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

let WELCOME_ITEMS_ID = "welcome-items";
let WELCOME_PANEL_LEFT = "panel-left";
let WELCOME_TEMPLATE_HEADER = `<div class="uk-position-center-vertical uk-padding">Welcome to PSKOV2</div>`;
let WELCOME_TEMPLATE_LEFT = `
<div class="uk-padding">
    <ul id="%WELCOME_ITEMS_ID%" class="uk-nav uk-nav-default">
        <li class="uk-nav-header">Welcome section</li>
        <li class="uk-nav-divider"></li>
        <li><a>What is PSKOV</a></li>
        <li><a>What PSKOV is not</a></li>
    </ul>
</div>`;
let WELCOME_TEMPLATE_MAIN = `
<div class="uk-container uk-padding">
    <h1 class="uk-heading">Welcome to PSKOV2</h1>
    <p>Time to generate static sites from web-browser!</p>
</div>`;

//<!-- Component -->

function WelcomeComponent() {
    this._construct = function() {
        this.ctrl = new CLDController(new WelcomeContext());
        this.setupHTML();
        this.setupEvents();
    };

    this.setupEvents = function() {
        window.addEventListener("load", (e) => {
            this.ctrl.set("didLaunch", true);
        });
        let items = deId(WELCOME_ITEMS_ID);
    };

    this.setupHTML = function() {
        let left = deId(WELCOME_PANEL_LEFT);
        left.innerHTML += WELCOME_TEMPLATE_LEFT
            .replaceAll("%WELCOME_ITEMS_ID%", WELCOME_ITEMS_ID);
    };

    this._construct();
}

//<!-- Shoulds -->

//<!-- Other -->

function welcomeSetup() {
    /*
    console.log("欢迎光临");
    let header = deId("panel-header");
    header.innerHTML += TEMPLATE_WELCOME_HEADER;
    let main = deId("panel-main");
    main.innerHTML += TEMPLATE_WELCOME_MAIN;
    */
}

//<!-- Setup -->

window.components.push(new WelcomeComponent());
