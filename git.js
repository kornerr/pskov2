//<!-- Context -->

function GitContext() {
    this._construct = function() {
        this.cfgURL = "";
        this.checkRepositoryAvailability = false;
        this.clone = false;
        this.cloneError = "";
        this.didClickClone = false;
        this.didClone = false;
        this.didLaunch = false;
        this.didResetContents = false;
        this.inputURL = "";
        this.isCloning = false;
        this.isRepositoryAvailable = false;
        this.resetContents = false;
        this.selectedItemId = -1;
        this.sideId = -1;
        this.sideSelectedItemId = -1;
        this.url = "";

        this.recentField = "";
    };
    this._construct();

    this.field = function(name) {
        if (name == "cfgURL") {
            return this.cfgURL;
        } if (name == "checkRepositoryAvailability") {
            return this.checkRepositoryAvailability;
        } else if (name == "clone") {
            return this.clone;
        } else if (name == "cloneError") {
            return this.cloneError;
        } else if (name == "didClickClone") {
            return this.didClickClone;
        } else if (name == "didClone") {
            return this.didClone;
        } else if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "didResetContents") {
            return this.didResetContents;
        } else if (name == "inputURL") {
            return this.inputURL;
        } else if (name == "isCloning") {
            return this.isCloning;
        } else if (name == "isRepositoryAvailable") {
            return this.isRepositoryAvailable;
        } else if (name == "resetContents") {
            return this.resetContents;
        } else if (name == "selectedItemId") {
            return this.selectedItemId;
        } else if (name == "sideId") {
            return this.sideId;
        } else if (name == "sideSelectedItemId") {
            return this.sideSelectedItemId;
        } else if (name == "url") {
            return this.url;
        }

        return "unknown-field-name";
    };

    this.selfCopy = function() {
        let that = new GitContext();
        that.cfgURL = this.cfgURL;
        that.checkRepositoryAvailability = this.checkRepositoryAvailability;
        that.clone = this.clone;
        that.cloneError = this.cloneError;
        that.didClickClone = this.didClickClone;
        that.didClone = this.didClone;
        that.didLaunch = this.didLaunch;
        that.didResetContents = this.didResetContents;
        that.inputURL = this.inputURL;
        that.isCloning = this.isCloning;
        that.isRepositoryAvailable = this.isRepositoryAvailable;
        that.resetContents = this.resetContents;
        that.selectedItemId = this.selectedItemId;
        that.sideId = this.sideId;
        that.sideSelectedItemId = this.sideSelectedItemId;
        that.url = this.url;

        that.recentField = this.recentField;
        return that;
    };

    this.setField = function(name, value) {
        if (name == "cfgURL") {
            this.cfgURL = value;
        } else if (name == "checkRepositoryAvailability") {
            this.checkRepositoryAvailability = value;
        } else if (name == "clone") {
            this.clone = value;
        } else if (name == "cloneError") {
            this.cloneError = value;
        } else if (name == "didClickClone") {
            this.didClickClone = value;
        } else if (name == "didClone") {
            this.didClone = value;
        } else if (name == "didLaunch") {
            this.didLaunch = value;
        } else if (name == "didResetContents") {
            this.didResetContents = value;
        } else if (name == "inputURL") {
            this.inputURL = value;
        } else if (name == "isCloning") {
            this.isCloning = value;
        } else if (name == "isRepositoryAvailable") {
            this.isRepositoryAvailable = value;
        } else if (name == "resetContents") {
            this.resetContents = value;
        } else if (name == "selectedItemId") {
            this.selectedItemId = value;
        } else if (name == "sideId") {
            this.sideId = value;
        } else if (name == "sideSelectedItemId") {
            this.sideSelectedItemId = value;
        } else if (name == "url") {
            this.url = value;
        }
    };
}

//<!-- Constants -->

