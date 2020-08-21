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
