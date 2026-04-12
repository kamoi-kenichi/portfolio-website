$(function () {
    $('body').addClass('appear');
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

        before_close: function () {

            const audios = document.querySelectorAll('audio');
            audios.forEach(audio => audio.pause());

            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                const iframeSrc = iframe.src;
                iframe.src = iframeSrc;
            });
        }
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
    initAudioTracking();
    initSiteTracking();
});

AOS.init({
    once: true,
    duration: 1000,
    offset: 120,
    easing: "ease-in-sine",
    delay: 100
});

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