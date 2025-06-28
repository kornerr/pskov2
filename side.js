//<!-- API -->

function sideCreateGroup(name) {
    sideCtrl().set("createGroup", name);
    return sideCtrl().context.createdGroupId;
}

function sideCtrl() {
    return window.sideCmp.ctrl;
}

function sideDeleteGroup(id) {
    sideCtrl().set("deleteGroup", Number(id));
}

function sideResetItemTitles(id, titles) {
    sideCtrl().set("activeGroupId", Number(id));
    sideCtrl().set("activeGroupTitles", titles);
}

function sideSelectionIds(strId) {
    var result = [];
    let parts = strId.split("/");
    if (parts.length == 2) {
        result.push(Number(parts[0]));
        result.push(Number(parts[1]));
    }
    return result;
}

//<!-- Context -->

function SideContext() {
    this._construct = function() {
        this.activeGroupId = -1;
        this.activeGroupTitles= [];
        this.createGroup = "";
        this.createdGroupId = -1;
        this.deleteGroup = -1;
        this.didClickItemId = "";
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
        } else if (name == "createGroup") {
            return this.createGroup;
        } else if (name == "createdGroupId") {
            return this.createdGroupId;
        } else if (name == "deleteGroup") {
            return this.deleteGroup;
        } else if (name == "didClickItemId") {
            return this.didClickItemId;
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
        that.createGroup = this.createGroup;
        that.createdGroupId = this.createdGroupId;
        that.deleteGroup = this.deleteGroup;
        that.didClickItemId = this.didClickItemId;
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
        } else if (name == "createGroup") {
            this.createGroup = value;
        } else if (name == "createdGroupId") {
            this.createdGroupId = value;
        } else if (name == "deleteGroup") {
            this.deleteGroup = value;
        } else if (name == "didClickItemId") {
            this.didClickItemId = value;
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
            "selectedItemId": (c) => { sideDisplaySelection(c.groupTitles, c.selectedItemId); },
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
                this.ctrl.set("didClickItemId", e.target.dataset.id);
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

    if (c.recentField == "didClickItemId") {
        c.selectedItemId = c.didClickItemId;
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

// Reset classes to depict selection
function sideDisplaySelection(groupTitles, id) {
    let items = deId(SIDE_ITEMS_ID);
    var groupId = 0;
    for (let i in items.children) {
        let itemId = sideLiToItemId(groupTitles, i);
        // Ignore non-selectable LI's.
        if (itemId == "") {
            continue
        }
        let isSelected = (itemId == id);
        let li = items.children[i];
        li.className = isSelected ? "uk-active" : "";
    }
}

function sideItemId(group, item) {
    return `${group}/${item}`;
}

// Convert sequential LI number to item id if LI number is valid
function sideLiToItemId(groupTitles, id) {
    var rid = -1;
    for (let i in groupTitles) {
        let g = groupTitles[i];
        rid += 2;
        for (let j in g.items) {
            rid += 1;
            if (rid == id) {
                return sideItemId(i, j);
            }
        }
    }
    return "";
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

//<!-- Setup -->

window.sideCmp = new SideComponent();
window.components.push(window.sideCmp);
