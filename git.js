//<!-- Context -->

function GitContext() {
    this._construct = function() {
        this.didClickClone = false;
        this.didLaunch = false;
        this.didResetContents = false;
        this.selectedItemId = -1;
        this.sideId = -1;
        this.sideSelectedItemId = -1;
        this.url = "";

        this.recentField = "";
    };
    this._construct();

    this.field = function(name) {
        if (name == "didClickClone") {
            return this.didClickClone;
        } else if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "didResetContents") {
            return this.didResetContents;
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
        that.didClickClone = this.didClickClone;
        that.didLaunch = this.didLaunch;
        that.didResetContents = this.didResetContents;
        that.selectedItemId = this.selectedItemId;
        that.sideId = this.sideId;
        that.sideSelectedItemId = this.sideSelectedItemId;
        that.url = this.url;

        that.recentField = this.recentField;
        return that;
    };

    this.setField = function(name, value) {
        if (name == "didClickClone") {
            this.didClickClone = value;
        } else if (name == "didLaunch") {
            this.didLaunch = value;
        } else if (name == "didResetContents") {
            this.didResetContents = value;
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

let GIT_PAGES = {
  0: `
<div class="uk-container uk-padding">
    <h1 class="uk-heading">Repository and branch</h1>
    <form id="%GIT_REPO%" onclick="event.preventDefault();">
        <fieldset class="uk-fieldset">
            <legend class="uk-legend">1. Clone new repository</legend>
            <div class="uk-margin">
              <input id="%GIT_REPO_URL%" class="uk-input" type="text" placeholder="For example: https://git.opengamestudio.org/kornerr/study-gitjs-access">
            </div>
            <button id="%GIT_REPO_CLONE%" class="uk-button uk-button-default">Clone</button>
        </fieldset>
    </form>
</div>
`,
};
let GIT_PANEL_MAIN = "panel-main";
let GIT_REPO = "repository";
let GIT_REPO_CLONE = "repository-clone";
let GIT_REPO_URL = "repository-url";

//<!-- Component -->

function GitComponent() {
    this._construct = function() {
        this.ctrl = new CLDController(new GitContext());
        // Dbg.
        this.ctrl.registerCallback((c) => {
            console.log(`ИГР GitC._construct ctrl key/value: '${c.recentField}'/'${c.field(c.recentField)}'`);
        });

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
            this.ctrl.set("url", url.value);
        });
    };

    this.setupEffects = function() {
        this.ctrl.registerFieldCallback("selectedItemId", (c) => {
            let contents = GIT_PAGES[c.selectedItemId]
                .replaceAll("%GIT_REPO%", GIT_REPO)
                .replaceAll("%GIT_REPO_CLONE%", GIT_REPO_CLONE)
                .replaceAll("%GIT_REPO_URL%", GIT_REPO_URL);
            let main = deId(GIT_PANEL_MAIN);
            main.innerHTML = contents;
            this.ctrl.set("didResetContents", true);
        });
    };

    this.setupEvents = function() {
        this.ctrl.registerFieldCallback("didResetContents", (c) => {
            this.resetEvents();
        });
    };

    this.setupShoulds = function() {
        [
            gitShouldResetSelectedItemId,
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
              "Repository and branch",
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
