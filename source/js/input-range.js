// Двойной ползунок в фильтрах каталога
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
