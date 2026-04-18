const darkToggles = document.querySelectorAll("#darkToggle");
const rtlToggles = document.querySelectorAll("#rtlToggle");

const preferenceStorage = (() => {
    try {
        return window.localStorage;
    } catch (err) {
        return null;
    }
})();

const prefersDark = preferenceStorage?.getItem("sandice-dark") === "1";
const prefersRtl = preferenceStorage?.getItem("sandice-rtl") === "1";

if (prefersDark) {
    document.body.classList.add("dark-mode");
}

if (prefersRtl) {
    document.body.classList.add("rtl");
}

darkToggles.forEach((toggle) => toggle.classList.toggle("active", prefersDark));
rtlToggles.forEach((toggle) => toggle.classList.toggle("active", prefersRtl));

// Apply RTL text transform on initial load only when RTL preference is enabled.
// (Avoid running this for every page view when RTL is off to keep it lightweight.)
if (prefersRtl) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => applyRTL());
    } else {
        applyRTL();
    }
}

darkToggles.forEach((button) => {
    button.addEventListener("click", () => {
        const isEnabled = document.body.classList.toggle("dark-mode");
        preferenceStorage?.setItem("sandice-dark", isEnabled ? "1" : "0");
        darkToggles.forEach((toggle) => toggle.classList.toggle("active", isEnabled));
    });
});

rtlToggles.forEach((button) => {
    button.addEventListener("click", () => {
        const isEnabled = document.body.classList.toggle("rtl");
        preferenceStorage?.setItem("sandice-rtl", isEnabled ? "1" : "0");
        rtlToggles.forEach((toggle) => toggle.classList.toggle("active", isEnabled));
        applyRTL();
    });
});

const slides = document.querySelectorAll(".slide");
const heroNextBtn = document.querySelector(".next");
const heroPrevBtn = document.querySelector(".prev");

let heroIndex = 0;
let heroInterval;

function showHeroSlide(i) {
    slides.forEach((slide) => slide.classList.remove("active"));
    if (slides[i]) {
        slides[i].classList.add("active");
    }
}

function goToNextHeroSlide() {
    heroIndex++;
    if (heroIndex >= slides.length) heroIndex = 0;
    showHeroSlide(heroIndex);
}

function goToPrevHeroSlide() {
    heroIndex--;
    if (heroIndex < 0) heroIndex = slides.length - 1;
    showHeroSlide(heroIndex);
}

function startHeroAutoSlide() {
    heroInterval = setInterval(goToNextHeroSlide, 4000);
}

function resetHeroAutoSlide() {
    clearInterval(heroInterval);
    startHeroAutoSlide();
}

if (slides.length && heroNextBtn && heroPrevBtn) {
    heroNextBtn.addEventListener("click", () => {
        goToNextHeroSlide();
        resetHeroAutoSlide();
    });

    heroPrevBtn.addEventListener("click", () => {
        goToPrevHeroSlide();
        resetHeroAutoSlide();
    });

    startHeroAutoSlide();
}

const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
    const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const speed = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + speed);
            setTimeout(updateCount, 30);
        } else {
            counter.innerText = target;
        }
    };

    updateCount();
});

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((drop) => {
    drop.addEventListener("click", () => {
        if (window.innerWidth <= 992) {
            drop.classList.toggle("active");
        }
    });
});

// Material switch gallery (Sand vs Ice) - art.html
const materialToggle = document.querySelector(".material-toggle");
const materialButtons = document.querySelectorAll(".material-btn");
const materialItems = document.querySelectorAll(".material-item[data-material]");

