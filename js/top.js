$(function () {
  const isVisited = sessionStorage.getItem('visited_top');

  if (isVisited) {
    $('#splash').hide();
    $('body').addClass('appear');
    return;
  }

  sessionStorage.setItem('visited_top', 'true');

  var stroke = new Vivus('mask', {
    start: 'manual',
    type: 'scenario-sync',
    duration: 10,
    forceRender: false,
    animTimingFunction: Vivus.EASE
  }, function () {
    $('#mask').addClass('done');

    setTimeout(function () {
      $('#splash_logo')
        .addClass('logo-shrink')
        .one('animationend', function (e) {
          if (e.originalEvent.animationName !== 'LogoShrink') return;

          $('body').addClass('appear');
          $('#splash').fadeOut('slow');
        });
    }, 700);
  });

  $(window).on('load', function () {
    stroke.play();
  });
});

var slidesPc = [
  { src: 'img/hero1_pc.jpg' },
  { src: 'img/hero2_pc.jpg' },
  { src: 'img/hero3_pc.jpg' },
  { src: 'img/hero4_pc.jpg' },
  { src: 'img/hero5_pc.jpg' },
  { src: 'img/hero6_pc.jpg' },
  { src: 'img/hero7_pc.jpg' },
  { src: 'img/hero8_pc.jpg' },
  { src: 'img/hero9_pc.jpg' },
];

var slidesSp = [
  { src: 'img/hero1_sp.jpg' },
  { src: 'img/hero2_sp.jpg' },
  { src: 'img/hero3_sp.jpg' },
  { src: 'img/hero4_sp.jpg' },
  { src: 'img/hero5_sp.jpg' },
  { src: 'img/hero6_sp.jpg' },
  { src: 'img/hero7_sp.jpg' },
  { src: 'img/hero8_sp.jpg' },
  { src: 'img/hero9_sp.jpg' },
];

$(function () {
  var mq = window.matchMedia('(max-width: 767px)');
  var currentMode = null;

  function initVegas(isSp) {
    var mode = isSp ? 'sp' : 'pc';
    if (currentMode === mode) return;
    currentMode = mode;

    try {
      $('.slider').vegas('destroy');
    } catch (e) {
    }

    $('.slider').vegas({
      overlay: false,
      transition: 'blur',
      transitionDuration: 2000,
      delay: 10000,
      animationDuration: 20000,
      animation: 'kenburns',
      slides: isSp ? slidesSp : slidesPc,
      timer: false,
    });
  }

  initVegas(mq.matches);

  if (mq.addEventListener) {
    mq.addEventListener('change', function (e) {
      initVegas(e.matches);
    });
  } else {
    mq.addListener(function (e) {
      initVegas(e.matches);
    });
  }
});

function PageTopCheck() {
  var winScrollTop = $(this).scrollTop();
  var secondTop = $("#about").offset().top - 150;
  if (winScrollTop >= secondTop) {
    $('.js-scroll').removeClass('scroll-view');
    $('.js-pagetop').addClass('scroll-view');
  } else {
    $('.js-scroll').addClass('scroll-view');
    $('.js-pagetop').removeClass('scroll-view');
  }
}

$('.scroll-top a').click(function () {
  var elmHash = $(this).attr('href');
  if (elmHash == "#about") {
    var pos = $(elmHash).offset().top;
    $('body,html').animate({ scrollTop: pos }, pos);
  } else {
    $('body,html').animate({ scrollTop: 0 }, 100);
  }
  return false;
});

$(window).scroll(function () {
  PageTopCheck();
  fadeAnime();
});

$(window).on('load', function () {
  PageTopCheck();
});

$(function () {
  $('.modal-open').modaal({
    overlay_close: true,
    type: 'inline',
    background: '#000',
    overlay_opacity: 0.6,
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const transition = document.getElementById("page-transition");
  const links = document.querySelectorAll('a[href]');

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
});

document.addEventListener("DOMContentLoaded", () => {

  const contactButtons = document.querySelectorAll(".contact-btn");

  contactButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      gtag("event", "contact_click", {
        event_category: "engagement",
        event_label: "contact_button"
      });
    });
  });

  const mailIcons = document.querySelectorAll(".icon-mail");

  mailIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      gtag("event", "contact_click", {
        event_category: "engagement",
        event_label: "mail_icon"
      });
    });
  });

});

AOS.init({
  once: true,
  duration: 1000,
  offset: 120,
  easing: "ease-in-sine",
  delay: 100
});