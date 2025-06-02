//<!-- Context -->

function WelcomeContext() {
    this._construct = function() {
        this.clickedItemId = -1;
        this.didLaunch = false;
        this.selectedItemId = -1;

        this.recentField = "";
    };
    this._construct();

    this.field = function(name) {
        if (name == "clickedItemId") {
            return this.clickedItemId;
        } else if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "selectedItemId") {
            return this.selectedItemId;
        }

        return "unknown-field-name";
    };

    this.selfCopy = function() {
        let that = new WelcomeContext();
        that.clickedItemId = this.clickedItemId;
        that.didLaunch = this.didLaunch;
        that.selectedItemId = this.selectedItemId;
        that.recentField = this.recentField;
        return that;
    };

    this.setField = function(name, value) {
        if (name == "clickedItemId") {
            this.clickedItemId = value;
        } else if (name == "didLaunch") {
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
let WELCOME_HTML_MENU = `
<div class="uk-padding">
    <ul id="%WELCOME_ITEMS_ID%" class="uk-nav uk-nav-default">
        <li class="uk-nav-header">Welcome section</li>
        <li class="uk-nav-divider"></li>
        <li><a data-id="0">What is PSKOV</a></li>
        <li><a data-id="1">What PSKOV is not</a></li>
    </ul>
</div>`;
let WELCOME_HTML_CONTENTS = {
  0: `
<div class="uk-container uk-padding">
    <h1 class="uk-heading">Welcome to PSKOV2</h1>
    <p>Time to generate static sites from web-browser!</p>
    <p>PSKOV 2 is a static site generator that works inside a web browser</p>
    <p>PSKOV 2 can also work completely off-line with LHA</p>
    <p>Though, by default, PSKOV 2 works directly with Git</p>
</div>`,
  1: `
<div class="uk-container uk-padding">
    <h1 class="uk-heading">PSKOV2 is not</h1>
    <ul>
      <li>It's not a WYSIWYG editor</li>
      <li>It doesn't need server (PSKOV 2 is client-side JS only)</li>
    </ul>
</div>`
};

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
        this.setupShoulds();
    };

    this.setupEffects = function() {
        let d = { 
            "selectedItemId": (c) => {
                welcomeDisplaySelectedItem(c.selectedItemId);
                welcomeDisplaySelectedItemContents(c.selectedItemId);
            },
        }
        for (let field in d) {
            this.ctrl.registerFieldCallback(field, d[field]);
        }
    };

    this.setupEvents = function() {
        window.addEventListener("load", (e) => {
            this.ctrl.set("didLaunch", true);
        });

        let items = deId(WELCOME_ITEMS_ID);
        items.addEventListener("click", (e) => {
            if (e.target.nodeName == "A") {
                let id = Number(e.target.dataset.id);
                this.ctrl.set("clickedItemId", id);
            }
        });
    };

    this.setupHTML = function() {
        let left = deId(WELCOME_PANEL_LEFT);
        left.innerHTML += WELCOME_HTML_MENU
            .replaceAll("%WELCOME_ITEMS_ID%", WELCOME_ITEMS_ID);
    };

    this.setupShoulds = function() {
        [
            welcomeShouldResetSelectedItemId,
        ].forEach((f) => {
            this.ctrl.registerFunction(f);
        });
    };
    
    this._construct();
}

//<!-- Shoulds -->

// Conditions:
// 1. Did launch
// 2. Item has been clicked
function welcomeShouldResetSelectedItemId(c) {
    if (c.recentField == "didLaunch") {
        c.selectedItemId = 0;
        c.recentField = "selectedItemId";
        return c;
    }

    if (c.recentField == "clickedItemId") {
        c.selectedItemId = c.clickedItemId;
        c.recentField = "selectedItemId";
        return c;
    }

    c.recentField = "none";
    return c;
}

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

function welcomeDisplaySelectedItemContents(id) {
    let main = deId("panel-main");
    main.innerHTML = WELCOME_HTML_CONTENTS[id];
}

// Navigation item is selectable if its child is a link
function welcomeIsNavItemSelectable(li) {
    return li.firstChild && li.firstChild.nodeName == "A";
}

function welcomeSelectNavItem(item, isSelected) {
    item.className = isSelected? "uk-active" : "";
}

//<!-- Setup -->

window.components.push(new WelcomeComponent());