let GIT_DOT_DIR = ".git";
let GIT_PAGES = {
  0: `
<div class="uk-container uk-padding">
    <h1 class="uk-heading">Repository</h1>
    <form id="%GIT_REPO%" onclick="event.preventDefault();" %IS_CLONING_HIDDEN%>
        <div class="uk-margin">
            <label class="uk-form-label" for="%GIT_REPO_URL%">Clone new repository:</label>
            <div class="uk-form-controls">
                <input id="%GIT_REPO_URL%" class="uk-input" type="text" placeholder="For example: https://git.opengamestudio.org/kornerr/study-gitjs-access" value="%URL%" %IS_CLONING_DISABLED%>
            </div>
        </div>
        <button id="%GIT_REPO_CLONE%" class="uk-button uk-button-default" %IS_CLONING_DISABLED%>Clone</button>
    </form>
    <form id="%GIT_ACTIVE_REPO%" class="uk-form-stacked" onclick="event.preventDefault();" %IS_REPOSITORY_AVAILABLE%>
        <div class="uk-margin">
            <label class="uk-form-label" for="%GIT_ACTIVE_REPO_URL%">Cloned repository:</label>
            <div class="uk-form-controls">
                <input id="%GIT_ACTIVE_REPO_URL%" class="uk-input" type="text" value="%URL%" disabled>
            </div>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label" for="%GIT_ACTIVE_REPO_BRANCH%">Selected branch:</label>
            <div class="uk-form-controls">
                <input id="%GIT_ACTIVE_REPO_BRANCH%" class="uk-input" type="text" value="??" disabled>
            </div>
        </div>
    </form>
</div>
`,
};
let GIT_PANEL_MAIN = "panel-main";
let GIT_PROXY = "https://vercel-cors-proxy-pi.vercel.app";
let GIT_REPO = "repository";
let GIT_REPO_CLONE = "repository-clone";
let GIT_REPO_DIR = "/";
let GIT_REPO_URL = "repository-url";
let GIT_TEMPLATE_CLONE_ERROR = `
<h2>Failed to clone the repository</h2>
<p>Error: '%ERROR%'</p>
`;

//<!-- Component -->

