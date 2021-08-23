export const counterTextarea = () => {
  const fields = document.querySelectorAll("textarea.counter,input.counter");

  fields.forEach((field) => {
    field.addEventListener("focus", () => {
      const counter = field.parentElement.querySelector(".form-field__counter");
      if (counter) {
        counter.classList.remove("display-none");
      }
      const maxlength = field.getAttribute("maxlength");
      const currentLength = field.value.length;
      counter.innerText = currentLength;
      console.log("focus", counter, maxlength, currentLength);
    });

    field.addEventListener("focusout", () => {
      const counter = field.parentElement.querySelector(".form-field__counter");
      if (counter) {
        counter.classList.add("display-none");
        counter.innerText = "";
      }
    });
    field.addEventListener("input", () => {
      const counter = field.parentElement.querySelector(".form-field__counter");
      const currentLength = field.value.length;
      counter.innerText = currentLength;
      console.log("change", currentLength);
    });
  });
};