function setMaterialFilter(filter) {
    materialButtons.forEach((btn) => {
        const isActive = btn.dataset.filter === filter;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    materialItems.forEach((item) => {
        const material = item.dataset.material;
        const shouldShow = filter === "all" ? true : material === filter;
        item.classList.toggle("is-hidden", !shouldShow);
    });
}

if (materialToggle && materialButtons.length && materialItems.length) {
    materialToggle.addEventListener("click", (event) => {
        const button = event.target.closest(".material-btn");
        if (!button) return;
        setMaterialFilter(button.dataset.filter);
    });

    // Default filter: Sand
    setMaterialFilter("sand");
}

const testimonials = [
    {
        text: "The sand sculpture was absolutely stunning! Every detail was perfectly crafted and it became the highlight of our event. Highly recommended!",
        name: "Arjun",
        role: "Client",
        img: "images/user1.jpg"
    },
    {
        text: "We booked an ice sculpture for our wedding, and it turned out even better than we imagined. Elegant, creative, and truly unforgettable.",
        name: "Meera",
        role: "Event Organizer",
        img: "images/user2.jpg"
    },
    {
        text: "The team was very professional and creative. They understood our vision and delivered beyond expectations. Our guests were amazed!",
        name: "Rahul",
        role: "Festival Organizer",
        img: "images/user3.jpg"
    },
    {
        text: "The level of detailing in the sculpture was incredible. You can clearly see the passion and skill behind their work. Amazing sculptures!",
        name: "Karthik",
        role: "Client",
        img: "images/user4.jpg"
    }
];

let testimonialIndex = 0;
let testimonialTimer;

const testimonialText = document.querySelector(".testimonial-text");
const testimonialName = document.querySelector(".testimonial-user h4");
const testimonialRole = document.querySelector(".testimonial-user span");
const testimonialImg = document.querySelector(".testimonial-img img");
const testimonialNextBtn = document.querySelector(".t-next");
const testimonialPrevBtn = document.querySelector(".t-prev");
const testimonialBox = document.querySelector(".testimonial-box");

function updateTestimonial() {
    const item = testimonials[testimonialIndex];
    if (!testimonialText || !testimonialName || !testimonialRole || !testimonialImg) return;

    testimonialText.innerText = item.text;
    testimonialName.innerText = item.name;
    testimonialRole.innerText = item.role;
    testimonialImg.src = item.img;
}

function goToNextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    updateTestimonial();
}

function goToPrevTestimonial() {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
}

if (testimonialText && testimonialName && testimonialRole && testimonialImg) {
    if (testimonialNextBtn) {
        testimonialNextBtn.addEventListener("click", goToNextTestimonial);
    }

    if (testimonialPrevBtn) {
        testimonialPrevBtn.addEventListener("click", goToPrevTestimonial);
    }

    testimonialTimer = setInterval(goToNextTestimonial, 4000);

    if (testimonialBox) {
        testimonialBox.addEventListener("mouseenter", () => clearInterval(testimonialTimer));
        testimonialBox.addEventListener("mouseleave", () => {
            testimonialTimer = setInterval(goToNextTestimonial, 4000);
        });
    }
}

//////////login page 

const passwordToggles = document.querySelectorAll(".toggle-password");

passwordToggles.forEach((toggle) => {
    const input = toggle.parentElement.querySelector("input");

    if (!input) return;

    toggle.addEventListener("click", () => {
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        toggle.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
        toggle.innerHTML = isHidden
            ? '<i class="fa-solid fa-eye-slash"></i>'
            : '<i class="fa-solid fa-eye"></i>';
    });
});


///////////////////scroll to top 

const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
    /* SHOW / HIDE */
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add("show");
        } else {
            scrollBtn.classList.remove("show");
        }
    });

    /* SCROLL TO TOP */
    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}


/////////preloader 

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("hide");
        }, 800); // small delay for smooth UX
    }
});


///////////////services page filter section

const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".filter-card");

function applyServiceFilter(filter) {
    cards.forEach(card => {
        if (card.classList.contains(filter)) {
            card.classList.remove("hide");
        } else {
            card.classList.add("hide");
        }
    });
}

buttons.forEach(button => {
    button.addEventListener("click", () => {

        // remove active
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        applyServiceFilter(filter);

    });
});

