//<!-- Context -->

function WelcomeContext() {
    this._construct = function() {
        this.didLaunch = false;
        this.selectedItemId = 0;

        this.recentField = "";
    };
    this._construct();

    this.field = function(name) {
        if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "selectedItemId") {
            return this.selectedItemId;
        }

        return "unknown-field-name";
    };

    this.selfCopy = function() {
        let that = new WelcomeContext();
        that.didLaunch = this.didLaunch;
        that.selectedItemId = this.selectedItemId;
        that.recentField = this.recentField;
        return that;
    };

    this.setField = function(name, value) {
        if (name == "didLaunch") {
            this.didLaunch = value;
        } else if (name == "selectedItemId") {
            this.selectedItemId = value;
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
        <li><a data-id="0">What is PSKOV</a></li>
        <li><a data-id="1">What PSKOV is not</a></li>
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
        // Dbg.
        this.ctrl.registerCallback((c) => {
            console.log(`ИГР WelcomeC._construct ctrl key/value: '${c.recentField}'/'${c.field(c.recentField)}'`);

        });
        this.setupHTML();
        this.setupEffects();
        this.setupEvents();
    };

    this.setupEffects = function() {
        this.ctrl.registerFieldCallback("selectedItemId", (c) => {
            welcomeDisplaySelectedItem(c.selectedItemId);
        });
    };

    this.setupEvents = function() {
        window.addEventListener("load", (e) => {
            this.ctrl.set("didLaunch", true);
        });

        let items = deId(WELCOME_ITEMS_ID);
        items.addEventListener("click", (e) => {
            if (e.target.nodeName == "A") {
                let id = Number(e.target.dataset.id);
                this.ctrl.set("selectedItemId", id);
            }
        });
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

function welcomeDisplaySelectedItem(id) {
    let items = deId(WELCOME_ITEMS_ID);
    for (let i in items.children) {
        let li = items.children[i];
        if (!welcomeIsNavItemSelectable(li)) {
            continue;
        }
        let selectableItemId = i - 2;
        let isSelected = (selectableItemId == id);
        welcomeSelectNavItem(li, isSelected);
    }
}

function welcomeIsNavItemSelectable(li) {
    return li.firstChild && li.firstChild.nodeName == "A";
}

function welcomeSelectNavItem(item, isSelected) {
    if (isSelected) {
        item.className = "uk-active";
    } else {
        item.className = "";
    }
}

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
