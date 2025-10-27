// ============================================
// Carousel Functionality
// ============================================
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const carouselItems = document.querySelectorAll('.carousel-item');

let currentIndex = 0;
const itemWidth = carouselItems[0]?.offsetWidth || 300;
const gap = 32; // 2rem gap in pixels

function updateCarousel() {
    carouselItems.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next');

        if (index === currentIndex) {
            item.classList.add('active');
        } else if (index === (currentIndex - 1 + carouselItems.length) % carouselItems.length) {
            item.classList.add('prev');
        } else if (index === (currentIndex + 1) % carouselItems.length) {
            item.classList.add('next');
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
}

if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Auto-advance carousel every 5 seconds
setInterval(() => {
    nextSlide();
}, 5000);

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// ============================================
// Active Navigation Link on Scroll
// ============================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    let currentActive = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            currentActive = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentActive) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Page Load
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('The Matcha Bar website loaded successfully!');

    // Initialize carousel on load
    updateCarousel();

    // Trigger initial scroll to update active nav
    window.dispatchEvent(new Event('scroll'));
});

// ============================================
// Touch/Swipe Support for Mobile Carousel
// ============================================
let touchStartX = 0;
let touchEndX = 0;

const carouselWrapper = document.querySelector('.carousel-wrapper');

if (carouselWrapper) {
    carouselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

// ============================================
// Menu Item Image Click Functionality
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const menuImages = document.querySelectorAll('.menu-item-image');
    menuImages.forEach(image => {
        if (!image.hasAttribute('onclick')) {
            image.addEventListener('click', function() {
                const img = this.querySelector('img');
                const title = this.closest('.menu-item').querySelector('h3').textContent;
                const price = this.closest('.menu-item').querySelector('.menu-price').textContent;
                const imgSrc = img.src;

                // Call the openImageModal function from menu.html
                if (typeof openImageModal !== 'undefined') {
                    openImageModal(imgSrc, title, price);
                }
            });
        }
    });
});
