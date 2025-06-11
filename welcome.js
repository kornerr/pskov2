//<!-- Constants -->

let WELCOME_PAGES = {
  0: `
<div class="uk-container uk-padding">
    <h1 class="uk-heading">Welcome to PSKOV2</h1>
    <p>Time to generate static sites from web-browser!</p>
    <p>PSKOV 2 is a static site generator that works inside a web browser</p>
    <p>PSKOV 2 can also work completely off-line with LHA</p>
    <p>Though, by default, PSKOV 2 works directly with Git</p>
</div>`,
  1: `
<div class="uk-container uk-padding">
    <h1 class="uk-heading">PSKOV2 is not</h1>
    <ul>
      <li>It's not a WYSIWYG editor</li>
      <li>It doesn't need server (PSKOV 2 is client-side JS only)</li>
    </ul>
</div>`
};
let WELCOME_PANEL_MAIN = "panel-main";

//<!-- Component -->

function WelcomeComponent() {
    this._construct = function() {
        this.setupSideMenu();
        this.setupPageDisplay();
    };

    this.setupPageDisplay = function() {
        sideCtrl().registerFieldCallback("selectedItemId", (c) => {
            let main = deId(WELCOME_PANEL_MAIN);
            let ids = sideSelectionIds(c.selectedItemId);
            // Ignore other side menu groups.
            if (ids[0] != this.sideId) {
                return;
            }
            main.innerHTML = WELCOME_PAGES[ids[1]];
        });
    };

    this.setupSideMenu = function() {
        this.sideId = sideCreateGroup("Welcome");
        sideResetItemTitles(
            this.sideId,
            [
              "What is PSKOV 2",
              "What PSKOV 2 is not",
            ]
        );
    };
    
    this._construct();
}

//<!-- Other -->

//<!-- Setup -->

window.components.push(new WelcomeComponent());
