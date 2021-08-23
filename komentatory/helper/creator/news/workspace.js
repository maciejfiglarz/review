import CreatorHelper from "../CreatorHelper";
export default class NewsWorkspace extends CreatorHelper {
  constructor() {
    super();
    this.listeningFields();
  }
  listeningFields() {
    const title = document.querySelector("textarea[name='newsTitle']");
    const description = document.querySelector(
      "textarea[name='newsDescription']"
    );

    this.insertWorkspace(title);
    this.insertWorkspace(description);
  }
}
