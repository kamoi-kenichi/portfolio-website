document.addEventListener("DOMContentLoaded", () => {
  initPageTransition();
  initModal();
  initAOS();
  initWorksTracking();
  initWorksFilter();
  initAudioTracking();
  initImageTracking();
  initSiteTracking();
});

function initPageTransition() {
  const transition = document.getElementById("page-transition");
  if (!transition) return;

  const links = document.querySelectorAll('a[href]');

  setTimeout(() => {
    transition.classList.add("fade-in-complete");
  }, 10);

  links.forEach(link => {
    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      link.target === "_blank" ||
      link.hasAttribute("download")
    ) {
      return;
    }

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

function initModal() {
  if (typeof $ === "undefined" || !$.fn.modaal) return;

  $(".modal-open").modaal({
    overlay_close: true,
    type: "inline",
    background: "#000",
    overlay_opacity: 0.6,

    before_close: function () {

      const audios = document.querySelectorAll('audio');
      audios.forEach(audio => audio.pause());
    }
  });
}

function initAOS() {
  if (typeof AOS === "undefined") return;

  AOS.init({
    once: true,
    duration: 800,
    offset: 120,
    easing: "ease-in-sine",
    delay: 100
  });
}

function initWorksTracking() {
  const worksLinks = document.querySelectorAll(".modal-open");

  worksLinks.forEach(link => {
    link.addEventListener("click", function () {
      const workTitle = this.dataset.workTitle;

      if (!workTitle) return;

      if (typeof gtag === "function") {
        gtag("event", "works_click", {
          work_title: workTitle
        });
      }
    });
  });
}

function initWorksFilter() {
  const filterButtons = document.querySelectorAll(".filter-list li");
  const worksItems = document.querySelectorAll(".works-item");

  if (!filterButtons.length || !worksItems.length) return;

  let isAnimating = false;

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (isAnimating) return;
      if (button.classList.contains("is-active")) return;

      const filter = button.dataset.filter;

      filterButtons.forEach(btn => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      if (typeof gsap === "undefined") {
        worksItems.forEach(item => {
          const categories = item.dataset.category
            ? item.dataset.category.split(" ")
            : [];

          const isMatch = filter === "all" || categories.includes(filter);
          item.style.display = isMatch ? "block" : "none";
        });
        return;
      }

      isAnimating = true;

      gsap.to(worksItems, {
        opacity: 0,
        y: 8,
        duration: 0.3,
        ease: "sine.out",
        stagger: 0.02,
        onComplete: () => {
          worksItems.forEach(item => {
            const categories = item.dataset.category
              ? item.dataset.category.split(" ")
              : [];

            const isMatch = filter === "all" || categories.includes(filter);
            item.style.display = isMatch ? "block" : "none";
          });

          const visibleItems = Array.from(worksItems).filter(
            item => item.style.display !== "none"
          );

          gsap.set(visibleItems, {
            opacity: 0,
            y: 6
          });

          gsap.to(visibleItems, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "sine.out",
            stagger: 0.08,
            onComplete: () => {
              isAnimating = false;
            }
          });
        }
      });
    });
  });
}

function initAudioTracking() {

  const audios = document.querySelectorAll('audio');

  audios.forEach(audio => {

    audio.addEventListener('play', function () {

      const workTitle = this.dataset.workTitle;

      if (!workTitle) return;

      if (typeof gtag === "function") {
        gtag("event", "audio_play", {
          work_title: workTitle
        });
      }
    });
  });
}

function initImageTracking() {

  const imageBtns = document.querySelectorAll('.js-track-image');

  imageBtns.forEach(btn => {

    btn.addEventListener('click', function () {

      const workTitle = this.dataset.workTitle;

      if (!workTitle) return;

      if (typeof gtag === "function") {
        gtag("event", "image_view_click", {
          work_title: workTitle
        });
      }
    });
  });
}

function initSiteTracking() {
  const siteBtns = document.querySelectorAll('.js-track-site');

  siteBtns.forEach(btn => {
    btn.addEventListener('click', function () {

      const workTitle = this.dataset.workTitle;

      if (!workTitle) return;

      if (typeof gtag === "function") {
        gtag("event", "site_view_click", {
          work_title: workTitle
        });
      }
    });
  });
}