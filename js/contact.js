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