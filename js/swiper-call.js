var swiper = new Swiper(".mySwiperBanner", {
  spaceBetween: 30,
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var cateslider = new Swiper(".cate-slider", {
  slidesPerView: 2,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-nextp3",
    prevEl: ".swiper-button-prevp3",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    // when window width is >= 992
    992: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    // when window width is >= 575
    575: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

var ofrslider = new Swiper(".ofr-slider", {
  slidesPerView: 2,
  spaceBetween: 10,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    // when window width is >= 992
    992: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    // when window width is >= 575
    575: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

var productSwiper = document.querySelectorAll(".productSwiper");
productSwiper.forEach(function (swiperElement) {
  new Swiper(swiperElement, {
    slidesPerView: 2,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    // pagination: {
    //   el: swiperElement.querySelector(".swiper-pagination"),
    //   type: "progressbar",
    // },
  });
});

var featuredSwiper = document.querySelectorAll(".featuredSwiper");
featuredSwiper.forEach(function (swiperElement) {
  new Swiper(swiperElement, {
    slidesPerView: 2,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    // pagination: {
    //   el: swiperElement.querySelector(".swiper-pagination"),
    //   type: "progressbar",
    // },
  });
});

var stripSwiper = new Swiper(".stripSwiper", {
  slidesPerView: 2.5,
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    576: {
      slidesPerView: 3.5,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});

var relatedSwiper = new Swiper(".relatedSwiper", {
  slidesPerView: 2,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-nextp4",
    prevEl: ".swiper-button-prevp4",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    // when window width is >= 992
    992: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    // when window width is >= 575
    575: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

var perfumeSetSwiper = new Swiper(".perfumeSetSwiper", {
  slidesPerView: 2.4,
  spaceBetween: 10,
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
});

document.addEventListener("DOMContentLoaded", function () {
  // --- 1. DUPLICATION LOGIC ---
  // We need enough slides to fill the loop buffer.
  // Since max slidesPerView is 5, we need at least 10 slides.
  const swiperWrapper = document.querySelector(".media-swiper .swiper-wrapper");
  const originalSlides = swiperWrapper.querySelectorAll(".swiper-slide");
  const minRequiredSlides = 10; // 5 visible * 2 buffer

  if (originalSlides.length > 0 && originalSlides.length < minRequiredSlides) {
    const slidesToClone = Array.from(originalSlides); // Convert NodeList to Array

    // Keep appending clones until we hit the minimum requirement
    while (
      swiperWrapper.querySelectorAll(".swiper-slide").length < minRequiredSlides
    ) {
      slidesToClone.forEach((slide) => {
        const clone = slide.cloneNode(true); // Deep clone (copies video tag and classes)
        swiperWrapper.appendChild(clone);
      });
    }
  }

  // --- 2. INITIALIZE SWIPER ---
  const mediaSwiper = new Swiper(".media-swiper", {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    speed: 800,
    grabCursor: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next1",
      prevEl: ".swiper-button-prev1",
    },
    breakpoints: {
      768: { slidesPerView: 3, spaceBetween: 20 },
      992: { slidesPerView: 5, spaceBetween: 20 },
    },
    on: {
      init: function () {
        toggleControls(this);
      },
      slideChangeTransitionEnd: function () {
        toggleControls(this);
      },
    },
  });
});

// --- 3. VIDEO CONTROL LOGIC ---
function toggleControls(swiper) {
  const allSlides = swiper.slides;

  // Pause all inactive videos
  allSlides.forEach((slide) => {
    const video = slide.querySelector("video");
    if (video) {
      video.pause();
      video.removeAttribute("controls");
      // Optional: Reset non-active videos to start
      // video.currentTime = 0;
    }
  });

  // Play active video
  const activeSlide = swiper.slides[swiper.activeIndex];
  const activeVideo = activeSlide.querySelector("video");

  if (activeVideo) {
    activeVideo.setAttribute("controls", "true");
    const playPromise = activeVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  }
}

var ourHappySwiper = new Swiper(".ourhappy-swiper", {
  slidesPerView: 1.4,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next2",
    prevEl: ".swiper-button-prev2",
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

var addSwiper = new Swiper(".addSwiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});

var testimonialSwiper = new Swiper(".testimonialSwiper", {
  slidesPerView: 1.8,
  spaceBetween: 30,
  loop: false,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-nextp4",
    prevEl: ".swiper-button-prevp4",
  },
  breakpoints: {
    576: {
      slidesPerView: 2.5,
      spaceBetween: 30,
    },
  },
});

var waterHeaterSwiper = new Swiper(".waterHeaterSwiper", {
  slidesPerView: 2,
  spaceBetween: 0,
  observer: true,
  observeParents: true,
  loop: false,
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1199: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
  },
});

var categorySwiperType2 = new Swiper(".categorySwiperType2", {
  slidesPerView: 2,
  spaceBetween: 0,
  observer: true,
  observeParents: true,
  loop: false,
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1199: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
  },
});
