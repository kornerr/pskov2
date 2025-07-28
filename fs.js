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
        this.addFile = "";
        this.areDirsHidden = true;
        this.clickedFile = "";
        this.clickedRecentFile = "";
        this.contents = "";
        this.didAddFile = false;
        this.didClickAddFile = false;
        this.didClickHideDirs = false;
        this.didClickHideGit = false;
        this.didClickWipe = false;
        this.didLaunch = false;
        this.didSaveFiles = false;
        this.didWipe = false;
        this.editedContents = "";
        this.editedFileContents = {};
        this.headerClickedButtonId = -1;
        this.headerSaveButtonId = -1;
        this.isGitHidden = true;
        this.isLoadingFile = false;
        this.isLoadingFiles = false;
        this.loadedRecentFiles = {};
        this.loadRecentFiles = false;
        this.recentFiles = {},
        this.reloadFile = false;
        this.reloadFiles = false;
        this.saveFiles = false;
        this.selectedFile = "";
        this.selectedFileContents = "";
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
        if (name == "addFile") {
            return this.addFile;
        } else if (name == "areDirsHidden") {
            return this.areDirsHidden;
        } else if (name == "clickedFile") {
            return this.clickedFile;
        } else if (name == "clickedRecentFile") {
            return this.clickedRecentFile;
        } else if (name == "contents") {
            return this.contents;
        } else if (name == "didAddFile") {
            return this.didAddFile;
        } else if (name == "didClickAddFile") {
            return this.didClickAddFile;
        } else if (name == "didClickHideDirs") {
            return this.didClickHideDirs;
        } else if (name == "didClickHideGit") {
            return this.didClickHideGit;
        } else if (name == "didClickWipe") {
            return this.didClickWipe;
        } else if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "didSaveFiles") {
            return this.didSaveFiles;
        } else if (name == "didWipe") {
            return this.didWipe;
        } else if (name == "editedContents") {
            return this.editedContents;
        } else if (name == "editedFileContents") {
            return this.editedFileContents;
        } else if (name == "headerClickedButtonId") {
            return this.headerClickedButtonId;
        } else if (name == "headerClickedButtonId") {
            return this.headerClickedButtonId;
        } else if (name == "headerSaveButtonId") {
            return this.headerSaveButtonId;
        } else if (name == "isGitHidden") {
            return this.isGitHidden;
        } else if (name == "isLoadingFile") {
            return this.isLoadingFile;
        } else if (name == "isLoadingFiles") {
            return this.isLoadingFiles;
        } else if (name == "loadedRecentFiles") {
            return this.loadedRecentFiles;
        } else if (name == "loadRecentFiles") {
            return this.loadRecentFiles;
        } else if (name == "recentFiles") {
            return this.recentFiles;
        } else if (name == "reloadFile") {
            return this.reloadFile;
        } else if (name == "reloadFiles") {
            return this.reloadFiles;
        } else if (name == "saveFiles") {
            return this.saveFiles;
        } else if (name == "selectedFile") {
            return this.selectedFile;
        } else if (name == "selectedFileContents") {
            return this.selectedFileContents;
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
        that.addFile = this.addFile;
        that.areDirsHidden = this.areDirsHidden;
        that.clickedFile = this.clickedFile;
        that.clickedRecentFile = this.clickedRecentFile;
        that.contents = this.contents;
        that.didAddFile = this.didAddFile;
        that.didClickAddFile = this.didClickAddFile;
        that.didClickHideDirs = this.didClickHideDirs;
        that.didClickHideGit = this.didClickHideGit;
        that.didClickWipe = this.didClickWipe;
        that.didLaunch = this.didLaunch;
        that.didSaveFiles = this.didSaveFiles;
        that.didWipe = this.didWipe;
        that.editedContents = this.editedContents;
        that.editedFileContents = this.editedFileContents;
        that.headerClickedButtonId = this.headerClickedButtonId;
        that.headerSaveButtonId = this.headerSaveButtonId;
        that.isGitHidden = this.isGitHidden;
        that.isLoadingFile = this.isLoadingFile;
        that.isLoadingFiles = this.isLoadingFiles;
        that.loadedRecentFiles = this.loadedRecentFiles;
        that.loadRecentFiles = this.loadRecentFiles;
        that.recentFiles = this.recentFiles;
        that.reloadFile = this.reloadFile;
        that.reloadFiles = this.reloadFiles;
        that.saveFiles = this.saveFiles;
        that.selectedFile = this.selectedFile;
        that.selectedFileContents = this.selectedFileContents;
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
        if (name == "addFile") {
            this.addFile = value;
        } else if (name == "areDirsHidden") {
            this.areDirsHidden = value;
        } else if (name == "clickedFile") {
            this.clickedFile = value;
        } else if (name == "clickedRecentFile") {
            this.clickedRecentFile = value;
        } else if (name == "contents") {
            this.contents = value;
        } else if (name == "didAddFile") {
            this.didAddFile = value;
        } else if (name == "didClickAddFile") {
            this.didClickAddFile = value;
        } else if (name == "didClickHideDirs") {
            this.didClickHideDirs = value;
        } else if (name == "didClickHideGit") {
            this.didClickHideGit = value;
        } else if (name == "didClickWipe") {
            this.didClickWipe = value;
        } else if (name == "didLaunch") {
            this.didLaunch = value;
        } else if (name == "didSaveFiles") {
            this.didSaveFiles = value;
        } else if (name == "didWipe") {
            this.didWipe  = value;
        } else if (name == "editedContents") {
            this.editedContents = value;
        } else if (name == "editedFileContents") {
            this.editedFileContents = value;
        } else if (name == "headerClickedButtonId") {
            this.headerClickedButtonId = value;
        } else if (name == "headerSaveButtonId") {
            this.headerSaveButtonId = value;
        } else if (name == "isGitHidden") {
            this.isGitHidden = value;
        } else if (name == "isLoadingFile") {
            this.isLoadingFile = value;
        } else if (name == "isLoadingFiles") {
            this.isLoadingFiles = value;
        } else if (name == "loadedRecentFiles") {
            this.loadedRecentFiles = value;
        } else if (name == "loadRecentFiles") {
            this.loadRecentFiles = value;
        } else if (name == "recentFiles") {
            this.recentFiles = value;
        } else if (name == "reloadFile") {
            this.reloadFile = value;
        } else if (name == "reloadFiles") {
            this.reloadFiles = value;
        } else if (name == "saveFiles") {
            this.saveFiles = value;
        } else if (name == "selectedFile") {
            this.selectedFile = value;
        } else if (name == "selectedFileContents") {
            this.selectedFileContents = value;
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

let FS_ADD = "fs-add";
let FS_CONTENTS_ALL = `
<div class="uk-container uk-padding-small">
    <strong>All repository files</strong>
</div>
<div class="uk-container uk-padding-small">
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
let FS_CONTENTS_ALL_ITEM = `
<tr>
    <td><a onclick='fsCtrl().set("clickedFile", "%PATH%")'>%PATH%</a></td>
    <td>%TYPE%</td>
    <td>%SIZE%</td>
</tr>
`;
let FS_CONTENTS_CFG = `
<div class="uk-container uk-padding-small">
    <strong>Configuration</strong>
</div>
<div class="uk-container uk-padding-small">
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
`;
let FS_CONTENTS_EDITOR = `
<div id="%EDITOR_ID%"></div>
`;
let FS_CONTENTS_FILES_HEADER = `
<div class="vert-align">
    <strong class="uk-padding-small">Files</strong>
    <button id="%FS_ADD%" class="uk-button uk-button-small uk-button-default">➕</button>
</div>
`;
let FS_CONTENTS_LOADING = `
<div class="uk-container uk-padding-small">
    <p>Loading...</p>
</div>
`;
let FS_CONTENTS_RECENT = `
<div class="uk-container uk-padding-small">
    <strong>Recently opened files</strong>
</div>
<div class="uk-container uk-padding-small">
    <table class="uk-table uk-table-hover uk-table-divider">
        <thead>
            <tr>
                <th>Name</th>
                <th>Last opened</th>
            </tr>
        </thead>
        <tbody>
%ITEMS%
        </tbody>
    </table>
</div>
`;
let FS_CONTENTS_RECENT_ITEM = `
<tr>
    <td>
        <a onclick='fsCtrl().set("clickedRecentFile", "%PATH%")'>
            %PATH%%BADGE%
        </a>
    </td>
    <td>%DATE%</td>
</tr>
`;
let FS_CONTENTS_RECENT_ITEM_UNSAVED = `
<span class="uk-badge">Unsaved</span>
`;
let FS_EDITOR_ID = "fs-editor";
let FS_FILE_SIDE_ITEM = `<span uk-icon="file-text"></span>%NAME%`;
let FS_HIDE_DIRS = "fs-hide-dirs";
let FS_HIDE_GIT = "fs-hide-git";
let FS_MENU_ID_ALL = 0;
let FS_MENU_ID_CFG = 2;
let FS_MENU_ID_FILE = 3;
let FS_MENU_ID_RECENT = 1;
let FS_MENU_TITLE_ALL = "All";
let FS_MENU_TITLE_CFG = "Config";
let FS_MENU_TITLE_RECENT = "Recent";
let FS_MENU_TITLE_RECENT_UNSAVED = FS_MENU_TITLE_RECENT + ' <span class="uk-badge">%COUNT%</span>';
let FS_NAME = "pskov2-proto-fs";
let FS_PANEL_MAIN = "panel-main";
let FS_PANEL_MAIN_HEADER = "panel-main-header";
let FS_RECENT_FILES_KEY = "fs-recent-files";
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

        this.setupHeader();
        this.setupSideMenu();
        this.setupEffects();
        this.setupEvents();
        this.setupShoulds();

        // Reset wiping flag.
        if (doWipe) {
            this.ctrl.set("didWipe", true);
        }
    };

    this.resetEditor = function(file, originalContents, editedContents) {
        let ed = deId(FS_EDITOR_ID);
        if (ed == null) {
            return;
        }
        let editor = ace.edit(FS_EDITOR_ID);
        var contents = editedContents[file];
        if (contents == null) {
            contents = originalContents;
        }
        editor.setValue(contents);
        editor.getSelection().clearSelection();
        editor.session.on("change", (d) => {
            this.ctrl.set("editedContents", editor.getValue());
        });
    };

    this.resetEvents = function() {
        let add = deId(FS_ADD);
        if (add != null) {
            add.addEventListener("click", (e) => {
                this.ctrl.set("didClickAddFile", true);
            });
        }

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
        this.ctrl.registerFieldCallback("addFile", (c) => {
            (async() => {
                let contents = "";
                await this.pfs.writeFile(c.addFile, contents, {encoding: "utf8"});
                this.ctrl.set("didAddFile", true);
            })();
        });

        this.ctrl.registerFieldCallback("contents", (c) => {
            let main = deId(FS_PANEL_MAIN);
            main.innerHTML = c.contents;
            this.resetEditor(
                c.selectedFile,
                c.selectedFileContents,
                c.editedFileContents
            );
            this.resetEvents();
        });

        this.ctrl.registerFieldCallback("didClickAddFile", (c) => {
            UIkit.modal.prompt("Create a new file:", "/file.txt").then((path) => {
                // Ignore cancellation.
                if (path == null) {
                    return;
                }
                this.ctrl.set("addFile", path);
            });
        });

        this.ctrl.registerFieldCallback("loadRecentFiles", (c) => {
            let r = fsLoadRecentFiles();
            this.ctrl.set("loadedRecentFiles", r);
        });


        this.ctrl.registerFieldCallback("reloadFile", (c) => {
            (async() => {
                let contents = await this.pfs.readFile(c.selectedFile, {encoding: "utf8"});
                this.ctrl.set("selectedFileContents", contents);
            })();
        });

        this.ctrl.registerFieldCallback("reloadFiles", (c) => {
            (async() => {
                var files = [];
                var st = await this.pfs.stat("/");
                await fsWalkFiles(this.pfs, "/", st, files);
                this.ctrl.set("walkedFiles", files);
            })();
        });

        this.ctrl.registerFieldCallback("recentFiles", (c) => {
            fsSaveRecentFiles(c.recentFiles);
        });

        this.ctrl.registerFieldCallback("saveFiles", (c) => {
            (async() => {
                await fsSaveFiles(this.pfs, c.editedFileContents);
                this.ctrl.set("didSaveFiles", true);
            })();
        });

        this.ctrl.registerFieldCallback("selectedFileContents", (c) => {
            sideSelectItem(c.sideId, FS_MENU_ID_FILE);
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

    this.setupHeader = function() {
        let id = headerCreateButton('<span uk-tooltip="title: Save unsaved files; delay: 500">💾</span>');
        this.ctrl.set("headerSaveButtonId", id);

        headerCtrl().registerFieldCallback("clickedButtonId", (c) => {
            this.ctrl.set("headerClickedButtonId", c.clickedButtonId);
        });
    };

    this.setupShoulds = function() {
        [
            fsShouldLoadRecentFiles,
            fsShouldReloadFile,
            fsShouldReloadFiles,
            fsShouldResetContents,
            fsShouldResetEditedFileContents,
            fsShouldResetHiddenDirs,
            fsShouldResetHiddenGit,
            fsShouldResetLoadingFile,
            fsShouldResetLoadingFiles,
            fsShouldResetRecentFiles,
            fsShouldResetSelectedFile,
            fsShouldResetSelectedItemId,
            fsShouldResetSideItems,
            fsShouldSaveFiles,
            fsShouldStartWiping,
            fsShouldStopWiping,
        ].forEach((f) => {
            this.ctrl.registerFunction(f);
        });
    };

    this.setupSideMenu = function() {
        // Register side menu group.
        let sideId = sideCreateGroup("Files");
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
// 1. Did launch
function fsShouldLoadRecentFiles(c) {
    if (c.recentField == "didLaunch") {
        c.loadRecentFiles = true;
        c.recentField = "loadRecentFiles";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Started loading a file
function fsShouldReloadFile(c) {
    if (
        c.recentField == "isLoadingFile" &&
        c.isLoadingFile
    ) {
        c.reloadFile = true;
        c.recentField = "reloadFile";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Started loading files
function fsShouldReloadFiles(c) {
    if (
        c.recentField == "isLoadingFiles" &&
        c.isLoadingFiles
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
// 3. Selected `Cfg`
// 4. Started loading a file
// 5. Finished loading a file
// 6. Selected `Recent`
function fsShouldResetContents(c) {
    if (
        c.recentField == "isLoadingFiles" &&
        c.isLoadingFiles
    ) {
        c.contents = FS_CONTENTS_LOADING;
        c.recentField = "contents";
        return c;
    }

    if (
        c.recentField == "isLoadingFiles" &&
        !c.isLoadingFiles
    ) {
        c.contents = fsAllHTML(c.areDirsHidden, c.isGitHidden, c.walkedFiles);
        c.recentField = "contents";
        return c;
    }

    if (
        c.recentField == "selectedItemId" &&
        c.selectedItemId == FS_MENU_ID_CFG
    ) {
        c.contents = fsCfgHTML(c.areDirsHidden, c.isGitHidden);
        c.recentField = "contents";
        return c;
    }

    if (
        c.recentField == "isLoadingFile" &&
        c.isLoadingFile
    ) {
        c.contents = FS_CONTENTS_LOADING;
        c.recentField = "contents";
        return c;
    }

    if (
        c.recentField == "isLoadingFile" &&
        !c.isLoadingFile
    ) {
        c.contents = FS_CONTENTS_EDITOR
            .replaceAll("%EDITOR_ID%", FS_EDITOR_ID);
        c.recentField = "contents";
        return c;
    }

    if (
        c.recentField == "selectedItemId" &&
        c.selectedItemId == FS_MENU_ID_RECENT
    ) {
        c.contents = fsRecentHTML(c.recentFiles, c.editedFileContents);
        c.recentField = "contents";
        return c;
    }


    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Editor reported new contents as a result of user input
// 2. Did save files
function fsShouldResetEditedFileContents(c) {
    if (c.recentField == "editedContents") {
        c.editedFileContents[c.selectedFile] = c.editedContents;
        c.recentField = "editedFileContents";
        return c;
    }

    if (c.recentField == "didSaveFiles") {
        c.editedFileContents = {};
        c.recentField = "editedFileContents";
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

// Conditions:
// 1. Selected file in the file list
// 2. Selected file in the side menu
function fsShouldResetLoadingFile(c) {
    if (c.recentField == "selectedFile") {
        c.isLoadingFile = true;
        c.recentField = "isLoadingFile";
        return c;
    }

    if (
        c.recentField == "selectedItemId" &&
        c.selectedItemId == FS_MENU_ID_FILE
    ) {
        c.isLoadingFile = true;
        c.recentField = "isLoadingFile";
        return c;
    }

    if (c.recentField == "selectedFileContents") {
        c.isLoadingFile = false;
        c.recentField = "isLoadingFile";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. `Files` side menu item has been selected
function fsShouldResetLoadingFiles(c) {
    if (
        c.recentField == "selectedItemId" &&
        c.selectedItemId == FS_MENU_ID_ALL
    ) {
        c.isLoadingFiles = true;
        c.recentField = "isLoadingFiles";
        return c;
    }

    if (c.recentField == "walkedFiles") {
        c.isLoadingFiles = false;
        c.recentField = "isLoadingFiles";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Finished loading file (after selection in All, Recent, or Side menu)
// 2. Did load non-empty recent files
function fsShouldResetRecentFiles(c) {
    if (
        c.recentField == "isLoadingFile" &&
        !c.isLoadingFile
    ) {
        c.recentFiles[c.selectedFile] = new Date();
        c.recentField = "recentFiles";
        return c;
    }

    if (
        c.recentField == "loadedRecentFiles" &&
        c.loadedRecentFiles != null &&
        Object.keys(c.loadedRecentFiles).length > 0
    ) {
        c.recentFiles = c.loadedRecentFiles;
        c.recentField = "recentFiles";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Clicked file in the list of all files
// 2. Added new file
// 3. Clicked file in the list of recent files
function fsShouldResetSelectedFile(c) {
    if (c.recentField == "clickedFile") {
        c.selectedFile = c.clickedFile;
        c.recentField = "selectedFile";
        return c;
    }

    if (c.recentField == "didAddFile") {
        c.selectedFile = c.addFile;
        c.recentField = "selectedFile";
        return c;
    }

    if (c.recentField == "clickedRecentFile") {
        c.selectedFile = c.clickedRecentFile;
        c.recentField = "selectedFile";
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
// 1. Save button has been clicked in the header
function fsShouldSaveFiles(c) {
    if (
        c.recentField == "headerClickedButtonId" &&
        c.headerClickedButtonId == c.headerSaveButtonId
    ) {
        c.saveFiles = true;
        c.recentField = "saveFiles";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Did launch
// 2. Selected a file
// 3. Edited a file
function fsShouldResetSideItems(c) {
    if (
        c.recentField == "didLaunch" ||
        c.recentField == "selectedFile" ||
        c.recentField == "editedFileContents"
    ) {
        c.sideItems = fsSideMenuItems(c.selectedFile, c.editedFileContents);
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

// All files' page contents
function fsAllHTML(areDirsHidden, isGitHidden, walkedFiles) {
   var htmlItems = "";
   for (let i in walkedFiles) {
       let item = walkedFiles[i];
       if (fsIsFileHidden(item, areDirsHidden, isGitHidden)) {
           continue;
       }

       htmlItems += FS_CONTENTS_ALL_ITEM
           .replaceAll("%PATH%", item.path)
           .replaceAll("%TYPE%", item.st.type)
           .replaceAll("%SIZE%", item.st.size);
   }
   return FS_CONTENTS_ALL
       .replaceAll("%ITEMS%", htmlItems);
}

// Cfg page contents
function fsCfgHTML(areDirsHidden, isGitHidden) {
    let gitHidden = isGitHidden ? "checked" : "";
    let dirsHidden = areDirsHidden ? "checked" : "";
    return FS_CONTENTS_CFG
        .replaceAll("%ARE_DIRS_HIDDEN%", dirsHidden)
        .replaceAll("%FS_HIDE_DIRS%", FS_HIDE_DIRS)
        .replaceAll("%FS_HIDE_GIT%", FS_HIDE_GIT)
        .replaceAll("%FS_WIPE%", FS_WIPE)
        .replaceAll("%IS_GIT_HIDDEN%", gitHidden);
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

// Deserialize recent files after the launch
function fsLoadRecentFiles(files) {
    let json = localStorage.getItem(FS_RECENT_FILES_KEY);
    var obj = JSON.parse(json);
    // Convert string dates to actual dates
    for (let key in obj) {
        let strdt = obj[key];
        obj[key] = new Date(strdt);
    }
    return obj;
}

// Recently updated files' page contents
function fsRecentHTML(files, edited) {
   var htmlItems = "";
   for (let path in files) {
       let dt = files[path];
       let ago = strago(dt);
       let badge = edited[path] != null ? FS_CONTENTS_RECENT_ITEM_UNSAVED : "";
       htmlItems += FS_CONTENTS_RECENT_ITEM
           .replaceAll("%BADGE%", badge)
           .replaceAll("%DATE%", ago)
           .replaceAll("%PATH%", path);
   }
   return FS_CONTENTS_RECENT
       .replaceAll("%ITEMS%", htmlItems);
}

// Save edited unsaved files to file system
async function fsSaveFiles(pfs, edited) {
    for (var file in edited) {
        let contents = edited[file];
        await pfs.writeFile(file, contents, {encoding: "utf8"});
    }
}

// Serialize recent files between launches
function fsSaveRecentFiles(files) {
    let json = JSON.stringify(files);
    localStorage.setItem(FS_RECENT_FILES_KEY, json);
}

// Construct a list of side menu items
function fsSideMenuItems(
    selectedFile,
    edited
) {
    var items = [];
    items.push(FS_MENU_TITLE_ALL);

    // Display badge number of unsaved files if there are any
    var recent = FS_MENU_TITLE_RECENT;
    var count = Object.keys(edited).length;
    if (count > 0) {
        recent = FS_MENU_TITLE_RECENT_UNSAVED.replaceAll("%COUNT%", count);
    }
    items.push(recent);

    items.push(FS_MENU_TITLE_CFG);

    // Display last opened file name as the last side menu item.
    if (selectedFile != "") {
        let fileItem = FS_FILE_SIDE_ITEM.replaceAll("%NAME%", selectedFile);
        items.push(fileItem);
    }


    return items;
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
