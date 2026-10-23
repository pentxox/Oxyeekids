/* ===========================================
   OXYEE LITTLE WEAR
   Made for Tiny Moments ❤️
=========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ===========================
       Sticky Header Shadow
    =========================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";
            header.style.background = "rgba(255,255,255,.95)";

        } else {

            header.style.boxShadow = "none";
            header.style.background = "rgba(255,255,255,.85)";

        }

    });

    /* ===========================
       Scroll To Top Button
    =========================== */

    const scrollBtn = document.getElementById("scrollTop");

    if (scrollBtn) {
        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                scrollBtn.style.display = "flex";

            } else {

                scrollBtn.style.display = "none";

            }
        });

        scrollBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });
    }

    /* ===========================
       Active Navigation
    =========================== */

    const links = document.querySelectorAll("nav ul li a");

    links.forEach(link => {

        link.addEventListener("click", function () {

            links.forEach(item => item.classList.remove("active"));

            this.classList.add("active");

        });

    });

    /* ===========================
       Smooth Anchor Scroll
    =========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    /* ===========================
       Fade In Sections
    =========================== */

    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: .15

    });

    sections.forEach(section => {

        section.classList.add("hidden");

        observer.observe(section);

    });

    /* ===========================
       Product Hover Effect
    =========================== */

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-12px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0px)";

        });

    });

    /* ===========================
       Category Hover
    =========================== */

    const category = document.querySelectorAll(".category-card");

    category.forEach(item => {

        item.addEventListener("mouseenter", () => {

            item.style.transform = "scale(1.03)";

        });

        item.addEventListener("mouseleave", () => {

            item.style.transform = "scale(1)";

        });

    });

    /* ===========================
       Floating Hero Image
    =========================== */

    const heroImage = document.querySelector(".hero-image img");

    if (heroImage) {

        let position = 0;

        setInterval(() => {

            position += 0.5;

            heroImage.style.transform =
                `translateY(${Math.sin(position * 0.1) * 10}px)`;

        }, 20);

    }

    /* ===========================
       Button Ripple Effect
    =========================== */

    const buttons = document.querySelectorAll(".btn-primary,.btn-secondary");

    buttons.forEach(button => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            circle.classList.add("ripple");

            const rect = button.getBoundingClientRect();

            circle.style.left = `${e.clientX - rect.left}px`;
            circle.style.top = `${e.clientY - rect.top}px`;

            this.appendChild(circle);

            setTimeout(() => {

                circle.remove();

            }, 600);

        });

    });

    /* ===========================
       Homepage Product Carousel
    =========================== */

    const carousel = document.querySelector("[data-home-carousel]");

    if (carousel) {
        const track = carousel.querySelector(".home-carousel__track");
        const slides = Array.from(track.querySelectorAll(".home-carousel__slide"));
        const pagination = document.querySelector(".home-carousel__pagination");
        const dots = Array.from(pagination.querySelectorAll("[data-carousel-dot]"));
        const previousButton = carousel.querySelector("[data-carousel-previous]");
        const nextButton = carousel.querySelector("[data-carousel-next]");
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        let position = 1;
        let isTransitioning = false;
        let autoSlideTimer;
        let touchStartX = null;

        [firstClone, lastClone].forEach((clone) => {
            clone.setAttribute("aria-hidden", "true");
            clone.inert = true;
        });

        track.prepend(lastClone);
        track.append(firstClone);

        function updateCarousel(animate = true) {
            const shouldAnimate = animate && !reducedMotion.matches;
            if (!shouldAnimate) {
                if (position === 0) position = slides.length;
                if (position === slides.length + 1) position = 1;
            }

            const activeSlide = (position - 1 + slides.length) % slides.length;
            isTransitioning = shouldAnimate;
            track.classList.toggle("is-instant", !shouldAnimate);
            track.style.transform = `translate3d(-${position * 100}%, 0, 0)`;

            slides.forEach((slide, index) => {
                const isActive = index === activeSlide;
                slide.setAttribute("aria-hidden", String(!isActive));
                slide.inert = !isActive;
            });

            dots.forEach((dot, index) => {
                if (index === activeSlide) {
                    dot.setAttribute("aria-current", "true");
                } else {
                    dot.removeAttribute("aria-current");
                }
            });
        }

        function stopAutoSlide() {
            window.clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }

        function startAutoSlide() {
            stopAutoSlide();
            if (!reducedMotion.matches && !document.hidden &&
                !carousel.matches(":hover") && !carousel.contains(document.activeElement)) {
                autoSlideTimer = window.setInterval(() => {
                    position += 1;
                    updateCarousel();
                }, 4000);
            }
        }

        function moveToSlide(index) {
            if (isTransitioning) return;
            if ((position - 1 + slides.length) % slides.length === index) {
                startAutoSlide();
                return;
            }
            position = index + 1;
            updateCarousel();
            startAutoSlide();
        }

        function moveBy(direction) {
            if (isTransitioning) return;
            position += direction;
            updateCarousel();
            startAutoSlide();
        }

        previousButton.addEventListener("click", () => {
            moveBy(-1);
        });

        nextButton.addEventListener("click", () => {
            moveBy(1);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => moveToSlide(index));
        });

        track.addEventListener("transitionend", (event) => {
            if (event.target !== track) return;
            isTransitioning = false;

            if (position === 0) {
                position = slides.length;
                updateCarousel(false);
            } else if (position === slides.length + 1) {
                position = 1;
                updateCarousel(false);
            }
        });

        carousel.addEventListener("mouseenter", stopAutoSlide);
        carousel.addEventListener("mouseleave", startAutoSlide);
        carousel.addEventListener("focusin", stopAutoSlide);
        carousel.addEventListener("focusout", (event) => {
            if (!carousel.contains(event.relatedTarget)) {
                startAutoSlide();
            }
        });

        carousel.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                moveBy(-1);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                moveBy(1);
            }
        });

        carousel.addEventListener("pointerdown", (event) => {
            if (event.isPrimary && event.pointerType === "touch") {
                touchStartX = event.clientX;
                carousel.setPointerCapture(event.pointerId);
            }
        });

        carousel.addEventListener("pointerup", (event) => {
            if (touchStartX === null) return;
            const swipeDistance = event.clientX - touchStartX;
            touchStartX = null;

            if (Math.abs(swipeDistance) < 45) return;

            moveBy(swipeDistance < 0 ? 1 : -1);
        });

        carousel.addEventListener("pointercancel", () => {
            touchStartX = null;
        });

        document.addEventListener("visibilitychange", startAutoSlide);

        if (reducedMotion.addEventListener) {
            reducedMotion.addEventListener("change", startAutoSlide);
        } else {
            reducedMotion.addListener(startAutoSlide);
        }

        updateCarousel(false);
        startAutoSlide();
    }

    /* ===========================
       Hero Typing Effect
    =========================== */

    const title = document.querySelector(".hero h1 span");

    if (title) {

        const text = "Tiny Moments";

        title.innerHTML = "";

        let i = 0;

        function typing() {

            if (i < text.length) {

                title.innerHTML += text.charAt(i);

                i++;

                setTimeout(typing, 90);

            }

        }

        typing();

    }

});

/* ===========================================
   Scroll Progress Bar
=========================================== */

window.onscroll = function () {

    const winScroll =
        document.body.scrollTop ||
        document.documentElement.scrollTop;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrolled =
        (winScroll / height) * 100;

    let progress = document.getElementById("progressBar");

    if (progress) {

        progress.style.width = scrolled + "%";

    }

};

/* ===========================================
   Future Product Slider
=========================================== */

let currentSlide = 0;

const slides = document.querySelectorAll(".product-card");

function autoSlide() {

    if (slides.length === 0) return;

    slides.forEach((slide) => {

        slide.style.opacity = ".8";

    });

    slides[currentSlide].style.opacity = "1";

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

}

setInterval(autoSlide, 3500);

/* ===========================================
   Console Welcome
=========================================== */

console.log(`
========================================

      OXYEE LITTLE WEAR

      Made for Tiny Moments ❤️

========================================
`);

function changeImage(image){
    document.getElementById("mainImage").src = image;
}