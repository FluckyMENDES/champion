'use strict';
(() => {

  class Slider {

    constructor(selector, slidesToShow, slidesToScroll) {
      // Количество слайдов отображаемых одновременно
      this.slidesToShow = slidesToShow;
      // На сколько слайдов скролить при клике
      this.slidesToScroll = slidesToScroll;

      // Слайдер
      this.slider = document.querySelector(selector);
      // Контейнер со слайдами
      this.container = this.slider.querySelector(`.slider__container`);
      // Список всех слайдов
      this.track = this.container.querySelector(`.slider__list`);
      // Слайда
      this.items = this.container.querySelectorAll(`.slider__item`);

      // Кнопка "Назад"
      this.btnPrev = this.slider.querySelector(`.slider__button--prev`);
      // Кнопка "Вперед"
      this.btnNext = this.slider.querySelector(`.slider__button--next`);
      // Индекс текущего слайда
      this.currentIndex = this.slider.querySelector(`.slider__current`);
      // Индекс общего количества слайдов
      this.totalIndex = this.slider.querySelector(`.slider__total`);

      // Вычисляем количество слайдов
      this.itemsCount = this.items.length;
      // Вычисляем и задаем ширину одного слайда (Не надо задавать ее в верстке)
      this.itemWidth = this.container.clientWidth / this.slidesToShow;
      // Определяем текущий слайд
      this.currentSlide = this.slidesToShow;
      this.position = 0;
      // Вычисляем на сколько необходимо сместить track при клике
      this.movePosition = this.slidesToScroll * this.itemWidth;


      // Задаем слайдам ширину
      this.setItemWidth();
      // Вешаем обработчики на кнопки
      this.btnsAddEventListener();
      // Проверяем кнопки при инициализации
      this.checkButtons();
    }

    setItemWidth() {
      this.items.forEach((item) => {
        item.style.minWidth = `${this.itemWidth}px`;
      });
    }

    btnsAddEventListener() {

      this.btnPrev.addEventListener(`click`, () => {
        const itemsLeft = Math.abs(this.position) / this.itemWidth;
        this.position += itemsLeft >= this.slidesToScroll ? this.movePosition : itemsLeft * this.itemWidth;
        this.setPosition();
        this.checkButtons();
        this.currentSlide -= 1;
        this.refreshIndex();
      });

      this.btnNext.addEventListener(`click`, () => {
        const itemsLeft = this.itemsCount - (Math.abs(this.position) + this.slidesToShow * this.itemWidth) / this.itemWidth;
        this.position -= itemsLeft >= this.slidesToScroll ? this.movePosition : itemsLeft * this.itemWidth;
        this.setPosition();
        this.checkButtons();
        this.currentSlide += 1;
        this.refreshIndex();
      });
    }

    setPosition() {
      this.track.style.transform = `translateX(${this.position}px)`;
    }

    checkButtons() {
      this.btnPrev.disabled = this.position >= 0;
      this.btnNext.disabled = this.position <= -(this.itemsCount - this.slidesToShow) * this.itemWidth;
    }

    refreshIndex() {
      this.currentIndex.textContent = this.currentSlide;
      this.totalIndex.textContent = this.itemsCount;
    }

  }

  // let slider1 = new Slider(`.slider`, 3, 1);
  // let slider2 = new Slider('.slider')


  // В верстке должна быть такая структура

  // <div class="slider">

  // 	<div class="slider__container">
  // 		<ul class="slider__list">
  // 			<li class="slider__item"></li>
  // 			<li class="slider__item"></li>
  // 			<li class="slider__item"></li>
  // 			<li class="slider__item"></li>
  // 			<li class="slider__item"></li>
  // 			<li class="slider__item"></li>
  // 			<li class="slider__item"></li>
  // 			<li class="slider__item"></li>
  // 			<li class="slider__item"></li>
  // 		</ul>
  // 	</div>

  // 	<div class="slider__controls">
  // 		<button class="slider__button slider__button--prev">Назад</button>
  // 		<button class="slider__button slider__button--next">Вперед</button>
  // 		<span class="slider__index"><span class="slider__current">1</span>/<span class="slider__total">6</span></span>
  // 	</div>


  // </div>

})();
