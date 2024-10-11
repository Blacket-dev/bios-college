// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Form submission handled by Formspree
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            contactMessage.textContent = 'Thank you for your message!';
            contactMessage.style.color = '#1abc9c';
            contactForm.reset();
        } else {
            return response.json().then(data => {
                if (data.errors) {
                    throw new Error(data.errors.map(error => error.message).join(', '));
                } else {
                    throw new Error('Something went wrong!');
                }
            });
        }
    })
    .catch(error => {
        contactMessage.textContent = error.message;
        contactMessage.style.color = 'red';
    });
});

// Intersection Observer for section animations
const sections = document.querySelectorAll('section');

const options = {
    threshold: 0.1
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) { // Show after scrolling 300px
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dynamic Registration Link
const registerBtn = document.getElementById('registerBtn');
const currentYear = new Date().getFullYear();
// Assuming the registration link changes yearly, append the year as a query parameter
// Alternatively, update the link based on the year if required
registerBtn.href = `https://docs.google.com/forms/d/e/1FAIpQLScB81vfXWoiiQMU24P6RYhYSt-hnQliOp__c7RjHCCH1V7uvg/viewform?year=${currentYear}`;
