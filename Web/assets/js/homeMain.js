'use strict'
//===================================== HOVER =====================================
const activityOfferList = document.querySelector(".activity__offer-list");
const activityOfferDirectList = document.querySelector(".activity__offer-direct-list");
const activityOfferItems = document.querySelectorAll(".activity__offer-item");
const activityOfferDirectItems = document.querySelectorAll(".activity__offer-direct");

const changeActivityOfferImg = function(e) {
    const curActivityOfferItem = e.target.closest(".activity__offer-item");
    if(!curActivityOfferItem || curActivityOfferItem.classList.contains("activity__offer-item--active")) return;

    activityOfferItems.forEach(el => el.classList.remove("activity__offer-item--active"));
    activityOfferDirectItems.forEach(el => el.classList.remove("activity__offer-direct--active"));

    const curActivityOfferItemID = curActivityOfferItem.dataset.activityOfferItemId; 

    curActivityOfferItem.classList.add("activity__offer-item--active");
    document.querySelector(`.activity__offer-direct[data-activity-offer-img-id="${curActivityOfferItemID}"]`).classList.add("activity__offer-direct--active");
}
 
activityOfferList.addEventListener("mouseover", changeActivityOfferImg);
activityOfferList.addEventListener("touchstart", changeActivityOfferImg);

// ===================================== SLIDE =====================================
const slider = function() {   
    const introSlider = document.querySelector(".intro_slider");
    const introSlideWrapper = document.querySelectorAll(".intro__slide-wrapper");
    const leftBtn = document.querySelector(".slide-btn-left");
    const rightBtn = document.querySelector(".slide-btn-right");
    const dotWrapper = document.querySelector(".dots__dot-wrapper");

    let imgsPerSlide = Math.ceil(introSlider.clientWidth / introSlideWrapper[0].clientWidth);
    let maxSlideLength = introSlideWrapper.length - imgsPerSlide + 1;
    let curSlide = 0;

    const sliderObserve = new ResizeObserver(function(entries) {
        const [entry] = entries;
        if(entry.contentRect.width <= 1023) {
            imgsPerSlide = 1;
            maxSlideLength = introSlideWrapper.length - imgsPerSlide + 1;
        } else {
            imgsPerSlide = 3;
            maxSlideLength = introSlideWrapper.length - imgsPerSlide + 1;
            if(curSlide >= 6) {
                curSlide = 5;
            }
        }
        goToSlide();
        renderDots();
        activateDot();
    })

    const goToSlide = function() {
        introSlideWrapper.forEach((el, i) => {
            el.style.transform = `translateX(${(-curSlide) * 100}%)`;
        })
    }

    const activateDot = function() {
        document.querySelectorAll(".dots__dot")
        .forEach(el => el.classList.remove("dot--active"));
        document.querySelector(`.dots__dot[data-dot="${curSlide}"]`)
        .classList.add("dot--active");
    }

    const renderDots = function() {
        dotWrapper.innerHTML = '';
        for(let i = 0; i < maxSlideLength; i++) {
            const markup = `
            <div class="dots__dot" data-dot="${i}"></div>
            `
            dotWrapper.insertAdjacentHTML("beforeend", markup);
        }
    }

    const nextSlide = function() {
        if(curSlide === maxSlideLength - 1) curSlide = 0;
        else curSlide++;
        goToSlide();
        activateDot();
    }

    const prevSlide = function() {
        if(curSlide === 0) curSlide = maxSlideLength - 1;
        else curSlide--;
        goToSlide();
        activateDot();
    }

    const init = function() {
        renderDots();
        activateDot();
        goToSlide();
    }
    init();
    sliderObserve.observe(introSlider);

    leftBtn.addEventListener("click", prevSlide);
    rightBtn.addEventListener("click", nextSlide);
    dotWrapper.addEventListener("click", function(e) {
        if(e.target.classList.contains("dots__dot")) {
            const slide = Number(e.target.dataset.dot);
            curSlide = slide;
            activateDot();
            goToSlide();    
        }
    })
}

slider();