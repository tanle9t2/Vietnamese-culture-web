'use strict'

//Entire element wrapping all the relevant question-reply
const askingQuestionList = document.querySelector(".asking__question-list");
const askingQuestionListInner = document.querySelector(".asking__question-list-inner");

//Input form elements
const askingForm = document.querySelector(".asking__form");
const askingInput = document.querySelector(".asking__form-input");
const askingTextbox = document.querySelector(".asking__textbox");

//Used to handle DOM element generated from JSON
let replyWrapper;   //Only reply section + submit button
let askingDetailWrapper; //Entire the detail reply section
let questionID;

const overlay = document.querySelector(".overlay");
const CONTACT_API = `https://5ghw2m-3000.csb.app/questions`;

const spinner = document.querySelector(".spinner__wrapper");

//=========================================EVENT HANDLER FUNCTIONS=========================================

const formSubmitHandler = async function(e) {
    try {
        e.preventDefault();

        //1.Get input data
        const title = askingInput.value;
        const description = askingTextbox.textContent;
        //2.Check input length
        if(title.length > 100 || description.length > 400) {
            alert("characters excessed 400 detected! Try again"); return;
        } else if(title.length === 0 || description.length === 0) {
            alert("Empty input!"); return;
        }

        //3.Update new question data
        const res = await fetch(CONTACT_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                info: {
                    name: `user`,
                    title: `${title}`,
                    description: `${description}`,
                },
                reply: []
            })
        })
        //4.Get HTML string and render
        const markup = await res.json();
        renderQuestion(markup);

        //5. Clear input
        askingInput.value = '';
        askingTextbox.textContent = '';
        askingInput.blur();
        askingTextbox.blur();
    } catch(err) {
        console.error(err);
    }
}

const replySubmitHandler = async function(e) {
    try {
        e.preventDefault();
        if(!e.target.classList.contains("reply__submit-btn")) return;

        //1.Get reply json array
        const REPLY_API = `${CONTACT_API}/${questionID}`;
        const replyJSONRes = await fetch(REPLY_API);
        const replyJSONData = await replyJSONRes.json();
        const replyJSONArray = replyJSONData.reply;

        //2.Get input data
        const description = e.target.closest(".reply__wrapper").querySelector(".reply__textbox").textContent;

        //3.Check input length
        if(description.length > 400) {
            alert("characters excessed 500 detected! Try again"); return;
        } else if(description.length === 0) {
            alert("Empty input!"); return;
        }

        //4.Push new data to the reply json array
        replyJSONArray.unshift({
            name: "user",
            description: `${description}`
        });

        //5.Change counter data
        const counter = e.target.closest(".asking__question-item").querySelectorAll(".asking__item-count span");
        counter.forEach(el => el.textContent = replyJSONArray.length);
        
        //6.Update new reply data
        const res = await fetch(REPLY_API, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reply: replyJSONArray
            })
        })

        //7.Get HTML string and render
        const markup = await res.json();
        renderReply(markup);
        
    } catch(err) {
        console.error(err);
    }
}

