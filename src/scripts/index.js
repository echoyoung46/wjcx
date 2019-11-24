import '../styles/normalize.scss';
import '../styles/style.scss';
require('../styles/mystyles.scss');

import Swiper from 'swiper';

const mySwiper = new Swiper('.swiper-container', {
  loop: true,
  autoplay: true,
  effect : 'coverflow',
  slidesPerView: 2,
  centeredSlides: true,
  coverflowEffect: {
    rotate: 10,
    stretch: 10,
    depth: 30,
    modifier: 2,
    slideShadows : true
  },
})
