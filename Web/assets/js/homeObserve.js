'use strict';

const introSection = document.querySelector(".intro");
const activitySection = document.querySelector(".activity");
const travelSection = document.querySelector(".travel");
const achivementSection = document.querySelector(".achievement");
const eventSection = document.querySelector(".event");
const achievementList = document.querySelector(".achievement-list");
const videoSection = document.querySelector(".video");

const btnWatchVideo = document.querySelector(".bottom-link-video");
const btnLetsGo = document.querySelector(".bottom-2");

const achieveData = [1995, 2013, 2014, 2020];
const achieveInitialData = [0, 0, 0, 0];
const setIntervalID = [0, 0, 0, 0];


//======================================SECTION OBSERVE======================================

const sectionObserveHandler = function(entries, observe) {
    const [entry] = entries;
    if(!entry.isIntersecting) return 
    entry.target.classList.remove("section-hidden");
    sectionObserve.unobserve(entry.target);
}

// Havent't figured out why this setInterval keeps runnin' though being cleared
const achieveCountUpHandler = function(el, idx) {
    setIntervalID[idx] = setInterval(function() {
        el.textContent = achieveInitialData[idx] += 10;
        if(achieveInitialData[idx] >= achieveData[idx]) {
            el.textContent = achieveData[idx]; 
            clearInterval(setIntervalID[idx]);
            return;
        }
    }, 10);
}

const achieveObserveHandler = function(entries, observe) {
    const [entry] = entries;
    if(!entry.isIntersecting) return;

    const achieveItem = entry.target.querySelectorAll(".achievement-item__data");
    achieveItem.forEach(achieveCountUpHandler);
    achieveObserve.unobserve(achievementList);
}

const sectionObserve = new IntersectionObserver(sectionObserveHandler, {
    root: null,
    threshold: 0.1
})

const achieveObserve = new IntersectionObserver(achieveObserveHandler, {
    root: null,
    threshold: 0
})

Array.from([introSection, activitySection, travelSection, achivementSection, eventSection, videoSection]).forEach(item => sectionObserve.observe(item));
achieveObserve.observe(achievementList);

//=======================================SCROLL=======================================
const scrollToVideo = function(e) {
    videoSection.scrollIntoView({behavior: "smooth"});
}
const scrollToFirst = function(e) {
    introSection.scrollIntoView({behavior: "smooth"});
}
btnWatchVideo.addEventListener("click", scrollToVideo);
btnLetsGo.addEventListener("click", scrollToFirst);