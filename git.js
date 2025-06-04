//<!-- Context -->

function GitContext() {
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
        let that = new GitContext();
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

let GIT_HTML_CONTENTS = {
  0: `
<div class="uk-container uk-padding">
    <h1 class="uk-heading">Repository</h1>
    <p>Select repository to clone</p>
</div>`,
  1: `
<div class="uk-container uk-padding">
    <h1 class="uk-heading">Branch</h1>
    <p>Select branch of currently active repository</p>
</div>`
};
let GIT_HTML_MENU = `
<div class="uk-padding-small">
    <ul id="%GIT_ITEMS_ID%" class="uk-nav uk-nav-default">
        <li class="uk-nav-header">Git</li>
        <li class="uk-nav-divider"></li>
        <li><a data-id="0">Repository</a></li>
        <li><a data-id="1">Branch</a></li>
    </ul>
</div>`;
let GIT_ITEMS_ID = "git-items";
let GIT_PANEL_LEFT = "panel-left";
let GIT_PANEL_MAIN = "panel-main";

//<!-- Component -->

function GitComponent() {
    this._construct = function() {
        this.ctrl = new CLDController(new GitContext());
        // Dbg.
        this.ctrl.registerCallback((c) => {
            console.log(`ИГР GitC._construct ctrl key/value: '${c.recentField}'/'${c.field(c.recentField)}'`);

        });
        this.setupHTML();
        this.setupEffects();
        this.setupEvents();
        this.setupShoulds();
    };

    this.setupEffects = function() {
        let d = { 
            "selectedItemId": (c) => {
                gitDisplaySelectedItem(c.selectedItemId);
                gitDisplaySelectedItemContents(c.selectedItemId);
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

        let items = deId(GIT_ITEMS_ID);
        items.addEventListener("click", (e) => {
            if (e.target.nodeName == "A") {
                let id = Number(e.target.dataset.id);
                this.ctrl.set("clickedItemId", id);
            }
        });
    };

    this.setupHTML = function() {
        let left = deId(GIT_PANEL_LEFT);
        let menu = document.createElement("div");
        menu.innerHTML = GIT_HTML_MENU
            .replaceAll("%GIT_ITEMS_ID%", GIT_ITEMS_ID);
        left.appendChild(menu);
    };

    this.setupShoulds = function() {
        [
            gitShouldResetSelectedItemId,
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
function gitShouldResetSelectedItemId(c) {
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

function gitDisplaySelectedItem(id) {
    let items = deId(GIT_ITEMS_ID);
    for (let i in items.children) {
        let li = items.children[i];
        if (!gitIsNavItemSelectable(li)) {
            continue;
        }
        let selectableItemId = i - 2;
        let isSelected = (selectableItemId == id);
        gitSelectNavItem(li, isSelected);
    }
}

function gitDisplaySelectedItemContents(id) {
    let main = deId(GIT_PANEL_MAIN);
    main.innerHTML = GIT_HTML_CONTENTS[id];
}

// Navigation item is selectable if its child is a link
function gitIsNavItemSelectable(li) {
    return li.firstChild && li.firstChild.nodeName == "A";
}

function gitSelectNavItem(item, isSelected) {
    item.className = isSelected? "uk-active" : "";
}

//<!-- Setup -->

window.components.push(new GitComponent());
