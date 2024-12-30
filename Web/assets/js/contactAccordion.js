'use strict'
const accordionBody = document.querySelector(".faq__accordion-body");
const accordion = document.querySelector(".faq__accordion");

let prevSibling, prevArrow;

const accordionHandler = function(e) {
    const parent = e.target.closest(".faq__accordion-container");
    if(!parent) return;
    
    const curSibling = parent.querySelector("p");
    const curArrow = parent.querySelector("i");

    curSibling.classList.toggle("active");
    curSibling.classList.contains("active") ? curArrow.className = 'fa-solid fa-arrow-down' : curArrow.className = 'fa-solid fa-arrow-right';

    if(prevSibling && prevSibling != curSibling) {
        prevSibling.classList.remove("active");
        prevArrow.className = 'fa-solid fa-arrow-right';
    }
    
    prevArrow = curArrow;
    prevSibling = curSibling;
}

accordionBody.addEventListener("click", accordionHandler);