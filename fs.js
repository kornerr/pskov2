//<!-- API -->

function fs() {
    return window.fsCmp.fs;
}

//<!-- Context -->

function FSContext() {
    this._construct = function() {
        this.didLaunch = false;
        this.htmlFiles = "";
        this.selectedItemId = -1;
        this.sideId = -1;
        this.sideSelectedItemId = -1;
        this.walkedFiles = [];

        this.recentField = "";
    };
    this._construct();

    this.field = function(name) {
        if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "htmlFiles") {
            return this.htmlFiles;
        } else if (name == "selectedItemId") {
            return this.selectedItemId;
        } else if (name == "sideId") {
            return this.sideId;
        } else if (name == "sideSelectedItemId") {
            return this.sideSelectedItemId;
        } else if (name == "walkedFiles") {
            return this.walkedFiles;
        }

        return "unknown-field-name";
    };

    this.selfCopy = function() {
        let that = new FSContext();
        that.didLaunch = this.didLaunch;
        that.htmlFiles = this.htmlFiles;
        that.selectedItemId = this.selectedItemId;
        that.sideId = this.sideId;
        that.sideSelectedItemId = this.sideSelectedItemId;
        that.walkedFiles = this.walkedFiles;

        that.recentField = this.recentField;
        return that;
    };

    this.setField = function(name, value) {
        if (name == "didLaunch") {
            this.didLaunch = value;
        } else if (name == "htmlFiles") {
            this.htmlFiles = value;
        } else if (name == "selectedItemId") {
            this.selectedItemId = value;
        } else if (name == "sideId") {
            this.sideId = value;
        } else if (name == "sideSelectedItemId") {
            this.sideSelectedItemId = value;
        } else if (name == "walkedFiles") {
            this.walkedFiles = value;
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
    %FILES%
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

    this.resetFiles = function() {
        (async() => {
            var files = [];
            await fsWalkFiles(this.pfs, "/", files);
            this.ctrl.set("walkedFiles", files);
        })();
    };

    this.setupEffects = function() {
        this.ctrl.registerFieldCallback("htmlFiles", (c) => {
            let contents = FS_PAGES[c.selectedItemId];
            let main = deId(FS_PANEL_MAIN);
            main.innerHTML = contents
                .replaceAll("%FILES%", c.htmlFiles);
        });

        this.ctrl.registerFieldCallback("selectedItemId", (c) => {
            this.resetFiles();
        });
    };

    this.setupShoulds = function() {
        [
            fsShouldResetHTMLFiles,
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
// 1. Files side menu item has been selected
// 2. Files have been read
function fsShouldResetHTMLFiles(c) {
    if (c.recentField == "selectedItemId") {
        c.htmlFiles = "<p>Loading...</p>";
        c.recentField = "htmlFiles";
        return c;
    }

    if (c.recentField == "walkedFiles") {
        var html = "<ul>";
        for (let i in c.walkedFiles) {
            let file = c.walkedFiles[i];
            html += `<li>${file}</li>`;
        }
        html += "</ul>";
        c.htmlFiles = html;
        c.recentField = "htmlFiles";
        return c;
    }

    c.recentField = "none";
    return c;
}

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

// Collect a list of directories and files into the provided `collection`
async function fsWalkFiles(pfs, path, collection) {
    var suffix = path == "/" ? "" : "/";
    collection.push(path + suffix);
    var files = await pfs.readdir(path)
    for (var i in files) {
        var f = files[i];
        var fullPath = path + suffix + f;
        var st = await pfs.stat(fullPath);
        if (st.type == "dir") {
            await fsWalkFiles(pfs, fullPath, collection);
        } else {
            collection.push(fullPath);
        }
    }
}

//<!-- Setup -->

window.fsCmp = new FSComponent();
window.components.push(window.fsCmp);
