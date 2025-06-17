//<!-- API -->

function fs() {
    return window.fsCmp.fs;
}

//<!-- Context -->

function FSContext() {
    this._construct = function() {
        this.didLaunch = false;
        this.selectedItemId = -1;
        this.sideId = -1;
        this.sideSelectedItemId = -1;

        this.recentField = "";
    };
    this._construct();

    this.field = function(name) {
        if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "selectedItemId") {
            return this.selectedItemId;
        } else if (name == "sideId") {
            return this.sideId;
        } else if (name == "sideSelectedItemId") {
            return this.sideSelectedItemId;
        }

        return "unknown-field-name";
    };

    this.selfCopy = function() {
        let that = new FSContext();
        that.didLaunch = this.didLaunch;
        that.selectedItemId = this.selectedItemId;
        that.sideId = this.sideId;
        that.sideSelectedItemId = this.sideSelectedItemId;

        that.recentField = this.recentField;
        return that;
    };

    this.setField = function(name, value) {
        if (name == "didLaunch") {
            this.didLaunch = value;
        } else if (name == "selectedItemId") {
            this.selectedItemId = value;
        } else if (name == "sideId") {
            this.sideId = value;
        } else if (name == "sideSelectedItemId") {
            this.sideSelectedItemId = value;
        }
    };
}

//<!-- Constants -->

let FS_NAME = "pskov2-proto-fs";
let FS_PANEL_MAIN = "panel-main";
let FS_PAGES = {
  0: `
<div class="uk-container uk-padding">
    <h1 class="uk-heading">Files</h1>
    <p>TODO tree of files</P>
</div>
`,
};

//<!-- Component -->

function FSComponent() {
    this._construct = function() {
        this.ctrl = new CLDController(new FSContext());
        // Dbg.
        this.ctrl.registerCallback((c) => {
            console.log(`ИГР FSC._construct ctrl key/value: '${c.recentField}'/'${c.field(c.recentField)}'`);
        });

        this.fs = new LightningFS(FS_NAME);
        this.pfs = this.fs.promises;

        this.setupSideMenu();
        this.setupEffects();
        this.setupShoulds();
    };

    this.setupEffects = function() {
        this.ctrl.registerFieldCallback("selectedItemId", (c) => {
            let contents = FS_PAGES[c.selectedItemId];
            let main = deId(FS_PANEL_MAIN);
            main.innerHTML = contents;
        });
    };

    this.setupShoulds = function() {
        [
            fsShouldResetSelectedItemId,
        ].forEach((f) => {
            this.ctrl.registerFunction(f);
        });
    };

    this.setupSideMenu = function() {
        // Register side menu group and items.
        let sideId = sideCreateGroup("FS");
        this.ctrl.set("sideId", sideId);
        sideResetItemTitles(
            sideId,
            [
              "Files",
            ]
        );

        // Track selections.
        sideCtrl().registerFieldCallback("selectedItemId", (c) => {
            this.ctrl.set("sideSelectedItemId", c.selectedItemId);
        });
    };
    
    this._construct();
}

//<!-- Shoulds -->

// Conditions:
// 1. Side menu item has been selected
function fsShouldResetSelectedItemId(c) {
    if (
        c.recentField == "sideSelectedItemId" &&
        fsIsSideSelectionRelevant(c.sideSelectedItemId, c.sideId)
    ) {
        let ids = sideSelectionIds(c.sideSelectedItemId);
        c.selectedItemId = ids[1];
        c.recentField = "selectedItemId";
        return c;
    }

    c.recentField = "none";
    return c;
}

//<!-- Other -->

// Make sure side selection is about FS items
function fsIsSideSelectionRelevant(selectedItemId, sideId) {
    let ids = sideSelectionIds(selectedItemId);
    if (ids[0] == sideId) {
        return true;
    }

    return false;
}

//<!-- Setup -->

window.fsCmp = new FSComponent();
window.components.push(window.fsCmp);
