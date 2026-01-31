$(".openbtn").click(function () {
	$(this).toggleClass('active');
    $(".global_nav").toggleClass('panelactive');
    $(".main-container").toggleClass('mainblur');
});

$("#g-nav a").click(function () {
    $(".openbtn").removeClass('active');
    $(".global_nav").removeClass('panelactive');
    $(".main-container").removeClass('mainblur');
});

document.addEventListener("DOMContentLoaded", () => {

  const fullviewButtons = document.querySelectorAll(
    '.modal a.btn[href$=".png"], .modal a.btn[href$=".jpg"], .modal a.btn[href$=".webp"]'
  );

  fullviewButtons.forEach(btn => {
    btn.addEventListener("click", () => {

      if (typeof gtag === "function") {

        gtag("event", "works_fullview_click", {
          event_category: "works",
          event_label: btn.getAttribute("href"),
          page_location: location.href
        });

      }

    });
  });

});

const title = btn.dataset.workTitle || "unknown";

gtag("event", "works_fullview_click", {
  work_title: title,
  image: btn.getAttribute("href")
});