window.addEventListener("DOMContentLoaded", (event) => {
  sorter();
});

const sorter = () => {
  const items = document.querySelectorAll(".sorter-categories__item");
  
  items.forEach((item) => {
    item.addEventListener("click", (event) => {
      const url = window.location.href;
      const urlObj = new URL(url);
      const currentItem = event.currentTarget;
      const type = currentItem.dataset.type;
      const redirectTo = currentItem.dataset.to;
      const replaceFrom = currentItem.dataset.from;

      if (type == "superiorCategory") {

        const newUrl = url.replace("sortuj", `${redirectTo}/sortuj`);
        window.location.replace(newUrl);

      } else if (type == "category" && redirectTo == "all") {

        const newUrl = url.replace(`/${replaceFrom}`, "");
        window.location.replace(newUrl);

      } else if (type == "category") {

        const newUrl = url.replace(replaceFrom, redirectTo );
        window.location.replace(newUrl);

      } else {

        window.location.replace(redirectTo);

      }
    });
  });
};
