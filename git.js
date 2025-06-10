//<!-- Context -->

//<!-- Constants -->

let GIT_PANEL_MAIN = "panel-main";

//<!-- Component -->

function GitComponent() {
    this._construct = function() {
        this.setupSideMenu();
    };

    this.setupSideMenu = function() {
        this.sideId = sideCreateGroup("Git");
        sideResetItemTitles(
            this.sideId,
            [
              "Repository & branch",
              "Commit",
              "Push & pull",
            ]
        );
    };
    
    this._construct();
}

//<!-- Shoulds -->

//<!-- Other -->

//<!-- Setup -->

window.components.push(new GitComponent());
