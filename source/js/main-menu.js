// Главное меню
(() => {

  const menu = document.querySelector(`.menu`);
  const menuList = document.querySelector(`.menu__list`);
  const burger = document.querySelector(`.header__burger`);
  // const closeBtn = document.querySelector(`.menu__btn--close`);
  const body = document.querySelector(`.body`);


  burger.addEventListener(`click`, () => {
    openMenu();
  });

  // closeBtn.addEventListener(`click`, () => {
  //   closeMenu();
  // });

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
    // body.classList.remove(`body--lock`);
    bodyUnlock();
  };

  const openMenu = () => {
    menu.classList.add(`menu--active`);
    document.addEventListener(`keydown`, onEscClick);
    // body.classList.add(`body--lock`);
    bodyLock();

    setTimeout(() => {
      menu.addEventListener(`click`, onOutMenuClick);
    }, 100);

  };
  const timeout = 800;

  const lockPadding = document.querySelectorAll(`.lock-padding`);

  // let unlock = true;

  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector(`body`).offsetWidth + `px`;

    if (lockPadding.length > 0) {
      lockPadding.forEach((item) => {
        item.style.paddingRight = lockPaddingValue;
      });
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add(`body--lock`);

    lockScroll();
  }

  function bodyUnlock() {
    setTimeout(() => {
      if (lockPadding.length > 0) {
        lockPadding.forEach((item) => {
          item.style.paddingRight = `0px`;
        });
      }

      body.style.paddingRight = `0px`;
      body.classList.remove(`body--lock`);
    }, timeout);
  }

  function lockScroll() {
    // unlock = false;
    setTimeout(() => {
      // unlock = true;
    }, timeout);
  }

})();
