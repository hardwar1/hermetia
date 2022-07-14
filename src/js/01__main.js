"use strict";

document.addEventListener("DOMContentLoaded", function () {
  function qOne(selector) {
    return document.querySelector(selector);
  }

  function qAll(selector) {
    return document.querySelectorAll(selector);
  }

  //слайдеры
  function swiperInit(selector) {
    const swiper = new Swiper(selector, {
      speed: 400,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: "true",
      },
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
    });
  }
  swiperInit(".hero__slider");
  swiperInit(".details-photo-slider__slider");

  //адаптив слайдера в корзине
  function numRowSlides() {
    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    if (height > 900) {
      return 4;
    } else if (height > 710) {
      return 3;
    } else if (height > 520) {
      return 2;
    } else {
      return 1;
    }
  }

  function swiperInit1() {
    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const cartItems = qAll(".cart__item");

    if (height > 520 || width > 760) {
      qOne(".cart__slider").classList.add("swiper");
      qOne(".cart__swiper-wrapper").classList.add("swiper-wrapper");
      qOne(".cart__slider .swiper-dots").style.display = "flex";
      for (let item of cartItems) {
        item.classList.add("swiper-slide");
      }
      return new Swiper(".cart__slider", {
        speed: 400,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: "true",
        },
        navigation: {
          nextEl: ".button-next",
          prevEl: ".button-prev",
        },
        grid: {
          rows: numRowSlides(),
          fill: "row",
        },
        spaceBetween: 20,
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          761: {
            slidesPerView: 2,
          },
        },
      });
    } else {
      qOne(".cart__swiper-wrapper").classList.remove("swiper-wrapper");
      qOne(".cart__slider").classList.remove("swiper");
      qOne(".cart__slider .swiper-dots").style.display = "none";
      for (let item of cartItems) {
        item.classList.remove("swiper-slide");
      }
    }
  }
  swiperInit1();

  const overlay = qOne(".overlay"),
    popaps = qAll(".popap"),
    jsClosebtns = qAll(".js-close");

  //скрывает попапы
  function hidePopaps() {
    if (
      qOne(".product-details.popap--active") &&
      qOne(".details-photo-slider.popap--active")
    ) {
      qOne(".details-photo-slider").classList.remove("popap--active");
      qOne(".product-details").style.opacity = 1;
    } else if (
      qOne(".details-photo-slider.popap--active") &&
      qOne(".cart.popap--active")
    ) {
      qOne(".details-photo-slider").classList.remove("popap--active");
      qOne(".cart").style.opacity = 1;
    } else {
      for (let popap of popaps) {
        popap.classList.remove("popap--active");
        popap.style.opacity = 1;
      }
      overlay.classList.remove("overlay--active");
      overlay.classList.remove("overlay--pazzle");
    }
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      hidePopaps();
    }
  });

  overlay.addEventListener("click", () => hidePopaps());

  for (const jsClosebtn of jsClosebtns) {
    jsClosebtn.addEventListener("click", () => hidePopaps());
  }

  //quantity инпут с + и -
  if (qOne(".quantity__item--plus")) {
    const quantityPlusBtn = qAll(".quantity__item--plus"),
      quantityMinusBtn = qAll(".quantity__item--minus");

    for (let i of quantityPlusBtn) {
      i.addEventListener("click", function () {
        let value = i
          .closest(".quantity")
          .querySelector(".quantity__item--input");
        value.value = Number(value.value) + 1;
      });
    }

    for (let i of quantityMinusBtn) {
      i.addEventListener("click", function () {
        let value = i
          .closest(".quantity")
          .querySelector(".quantity__item--input");
        if (Number(value.value) > 0) {
          value.value = Number(value.value) - 1;
        }
      });
    }
  }

  // fly мухи
  function flyGen() {
    if (qOne(".fly__list")) {
      const flyLists = qAll(".fly__list");

      const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      // генерация мух
      for (let flyList of flyLists) {
        const availableScreenWidth = window.screen.availWidth;
        flyList.innerHTML = "";
        let randomFly;
        if (availableScreenWidth > 850) {
          randomFly = random(5, 8);
        } else if (availableScreenWidth > 550) {
          randomFly = random(2, 5);
        } else if (flyList.availHeight < 250) {
          randomFly = 2;
        } else {
          randomFly = 5;
        }

        for (let i = 0; i < randomFly; i++) {
          flyList.insertAdjacentHTML(
            "beforeend",
            `<span class="fly__item"></span>`
          );
        }
      }
      // генерация расположения мух
      for (let flyList of flyLists) {
        const flys = flyList.querySelectorAll(".fly__item");
        let left = 100 / flys.length;
        let padding = 7;
        if (flys < 4) {
          padding = 20;
        }
        for (let fly of flys) {
          fly.style.setProperty(
            "--left",
            `${random(left - 100 / flys.length - 4, left - padding)}%`
          );
          fly.style.setProperty("--top", `${random(-2, 85)}%`);
          fly.style.setProperty("--deg", `${random(0, 360)}deg`);
          left += 100 / (flys.length + 1);
        }
      }
    }
  }
  flyGen();
  if (qOne(".fly__list")) {
    const flyList = qAll(".fly__list");
    for (let fly of flyList) {
      let counter = 0;
      fly.onmouseout = function flys(event) {
        counter++;

        if (counter % 3 == 0) flyGen();
      };
    }
  }

  //кнопка вызова мобильного меню
  const burger = qOne(".header .burger"),
    menu = qOne(".header__mobile");

  burger.addEventListener("click", function () {
    this.classList.toggle("burger--close");
    menu.classList.toggle("header__mobile--show");
  });

  menu.addEventListener("click", function () {
    this.classList.remove("header__mobile--show");
  });

  // скроллы хеадера
  const header = qOne(".header");
  let scrollTop,
    top = 0;

  window.addEventListener("scroll", function () {
    scrollTop = window.scrollY;

    if (scrollTop > 150) {
      header.classList.add("header--scroll");
    } else {
      header.classList.remove("header--scroll");
    }

    if (top < scrollTop && top > 500 && !qOne(".header__mobile--show")) {
      header.classList.add("header--hide");
      top = scrollTop;
    } else {
      header.classList.remove("header--hide");
      top = scrollTop;
    }
  });

  // кнопки подробней
  const heroBtns = qAll(".js-show-product-details");
  for (let btn of heroBtns) {
    btn.addEventListener("click", () => {
      overlay.classList.add("overlay--active");
      qOne(".product-details").classList.add("popap--active");
    });
  }

  // появление слайдера в попапе продукт-дейтайлс(подробнее)
  const productDetailsInner = qOne(".product-details__inner");

  let sliderBool = 0;
  function slider799() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const sliderItems = productDetailsInner.querySelectorAll("li");
    if (width < 800) {
      productDetailsInner.classList.add("swiper");
      productDetailsInner.querySelector("ul").classList.add("swiper-wrapper");

      for (const item of sliderItems) {
        item.classList.add("swiper-slide");
      }
      if (!sliderBool) swiperInit(".product-details__inner");
      productDetailsInner.querySelector("article").style.height = `${
        productDetailsInner.querySelector(".product-details__info").offsetHeight
      }px`;

      sliderBool = 1;
    } else {
      productDetailsInner.classList.remove("swiper");
      productDetailsInner
        .querySelector("ul")
        .classList.remove("swiper-wrapper");
      productDetailsInner.querySelector("article").style.height = "unset";

      for (const item of sliderItems) {
        item.classList.remove("swiper-slide");
        item.style.width = "auto";
      }
      sliderBool = 0;
    }
  }
  slider799();

  window.addEventListener(
    "resize",
    function (event) {
      slider799();
      swiperInit1();
    },
    true
  );

  // попап details-photo-slider
  if (qOne(".js-photo-slider")) {
    const jsPhotoSliderBtns = qAll(".js-photo-slider"),
      detailsPhotoSlider = qOne(".details-photo-slider"),
      closeBtns = detailsPhotoSlider.querySelectorAll(".burger"),
      productDetails = qOne(".product-details");

    for (const btn of jsPhotoSliderBtns) {
      btn.addEventListener("click", () => {
        detailsPhotoSlider.classList.add("popap--active");
        overlay.classList.add("overlay--active");
        if (btn.closest(".popap")) {
          btn.closest(".popap").style.opacity = 0.4;
        }
      });
    }

    for (const closeBtn of closeBtns) {
      closeBtn.addEventListener("click", () => {
        hidePopaps();
      });
    }
  }

  //удаление и возврат товара в корзине
  const delBtns = qAll(".small-card__del"),
    escBtns = qAll(".small-card__esc");
  for (const btn of delBtns) {
    btn.addEventListener("click", () =>
      btn.closest(".small-card").classList.add("small-card--delete")
    );
  }

  for (const escBtn of escBtns) {
    escBtn.addEventListener("click", () =>
      escBtn.closest(".small-card").classList.remove("small-card--delete")
    );
  }

  //оформить товар
  const jsArrange = qOne(".js-arrange");

  jsArrange.addEventListener("click", () => {
    qOne(".cart__form-wrap").classList.toggle("cart__form-wrap--active");
    qOne(".cart__goods").classList.toggle("cart__goods--hide");
  });

  // открыть корзину и закрыть корзину
  const jsСartBtns = qAll(".js-cart"),
    toGoodsBtns = qAll(".js-to-goods");

  for (const cartBtn of jsСartBtns) {
    cartBtn.addEventListener("click", () => {
      qOne(".cart").classList.add("popap--active");
      qOne(".overlay").classList.add("overlay--active");
      qOne(".overlay").classList.add("overlay--pazzle");
    });
  }

  for (const toGoodsBtn of toGoodsBtns) {
    toGoodsBtn.addEventListener("click", () => hidePopaps());
  }

  // скроллы якорных ссылок
  const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 1000,
    framesCount = 200;

  anchors.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      let coordY =
        document
          .querySelector(item.getAttribute("href"))
          .getBoundingClientRect().top + window.pageYOffset;

      let scroller = setInterval(function () {
        // скорость прокрутки
        let scrollBy = 6;
        if (Math.abs(window.pageYOffset - coordY) < scrollBy) {
          window.scrollTo(0, coordY);
          clearInterval(scroller);
        } else if (scrollBy < window.pageYOffset - coordY) {
          window.scrollBy(0, -scrollBy);
        } else if (scrollBy > window.pageYOffset - coordY) {
          window.scrollBy(0, scrollBy);
        }
      }, animationTime / framesCount);
    });
  });

  // отменя стандартной отправки формы
  if (qOne(".cart")) {
    const arrangeForm = qOne(".cart");
    arrangeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      hidePopaps();
      overlay.classList.add("overlay--active");
      qOne(".thanks").classList.add("popap--active");
    });
  }
});
