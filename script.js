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
   Mobile Navigation
=========================================== */

const menuButton = document.querySelector(".fa-bars");

const nav = document.querySelector("nav");

if (menuButton) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("showMenu");

    });

}

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