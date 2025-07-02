import {mobileVhFix} from './utils/mobile-vh-fix';
import {initAccordion} from './modules/accordion/init-accordion';
import {initHeader} from './modules/header/init-header';
import {initModals} from './modules/modal/init-modals';
import {initPhoneMask} from './modules/init-phone-mask';
import {initTabs} from './modules/tabs/init-tabs';
import {initHeaderAccordion} from "./modules/header-accordion/init-header-accordion";
import {initFancybox} from "./modules/fancybox/init-fancybox";
import {initObjectSlider} from './modules/sliders/init-object-slider.js';
import {cookiesBannerHandler} from "./modules/cookies-banner-handler";
import {initVideo} from "./modules/init-video.js";
import {initFeedback} from './modules/feedback/init-feedback';
import {initMoreBtn} from './modules/init-more-btn.js';
import {initProductHandler} from './modules/init-product-handler.js';
import {initShowMore} from './modules/show-more/init-show-more.js';



window.addEventListener('DOMContentLoaded', () => {
  // Utils
  // ---------------------------------

  mobileVhFix();

  // Modules
  // ---------------------------------

  initHeader();
  initModals();
  initAccordion();
  initTabs();
  initHeaderAccordion();
  initFancybox();
  cookiesBannerHandler();
  initVideo();
  initPhoneMask();
  initFeedback();
  initMoreBtn();
  initProductHandler();
  initShowMore();
  


  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initObjectSlider();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)


