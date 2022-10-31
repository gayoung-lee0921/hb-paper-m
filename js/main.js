Splitting();
const line = $("#product .line");
const gnb = $("#gnb");
const header = $("#header");

const visualTL = gsap.timeline();

new Swiper("#main-visual .mask", {
  effect: "fade",
  on: {
    slideChange: function () {
      visualTxtAniReset();
    },
    slideChangeTransitionEnd: function (swiper) {
      visualTxtAni();
      // visualTL
      //   .from("#main-visual .swiper-slide-active .sub .char", {
      //     x: 100,
      //     opacity: 0,
      //     ease: "back",
      //     stagger: {
      //       each: 0.02,
      //     },
      //   })
      //   .from(
      //     "#main-visual .swiper-slide-active .main .char",
      //     {
      //       y: 100,
      //       opacity: 0,
      //       ease: "back", // ease는 텐션 주고 싶을 때
      //       // delay: 1, 1초 뒤에 나오도록 하고 싶을 때
      //       stagger: {
      //         each: 0.1,
      //       },
      //     },
      //     //gsap에서 overlap 처럼 표현하는 방법
      //     //앞에 모션이랑 좀 겹치게 하고 싶을 때, overlap이랑 비슷, 그냥 0.5 쓰면 절대 시간 기준, "-=0.5"라 쓰면 앞에 모션 끝날때 기준
      //     //"<숫자": start 기준, ">숫자": end 기준
      //     ">-1"
      //   );
      // // if (swiper.realIndex === 0) {
      // //   visual01TL.restart();
      // //   visual02TL.pause(0);
      // // } else {
      // //   visual02TL.restart();
      // //   visual01TL.pause(0);
      // // }
    },
  },
});
visualTxtAni();
visualTxtAniReset();

function visualTxtAniReset() {
  gsap.set("#main-visual li .sub .char", { opacity: 0, y: -100 });
  gsap.set("#main-visual li .main .char", { opacity: 0, x: 100 });
}

function visualTxtAni() {
  visualTL
    .to("#main-visual .swiper-slide-active .sub .char", {
      y: 0,
      opacity: 1,
      ease: "back",
      stagger: {
        each: 0.02,
      },
    })
    .to(
      "#main-visual .swiper-slide-active .main .char",
      {
        x: 0,
        opacity: 1,
        ease: "back",

        stagger: {
          each: 0.1,
        },
      },
      ">-0.5"
    );
}

function makeCirclTxt(txt, _radius = 170, _dir = 1) {
  const circleTxt = document.querySelector(txt);
  const circleType = new CircleType(circleTxt);
  circleType.radius(_radius).dir(_dir);
}
makeCirclTxt("#business .circle-txt", 50);
makeCirclTxt("#product .circle-txt", 50);

const productTL = gsap.timeline();

const productSlider = new Swiper("#product .mask", {
  effect: "fade",
  pagination: {
    el: "#product .pagination",
  },
  autoplay: {
    delapy: 5000,
  },
  on: {
    slideChange: function (swiper) {
      gsap.set(line, { scaleX: swiper.realIndex / 6 });

      gsap.set("#product li .title-box h2", { opacity: 0, y: 100 });
      gsap.set("#product li .title-box strong", { opacity: 0, y: 100 });
      gsap.set("#product li .title-box p", { opacity: 0, y: 100 });
      gsap.set("#product li .title-box a", { opacity: 0, y: 100 });
    },
    slideChangeTransitionEnd: function (swiper) {
      productTL
        .to("#product .swiper-slide-active .title-box h2", { opacity: 1, y: 0, ease: "back", duration: 1 })
        .to("#product .swiper-slide-active .title-box strong", { opacity: 1, y: 0, ease: "back", duration: 1 }, ">-0.85")
        .to("#product .swiper-slide-active .title-box p", { opacity: 1, y: 0, ease: "back", duration: 1 }, ">-0.85")
        .to("#product .swiper-slide-active .title-box a", { opacity: 1, y: 0, ease: "back", duration: 1 }, ">-0.85");
    },
  },
});

const btnPlay = $("#product .btn-play");
const btnPause = $("#product .btn-pause");

btnPause.on("click", function () {
  btnPause.hide();
  btnPlay.show();
  productSlider.autoplay.stop();
});
btnPlay.on("click", function () {
  btnPause.show();
  btnPlay.hide();
  productSlider.autoplay.start();
});

new Swiper("#news .notice-list-box", {
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1280: {
      slidesPerView: 3,
    },
  },
});

new Swiper("#footer .mask", {
  slidesPerView: "auto",
  spaceBetween: 30,
  breakpoints: {
    480: {
      slidesPerView: 4,
    },
    640: {
      slidesPerView: 5,
    },
    1280: {
      slidesPerView: 7,
    },
  },
});

window.addEventListener("scroll", function () {
  console.log(widnow.scrollY);
});

const businessTL = gsap.timeline();

businessTL.from("#business .title-box h2", { opacity: 0, y: 100 }).from("#business .title-box p", { opacity: 0, y: 100 }).from("#business ul li", { opacity: 0, y: 100, stagger: 0.1 });

new fullpage("#main", {
  navigation: true,
  navigationTooltips: ["intro", "business", "product", "news", "footer"],
  scrollOverflow: false,
  responsiveWidth: 800,
  onLeave: function (origin, destination, direction, trigger) {
    if (destination.index === 1) {
      header.addClass("color");
      businessTL.restart();
    }
    if (destination.index === 0) {
      header.removeClass("color");
      fpNav.removeClass("color");
    }
    if (destination.index !== 0) {
      fpNav.addClass("color");
    }
    if (destination.isLast) {
      fpNav.addClass("last");
    } else {
      fpNav.removeClass("last");
    }
  },
});
const fpNav = $("#fp-nav");

const depth01 = $("#gnb .depth01");
const depth02 = $("#gnb .depth02");
const btnAll = $(".btn-all");

btnAll.on("click", function () {
  gnb.toggleClass("on");
  btnAll.toggleClass("on");
  depth02.stop().delay(250).slideUp();
});

depth01.on("click", function (e) {
  e.preventDefault();
  const depth02 = $(this).next();
  const siblingsDepth02 = $(this).parent().siblings().find(".depth02");
  depth02.stop().slideToggle();
  siblingsDepth02.stop().slideUp();
});
