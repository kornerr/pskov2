//<!-- API -->

function fs() {
    return window.fsCmp.fs;
}

//<!-- Context -->

function FSContext() {
    this._construct = function() {
        this.areDirsHidden = true;
        this.didClickHideDirs = false;
        this.didClickHideGit = false;
        this.didClickWipe = false;
        this.didLaunch = false;
        this.didResetContents = false;
        this.htmlFiles = "";
        this.isGitHidden = true;
        this.selectedItemId = -1;
        this.sideId = -1;
        this.sideSelectedItemId = -1;
        this.walkedFiles = [];

        this.recentField = "";
    };
    this._construct();

    this.field = function(name) {
        if (name == "areDirsHidden") {
            return this.areDirsHidden;
        } else if (name == "didClickHideDirs") {
            return this.didClickHideDirs;
        } else if (name == "didClickHideGit") {
            return this.didClickHideGit;
        } else if (name == "didClickWipe") {
            return this.didClickWipe;
        } else if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "didResetContents") {
            return this.didResetContents;
        } else if (name == "htmlFiles") {
            return this.htmlFiles;
        } else if (name == "isGitHidden") {
            return this.isGitHidden;
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
        that.areDirsHidden = this.areDirsHidden;
        that.didClickHideDirs = this.didClickHideDirs;
        that.didClickHideGit = this.didClickHideGit;
        that.didClickWipe = this.didClickWipe;
        that.didLaunch = this.didLaunch;
        that.didResetContents = this.didResetContents;
        that.htmlFiles = this.htmlFiles;
        that.isGitHidden = this.isGitHidden;
        that.selectedItemId = this.selectedItemId;
        that.sideId = this.sideId;
        that.sideSelectedItemId = this.sideSelectedItemId;
        that.walkedFiles = this.walkedFiles;

        that.recentField = this.recentField;
        return that;
    };

    this.setField = function(name, value) {
        if (name == "areDirsHidden") {
            this.areDirsHidden = value;
        } else if (name == "didClickHideDirs") {
            this.didClickHideDirs = value;
        } else if (name == "didClickHideGit") {
            this.didClickHideGit = value;
        } else if (name == "didClickWipe") {
            this.didClickWipe = value;
        } else if (name == "didLaunch") {
            this.didLaunch = value;
        } else if (name == "didResetContents") {
            this.didResetContents = value;
        } else if (name == "htmlFiles") {
            this.htmlFiles = value;
        } else if (name == "isGitHidden") {
            this.isGitHidden = value;
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

let FS_FILES = `
<table class='uk-table uk-table-hover uk-table-divider'>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Modified</th>
        </tr>
    </thead>
    <tbody>
%ITEMS%
    </tbody>
</table>
`;
let FS_FILES_ITEM = `
<tr>
    <td>%PATH%</td>
    <td>%TYPE%</td>
    <td>%SIZE%</td>
    <td>%MTIME%</td>
</tr>
`;
let FS_HIDE_DIRS = "fs-hide-dirs";
let FS_HIDE_GIT = "fs-hide-git";
let FS_FILES_LOADING = "<p>Loading...</p>";
let FS_NAME = "pskov2-proto-fs";
let FS_PANEL_MAIN = "panel-main";
let FS_PAGES = {
    0: `
<div class="uk-container uk-padding">
    <h1 class="uk-heading">Files</h1>
    %FILES%
</div>
`,
    1: `
<div class="uk-container uk-padding">
    <h1 class="uk-heading">Cfg</h1>
    <form>
        <fieldset class="uk-fieldset">
            <div class="uk-margin">
                <label>
                    <input id="%FS_HIDE_DIRS%" class="uk-checkbox" type="checkbox" %ARE_DIRS_HIDDEN%>
                    Hide directories
                </label>
            </div>
            <div class="uk-margin">
                <label>
                    <input id="%FS_HIDE_GIT%" class="uk-checkbox" type="checkbox" %IS_GIT_HIDDEN%>
                    Hide .git
                </label>
            </div>
        </fieldset>
    </form>
    <button id="%FS_WIPE%" class="uk-button uk-button-danger">Wipe file system and reload</button>
</div>
`
};
let FS_WIPE = "fs-wipe";

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

    this.resetEvents = function() {
        let hideDirs = deId(FS_HIDE_DIRS);
        if (hideDirs != null) {
            hideDirs.addEventListener("click", (e) => {
                this.ctrl.set("didClickHideDirs", true);
            });
        }

        let hideGit = deId(FS_HIDE_GIT);
        if (hideGit != null) {
            hideGit.addEventListener("click", (e) => {
                this.ctrl.set("didClickHideGit", true);
            });
        }

        let wipe = deId(FS_WIPE);
        if (wipe != null) {
            wipe.addEventListener("click", (e) => {
                this.ctrl.set("didClickWipe", true);
            });
        }
    };

    this.setupEffects = function() {
        this.ctrl.registerFieldCallback("didClickWipe", (c) => {
            console.log("TODO wipe");
        });

        this.ctrl.registerFieldCallback("didResetContents", (c) => {
            this.resetEvents();
        });

        this.ctrl.registerFieldCallback("htmlFiles", (c) => {
            let contents = FS_PAGES[c.selectedItemId];
            let main = deId(FS_PANEL_MAIN);

            let isGitHidden = c.isGitHidden ? "checked" : "";
            let areDirsHidden = c.areDirsHidden ? "checked" : "";
            main.innerHTML = contents
                .replaceAll("%ARE_DIRS_HIDDEN%", areDirsHidden)
                .replaceAll("%FILES%", c.htmlFiles)
                .replaceAll("%FS_HIDE_DIRS%", FS_HIDE_DIRS)
                .replaceAll("%FS_HIDE_GIT%", FS_HIDE_GIT)
                .replaceAll("%FS_WIPE%", FS_WIPE)
                .replaceAll("%IS_GIT_HIDDEN%", isGitHidden);
            this.ctrl.set("didResetContents", true);
        });

        this.ctrl.registerFieldCallback("selectedItemId", (c) => {
            (async() => {
                var files = [];
                var st = await this.pfs.stat("/");
                await fsWalkFiles(this.pfs, "/", st, files);
                this.ctrl.set("walkedFiles", files);
            })();
        });
    };

    this.setupShoulds = function() {
        [
            fsShouldResetHiddenDirs,
            fsShouldResetHiddenGit,
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
              "Cfg",
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
// 1. Checkbox has been clicked
function fsShouldResetHiddenDirs(c) {
    if (c.recentField == "didClickHideDirs") {
        c.areDirsHidden = !c.areDirsHidden;
        c.recentField = "areDirsHidden";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Checkbox has been clicked
function fsShouldResetHiddenGit(c) {
    if (c.recentField == "didClickHideGit") {
        c.isGitHidden = !c.isGitHidden;
        c.recentField = "isGitHidden";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Files side menu item has been selected
// 2. Files have been read
function fsShouldResetHTMLFiles(c) {
    if (c.recentField == "selectedItemId") {
        c.htmlFiles = FS_FILES_LOADING;
        c.recentField = "htmlFiles";
        return c;
    }

    if (c.recentField == "walkedFiles") {
        var html = "";
        for (let i in c.walkedFiles) {
            let item = c.walkedFiles[i];

            if (fsIsFileHidden(c, item)) {
                continue;
            }

            let dt = new Date(item.st.mtimeMs);
            html += FS_FILES_ITEM
                .replaceAll("%PATH%", item.path)
                .replaceAll("%TYPE%", item.st.type)
                .replaceAll("%SIZE%", item.st.size)
                .replaceAll("%MTIME%", dt.toLocaleString());
        }
        c.htmlFiles = FS_FILES.replaceAll("%ITEMS%", html);
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

function fsIsFileHidden(c, item) {
    // Ignore directories
    if (
        c.areDirsHidden &&
        item.st.type == "dir"
    ) {
        return true;
    }

    // Ignore .git
    if (
        c.isGitHidden &&
        item.path.includes(".git")
    ) {
        return true;
    }

    return false;
}

// Make sure side selection is about FS items
function fsIsSideSelectionRelevant(selectedItemId, sideId) {
    let ids = sideSelectionIds(selectedItemId);
    if (ids[0] == sideId) {
        return true;
    }

    return false;
}

// Collect a list of directories and files into the provided `collection`
async function fsWalkFiles(pfs, path, pathSt, collection) {
    var suffix = path == "/" ? "" : "/";
    collection.push({
        path: path + suffix,
        st: pathSt,
    });
    var files = await pfs.readdir(path)
    for (var i in files) {
        var f = files[i];
        var fullPath = path + suffix + f;
        var st = await pfs.stat(fullPath);
        if (st.type == "dir") {
            await fsWalkFiles(pfs, fullPath, st, collection);
        } else {
            collection.push({
                path: fullPath,
                st: st
            });
        }
    }
}

//<!-- Setup -->

window.fsCmp = new FSComponent();
window.components.push(window.fsCmp);
