const initObjectSlider = () => {

  const objectSlider = document.querySelector('[data-slider="object-slider"]');
  const objectSubSlider = document.querySelector('[data-slider="object-sub-slider"]');
  const buttonPrev = document.querySelector('[data-slider="object-slider-button-prev"]');
  const buttonNext = document.querySelector('[data-slider="object-slider-button-next"]');

  if (!objectSlider || !objectSubSlider) return;


  const mainObjectSubSlider = new Swiper(objectSubSlider, {
    slidesPerView: 3,
    spaceBetween: 10,
    direction: 'vertical',
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrev,
    },
    breakpoints: {
      0: {
        direction: 'horizontal',
        slidesPerView: 2,
      },
      615: {
        direction: 'vertical',
      },
    },
  });

  const mainObjectSlider = new Swiper(objectSlider, {
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrev,
    },
    thumbs: {
      swiper: mainObjectSubSlider,
    },
  });

};

export {initObjectSlider};
