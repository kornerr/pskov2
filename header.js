//<!-- API -->

function headerCreateButton(title) {
    headerCtrl().set("createButton", title);
    return headerCtrl().context.createdButtonId;
}

function headerCtrl() {
    return window.headerCmp.ctrl;
}

//<!-- Context -->

function HeaderContext() {
    this._construct = function() {
        this.buttons = [];
        this.clickedButtonId = "";
        this.createButton = "";
        this.createdButtonId = -1;
        this.didLaunch = false;
        this.html = "";

        this.recentField = "";
    };
    this._construct();

    this.field = function(name) {
        if (name == "buttons") {
            return this.buttons;
        } else if (name == "clickedButtonId") {
            return this.clickedButtonId;
        } else if (name == "createButton") {
            return this.createButton;
        } else if (name == "createdButtonId") {
            return this.createdButtonId;
        } else if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "html") {
            return this.html;
        }

        return "unknown-field-name";
    };

    this.selfCopy = function() {
        let that = new HeaderContext();
        that.buttons = this.buttons;
        that.clickedButtonId = this.clickedButtonId;
        that.createButton = this.createButton;
        that.createdButtonId = this.createdButtonId;
        that.didLaunch = this.didLaunch;
        that.html = this.html;

        that.recentField = this.recentField;
        return that;
    };

    this.setField = function(name, value) {
        if (name == "buttons") {
            this.buttons = value;
        } else if (name == "clickedButtonId") {
            this.clickedButtonId = value;
        } else if (name == "createButton") {
            this.createButton = value;
        } else if (name == "createdButtonId") {
            this.createdButtonId = value;
        } else if (name == "didLaunch") {
            this.didLaunch = value;
        } else if (name == "html") {
            this.html = value;
        }
    };
}

//<!-- Constants -->

let HEADER_HTML = `
<div id="%HEADER_BUTTONS_ID%" class="vert-align">
</div>`;
let HEADER_HTML_BUTTON = `
<button class="uk-button uk-button-small uk-button-default" onclick='headerCtrl().set("clickedButtonId", "%ID%")'>%TITLE%</button>
`;
let HEADER_BUTTONS_ID = "header-buttons";
let HEADER_PANEL_HEADER = "panel-header";

//<!-- Component -->

function HeaderComponent() {
    this._construct = function() {
        this.ctrl = new CLDController(new HeaderContext());
        // Dbg.
        this.ctrl.registerCallback((c) => {
            console.log(`ИГР HeaderC._construct ctrl key/value: '${c.recentField}'/'${c.field(c.recentField)}'`);
        });
        this.setupHTML();
        this.setupEvents();
        this.setupEffects();
        this.setupShoulds();
    };

    this.setupEffects = function() {
        let d = { 
            "buttons": (c) => { headerResetHTML(c.buttons); },
        }
        for (let field in d) {
            this.ctrl.registerFieldCallback(field, d[field]);
        }
    };

    this.setupEvents = function() {
        window.addEventListener("load", (e) => {
            this.ctrl.set("didLaunch", true);
        });
    };

    this.setupHTML = function() {
        let parent = deId(HEADER_PANEL_HEADER);
        parent.innerHTML = HEADER_HTML
            .replaceAll("%HEADER_BUTTONS_ID%", HEADER_BUTTONS_ID);
    };

    this.setupShoulds = function() {
        [
            headerShouldResetButtons,
            headerShouldResetCreatedButtonId,
        ].forEach((f) => {
            this.ctrl.registerFunction(f);
        });
    };
    
    this._construct();
}

//<!-- Shoulds -->

// Conditions:
// 1. Button id after creation has been "allocated"
function headerShouldResetButtons(c) {
    if (c.recentField == "createdButtonId") {
        c.buttons.push(c.createButton);
        c.recentField = "buttons"
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Button creation has been requested
function headerShouldResetCreatedButtonId(c) {
    if (c.recentField == "createButton") {
        c.createdButtonId = c.buttons.length;
        c.recentField = "createdButtonId";
        return c;
    }

    c.recentField = "none";
    return c;
}


//<!-- Other -->

// Display header HTML
function headerResetHTML(buttons) {
    let el = deId(HEADER_BUTTONS_ID);
    var html = "";
    // For each button.
    for (let i in buttons) {
        let title = buttons[i];
        html += HEADER_HTML_BUTTON
            .replaceAll("%ID%", i)
            .replaceAll("%TITLE%", title);
    }
    el.innerHTML = html;
}

//<!-- Setup -->

window.headerCmp = new HeaderComponent();
window.components.push(window.headerCmp);
