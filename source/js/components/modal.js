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
