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
        this.setupSideMenu();
    };

    this.setupSideMenu = function() {
        this.sideId = sideCreateGroup("Welcome");
        sideResetItemTitles(
            this.sideId,
            [
              "What is PSKOV 2",
              "What PSKOV 2 is not",
            ]
        );
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

//<!-- Setup -->

window.components.push(new WelcomeComponent());