const askingDetailShow = function(e) {
    e.preventDefault();

    if(!e.target.classList.contains("asking__item-title")) return; 

    const askingQuestionItem = e.target.closest(".asking__question-item");

    //Reply section wrapper(question above + reply + btn)
    askingDetailWrapper = askingQuestionItem.querySelector(".asking__detail-wrapper");
    //Only reply section
    replyWrapper = askingQuestionItem.querySelector(".reply__wrapper");
    //Get questionID inorder to get accurate reply from API
    questionID = askingQuestionItem.dataset.askingId;

    askingDetailWrapper.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

const askingDetailHide = function(e) {
    if(!e.target.closest(".reply__close-btn") && !e.target.classList.contains("overlay")) return;
    
    overlay.classList.add("hidden");
    askingDetailWrapper.classList.add("hidden");
}

const renderQuestion = function(e) {
    const replyArray = e.reply;
    const questionMarkup = `
        <div class="asking__question-item" data-asking-id="${e.id}">
            <div class="asking__item-wrapper">
                <div class="asking__item">
                    <div class="asking__item-icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="asking__item-text">
                        <a class="asking__item-title" href="#">${e.info.title}</a>
                        <h4 class="asking__item-content">${e.info.description}</h4>
                        <a href="">${e.info.name}</a>
                    </div>
                    <div class="asking__item-count">
                        <span>${e.reply.length}</span>
                        <a href="">
                            <i class="fa-solid fa-message"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="asking__detail-wrapper hidden">
                <div class="asking__detail">
                    <div class="asking__item-wrapper">
                        <div class="asking__item">
                            <div class="asking__item-icon">
                                <i class="fa-solid fa-user"></i>
                            </div>
                            <div class="asking__item-text text--full">
                                <a class="text--full" href="#">${e.info.title}</a>
                                <h4 class="asking__item-content">${e.info.description}</h4>
                                <a href="">${e.info.name}</a>
                            </div>
                            <div class="asking__item-count">
                                <span>${replyArray.length}</span>
                                <a href="">
                                    <i class="fa-solid fa-message"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="reply__wrapper">
                        <div class="reply-count">
                            <span class="reply-count__number">${replyArray.length}</span>
                            <span class="reply-count__text">Replies</span>
                        </div>
                        <div class="reply__list">
                            ${replyArray.map(function(item) {
                                return `
                                <div class="asking__item-wrapper reply__item">
                                    <div class="asking__item">
                                        <div class="asking__item-icon">
                                            <i class="fa-solid fa-user"></i>
                                        </div>
                                        <div class="asking__item-text text--full">
                                            <h4 class="asking__item-content">${item.description}</h4>
                                            <a href="">${item.name}</a>
                                        </div>
                                    </div>
                                </div>
                                `;
                            }).join('')}
                        </div>
                        <div class="textbox__wrapper reply__textbox-wrapper">
                            <div class="textbox reply__textbox" placeholder="What's going on ?" contenteditable="true"></div></div>
                        <button class="submit__btn reply__submit-btn">
                            Publish
                        </button>
                    </div>
                    <div class="reply__close-btn">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
            </div>
        </div>`;
    askingQuestionListInner.insertAdjacentHTML("afterbegin", questionMarkup);
}

const renderReply = function(e) {    
    replyWrapper.innerHTML = '';
    const markup = `
        <div class="reply-count">
            <span class="reply-count__number">${e.reply.length}</span>
            <span class="reply-count__text">Replies</span>
        </div>
        <div class="reply__list">
            ${e.reply.map(function(item) {
                return `
                <div class="asking__item-wrapper reply__item">
                    <div class="asking__item">
                        <div class="asking__item-icon">
                            <i class="fa-solid fa-user"></i>
                        </div>
                        <div class="asking__item-text text--full">
                            <h4 class="asking__item-content">${item.description}</h4>
                            <a href="">${item.name}</a>
                        </div>
                    </div>
                </div>
                `
            }).join('')}
        </div>
        <div class="textbox__wrapper reply__textbox-wrapper">
            <div class="textbox reply__textbox" placeholder="What's going on ?" contenteditable="true"></div>
        </div>
        <button class="submit__btn reply__submit-btn">
            Publish
        </button>`;
    replyWrapper.insertAdjacentHTML("afterbegin", markup);
}

//=========================================JSON and HANDLE EVENT=========================================

const JSONLoad = async function() {
    try {
        const data = await fetch(CONTACT_API);
        const res = await data.json();
        spinner.style.display = 'none';
        res.forEach(renderQuestion);
    } catch(err) {
        console.error(err);
    }
};

const eventHandler = function() {
    [askingDetailShow, askingDetailHide, replySubmitHandler].forEach(handler => askingQuestionList.addEventListener("click", handler));
    askingForm.addEventListener("submit", formSubmitHandler);
    overlay.addEventListener("click", askingDetailHide);
}

JSONLoad();
eventHandler();