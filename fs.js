//<!-- API -->

function fs() {
    return window.fsCmp.fs;
}

function fsCtrl() {
    return window.fsCmp.ctrl;
}

function pfs() {
    return window.fsCmp.pfs;
}

//<!-- Context -->

function FSContext() {
    this._construct = function() {
        this.areDirsHidden = true;
        this.contents = "";
        this.didClickHideDirs = false;
        this.didClickHideGit = false;
        this.didClickWipe = false;
        this.didLaunch = false;
        this.didWipe = false;
        this.isGitHidden = true;
        this.isLoading = true;
        this.reloadFiles = false;
        this.selectedFile = "";
        this.selectedItemId = -1;
        this.sideId = -1;
        this.sideItems = [];
        this.sideSelectedItemId = -1;
        this.startWiping = false;
        this.stopWiping = false;
        this.walkedFiles = [];

        this.recentField = "";
    };
    this._construct();

    this.field = function(name) {
        if (name == "areDirsHidden") {
            return this.areDirsHidden;
        } else if (name == "contents") {
            return this.contents;
        } else if (name == "didClickHideDirs") {
            return this.didClickHideDirs;
        } else if (name == "didClickHideGit") {
            return this.didClickHideGit;
        } else if (name == "didClickWipe") {
            return this.didClickWipe;
        } else if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "didWipe") {
            return this.didWipe;
        } else if (name == "isGitHidden") {
            return this.isGitHidden;
        } else if (name == "isLoading") {
            return this.isLoading;
        } else if (name == "reloadFiles") {
            return this.reloadFiles;
        } else if (name == "selectedFile") {
            return this.selectedFile;
        } else if (name == "selectedItemId") {
            return this.selectedItemId;
        } else if (name == "sideId") {
            return this.sideId;
        } else if (name == "sideItems") {
            return this.sideItems;
        } else if (name == "sideSelectedItemId") {
            return this.sideSelectedItemId;
        } else if (name == "startWiping") {
            return this.startWiping;
        } else if (name == "walkedFiles") {
            return this.walkedFiles;
        }

        return "unknown-field-name";
    };

    this.selfCopy = function() {
        let that = new FSContext();
        that.areDirsHidden = this.areDirsHidden;
        that.contents = this.contents;
        that.didClickHideDirs = this.didClickHideDirs;
        that.didClickHideGit = this.didClickHideGit;
        that.didClickWipe = this.didClickWipe;
        that.didLaunch = this.didLaunch;
        that.didWipe = this.didWipe;
        that.isGitHidden = this.isGitHidden;
        that.isLoading = this.isLoading;
        that.reloadFiles = this.reloadFiles;
        that.selectedFile = this.selectedFile;
        that.selectedItemId = this.selectedItemId;
        that.sideId = this.sideId;
        that.sideItems = this.sideItems;
        that.sideSelectedItemId = this.sideSelectedItemId;
        that.startWiping = this.startWiping;
        that.stopWiping = this.stopWiping;
        that.walkedFiles = this.walkedFiles;

        that.recentField = this.recentField;
        return that;
    };

    this.setField = function(name, value) {
        if (name == "areDirsHidden") {
            this.areDirsHidden = value;
        } else if (name == "contents") {
            this.contents = value;
        } else if (name == "didClickHideDirs") {
            this.didClickHideDirs = value;
        } else if (name == "didClickHideGit") {
            this.didClickHideGit = value;
        } else if (name == "didClickWipe") {
            this.didClickWipe = value;
        } else if (name == "didLaunch") {
            this.didLaunch = value;
        } else if (name == "didWipe") {
            this.didWipe  = value;
        } else if (name == "isGitHidden") {
            this.isGitHidden = value;
        } else if (name == "isLoading") {
            this.isLoading = value;
        } else if (name == "reloadFiles") {
            this.reloadFiles = value;
        } else if (name == "selectedFile") {
            this.selectedFile = value;
        } else if (name == "selectedItemId") {
            this.selectedItemId = value;
        } else if (name == "sideId") {
            this.sideId = value;
        } else if (name == "sideItems") {
            this.sideItems = value;
        } else if (name == "sideSelectedItemId") {
            this.sideSelectedItemId = value;
        } else if (name == "startWiping") {
            this.startWiping = value;
        } else if (name == "stopWiping") {
            this.stopWiping = value;
        } else if (name == "walkedFiles") {
            this.walkedFiles = value;
        }
    };
}

