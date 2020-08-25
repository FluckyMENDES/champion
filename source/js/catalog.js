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

  // let slider = document.querySelector(`.input-range__dounle`);

  // noUiSlider.create(slider, {
  //   start: [20, 80],
  //   connect: true,
  //   range: {
  //     'min': 0,
  //     'max': 100
  //   }
  // });

})();

// Двойной ползунок в фильтрах
(() => {

  const slider = document.getElementById(`double-range`);

  noUiSlider.create(slider, {
    start: [0, 30000],
    connect: true,
    range: {
      'min': 0,
      'max': 100000
    },
    step: 1,
    tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})]
  });

  const priceLowerElement = document.querySelector(`#filter__price--min`);
  const priceUpperElement = document.querySelector(`#filter__price--max`);
  const sliderLowerElement = slider.querySelector(`.noUi-handle-lower`);
  const sliderUpperElement = slider.querySelector(`.noUi-handle-upper`);

  slider.noUiSlider.on(`update`, () => {
    let lower = Math.round(sliderLowerElement.getAttribute(`aria-valuenow`));
    let upper = Math.round(sliderUpperElement.getAttribute(`aria-valuenow`));
    priceLowerElement.value = lower;
    priceUpperElement.value = upper;
  });

  priceLowerElement.addEventListener(`input`, () => {
    slider.noUiSlider.set([priceLowerElement.value, priceUpperElement.value]);
  });

  priceUpperElement.addEventListener(`input`, () => {
    slider.noUiSlider.set([priceLowerElement.value, priceUpperElement.value]);
  });

})();


// Выпадающий список пунктов фильтра
(() => {

  const dropdownButtons = document.querySelectorAll(`.filter__button--dropdown`);
  dropdownButtons.forEach((element) => {
    element.addEventListener(`click`, (evt) => {
      changeIconClass(evt);
      hideFilterList(element);
    });
  });

  const changeIconClass = (evt) => {
    evt.target.closest(`.filter__button--dropdown`).classList.toggle(`filter__button--dropdown--active`);
  };

  const hideFilterList = (element) => {
    element.closest(`.filter__fieldset`).querySelector(`.filter__list`).classList.toggle(`filter__list--hide`);
  };


})();


// Удаление пунктов в блоке "Сравнение"
(() => {

  const removeBtns = document.querySelectorAll(`.compare__btn--delete`);
  removeBtns.forEach((element) => {
    element.addEventListener(`click`, () => {
      element.closest(`.compare__item`).remove();
    });
  });

})();
