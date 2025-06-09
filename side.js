//<!-- API -->

function sideCreateGroup(name) {
    window.sideMenu.ctrl.set("createGroup", name);
    return window.sideMenu.ctrl.context.createdGroupId;
}

function sideDeleteGroup(id) {
    window.sideMenu.ctrl.set("deleteGroup", id);
}

function sideResetItemTitles(id, titles) {
    window.sideMenu.ctrl.set("activeGroupId", id);
    window.sideMenu.ctrl.set("activeGroupTitles", titles);
}

//<!-- Context -->

function SideContext() {
    this._construct = function() {
        this.activeGroupId = -1;
        this.activeGroupTitles= [];
        this.clickedItemId = "";
        this.createGroup = "";
        this.createdGroupId = -1;
        this.deleteGroup = -1;
        this.didLaunch = false;
        this.groupTitles = [];
        this.html = "";
        this.selectedItemId = "";

        this.recentField = "";
    };
    this._construct();

    this.field = function(name) {
        if (name == "activeGroupId") {
            return this.activeGroupId;
        } else if (name == "activeGroupTitles") {
            return this.activeGroupTitles;
        } else if (name == "clickedItemId") {
            return this.clickedItemId;
        } else if (name == "createGroup") {
            return this.createGroup;
        } else if (name == "createdGroupId") {
            return this.createdGroupId;
        } else if (name == "deleteGroup") {
            return this.deleteGroup;
        } else if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "groupTitles") {
            return this.groupTitles;
        } else if (name == "html") {
            return this.html;
        } else if (name == "selectedItemId") {
            return this.selectedItemId;
        }

        return "unknown-field-name";
    };

    this.selfCopy = function() {
        let that = new SideContext();
        that.activeGroupId = this.activeGroupId;
        that.activeGroupTitles = this.activeGroupTitles
        that.clickedItemId = this.clickedItemId;
        that.createGroup = this.createGroup;
        that.createdGroupId = this.createdGroupId;
        that.deleteGroup = this.deleteGroup;
        that.didLaunch = this.didLaunch;
        that.groupTitles = this.groupTitles;
        that.html = this.html;
        that.selectedItemId = this.selectedItemId;

        that.recentField = this.recentField;
        return that;
    };

    this.setField = function(name, value) {
        if (name == "activeGroupId") {
            this.activeGroupId = value;
        } else if (name == "activeGroupTitles") {
            this.activeGroupTitles = value;
        } else if (name == "clickedItemId") {
            this.clickedItemId = value;
        } else if (name == "createGroup") {
            this.createGroup = value;
        } else if (name == "createdGroupId") {
            this.createdGroupId = value;
        } else if (name == "deleteGroup") {
            this.deleteGroup = value;
        } else if (name == "didLaunch") {
            this.didLaunch = value;
        } else if (name == "groupTitles") {
            this.groupTitles = value;
        } else if (name == "html") {
            this.html = value;
        } else if (name == "selectedItemId") {
            this.selectedItemId = value;
        }
    };
}

//<!-- Constants -->

let SIDE_HTML = `
<div class="uk-padding-small">
    <ul id="%SIDE_ITEMS_ID%" class="uk-nav uk-nav-default">
    </ul>
</div>`;
let SIDE_HTML_ITEM = `
<li><a data-id="%ITEM_ID%">%ITEM_NAME%</a></li>
`;
let SIDE_HTML_TITLE = `
<li class="uk-nav-header">%TITLE%</li>
<li class="uk-nav-divider"></li>
`;
let SIDE_ITEMS_ID = "side-items";
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
        this.setupEvents();
        this.setupEffects();
        this.setupShoulds();
    };

    this.setupEffects = function() {
        let d = { 
            "groupTitles": (c) => { sideResetHTML(c.groupTitles); },
        }
        for (let field in d) {
            this.ctrl.registerFieldCallback(field, d[field]);
        }
    };

    this.setupEvents = function() {
        window.addEventListener("load", (e) => {
            this.ctrl.set("didLaunch", true);
        });

        let items = deId(SIDE_ITEMS_ID);
        items.addEventListener("click", (e) => {
            if (e.target.nodeName == "A") {
                this.ctrl.set("clickedItemId", e.target.dataset.id);
            }
        });
    };

    this.setupHTML = function() {
        let parent = deId(SIDE_PANEL_LEFT);
        parent.innerHTML = SIDE_HTML
            .replaceAll("%SIDE_ITEMS_ID%", SIDE_ITEMS_ID);
    };

    this.setupShoulds = function() {
        [
            sideShouldResetCreatedGroupId,
            sideShouldResetGroupTitles,
            sideShouldResetSelectedItemId,
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
function sideShouldResetSelectedItemId(c) {
    if (c.recentField == "didLaunch") {
        c.selectedItemId = "0/0";
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

// Conditions:
// 1. Group creation has been requested
function sideShouldResetCreatedGroupId(c) {
    if (c.recentField == "createGroup") {
        c.createdGroupId = c.groupTitles.length;
        c.recentField = "createdGroupId";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Group id after creation has been "allocated"
// 2. Items have been explicitely reset
function sideShouldResetGroupTitles(c) {
    if (c.recentField == "createdGroupId") {
        c.groupTitles.push({
            section: c.createGroup,
            items: []
        });
        c.recentField = "groupTitles"
        return c;
    }

    if (c.recentField == "activeGroupTitles") {
        c.groupTitles[c.activeGroupId].items = c.activeGroupTitles;
        c.recentField = "groupTitles"
        return c;
    }

    c.recentField = "none";
    return c;
}

//<!-- Other -->

function sideItemId(group, item) {
    return `${group}/${item}`;
}

function sideResetHTML(groupTitles) {
    let items = deId(SIDE_ITEMS_ID);
    var html = "";
    // For each section.
    for (let i in groupTitles) {
        let group = groupTitles[i];
        html += SIDE_HTML_TITLE
            .replaceAll("%TITLE%", group.section);
        // For each item in each section.
        for (let j in group.items) {
            let title = group.items[j];
            let itemId = sideItemId(i, j);
            html += SIDE_HTML_ITEM
                .replaceAll("%ITEM_ID%", itemId)
                .replaceAll("%ITEM_NAME%", title);
        }
    }
    items.innerHTML = html;
}

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