//<!-- Constants -->

let FS_CONTENTS_FILES = `
<div class="uk-container uk-padding-small">
    <h1 class="uk-heading">Files</h1>
    <table class="uk-table uk-table-hover uk-table-divider">
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Size</th>
            </tr>
        </thead>
        <tbody>
%ITEMS%
        </tbody>
    </table>
</div>
`;
let FS_CONTENTS_FILES_ITEM = `
<tr>
    <td><a onclick='fsCtrl().set("selectedFile", "%PATH%")'>%PATH%</a></td>
    <td>%TYPE%</td>
    <td>%SIZE%</td>
</tr>
`;
let FS_CONTENTS_LOADING = `
<div class="uk-container uk-padding-small">
    <p>Loading...</p>
</div>
`;
let FS_FILE_SIDE_ITEM = `<span uk-icon="file-text"></span>%NAME%`;
let FS_HIDE_DIRS = "fs-hide-dirs";
let FS_HIDE_GIT = "fs-hide-git";
let FS_NAME = "pskov2-proto-fs";
let FS_PANEL_MAIN = "panel-main";
let FS_PAGES = {
    0: `
<div class="uk-container uk-padding-small">
    <h1 class="uk-heading">Files</h1>
    %FILES%
</div>
`,
    1: `
<div class="uk-container uk-padding-small">
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
`,
    2: `
    <p>TODO</p>
`,
};
let FS_WIPE = "fs-wipe";
let FS_WIPE_KEY = "fs-wipe";

//<!-- Component -->

function FSComponent() {
    this._construct = function() {
        this.ctrl = new CLDController(new FSContext());
        // Dbg.
        this.ctrl.registerCallback((c) => {
            console.log(`ИГР FSC._construct ctrl key/value: '${c.recentField}'/'${c.field(c.recentField)}'`);
        });

        // Wipe file system if requested so.
        let doWipe = localStorage.getItem(FS_WIPE_KEY) != null;
        this.fs = new LightningFS(FS_NAME, {wipe: doWipe});
        this.pfs = this.fs.promises;

        this.setupSideMenu();
        this.setupEffects();
        this.setupEvents();
        this.setupShoulds();

        // Reset wiping flag.
        if (doWipe) {
            this.ctrl.set("didWipe", true);
        }
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
        this.ctrl.registerFieldCallback("contents", (c) => {
            let main = deId(FS_PANEL_MAIN);
            main.innerHTML = c.contents;
            this.resetEvents();
        });

        /*
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
        */

        this.ctrl.registerFieldCallback("reloadFiles", (c) => {
            (async() => {
                var files = [];
                var st = await this.pfs.stat("/");
                await fsWalkFiles(this.pfs, "/", st, files);
                this.ctrl.set("walkedFiles", files);
            })();
        });

        this.ctrl.registerFieldCallback("sideItems", (c) => {
            sideResetItemTitles(c.sideId, c.sideItems);
        });

        this.ctrl.registerFieldCallback("startWiping", (c) => {
            localStorage.setItem(FS_WIPE_KEY, c.wipe);
            location.reload();
        });

        this.ctrl.registerFieldCallback("stopWiping", (c) => {
            localStorage.removeItem(FS_WIPE_KEY);
        });
    };

    this.setupEvents = function() {
        window.addEventListener("load", (e) => {
            this.ctrl.set("didLaunch", true);
        });
    };

    this.setupShoulds = function() {
        [
            fsShouldReloadFiles,
            fsShouldResetContents,
            fsShouldResetHiddenDirs,
            fsShouldResetHiddenGit,
            fsShouldResetLoading,
            fsShouldResetSelectedItemId,
            fsShouldResetSideItems,
            fsShouldStartWiping,
            fsShouldStopWiping,
        ].forEach((f) => {
            this.ctrl.registerFunction(f);
        });
    };

    this.setupSideMenu = function() {
        // Register side menu group.
        let sideId = sideCreateGroup("FS");
        this.ctrl.set("sideId", sideId);

        // Track selections.
        sideCtrl().registerFieldCallback("selectedItemId", (c) => {
            this.ctrl.set("sideSelectedItemId", c.selectedItemId);
        });
    };
    
    this._construct();
}

