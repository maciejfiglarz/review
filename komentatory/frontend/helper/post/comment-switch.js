export const switchComment = () => {
  const switchWrap = document.querySelector('.single-comment__switch');
  const switchItems = document.querySelectorAll('.single-comment__switch-item');
  const navs = switchWrap.querySelectorAll(".single-comment__nav-item ");

  navs.forEach(nav => {
    nav.addEventListener("click", e => {
      const type = e.currentTarget.dataset.type;
      clearNavs(navs);
      clearSwitch(switchItems);
      switchWrap.querySelector(`.single-comment__switch-${type}`).classList.remove('display-none');
      switchWrap.querySelector(`.single-comment__nav-${type}`).classList.add('single-comment__nav-item--active');
      console.log('switch',switchWrap.querySelector(`.single-comment__switch-${type}`));
    });
  });
};


const clearNavs =(navs)=>{
    navs.forEach(nav => {
        nav.classList.remove('single-comment__nav-item--active');        
    });
};

const clearSwitch =(switchItems)=>{
    switchItems.forEach(item => {
        item.classList.add('display-none');        
    });
};