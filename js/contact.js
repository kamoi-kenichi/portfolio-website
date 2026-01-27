window.addEventListener("DOMContentLoaded", () => {
  const transition = document.getElementById("page-transition");
  const links = document.querySelectorAll('a[href]');
  const form = document.querySelector("form");

  setTimeout(() => {
    transition.classList.add("fade-in-complete");
  }, 10);

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || link.target === "_blank") return;

    link.addEventListener("click", (e) => {
      e.preventDefault();

      transition.classList.remove("fade-in-complete");
      transition.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const formData = new FormData(form);

        const res = await fetch(form.action, {
          method: form.method || "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          transition.classList.remove("fade-in-complete");
          transition.classList.add("fade-out");

          setTimeout(() => {
            window.location.href = "./thanks.html";
          }, 300);
        } else {
          alert("送信に失敗しました。入力内容をご確認のうえ、もう一度お試しください。");
          if (submitBtn) submitBtn.disabled = false;
        }
      } catch (err) {
        alert("通信エラーが発生しました。ネットワークをご確認ください。");
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});

AOS.init({
  once: true,
  duration: 800,
  offset: 120,
  easing: "ease-in-sine",
  delay: 100,
});