// Apply default filter on initial load (e.g., when arriving via dropdown)
const activeFilterButton = document.querySelector(".filter-btn.active");
if (activeFilterButton && cards.length) {
    applyServiceFilter(activeFilterButton.getAttribute("data-filter"));
}



//////////rtl mode

// Reverse only text nodes (SAFE)
function reverseTextNodes(element) {

    if (!element.dataset.original) {
        element.dataset.original = element.innerHTML; // store full HTML safely
    }

    if (document.body.classList.contains("rtl")) {

        element.childNodes.forEach(node => {
            if (node.nodeType === 3) { // TEXT NODE ONLY
                const text = node.textContent.trim();
                if (text.length > 0) {
                    node.textContent = text.split(" ").reverse().join(" ");
                }
            }
        });

    } else {
        element.innerHTML = element.dataset.original; // restore safely
    }
}


// Apply only to safe elements (IMPORTANT 🔥)
function applyRTL() {
    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li").forEach(el => {
        reverseTextNodes(el);
    });
}


// NOTE: RTL toggle + initial apply are handled at the top of this file via `rtlToggles`.


/////////////////// materials parallax scroll
const materialParallaxBlocks = document.querySelectorAll(".material-parallax");

if (materialParallaxBlocks.length) {
    const updateParallax = () => {
        materialParallaxBlocks.forEach((block) => {
            const bg = block.querySelector(".parallax-bg");
            if (!bg) return;
            const rect = block.getBoundingClientRect();
            const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.25;
            bg.style.transform = `translateY(${offset}px)`;
        });
    };
    window.addEventListener("scroll", updateParallax, { passive: true });
    updateParallax();
}

/////////////////// reveal on scroll (all pages)
function initRevealOnScroll() {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const targets = new Set();

    // Manual opt-in (anywhere): data-reveal or .reveal
    document.querySelectorAll("[data-reveal], .reveal").forEach((el) => {
        if (el.getAttribute?.("data-reveal") === "off") return;
        targets.add(el);
    });

    // Auto: reveal each section's main container (or the section itself if no container)
    document.querySelectorAll("section").forEach((section) => {
        if (section.classList.contains("hero-slider")) return; // avoid hiding hero slider on load

        const directChildren = Array.from(section.children || []);
        const containerChild = directChildren.find((child) => child.classList?.contains("container"));

        if (containerChild) {
            targets.add(containerChild);
            return;
        }

        // Avoid applying transforms to parallax sections, since transforms can break `background-attachment: fixed`
        // (and can also interfere with other parallax techniques).
        const isParallaxSection =
            section.classList.contains("materials-parallax") ||
            section.classList.contains("event-process-text") ||
            section.classList.contains("about-parallax") ||
            section.classList.contains("contact-parallax");

        if (isParallaxSection && directChildren.length) {
            directChildren.forEach((child) => targets.add(child));
            return;
        }

        targets.add(section);
    });

    // Footer (common on all pages)
    const footerContainer = document.querySelector(".footer .footer-container");
    if (footerContainer) targets.add(footerContainer);

    if (!targets.size) return;

    const inViewNow = (el) => {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight || document.documentElement.clientHeight || 0;
        return rect.bottom > 0 && rect.top < viewportH * 0.9;
    };

    // Add classes in a way that avoids "flash-hide" for above-the-fold content
    targets.forEach((el) => {
        el.classList.add("reveal");
        if (inViewNow(el)) el.classList.add("is-revealed");
    });

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        targets.forEach((el) => el.classList.add("is-revealed"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-revealed");
                obs.unobserve(entry.target);
            });
        },
        {
            threshold: 0.18,
            rootMargin: "0px 0px -10% 0px",
        }
    );

    targets.forEach((el) => {
        if (!el.classList.contains("is-revealed")) observer.observe(el);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRevealOnScroll);
} else {
    initRevealOnScroll();
}
