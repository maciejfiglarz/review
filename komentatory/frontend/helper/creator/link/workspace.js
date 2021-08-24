import CreatorHelper from "../CreatorHelper";
export default class LinkWorkspace extends CreatorHelper {
  constructor() {
    super();
    this.initFetchLinkData();
  }

  initFetchLinkData() {
    const url = document.querySelector(`input[name='linkUrl']`);
    const titleOryginal = document.querySelector(
      `input[name='linkTitleOryginal']`
    );
    const descriptionOryginal = document.querySelector(
      `input[name='linkDescriptionOryginal']`
    );
    const siteNameOryginal = document.querySelector(
      `input[name='linkSiteNameOryginal']`
    );
    const temponaryImageIDOryginal = document.querySelector(
      `input[name='linkTemponaryImageID']`
    );
    const urlOryginal = document.querySelector(
      `input[name='linkUrlOryginal']`
    );
    const workspaceTitle = document.querySelector(
      `.creator-link__workspace-title`
    );
    const workspaceDescription = document.querySelector(
      `.creator-link__workspace-description`
    );
    const workspace = document.querySelector(`.creator-link__workspace`);

    url.addEventListener("change", (event) => {
      workspace.classList.remove("display-none");
      const formData = new FormData();
      formData.append("url", url.value);

      fetch("/fetch-data-from-link", {
        method: "post",
        body:formData
      })
        .then((response) => response.json())
        .then((response) => {
          const {
            linkTitle,
            linkDescription,
            linkSiteName,
            temponaryImageID,
          } = response;
  
          if (linkTitle && linkDescription && temponaryImageID) {
            titleOryginal.value = linkTitle;
            workspaceTitle.innerText = linkTitle;

            descriptionOryginal.value = linkDescription;
            workspaceDescription.innerText = linkDescription;

            siteNameOryginal.value = linkSiteName;
            temponaryImageIDOryginal.value = temponaryImageID;
            urlOryginal.value = url.value;
            const clipboard = document.querySelector(
              `.creator-link__workspace-photo--cover`
            );
            clipboard.style.backgroundImage = `url('upload/temponary-image/${temponaryImageID}.jpg')`;
            clipboard.style.backgroundSize = "cover";
            clipboard.style.backgroundPosition = "center";
            workspace.classList.remove("display-none");
            
          } else {
            this.showErrorFrame("unknownError", "linkWorkspace");
            workspace.classList.add("display-none");
            titleOryginal.value = "";
            workspaceTitle.innerText = "";

            descriptionOryginal.value = "";
            workspaceDescription.innerText = "";
          }
          this.hideLoader();
        });
    });
  }

  showLoader() {
    const loaders = document.querySelectorAll(`.creator-workspace__loader`);

    loaders.forEach((loader) => {
      loader.classList.remove("display-none");
    });
  }
  hideLoader() {
    const loaders = document.querySelectorAll(`.creator-workspace__loader`);
    loaders.forEach((loader) => {
      setTimeout(() => {
        loader.classList.add("display-none");
      }, 2000);
    });
  }
}
