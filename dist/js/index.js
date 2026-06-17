window.addEventListener("load", () => {
  function initFE() {
    initTelMask();
    //checkCookies();
    //lazyLoadSrc("iframe");

    //hideAnotherModal();
    //statsAnimate(".stats", ".stats__title span");
    initToggleClick();

    //initLightbox();
   // fixElement(0, 0, "header", "fixed");
    //wowInit();
    scrollTo();
  }

  function scrollTo() {
    $("a.scrollTo").click(function () {
    $(this).addClass("active");
    var destination = $($(this).attr("href")).offset().top - 100;
    $("html:not(:animated),body:not(:animated)").animate(
      {
        scrollTop: destination,
      },
      400,
    );
    if ($(this).closest('[data-toggle]').length) {
      $(this).closest('[data-toggle]').removeClass('active')
    }
    return false;
  });
  }

  function wowInit() {
    new WOW().init();
  }

  function checkCookies() {
    function getCookie(name) {
      let matches = document.cookie.match(
        new RegExp(
          "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)",
        ),
      );
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    if (localStorage.getItem("cookiesAccepted")) {
      document.querySelector(".cookies").style.display = "none";
    } else {
      document.querySelector(".cookies").style.display = "block";
    }
    document.querySelector(".js-accept-cookie").onclick = function () {
      localStorage.setItem("cookiesAccepted", "true");
      document.querySelector(".cookies").style.display = "none";
    };
  }

  function lazyLoadSrc(selector) {
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        const source = entry.target;
        if (entry.intersectionRatio > 0) {
          if (!source.getAttribute("src")) {
            source.setAttribute("src", source.dataset.src);
            observer.unobserve(source);
          }
        }
      });
    };
    const target = document.querySelectorAll(selector);
    const options = {
      threshold: 0.4,
    };
    let obs = new IntersectionObserver(callback, options);
    target.forEach((item) => {
      obs.observe(item);
    });
  }
  function statsAnimate(wrapper, number) {
    const something = (function () {
      let executed = false;
      return function () {
        if (!executed) {
          executed = true;
          $(number).each(function () {
            $(this)
              .prop("Counter", 0)
              .animate(
                {
                  Counter: $(this).text(),
                },
                {
                  duration: 2000,
                  easing: "swing",
                  step: function (now) {
                    $(this).text(Math.ceil(now));
                  },
                },
              );
          });
        }
      };
    })();

    $(window).scroll(function () {
      if ($(wrapper).length) {
        const top_of_element = $(wrapper).offset().top;
        const bottom_of_element =
          $(wrapper).offset().top + $(wrapper).outerHeight();
        const bottom_of_screen =
          $(window).scrollTop() + $(window).innerHeight();
        const top_of_screen = $(window).scrollTop();

        if (
          bottom_of_screen > top_of_element &&
          top_of_screen < bottom_of_element
        ) {
          something();
        }
      }
    });
  }

  function initToggleClick() {
    $("[data-toggleclick]").on("click", function (e) {
      $(this).toggleClass("active");
      $(this).closest("[data-toggleitem]").addClass("active");
      e.preventDefault();
      let dropdown = $(this).data("toggleclick");
      $("[data-toggle].active")
        .not($(`[data-toggle=${dropdown}]`))
        .removeClass("active");
      $("[data-toggleclick].active")
        .not($(`[data-toggleclick=${dropdown}]`))
        .removeClass("active");
      $("[data-toggleitem].active")
        .not($(`[data-toggleitem=${dropdown}]`))
        .removeClass("active");
      $(`[data-toggle=${dropdown}]`).toggleClass("active");
      $(`[data-toggleactive=${dropdown}]`).toggleClass("active");
    });
  }

  function initTelMask() {
    if ($("input[type=tel]").length > 0) {
      $("input[type=tel]").mask("+7 (999) 999-99-99");
    }
  }

  function initLightbox() {
    lightbox.option({
      resizeDuration: 0,
    });
  }
  function hideAnotherModal() {
    $(".modal").on("show.bs.modal", function () {
      $(".modal.in").not($(this)).modal("hide");
    });
  }

  function fixElement(topDesktop, topMobile, elementId, className) {
    if (document.getElementById(elementId)) {
      if (window.innerWidth >= 1023) {
        if (topDesktop === 0) {
          document.getElementById(elementId).classList.add(className);
        } else {
          if (topDesktop) {
            window.addEventListener("scroll", (event) => {
              scroll = window.scrollY;
              if (scroll >= topDesktop) {
                document.getElementById(elementId).classList.add(className);
              } else {
                document.getElementById(elementId).classList.remove(className);
              }
            });
          }
        }
      } else {
        if (topMobile === 0) {
          document.getElementById(elementId).classList.add(className);
        } else {
          if (topMobile) {
            window.addEventListener("scroll", (event) => {
              scroll = window.scrollY;
              if (scroll >= topMobile) {
                document.getElementById(elementId).classList.add(className);
              } else {
                document.getElementById(elementId).classList.remove(className);
              }
            });
          }
        }
      }
    }
  }

  function closeByClickOutside(element, button, fn = () => {}) {
    $(document).click(function (event) {
      if (!$(event.target).closest(`${element},${button}`).length) {
        $(button).removeClass("active");
        $(element).removeClass("active");

        if (fn) {
          fn();
        }
      }
    });

    $(document).keyup(function (e) {
      if (e.key === "Escape") {
        // escape key maps to keycode `27`
        $(button).removeClass("active");
        $(element).removeClass("active");

        if (fn) {
          fn();
        }
      }
    });
  }

  initFE();
});
