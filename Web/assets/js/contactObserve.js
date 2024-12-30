'use strict'
//=========================================OBSERVATION=========================================
const faqSection = document.querySelector(".faq");
const contactSection = document.querySelector(".contact");

const observeHandle = function(entries, observe) {
    const [entry] = entries;
    if(!entry.isIntersecting) return 
    entry.target.classList.remove("section-hidden");
    mainObserve.unobserve(entry.target);
}

const mainObserve = new IntersectionObserver(observeHandle, {
    root: null,
    thresold: [0.3]
})

mainObserve.observe(faqSection);
mainObserve.observe(contactSection);