'use strict';

// Главное меню
(() => {

  const menu = document.querySelector(`.menu`);
  const menuList = document.querySelector(`.menu__list`);
  const burger = document.querySelector(`.header__burger`);
  const closeBtn = document.querySelector(`.menu__btn--close`);
  const body = document.querySelector(`.body`);


  burger.addEventListener(`click`, () => {
    openMenu();
  });

  closeBtn.addEventListener(`click`, () => {
    closeMenu();
  });

  const onOutMenuClick = (evt) => {
    const target = evt.target;
    if (target !== menuList && !target.closest(`.menu__list`)) {
      closeMenu();
    }
  };

  const onEscClick = (evt) => {
    if (evt.keyCode === 27) {
      closeMenu();
    }
  };

  const closeMenu = () => {
    menu.classList.remove(`menu--active`);
    document.removeEventListener(`keydown`, onEscClick);
    document.removeEventListener(`click`, onOutMenuClick);
    body.classList.remove(`body--lock`);
  };

  const openMenu = () => {
    menu.classList.add(`menu--active`);
    document.addEventListener(`keydown`, onEscClick);
    body.classList.add(`body--lock`);

    setTimeout(() => {
      menu.addEventListener(`click`, onOutMenuClick);
    }, 100);

  };

})();

// Меню каталога
(() => {

  const menu = document.querySelector(`.catalog`);
  const menuList = document.querySelector(`.catalog__body`);
  const openBtn = document.querySelector(`.search__btn--catalog`);
  const closeBtn = document.querySelector(`.catalog__btn--close`);
  const body = document.querySelector(`.body`);


  openBtn.addEventListener(`click`, () => {
    openMenu();
  });

  closeBtn.addEventListener(`click`, () => {
    closeMenu();
  });

  const onOutMenuClick = (evt) => {
    const target = evt.target;
    if (target !== menuList && !target.closest(`.catalog__body`)) {
      closeMenu();
    }
  };

  const onEscClick = (evt) => {
    if (evt.keyCode === 27) {
      closeMenu();
    }
  };

  const closeMenu = () => {
    menu.classList.remove(`catalog--active`);
    document.removeEventListener(`keydown`, onEscClick);
    body.classList.remove(`body--lock`);
    menu.removeEventListener(`click`, onOutMenuClick);
  };

  const openMenu = () => {
    menu.classList.add(`catalog--active`);
    document.addEventListener(`keydown`, onEscClick);
    body.classList.add(`body--lock`);

    setTimeout(() => {
      menu.addEventListener(`click`, onOutMenuClick);
    }, 100);
  };

})();

(() => {
  const slider = Peppermint(document.getElementById(`peppermint`), {
    speed: 1000,
    touchSpeed: 1000,
    slideshow: true,
    slideshowInterval: 4000,
    stopSlideshowAfterInteraction: true,
    // disableIfOneSlide: true,
    dots: true,
    dotsContainer: document.querySelector(`.slider__dots`),
  });

  // Пересчитываем ширину слайдера
  slider.recalcWidth();
})();

// Акордеон в меню католога
(() => {
  const accordeonTriggers = document.querySelectorAll(`.accordeon__trigger`);
  const accordeonItems = document.querySelectorAll(`.accordeon__item`);
  const activeClass = `accordeon__item--active`;

  accordeonTriggers.forEach((item) => {
    item.addEventListener(`click`, () => {
      const parent = item.parentNode;

      if (parent.classList.contains(activeClass)) {
        parent.classList.remove(activeClass);
      } else {
        // eslint-disable-next-line max-nested-callbacks
        accordeonItems.forEach((child) => {
          child.classList.remove(activeClass);
          parent.classList.add(activeClass);
        });
      }
    });
  });

})();
