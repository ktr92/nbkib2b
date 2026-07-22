document.addEventListener("DOMContentLoaded", () => {
  function initFE() {
    mainSlider();
    initTelMask();
    //checkCookies();
    //lazyLoadSrc("iframe");

    //hideAnotherModal();
    statsAnimate(".stats", ".stats__numb");
    initToggleClick();
    solutionsSlider();

    tabsInit();
    accordionInit();
    absoluteTarget(".mainmenu__union", "#mainmenu_btn");
    //initLightbox();
    // fixElement(0, 0, "header", "fixed");
    //wowInit();
    scrollTo();
    customSelect();
    formsInit();
    initFlip();
    modalInit();
    customScrollbar();
    slideTabsInit();
  }

  function customScrollbar() {
    if (document.querySelector(".custom-scrollbar")) {
      const content = document.querySelector(".select-wrapper");
      const thumb = document.getElementById("customThumb");
      const scrollbar = document.getElementById("customScrollbar");

      let isDragging = false;
      let dragStartY = 0;
      let startScrollTop = 0;

      let animationFrameId = null;

      function updateThumb() {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
          const containerHeight = content.clientHeight;
          const contentHeight = content.scrollHeight;
          const scrollTop = content.scrollTop;

          const thumbHeight = Math.max(
            (containerHeight * containerHeight) / contentHeight,
            40,
          );
          thumb.style.height = thumbHeight - 20 + "px";

          const maxScrollTop = contentHeight - containerHeight;
          const maxThumbTop = containerHeight - thumbHeight;
          const thumbTop = (scrollTop / maxScrollTop) * maxThumbTop;

          thumb.style.transform = `translateY(${thumbTop}px)`;

          thumb.style.display =
            contentHeight > containerHeight ? "block" : "none";

          animationFrameId = null;
        });
      }

      document
        .querySelector(".select-selected")
        .addEventListener("click", function () {
          updateThumb();
        });
      window.addEventListener("load", () => {
        updateThumb();
      });
      content.addEventListener("scroll", updateThumb);

      thumb.addEventListener("mousedown", (e) => {
        isDragging = true;
        dragStartY = e.clientY;
        startScrollTop = content.scrollTop;
        document.body.style.userSelect = "none";
        e.preventDefault();
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const containerHeight = content.clientHeight;
        const contentHeight = content.scrollHeight;
        const thumbHeight = thumb.offsetHeight;
        const maxScrollTop = contentHeight - containerHeight;
        const maxThumbTop = containerHeight - thumbHeight;

        const deltaY = e.clientY - dragStartY;
        const thumbRatio = deltaY / maxThumbTop;
        const newScrollTop = startScrollTop + thumbRatio * maxScrollTop;

        content.scrollTop = Math.max(0, Math.min(newScrollTop, maxScrollTop));
      });

      document.addEventListener("mouseup", () => {
        if (isDragging) {
          isDragging = false;
          document.body.style.userSelect = "";
        }
      });

      scrollbar.addEventListener("mousedown", (e) => {
        if (e.target !== thumb) {
          const rect = scrollbar.getBoundingClientRect();
          const clickY = e.clientY - rect.top;
          const thumbHeight = thumb.offsetHeight;
          const containerHeight = content.clientHeight;
          const contentHeight = content.scrollHeight;

          const maxScrollTop = contentHeight - containerHeight;
          const maxThumbTop = containerHeight - thumbHeight;

          let newThumbTop = clickY - thumbHeight / 2;
          newThumbTop = Math.max(0, Math.min(maxThumbTop, newThumbTop));

          const thumbRatio = newThumbTop / maxThumbTop;
          const newScrollTop = thumbRatio * (contentHeight - containerHeight);
          content.scrollTop = newScrollTop;
        }
      });
    }
  }

  function initFlip() {
    $("[data-flipbutton]").on("click", function () {
      const $wrapper = $(this).closest("[data-flipwrapper]");
      $wrapper.toggleClass("active");
    });
  }

  function formsInit() {
    $('[data-entity="corp-page-form"]').on("submit", function (e) {
      e.preventDefault();
      const $form = $(this);

      if (validatePageForm('[data-entity="corp-page-form"]')) {
        /* $.post("/local/ajax/form.corp.php", $form.serialize(), function (result) {
        $("#myModal_ty").modal("show");
      }); */
      }
    });
  }

  function validatePageForm(x) {
    //let x = document.querySelectorAll("[data-stepcontent]");
    let y,
      i,
      valid = true;
    y = $(x).find("[minlength]");
    for (i = 0; i < y.length; i++) {
      if (y[i].value < +$(y).attr("minlength")) {
        y[i].closest("div").className += " error_input";
        valid = false;
      } else {
        y[i].closest("div").classList.remove("error_input");
      }
    }

    let sel = $(x).find("select.required");
    for (i = 0; i < sel.length; i++) {
      if (sel[i].value == "") {
        sel[i].closest("div").className += " error_input";
        valid = false;
      } else {
        sel[i].closest("div").classList.remove("error_input");
      }
    }

    let check = $(x).find("#idCorpCheck");
    for (i = 0; i < check.length; i++) {
      if (!check[i].checked) {
        check[i].closest("div").className += " error_input";
        valid = false;
      } else {
        check[i].closest("div").classList.remove("error_input");
      }
    }
    return valid; // return the valid status
  }

  function mainSlider() {
    $('.mainblock__mobile [data-slider="mainslider"]').slick({
      dots: true,
      appendDots: $(".mainblock__mobile .slider-controls"),
      arrows: false,
      autoplay: true,
      autoplaySpeed: 1000,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
  }

  function absoluteTarget(element, target) {
    const targetEl = document.querySelector(target);
    const absoluteEl = document.querySelector(element);

    function positionAbsoluteBelowTarget() {
      const rect = targetEl.getBoundingClientRect();
      absoluteEl.style.left = rect.left + "px";
    }

    window.addEventListener("resize", positionAbsoluteBelowTarget);
    positionAbsoluteBelowTarget(); // вызов при загрузке
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
      if ($(this).closest("[data-toggle]").length) {
        $(this).closest("[data-toggle]").removeClass("active");
      }
      if ($(this).closest("[data-modal]").length) {
        $(this).closest("[data-modal]").removeClass("active");
        $(".backdrop").removeClass("active");
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

  function switchArrows(tab) {
    if (tab) {
      const $slider = tab.find(".slick-initialized");
      if ($slider) {
        $("[data-arrows]").hide();
        if ($slider) {
          const index = $slider.attr("data-sliderindex");
          $(`[data-arrows=${index}]`).show();
        }
      }
    } else {
      const $slider = $('[data-slider="solutions"]').first();
      if ($slider && $slider.length) {
        $("[data-arrows]").hide();
        const index = $("[data-sliderindex]").attr("data-sliderindex");
        $(`[data-arrows=${index}]`).show();
      }
    }
  }

  function solutionsSlider() {
    $('[data-slider="solutions"]').each(function (index) {
      $(this).attr("data-sliderindex", index);
      const slides = $(this).find(".solutions__slide").length;
      if (slides > 4) {
        $(this).slick({
          slidesToShow: 4,
          slidesToScroll: 4,
          variableWidth: true,
          infinite: false,
          swipe: true,
          arrows: true,
          appendArrows: $('[data-sliderarrows="solutions"'),
          prevArrow: `<button type="button" class="slick-arrow slick-prev" data-arrows="${index}"></button>`,
          nextArrow: `<button type="button" class="slick-arrow slick-next" data-arrows="${index}"></button>`,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2.5,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1.5,
              },
            },
          ],
        });
      }
    });
    switchArrows();
  }

  function customSelect() {
    var x, i, j, l, ll, selElmnt, a, b, c, bb;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      bb = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      bb.setAttribute("class", "select-wrapper");

      b.appendChild(bb);
      for (j = 0; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;

        if (j === 0) {
          c.classList.add("same-as-selected");
        }
        c.addEventListener("click", function (e) {
          /* When an item is clicked, update the original select box,
            and the selected item: */
          var y, i, k, s, h, sl, yl;
          s =
            this.parentNode.parentNode.parentNode.getElementsByTagName(
              "select",
            )[0];
          sl = s.length;
          h = this.parentNode.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              s.dispatchEvent(new Event("change"));
              h.innerHTML = this.innerHTML;
              y =
                this.parentNode.parentNode.getElementsByClassName(
                  "same-as-selected",
                );
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              s.options[i].setAttribute("selected", "");
              this.setAttribute("class", "same-as-selected");
              h.classList.add("active");
              break;
            }
          }
          h.click();
        });
        bb.appendChild(c);
      }
      x[i].appendChild(b);
      b.insertAdjacentHTML(
        "beforeEnd",
        `<div class="custom-scrollbar" id="customScrollbar">
        <div class="custom-thumb" id="customThumb"></div>
      </div>
      </div>`,
      );
      a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }

    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
    except the current select box: */
      var x,
        y,
        i,
        xl,
        yl,
        arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
  }

  function tabsInit() {
    $(function () {
      $("[data-tabsheader]").on(
        "click",
        "[data-tabsbutton]:not(.active)",
        function () {
          const $tab = $(this)
            .closest("[data-tabs]")
            .find("[data-tabscontent]")
            .eq($(this).index());

          $(this)
            .addClass("active")
            .siblings()
            .removeClass("active")
            .closest("[data-tabs]")
            .find("[data-tabscontent]")
            .removeClass("active");
          $tab.addClass("active");
          switchAttribute($(this), "aria-selected");
          if ($(this).closest("section").find("[data-arrows]")) {
            switchArrows($tab);
          }
        },
      );
    });
  }

  function slideTabsInit() {
      $(function () {
    let $contents = null;
    let currentIndex = 0;

    // Изначально показываем первый
    $('[data-slidetabs]').each(function () {
      const $section = $(this);
      const $items = $section.find('.tabsblock__item');
      $items.eq(0).addClass('active').show();
    });

    // Обработчик
    $('[data-slidetabs]').on(
      'click',
      '[data-slidetabsbutton]:not(.active)',
      function () {
        const $section = $(this).closest('[data-slidetabs]');
        const $buttons = $section.find('[data-slidetabsbutton]');
        const $contents = $section.find('.tabsblock__item');

        const newIndex = $buttons.index(this);
        if (newIndex === currentIndex) return;

        const direction = newIndex > currentIndex ? 1 : -1; // направление

        const $current = $contents.eq(currentIndex);
        const $next = $contents.eq(newIndex);

        // Обновляем названия кнопок
        $buttons.removeClass('active');
        $(this).addClass('active');

        // Убираем display
        $next.css('display', 'block');

        // Задаем стартовые позиции
        $next.css('transform', `translateX(${direction * 100}%)`);
        $current.css('transform', 'translateX(0)');

        // Запускаем анимацию
        setTimeout(() => {
          $current.css('transform', `translateX(${-direction * 100}%)`);
          $next.css('transform', 'translateX(0)');
        }, 20);

        // После завершения анимации —
        setTimeout(() => {
          $current.removeClass('active').hide();
          $next.addClass('active');
          $current.css('transform', '');
        }, 520);

        currentIndex = newIndex;
      }
    );
  });
  }

  function modalInit() {
    $("[data-modalbutton]").on("click", function (e) {
      e.preventDefault();
      const $target = $(this).attr("data-modalbutton");
      $(`[data-modal="${$target}"`).addClass("active");
      $(".backdrop").addClass("active");
    });
    $("[data-modalclose]").on("click", function (e) {
      e.preventDefault();
      $(this).closest("[data-modal]").removeClass("active");
      $(".backdrop").removeClass("active");
    });
    $(".backdrop").on("click", function (e) {
      $("[data-modal]").removeClass("active");
      $(".backdrop").removeClass("active");
    });
  }

  function switchAttribute(element, attribute) {
    element.siblings().attr(attribute, "false");
    let elAttr = element.attr(attribute);
    if (elAttr) {
      const isExpanded = elAttr === "true";
      element.attr(attribute, !isExpanded);
    }
  }
  /* function switchExpanded(element) {
    let elAttr = element.attr("aria-expanded");
    if (elAttr) {
      const isExpanded = elAttr === "true";
      element.attr("aria-expanded", !isExpanded);
    }
  }
  function switchSelected(element) {
    let elAttr = element.attr("aria-selected");
    if (elAttr) {
      const isSelected = elAttr === "true";
      element.attr("aria-selected", !isSelected);
    }
  } */
  function accordionInit() {
    $(function () {
      $("[data-accordion]").on("click", function () {
        const $panel = $(this).next("[data-accordioncontent]");
        $(this)
          .toggleClass("expanded")
          .next("[data-accordioncontent]")
          .toggleClass("expanded")
          .attr("hidden", function (index, attr) {
            return attr ? null : "hidden";
          });
        switchAttribute($(this), "aria-expanded");
      });
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

      if ($(`[data-toggle=${dropdown}]`).attr("data-backdrop") === "true") {
        $(".jsbackdrop").toggleClass("active");
      }
      if ($(this).attr("data-overflow") === "body") {
        $("body").toggleClass("overflow");
      }
      if ($(this).attr("data-toggleclick") === "mainmenu") {
        $("body").toggleClass("menubg");
      }

      switchAttribute($(this), "aria-expanded");
    });

    $(".jsbackdrop").on("click", function (e) {
      $(this).removeClass("active");
      $('[data-backdrop="true"]').removeClass("active");
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

document.addEventListener("DOMContentLoaded", () => {
  (function nbsp() {
    const elements = document.querySelectorAll(
      "p, h1, h2, h3, li, p a, p span",
    );

    elements.forEach((el) => {
      el.innerHTML = el.innerHTML.replace(/\s+/g, " ").trim();
      el.innerHTML = el.innerHTML.replace(
        /(\s|^)(в|во|на|о|об|со|ко|до|из|к|по|за|от|у|и|а|но|да|или|ли|бы|при|про|около|чтобы|что|так|как|ни|не|кто|над|под|с|перед|без|для)\s/gi,
        "$1$2&nbsp;",
      );
      el.innerHTML = el.innerHTML.replace(
        /(&nbsp;)([а-яёА-ЯЁ]{1,3})\s/g,
        "$1$2&nbsp;",
      );
    });
  })();
});
