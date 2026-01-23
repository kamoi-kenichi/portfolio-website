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

$(function () {
          $('.modal-open').modaal({
            overlay_close: true, 
            type: 'inline',      
            background: '#000', 
            overlay_opacity: 0.6 ,
          });
        });

AOS.init({
    once: true,
    duration: 800,
    offset: 120,
    easing: "ease-in-sine",
    delay: 100
  });

  document.addEventListener("DOMContentLoaded", function () {

  const worksLinks = document.querySelectorAll(".modal-open");

  worksLinks.forEach(function(link) {
    link.addEventListener("click", function () {

      const workTitle = this.dataset.workTitle;

      if (typeof gtag === "function") {
        gtag("event", "works_click", {
          work_title: workTitle
        });
      }

    });
  });

});
