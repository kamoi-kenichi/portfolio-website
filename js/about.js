(() => {
  const mq = window.matchMedia("(max-width: 767px)");
  if (!mq.matches) return;

  const section = document.querySelector(".parallax-section");
  if (!section) return;

  let rafId = 0;

  const update = () => {
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
    rafId = requestAnimationFrame(update);
  };

  update();
  setTimeout(update, 50); 
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
})();


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

AOS.init({
    once: true,
    duration: 800,
    offset: 120,
    easing: "ease-in-sine",
    delay: 100
  });

$('.slider').slick({
  arrows: false,
  autoplay: true,
  centerMode: true,
  centerPadding: '30%',
  autoplaySpeed: 0,
  cssEase: 'linear',
  speed: 10000,
  pauseOnFocus: false,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        centerPadding: '16px',
      }
    }
  ]
});

$('.slider').on('touchmove', function(event, slick, currentSlide, nextSlide){
    $('.slider').slick('slickPlay');
});


function ScrollTimelineAnime(){
	$('.timeline li').each(function(){
		var elemPos = $(this).offset().top;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		var startPoint = 400; 
		if (scroll >= elemPos - windowHeight-startPoint){				
			var H = $(this).outerHeight(true)
			var percent = (scroll+startPoint - elemPos) / (H/2) *100;
			if(percent  > 100){
				percent  = 100;
			}
			$(this).children('.border-line').css({
				height: percent + "%", 
			});
		} 
	});
}

$(window).on('scroll', function(){
	ScrollTimelineAnime();
});

function PageTopCheck(){
    var winScrollTop = $(this).scrollTop();
    var secondTop =  $(".content-title").offset().top - 150; 
    if(winScrollTop >= secondTop){
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
		$('body,html').animate({scrollTop: pos}, pos); 
	}else{
		$('body,html').animate({scrollTop: 0}, 100); 
	}
    return false;
});

$(window).scroll(function () {
	PageTopCheck();
});

$(window).on('load', function () {
	PageTopCheck();
});
