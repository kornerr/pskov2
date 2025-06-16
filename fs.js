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

//<!-- Component -->

function FSComponent() {
    this._construct = function() {
        this.ctrl = new CLDController(new FSContext());
        // Dbg.
        this.ctrl.registerCallback((c) => {
            console.log(`ИГР FSC._construct ctrl key/value: '${c.recentField}'/'${c.field(c.recentField)}'`);
        });

        this.setupFileSystem();
        this.setupSideMenu();
    };

    this.setupFileSystem = function() {
        this.fs = new LightningFS(FS_NAME);
        this.pfs = this.fs.promises;
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

//<!-- Other -->

//<!-- Setup -->

window.components.push(new FSComponent());
