const initObjectSlider = () => {

  const objectSlider = document.querySelector('[data-slider="object-slider"]');
  const objectSubSlider = document.querySelector('[data-slider="object-sub-slider"]');

  if (!objectSlider || !objectSubSlider) return;


  const mainObjectSubSlider = new Swiper(objectSubSlider, {
    slidesPerView: 3,
    spaceBetween: 10,
    direction: 'vertical',
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
    thumbs: {
      swiper: mainObjectSubSlider,
    },
  });

};

export {initObjectSlider};
