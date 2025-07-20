//<!-- API -->

function headerCreateButton(name) {
    headerCtrl().set("createButton", name);
    return headerCtrl().context.createdButtonId;
}

function headerCtrl() {
    return window.headerCmp.ctrl;
}

function headerDeleteButton(id) {
    headerCtrl().set("deleteButton", Number(id));
}

//<!-- Context -->

function HeaderContext() {
    this._construct = function() {
        this.clickedButtonId = "";
        this.createButton = "";
        this.createdButtonId = -1;
        this.deleteButton = -1;
        this.didLaunch = false;
        this.html = "";
        this.selectedButtonId = "";
        this.selectButton = -1;

        this.recentField = "";
    };
    this._construct();

    this.field = function(name) {
        if (name == "clickedItemId") {
            return this.clickedItemId;
        } else if (name == "createButton") {
            return this.createButton;
        } else if (name == "createdButtonId") {
            return this.createdButtonId;
        } else if (name == "deleteButton") {
            return this.deleteButton;
        } else if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "html") {
            return this.html;
        } else if (name == "selectedButtonId") {
            return this.selectedButtonId;
        } else if (name == "selectButton") {
            return this.selectButton;
        }

        return "unknown-field-name";
    };

    this.selfCopy = function() {
        let that = new SideContext();
        that.clickedItemId = this.clickedItemId;
        that.createButton = this.createButton;
        that.createdButtonId = this.createdButtonId;
        that.deleteButton = this.deleteButton;
        that.didLaunch = this.didLaunch;
        that.html = this.html;
        that.selectedButtonId = this.selectedButtonId;
        that.selectButton = this.selectButton;

        that.recentField = this.recentField;
        return that;
    };

    this.setField = function(name, value) {
        if (name == "clickedItemId") {
            this.clickedItemId = value;
        } else if (name == "createButton") {
            this.createButton = value;
        } else if (name == "createdButtonId") {
            this.createdButtonId = value;
        } else if (name == "deleteButton") {
            this.deleteButton = value;
        } else if (name == "didLaunch") {
            this.didLaunch = value;
        } else if (name == "html") {
            this.html = value;
        } else if (name == "selectedButtonId") {
            this.selectedButtonId = value;
        } else if (name == "selectButton") {
            this.selectButton = value;
        }
    };
}

//<!-- Constants -->

let HEADER_HTML = `
<div class="uk-padding-small">
    <ul id="%SIDE_ITEMS_ID%" class="uk-nav uk-nav-default">
    </ul>
</div>`;
let HEADER_HTML_ITEM = `
<li><a data-id="%ITEM_ID%">%ITEM_NAME%</a></li>
`;
let HEADER_ITEMS_ID = "side-items";
let HEADER_PANEL_HEADER = "panel-header";

//<!-- Component -->

function HeaderComponent() {
    this._construct = function() {
        this.ctrl = new CLDController(new HeaderContext());
        // Dbg.
        this.ctrl.registerCallback((c) => {
            console.log(`ИГР HeaderC._construct ctrl key/value: '${c.recentField}'/'${c.field(c.recentField)}'`);
        });
        /*
        this.setupHTML();
        this.setupEvents();
        this.setupEffects();
        this.setupShoulds();
        */
    };

    /*
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
    */
    
    this._construct();
}

//<!-- Shoulds -->


//<!-- Other -->

//<!-- Setup -->

window.headerCmp = new HeaderComponent();
window.components.push(window.headerCmp);
