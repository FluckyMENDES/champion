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
