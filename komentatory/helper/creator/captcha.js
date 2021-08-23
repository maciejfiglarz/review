export default () => {
  const slider = document.querySelector(".creator-captcha__slider");
  const counter = document.querySelector(".creator-captcha__label-counter");
  slider.oninput = () => {

    counter.innerText = slider.value;
  };
};
