// JS for preloader
const preloader = document.querySelector("#preloader");

window.addEventListener("load", () => {
    preloader.style.opacity = 0;

    // Getting the titles and logo to start the animations when page finishes loading
    const title = document.querySelectorAll(".title");
    const logo = document.querySelector(".logo");

    title.forEach((item) => item.classList.add("on"));
    logo.classList.add("on");
});

// JS for carousel

const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const intervalTime = 3500;
let slideInterval;

const nextSlide = () => {
    // Get current class
    const current = document.querySelector(".current");
    // Remove current class
    current.classList.remove("current");
    // Check for next slide
    if (current.nextElementSibling) {
        // Add current to next sibling
        current.nextElementSibling.classList.add("current");
    } else {
        // Add current to start
        slides[0].classList.add("current");
    }
    setTimeout(() => current.classList.remove("current"));
};

const prevSlide = () => {
    // Get current class
    const current = document.querySelector(".current");
    // Remove current class
    current.classList.remove("current");
    // Check for prev slide
    if (current.previousElementSibling) {
        // Add current to prev sibling
        current.previousElementSibling.classList.add("current");
    } else {
        // Add current to last
        slides[slides.length - 1].classList.add("current");
    }
    setTimeout(() => current.classList.remove("current"));
};

// Button events
next.addEventListener("click", (e) => {
    nextSlide();

    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
});

prev.addEventListener("click", (e) => {
    prevSlide();

    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
});

window.addEventListener("load", () => {
    // Auto slide
    slideInterval = setInterval(nextSlide, intervalTime);
});

// Animations using intersection observer

const txts = document.querySelectorAll(".anim");

let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
            entry.target.style.animation = `up 1s ${entry.target.dataset.delay}`;
        }
    });
});

txts.forEach((txt) => {
    observer.observe(txt);
    txt.addEventListener("animationend", () => (txt.style.opacity = "100%"));
});

// Navbar animation

const navbar = document.querySelector(".navbar");
const header = document.querySelector(".title-bar");
const whoweare = document.querySelector(".whoweare-title");

const headerOptions = {
    rootMargin: "0px 0px 0px 0px",
};

const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            navbar.classList.add("nav-scrolled");
        } else {
            navbar.classList.remove("nav-scrolled");
        }
    });
}, headerOptions);

headerObserver.observe(header);

// Testimonial animation
let i = 0;
const testimonial = document.querySelectorAll(".testimonial-user");
const gettestimonials = () => {
    if (i < 2) {
        testimonial[i].classList.add("hidden");
        testimonial[i + 1].classList.remove("hidden");
        testimonial[i + 1].style.animation = "fade-in 1s";
        i++;
    } else {
        testimonial[i].classList.add("hidden");
        testimonial[0].classList.remove("hidden");
        testimonial[0].style.animation = "fade-in 1s";
        i = 0;
    }
};
const testimonialSlide = setInterval(gettestimonials, 4000);

// Hamburger events

const hamburger = document.querySelector(".hamburger-menu");
const nav = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("full");
    if (hamburger.lastElementChild.classList.contains("fa-bars")) {
        hamburger.lastElementChild.classList.remove("fa-bars");
        hamburger.lastElementChild.classList.add("fa-times");
    } else {
        hamburger.lastElementChild.classList.remove("fa-times");
        hamburger.lastElementChild.classList.add("fa-bars");
    }
});