//<!-- Shoulds -->

// Conditions:
// 1. Started loading files
function fsShouldReloadFiles(c) {
    if (
        c.recentField == "isLoading" &&
        c.isLoading
    ) {
        c.reloadFiles = true;
        c.recentField = "reloadFiles";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Started loading files
// 2. Finished loading files
function fsShouldResetContents(c) {
    if (
        c.recentField == "isLoading" &&
        c.isLoading
    ) {
        c.contents = FS_CONTENTS_LOADING;
        c.recentField = "contents";
        return c;
    }

    if (
        c.recentField == "isLoading" &&
        !c.isLoading
    ) {
        c.contents = fsFilesHTML(c.areDirsHidden, c.isGitHidden, c.walkedFiles);
        c.recentField = "contents";
        return c;
    }

    c.recentField = "none";
    return c;
}

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

/*
// Conditions:
// 2. Files have been walked through 
function fsShouldResetHTMLFiles(c) {

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
                .replaceAll("%SIZE%", item.st.size);
        }
        c.htmlFiles = FS_FILES
            .replaceAll("%ITEMS%", html);
        c.recentField = "htmlFiles";
        return c;
    }

    c.recentField = "none";
    return c;
}
*/

// Conditions:
// 1. `Files` side menu item has been selected
function fsShouldResetLoading(c) {
    if (
        c.recentField == "selectedItemId" &&
        c.selectedItemId == 0
    ) {
        c.isLoading = true;
        c.recentField = "isLoading";
        return c;
    }

    if (c.recentField == "walkedFiles") {
        c.isLoading = false;
        c.recentField = "isLoading";
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

// Conditions:
// 1. Did launch
// 2. Selected file
function fsShouldResetSideItems(c) {
    let permanent = ["Files", "Cfg"];

    if (c.recentField == "didLaunch") {
        c.sideItems = permanent;
        c.recentField = "sideItems";
        return c;
    }

    if (c.recentField == "selectedFile") {
        var items = Array.from(permanent);
        let fileItem = FS_FILE_SIDE_ITEM.replaceAll("%NAME%", c.selectedFile);
        items.push(fileItem);
        c.sideItems = items;
        c.recentField = "sideItems";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Wipe button has been clicked
function fsShouldStartWiping(c) {
    if (c.recentField == "didClickWipe") {
        c.startWiping = true;
        c.recentField = "startWiping";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Wiping did happen
function fsShouldStopWiping(c) {
    if (c.recentField == "didWipe") {
        c.stopWiping = true;
        c.recentField = "stopWiping";
        return c;
    }

    c.recentField = "none";
    return c;
}

//<!-- Other -->

function fsFilesHTML(areDirsHidden, isGitHidden, walkedFiles) {
   var htmlItems = "";
   for (let i in walkedFiles) {
       let item = walkedFiles[i];
       if (fsIsFileHidden(item, areDirsHidden, isGitHidden)) {
           continue;
       }

       htmlItems += FS_CONTENTS_FILES_ITEM
           .replaceAll("%PATH%", item.path)
           .replaceAll("%TYPE%", item.st.type)
           .replaceAll("%SIZE%", item.st.size);
   }
   return FS_CONTENTS_FILES
       .replaceAll("%ITEMS%", htmlItems);
}

function fsIsFileHidden(item, areDirsHidden, isGitHidden) {
    // Ignore directories
    if (
        areDirsHidden &&
        item.st.type == "dir"
    ) {
        return true;
    }

    // Ignore .git
    if (
        isGitHidden &&
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
    files.sort();
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
