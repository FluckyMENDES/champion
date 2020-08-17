'use strict';

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


// Слайдер на главной
// (() => {
//   const slider = Peppermint(document.querySelector(`.slider__container`), {
//     speed: 1000,
//     touchSpeed: 1000,
//     slideshow: true,
//     slideshowInterval: 4000,
//     stopSlideshowAfterInteraction: true,
//     // disableIfOneSlide: true,
//     dots: true,
//     dotsContainer: document.querySelector(`.slider__dots`),
//   });

//   // Пересчитываем ширину слайдера
//   slider.recalcWidth();
// })();

(() => {
  new Glide(`.slider`, {
    // carousel - листается по кругу, slider - возвращается к первому слайду, пролистывая предыдущие
    type: `slider`,
    // С какого слайда начинать
    startAt: 0,
    // Сколько слайдов показать одновременно
    perView: 1,
    // Интервал автопролистывания
    autoplay: 4000,
    // Остановка автопролистывания при ховере
    hoverpause: true,
    // Адаптив
    breakpoints: {
      // 1199: {
      //   perView: 4.6
      // },
      // 767: {
      //   perView: 2.8
      // },
      // 500: {
      //   perView: 1.5
      // },
    }
    // Инициализация слайдера
  }).mount();
})();

// Слайдер с брендами
(() => {
  new Glide(`.brands__slider`, {
    // carousel - листается по кругу, slider - возвращается к первому слайду, пролистывая предыдущие
    type: `carousel`,
    // С какого слайда начинать
    startAt: 0,
    // Сколько слайдов показать одновременно
    perView: 6,
    // Интервал автопролистывания
    autoplay: 4000,
    // Остановка автопролистывания при ховере
    hoverpause: true,
    // Адаптив
    breakpoints: {
      1199: {
        perView: 4.6
      },
      767: {
        perView: 2.8
      },
      500: {
        perView: 1.5
      },
    }
    // Инициализация слайдера
  }).mount();
})();

// Изменение изображений точек у мейн-слайдера
(() => {

  const sliderImages = document.querySelectorAll(`.slider__img`);
  const sliderBullets = document.querySelectorAll(`.slider__bullet`);

  sliderBullets.forEach((bullet, index) => {
    let sliderImageSrc = sliderImages[index].getAttribute(`src`);
    sliderBullets[index].style.backgroundImage = `url('${sliderImageSrc}')`;
    sliderBullets[index].textContent = ++index;
  });

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

// Секция "Поиск"
(() => {

  const dropdownBtn = document.querySelector(`.search__btn--where`);
  const checkboxes = document.querySelectorAll(`.search__checkbox`);
  const btnTextBackup = dropdownBtn.textContent;

  dropdownBtn.addEventListener(`click`, () => {
    dropdownBtn.classList.toggle(`search__btn--where--active`);
  });

  // Вешаем на все чекбоксы обрабочики изменения
  for (let checkbox of checkboxes) {
    checkbox.addEventListener(`change`, function () {
      // Счетчик выбраных чекбоксов
      let checkedBoxes = 0;

      // Увеличиваем счетчик
      for (checkbox of checkboxes) {
        if (checkbox.checked) {
          checkedBoxes++;
        }
      }

      // Возвращаем изначальный текст на кнопке если не выбран не один чекбокс
      if (!checkedBoxes) {
        dropdownBtn.textContent = btnTextBackup;
      // Иначе меняем текст кнопки
      } else {
        changeBtnText(checkedBoxes);
      }
    });
  }

  const changeBtnText = (checkboxesAmount) => {
    dropdownBtn.textContent = `Выбрано:${checkboxesAmount}`;
  };

})();

// Модальные окна
(() => {

  const popupLinks = document.querySelectorAll(`.popup-link`);
  const body = document.querySelector(`body`);
  const lockPadding = document.querySelectorAll(`.lock-padding`);

  let unlock = true;

  // Значение должно соответсвовать продолжительности анимации попапа
  const timeout = 800;

  if (popupLinks.length > 0) {
    popupLinks.forEach((link) => {
      link.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const popupName = link.getAttribute(`href`);
        const currentPopup = document.querySelector(popupName);
        popupOpen(currentPopup);
      });
    });
  }

  const popupCloseBtn = document.querySelectorAll(`.popup-close`);
  if (popupCloseBtn.length > 0) {
    popupCloseBtn.forEach((button) => {
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        popupClose(button.closest(`.popup`));
      });
    });
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector(`.popup--opened`);
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      showPopup(currentPopup);
      currentPopup.addEventListener(`click`, (evt) => {
        if (!evt.target.closest(`.popup__content`)) {
          popupClose(evt.target.closest(`.popup`));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      hidePopup(popupActive);

      if (doUnlock) {
        bodyUnlock();
      }
    }
  }

  function onEscCloseModal(evt) {
    if (evt.key === `Escape`) {
      const popupActive = document.querySelector(`.popup--opened`);
      popupClose(popupActive);
    }
  }

  function showPopup(currentPopup) {
    currentPopup.classList.add(`popup--opened`);
    document.addEventListener(`keyup`, onEscCloseModal);
  }

  function hidePopup(popupActive) {
    popupActive.classList.remove(`popup--opened`);
    document.removeEventListener(`keyup`, onEscCloseModal);
  }


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
          console.log(item);
          item.style.paddingRight = `0px`;
        });
      }

      body.style.paddingRight = `0px`;
      body.classList.remove(`body--lock`);
    }, timeout);
  }

  function lockScroll() {
    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }

})();


(() => {

  let slider = document.querySelector(`.input-range__dounle`);

  noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
      'min': 0,
      'max': 100
    }
  });

})();
