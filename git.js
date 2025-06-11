//<!-- Context -->

//<!-- Constants -->

let GIT_PAGES = {
  0: `
<div class="uk-container uk-padding">
    <h1 class="uk-heading">Repository and branch</h1>
    <form id="%GIT_REPO%">
        <fieldset class="uk-fieldset">
            <legend class="uk-legend">1. Clone new repository</legend>
            <div class="uk-margin">
              <input class="uk-input" type="text" placeholder="For example: https://git.opengamestudio.org/kornerr/study-gitjs-access">
            </div>
            <button class="uk-button uk-button-default">Clone</button>
        </fieldset>
    </form>
</div>
`,
};
let GIT_PANEL_MAIN = "panel-main";
let GIT_REPO = "repository";

//<!-- Component -->

function GitComponent() {
    this._construct = function() {
        this.setupSideMenu();
        this.setupPageDisplay();
    };

    this.setupPageDisplay = function() {
        sideCtrl().registerFieldCallback("selectedItemId", (c) => {
            let main = deId(GIT_PANEL_MAIN);
            let ids = sideSelectionIds(c.selectedItemId);
            console.log("ИГР GitC.setupPD ids/sideI:", ids, this.sideId);
            // Ignore other side menu groups.
            if (ids[0] != this.sideId) {
                return;
            }
            let contents = GIT_PAGES[ids[1]]
                .replaceAll("%GIT_REPOSITORY%", GIT_REPO);
            main.innerHTML = contents;
        });
    };

    this.setupSideMenu = function() {
        this.sideId = sideCreateGroup("Git");
        console.log("ИГР GitC.setupSM sideI:", this.sideId);
        sideResetItemTitles(
            this.sideId,
            [
              "Repository and branch",
              "Commit",
              "Push & pull",
              "Browse files",
            ]
        );
    };
    
    this._construct();
}

//<!-- Shoulds -->

//<!-- Other -->

//<!-- Setup -->

window.components.push(new GitComponent());
