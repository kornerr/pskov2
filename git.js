//<!-- Context -->

function GitContext() {
    this._construct = function() {
        this.clickedItemId = -1;
        this.didLaunch = false;
        this.selectedItemId = -1;

        this.recentField = "";
    };
    this._construct();

    this.field = function(name) {
        if (name == "clickedItemId") {
            return this.clickedItemId;
        } else if (name == "didLaunch") {
            return this.didLaunch;
        } else if (name == "selectedItemId") {
            return this.selectedItemId;
        }

        return "unknown-field-name";
    };

    this.selfCopy = function() {
        let that = new GitContext();
        that.clickedItemId = this.clickedItemId;
        that.didLaunch = this.didLaunch;
        that.selectedItemId = this.selectedItemId;
        that.recentField = this.recentField;
        return that;
    };

    this.setField = function(name, value) {
        if (name == "clickedItemId") {
            this.clickedItemId = value;
        } else if (name == "didLaunch") {
            this.didLaunch = value;
        } else if (name == "selectedItemId") {
            this.selectedItemId = value;
        }
    };
}

//<!-- Constants -->

let GIT_PANEL_MAIN = "panel-main";

//<!-- Component -->

function GitComponent() {
    this._construct = function() {
        this.ctrl = new CLDController(new GitContext());
        // Dbg.
        this.ctrl.registerCallback((c) => {
            console.log(`ИГР GitC._construct ctrl key/value: '${c.recentField}'/'${c.field(c.recentField)}'`);
        });
        this.setupSideMenu();
    };

    this.setupSideMenu = function() {
        this.sideId = sideCreateGroup("Git");
        /*
        sideResetItemTitles(
            this.sideId,
            [
              "Repository & branch",
              "Commit",
              "Push & pull",
            ]
        );
        */
    };
    
    this._construct();
}

//<!-- Shoulds -->

//<!-- Other -->

//<!-- Setup -->

window.components.push(new GitComponent());
