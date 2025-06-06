//<!-- Context -->

function SideContext() {
    this._construct = function() {
        this.activeGroupId = -1;
        this.createGroup = "";
        this.deleteGroup = -1;
        this.didLaunch = false;
        this.items = [];
        this.titles = [];

        this.recentField = "";
    };
    this._construct();

    this.field = function(name) {
        if (name == "activeGroupId") {
            return this.activeGroupId;
        } else if (name == "createGroup") {
            return this.createGroup;
        } else if (name == "deleteGroup") {
            return this.deleteGroup;
        } else if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "items") {
            return this.items;
        } else if (name == "titles") {
            return this.titles;
        }

        return "unknown-field-name";
    };

    this.selfCopy = function() {
        let that = new SideContext();
        that.activeGroupId = this.activeGroupId;
        that.createGroup = this.createGroup;
        that.deleteGroup = this.deleteGroup;
        that.didLaunch = this.didLaunch;
        that.items = this.items;
        that.titles = this.titles;
        that.recentField = this.recentField;
        return that;
    };

    this.setField = function(name, value) {
        if (name == "activeGroupId") {
            this.activeGroupId = value;
        } else if (name == "createGroup") {
            this.createGroup = value;
        } else if (name == "deleteGroup") {
            this.deleteGroup = value;
        } else if (name == "didLaunch") {
            this.didLaunch = value;
        } else if (name == "items") {
            this.items = value;
        } else if (name == "titles") {
            this.titles = value;
        }
    };
}

//<!-- Constants -->

let SIDE_HTML = `
<div class="uk-padding-small">
    <ul id="side-items" class="uk-nav uk-nav-default">
    </ul>
</div>`;
let SIDE_HTML_ITEM = `
<li><a data-id="%ITEM_ID%">%ITEM_NAME%</a></li>
`;
let SIDE_HTML_TITLE = `
<li class="uk-nav-header">%TITLE%</li>
<li class="uk-nav-divider"></li>
`;
let SIDE_PANEL_LEFT = "panel-left";

//<!-- Component -->

function SideComponent() {
    this._construct = function() {
        this.ctrl = new CLDController(new SideContext());
        // Dbg.
        this.ctrl.registerCallback((c) => {
            console.log(`ИГР SideC._construct ctrl key/value: '${c.recentField}'/'${c.field(c.recentField)}'`);

        });
        this.setupHTML();
        /*
        this.setupEffects();
        this.setupEvents();
        this.setupShoulds();
        */
    };

    /*
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
    */

    this.setupHTML = function() {
        let parent = deId(SIDE_PANEL_LEFT);
        parent.innerHTML = SIDE_HTML;
    };

    /*
    this.setupShoulds = function() {
        [
            gitShouldResetSelectedItemId,
        ].forEach((f) => {
            this.ctrl.registerFunction(f);
        });
    };
    */
    
    this._construct();
}

//<!-- Shoulds -->

// Conditions:
// 1. Did launch
// 2. Item has been clicked
/*
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
*/

//<!-- API -->

function sideCreateGroup(name) {
    window.sideMenu.ctrl.set("createGroup", name);
    return window.sideMenu.ctrl.context.activeGroupId;
}

function sideDeleteGroup(id) {
    window.sideMenu.ctrl.set("deleteGroup", id);
}

function sideResetItemTitles(id, titles) {
    window.sideMenu.ctrl.set("activeGroupId", id);
    window.sideMenu.ctrl.set("titles", titles);
}

//<!-- Other -->

/*
function gitDisplaySelectedItem(id) {
    let items = deId(GIT_ITEMS_ID);
    for (let i in items.children) {
        let li = items.children[i];
        if (!gitIsNavItemSelectable(li)) {
            continue;
        }
        let selectableItemId = i < 4 ? i - 2 : i - 4;
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
*/

//<!-- Setup -->

window.sideMenu = new SideComponent();
window.components.push(window.sideMenu);