function GitComponent() {
    this._construct = function() {
        this.ctrl = new CLDController(new GitContext());
        // Dbg.
        this.ctrl.registerCallback((c) => {
            console.log(`ИГР GitC._construct ctrl key/value: '${c.recentField}'/'${c.field(c.recentField)}'`);
        });

        git.plugins.set("fs", fs());

        this.setupSideMenu();
        this.setupShoulds();
        this.setupEffects();
        this.setupEvents();
    };

    this.resetEvents = function() {
        let clone = deId(GIT_REPO_CLONE);
        clone.addEventListener("click", (e) => {
            this.ctrl.set("didClickClone", true);
        });
        let url = deId(GIT_REPO_URL);
        url.addEventListener("input", (e) => {
            this.ctrl.set("inputURL", url.value);
        });
    };

    this.setupEffects = function() {
        this.ctrl.registerFieldCallback("checkRepositoryAvailability", (c) => { (async() => {
            let files = await pfs().readdir(GIT_REPO_DIR);
            let hasRepo = files.includes(GIT_DOT_DIR);
            this.ctrl.set("isRepositoryAvailable", hasRepo);
        })(); });

        this.ctrl.registerFieldCallback("clone", (c) => { (async() => {
            try {
                print("ИГР git clone url:", c.url);
                await git.clone({
                    corsProxy: GIT_PROXY,
                    dir: GIT_REPO_DIR,
                    url: c.url,
                });
                this.ctrl.set("didClone", true);
            } catch (e) {
                this.ctrl.set("cloneError", `${e}`);
            }
        })(); });

        this.ctrl.registerFieldCallback("cloneError", (c) => {
            let html = GIT_TEMPLATE_CLONE_ERROR
                .replaceAll("%ERROR%", c.cloneError);
            UIkit.modal.alert(html);
        });

        this.ctrl.registerFieldCallback("didClone", (c) => {
            reportSuccess("Finished cloning the repository");
        });

        this.ctrl.registerFieldCallback("didResetContents", (c) => {
            this.resetEvents();
        });

        this.ctrl.registerFieldCallback("resetContents", (c) => {
            let isCloningDisabled = c.isCloning ? "disabled" : "";
            let isCloningHidden = c.isRepositoryAvailable ? "hidden" : "";
            let isRepositoryAvailable = c.isRepositoryAvailable ? "" : "hidden";
            let contents = GIT_PAGES[c.selectedItemId]
                .replaceAll("%GIT_REPO%", GIT_REPO)
                .replaceAll("%GIT_REPO_CLONE%", GIT_REPO_CLONE)
                .replaceAll("%GIT_REPO_URL%", GIT_REPO_URL)
                .replaceAll("%IS_CLONING_DISABLED%", isCloningDisabled)
                .replaceAll("%IS_CLONING_HIDDEN%", isCloningHidden)
                .replaceAll("%IS_REPOSITORY_AVAILABLE%", isRepositoryAvailable)
                .replaceAll("%URL%", c.url);
            let main = deId(GIT_PANEL_MAIN);
            main.innerHTML = contents;
            this.ctrl.set("didResetContents", true);
        });
    };

    this.setupEvents = function() {
        window.addEventListener("load", (e) => {
            this.ctrl.set("didLaunch", true);
        });
    };

    this.setupShoulds = function() {
        [
            gitShouldCheckRepositoryAvailability,
            gitShouldClone,
            gitShouldResetCloningState,
            gitShouldResetContents,
            gitShouldResetSelectedItemId,
            gitShouldResetURL,
        ].forEach((f) => {
            this.ctrl.registerFunction(f);
        });
    };

    this.setupSideMenu = function() {
        // Register side menu group and items.
        let sideId = sideCreateGroup("Git");
        this.ctrl.set("sideId", sideId);
        sideResetItemTitles(
            sideId,
            [
              "Repository",
              "Commit",
              "Push & pull",
              "Browse files",
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
// 1. Did clone successfully
// 2. Did launch
function gitShouldCheckRepositoryAvailability(c) {
    if (c.recentField == "didClone") {
        c.checkRepositoryAvailability = true;
        c.recentField = "checkRepositoryAvailability";
        return c;
    }

    if (c.recentField == "didLaunch") {
        c.checkRepositoryAvailability = true;
        c.recentField = "checkRepositoryAvailability";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. URL is not empty and `Clone` button has been clicked
function gitShouldClone(c) {
    if (
        c.recentField == "didClickClone" &&
        c.url.length > 0
    ) {
        c.clone = true;
        c.recentField = "clone";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Started cloning
// 2. Finished cloning successfully
// 3. Finished cloning with error
function gitShouldResetCloningState(c) {
    if (c.recentField == "clone") {
        c.isCloning = true;
        c.recentField = "isCloning";
        return c;
    }

    if (c.recentField == "didClone") {
        c.isCloning = false;
        c.recentField = "isCloning";
        return c;
    }

    if (c.recentField == "cloneError") {
        c.isCloning = false;
        c.recentField = "isCloning";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Selected side menu item
// 2. Changed cloning state
// 3. Repository availability changed while we are at the Repository menu item
function gitShouldResetContents(c) {
    if (c.recentField == "selectedItemId") {
        c.resetContents = true;
        c.recentField = "resetContents";
        return c;
    }

    if (c.recentField == "isCloning") {
        c.resetContents = true;
        c.recentField = "resetContents";
        return c;
    }

    if (
        c.recentField == "isRepositoryAvailable" &&
        gitIsSideSelectionRelevant(c.sideSelectedItemId, c.sideId)
    ) {
        c.resetContents = true;
        c.recentField = "resetContents";
        return c;
    }

    c.recentField = "none";
    return c;
}

// Conditions:
// 1. Side menu item has been selected
function gitShouldResetSelectedItemId(c) {
    if (
        c.recentField == "sideSelectedItemId" &&
        gitIsSideSelectionRelevant(c.sideSelectedItemId, c.sideId)
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
// 1. Input URL changed
// 2. Config URL has been loaded
function gitShouldResetURL(c) {
    if (c.recentField == "inputURL") {
        c.url = c.inputURL;
        c.recentField = "url";
        return c;
    }

    if (c.recentField == "cfgURL") {
        c.url = c.cfgURL;
        c.recentField = "url";
        return c;
    }

    c.recentField = "none";
    return c;
}

//<!-- Other -->

// Make sure side selection is about Git items
function gitIsSideSelectionRelevant(selectedItemId, sideId) {
    let ids = sideSelectionIds(selectedItemId);
    if (ids[0] == sideId) {
        return true;
    }

    return false;
}

//<!-- Setup -->

window.components.push(new GitComponent());
