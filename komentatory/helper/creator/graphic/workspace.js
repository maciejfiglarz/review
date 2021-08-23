import CreatorHelper from "./../CreatorHelper";

export default class GraphicWorkspace extends CreatorHelper {
  constructor() {
    super();
    this.listeningFields();
    this.titleTopSwitcher();
    this.colorSwitcher();
    this.colorSwitcherBackground();
  }
  listeningFields() {
    const titleTop = document.querySelector("textarea[name='graphicTitleTop']");
    const title = document.querySelector("textarea[name='graphicTitle']");
    const description = document.querySelector(
      "textarea[name='graphicDescription']"
    );

    this.insertWorkspace(titleTop);
    this.insertWorkspace(title);
    this.insertWorkspace(description);
  }

  titleTopSwitcher() {
    const switcher = document.querySelector("input[name='isGraphicTitleTop']");
    const titleTopWorkspace = document.querySelector(
      ".creator-graphic__workspace-title--top"
    );
    switcher.addEventListener("click", (e) => {
      const titleTop = document.querySelector(".textarea--title-top");
      titleTop.classList.toggle("display-none");
      titleTopWorkspace.classList.toggle("display-none");
      this.clearTitleTopError();
    });
  }
  clearTitleTopError() {
    const error = document.querySelector(".field-error--graphicTitleTop");

    if (error) {
      error.classList.add("display-none");
      const frame = error.querySelector(".field-error__frame");
      if (frame) {
        frame.innerText = "";
      }
    }
  }
  colorSwitcherBackground() {
    const colors = document.querySelectorAll(
      ".creator-graphic__workspace-color--bg"
    );
    const workspace = document.querySelector(
      ".creator-graphic__workspace-content"
    );
    const titleTop = document.querySelector(
      ".creator-graphic__workspace-title--top"
    );
    const title = document.querySelector(
      ".creator-graphic__workspace-title--bottom"
    );
    const description = document.querySelector(
      ".creator-graphic__workspace-description"
    );

    const optionsDark = document.querySelector(
      ".creator-graphic__workspace-options--dark"
    );
    const optionsBright = document.querySelector(
      ".creator-graphic__workspace-options--bright"
    );

    colors.forEach((element) => {
      element.addEventListener("click", (e) => {
        const color = e.target.dataset.color;
        workspace.style.background = color;
        titleTop.style.background = color;
        title.style.background = color;
        description.style.background = color;

        this.setBackgroundColorInput(color);

        if (color == "#ffffff") {
          workspace.classList.add("creator-graphic__workspace-content--bright");
          optionsDark.classList.add("display-none");
          optionsBright.classList.remove("display-none");
          this.resetColor("#000000");
          this.setColorInput("#000000");
        } else {
          workspace.classList.remove(
            "creator-graphic__workspace-content--bright"
          );
          optionsDark.classList.remove("display-none");
          optionsBright.classList.add("display-none");
          this.resetColor("#ffffff");
          this.setColorInput("#ffffff");
        }

        this.selectColor(colors, color);

      });
    });
  }

  colorSwitcher() {
    const titleTopWorkspace = document.querySelector(
      ".creator-graphic__workspace-title--top"
    );
    const titleWorkspace = document.querySelector(
      ".creator-graphic__workspace-title--bottom"
    );

    const titleTop = document.querySelector("textarea[name='graphicTitleTop']");
    const title = document.querySelector("textarea[name='graphicTitle']");
    // const graphicColor = document.querySelector("input[name='graphicColor']");

    const colors = document.querySelectorAll(
      ".creator-graphic__workspace-color--title"
    );
    colors.forEach((element) => {
      element.addEventListener("click", (e) => {
        const color = e.target.dataset.color;
        titleTopWorkspace.style.color = color;
        titleWorkspace.style.color = color;
        title.style.color = color;
        titleTop.style.color = color;
        // graphicColor.value = color;
        
        this.setColorInput(color);
        this.selectColor(colors, color);
      });
    });
  }
  selectColor(colors, selectedColor) {
    colors.forEach((color) => {
      color.dataset.color == selectedColor
        ? color.classList.add("creator-graphic__workspace-color--active")
        : color.classList.remove("creator-graphic__workspace-color--active");
    });
  }
  resetColor(color) {
    const colors = document.querySelectorAll(
      ".creator-graphic__workspace-color--title"
    );
    this.setTitlesColor(color);
    this.setDescriptionColor(color);
    this.selectColor(colors, color);
  }
  setTitlesColor(color) {
    const titleTop = document.querySelector(
      ".creator-graphic__workspace-title--top"
    );
    const title = document.querySelector(
      ".creator-graphic__workspace-title--bottom"
    );
    title.style.color = color;
    titleTop.style.color = color;
  }
  setDescriptionColor(color) {
    const description = document.querySelector(
      ".creator-graphic__workspace-description"
    );
    description.style.color = color;
  }
  setBackgroundColorInput(color) {
    const input = document.querySelector(
      "input[name='graphicBackgroundColor']"
    );
    input.value = color;
  }
  setColorInput(color) {
    const input = document.querySelector(
      "input[name='graphicBackgroundColor']"
    );
    input.value = color;
  }
  setColorInput(color){
    const input = document.querySelector("input[name='graphicColor']");
    input.value = color;
  }
}
