// Меню каталога
(() => {

  const catalog = document.querySelector(`.catalog`);
  const toggleBtn = catalog.querySelector(`.catalog__btn`);
  const subLinks = catalog.querySelectorAll(`.catalog__item--more`);

  toggleBtn.addEventListener(`click`, () => {
    catalog.classList.toggle(`catalog--active`);
    toggleBtn.classList.toggle(`active`);
  });

  // Добавить ховер ------------------------------------------------
  for (let link of subLinks) {
    link.addEventListener(`mouseenter`, () => {
      link.querySelector(`.catalog__submenu`).classList.add(`submenu-catalog--active`);
    });
    link.addEventListener(`mouseleave`, () => {
      link.querySelector(`.catalog__submenu`).classList.remove(`submenu-catalog--active`);
    });
  }

})();
