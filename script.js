// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Form Validation and Submission
const studentForm = document.getElementById('studentForm');
const successModal = document.getElementById('successModal');
const closeModal = document.querySelector('.close-modal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

// Form validation function
function validateForm() {
    let isValid = true;
    
    // RHNID validation
    const rhnid = document.getElementById('rhnid');
    const rhnidError = document.getElementById('rhnid-error');
    if (rhnid.value.trim() === '') {
        rhnidError.textContent = 'RHNID is required';
        rhnidError.style.display = 'block';
        isValid = false;
    } else if (!/^[A-Za-z0-9]+$/.test(rhnid.value)) {
        rhnidError.textContent = 'RHNID can only contain letters and numbers';
        rhnidError.style.display = 'block';
        isValid = false;
    } else {
        rhnidError.style.display = 'none';
    }
    
    // Full Name validation
    const fullname = document.getElementById('fullname');
    const fullnameError = document.getElementById('fullname-error');
    if (fullname.value.trim() === '') {
        fullnameError.textContent = 'Full name is required';
        fullnameError.style.display = 'block';
        isValid = false;
    } else {
        fullnameError.style.display = 'none';
    }
    
    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    if (email.value.trim() === '') {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }
    
    // Phone number validation
    const phoneno = document.getElementById('phoneno');
    const phonenoError = document.getElementById('phoneno-error');
    if (phoneno.value.trim() === '') {
        phonenoError.textContent = 'Phone number is required';
        phonenoError.style.display = 'block';
        isValid = false;
    } else if (!/^\d{10}$/.test(phoneno.value.replace(/\D/g, ''))) {
        phonenoError.textContent = 'Please enter a valid 10-digit phone number';
        phonenoError.style.display = 'block';
        isValid = false;
    } else {
        phonenoError.style.display = 'none';
    }
    
    // Course validation
    const course = document.getElementById('course');
    const courseError = document.getElementById('course-error');
    if (course.value === '') {
        courseError.textContent = 'Please select a course';
        courseError.style.display = 'block';
        isValid = false;
    } else {
        courseError.style.display = 'none';
    }
    
    return isValid;
}

// Form submission
if (studentForm) {
    studentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            // Collect form data
            const formData = {
                rhnid: document.getElementById('rhnid').value,
                fullname: document.getElementById('fullname').value,
                email: document.getElementById('email').value,
                phoneno: document.getElementById('phoneno').value,
                course: document.getElementById('course').value
            };
            

            fetch("https://rhnidcollection.vercel.app/api/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .catch(err => console.error("Error:", err));


            console.log('Form submitted with data:', formData);
            
            // Show success modal
            successModal.classList.add('show');
            
            // Reset form
            studentForm.reset();
        }
    });
}

// Close modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        successModal.classList.remove('show');
    });
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
        successModal.classList.remove('show');
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('show');
    }
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

// Function to show a specific slide
function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show the selected slide and activate corresponding dot
    testimonialSlides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Update current slide index
    currentSlide = index;
}

// Event listeners for dots
dots.forEach(dot => {
    dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-index'));
        showSlide(slideIndex);
    });
});

// Event listeners for prev/next buttons
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    });
}

// Auto slide change
let slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
}, 5000);

// Pause auto slide on hover
const testimonialSlider = document.getElementById('testimonialSlider');
if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav items based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to corresponding nav link
            const correspondingLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set first slide as active
    showSlide(0);
    
    // Set home link as active initially
    const homeLink = document.querySelector('.nav-menu a');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});
