(() => {
  const mq = window.matchMedia("(max-width: 767px)");
  if (!mq.matches) return;

  const section = document.querySelector(".parallax-section");
  if (!section) return;

  let rafId = 0;

  const updateParallax = () => {
    rafId = 0;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    if (rect.bottom <= 0 || rect.top >= vh) return;

    const progress = (vh - rect.top) / (vh + rect.height);
    const maxShift = 108;
    const y = (progress - 0.5) * maxShift * 2;

    section.style.setProperty("--parallaxY", `${y}px`);
  };

  const onScroll = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(updateParallax);
  };

  updateParallax();
  setTimeout(updateParallax, 50);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
})();

function initPageTransition() {
  const transition = document.getElementById("page-transition");
  const links = document.querySelectorAll('a[href]');
  if (!transition) return;

  setTimeout(() => {
    transition.classList.add("fade-in-complete");
  }, 10);

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || link.target === "_blank") return;

    link.addEventListener("click", e => {
      e.preventDefault();
      transition.classList.remove("fade-in-complete");
      transition.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
}

function initAOS() {
  AOS.init({
    once: true,
    duration: 800,
    offset: 120,
    easing: "ease-in-sine",
    delay: 100
  });
}

function initDogSlider() {
  const $dogSlider = $('.dog-slider');
  if (!$dogSlider.length) return;

  $dogSlider.slick({
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 600,
    cssEase: 'ease',
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    pauseOnFocus: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]
  });

  $dogSlider.on('touchmove', function () {
    $dogSlider.slick('slickPlay');
  });
}

function updateTimeline() {
  $('.timeline li').each(function () {
    const elemPos = $(this).offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    const startPoint = 400;

    if (scroll >= elemPos - windowHeight - startPoint) {
      const itemHeight = $(this).outerHeight(true);
      let percent = (scroll + startPoint - elemPos) / (itemHeight / 2) * 100;
      if (percent > 100) percent = 100;

      $(this).children('.border-line').css({
        height: percent + "%"
      });
    }
  });
}

function initTimeline() {
  $(window).on('scroll', updateTimeline);
  updateTimeline();
}

function checkPageTop() {
  const winScrollTop = $(window).scrollTop();
  const secondTop = $(".content-title").offset().top - 150;

  if (winScrollTop >= secondTop) {
    $('.js-scroll').removeClass('scroll-view');
    $('.js-pagetop').addClass('scroll-view');
  } else {
    $('.js-scroll').addClass('scroll-view');
    $('.js-pagetop').removeClass('scroll-view');
  }
}

function initPageTop() {
  $('.scroll-top a').on('click', function () {
    const elmHash = $(this).attr('href');

    if (elmHash === "#about") {
      const pos = $(elmHash).offset().top;
      $('body,html').animate({ scrollTop: pos }, pos);
    } else {
      $('body,html').animate({ scrollTop: 0 }, 100);
    }
    return false;
  });

  $(window).on('scroll', checkPageTop);
  $(window).on('load', checkPageTop);
  checkPageTop();
}

document.addEventListener("DOMContentLoaded", () => {
  initPageTransition();
  initAOS();
  initDogSlider();
  initTimeline();
  initPageTop();
});