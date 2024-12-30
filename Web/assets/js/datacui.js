import obser from "./obser.js"
import eventCuisine from "./cuisine.js"
window.onload = () => {
/*API*/
const rateAPI = "https://5ghw2m-3000.csb.app/Rate"
const featureAPI = "https://5ghw2m-3000.csb.app/feature"
const aboutAPI = "https://5ghw2m-3000.csb.app/about"
const cookerAPI = "https://5ghw2m-3000.csb.app/Cooker"
var menuAPI = "https://5ghw2m-3000.csb.app/menu"
const michelinAPI ="https://5ghw2m-3000.csb.app/michelin"

const spinner = document.querySelector('.spinner__all')

async function start() {
    try {
        await getData(renderRate,rateAPI) 
        await getData(renderMenu,menuAPI)
        await getData(renderFeature,featureAPI)
        await getData(renderAbout,aboutAPI)
        await getData(renderCooker,cookerAPI)
        await getData(renderMichelin,michelinAPI)
        spinner.style.display = 'none'
        eventCuisine()
        obser()
    } catch {
        alert('Web sap roi')
    }
    
}
async function getData(callback,API) {
    const res = await fetch(API)
    const data = await res.json()
    callback(data)
}
function renderMichelin(items) {
    const block = document.querySelector('.body-michelin')
    let html = items.map((item,index) => {
       if(index%2 === 0) {
        return `<div class="body-michelin-item">
        <div class="col l-5 m-12 c-12">
        <img lazy-load="${item.ava}" src="${item.ava}" alt="" class="body-michelin__img">
    </div>
    <div class="order col l-7 m-12 c-12">
        <h3 class="body-michelin__name">${item.name}</h3>
        <p class="body-michelin__contain">${item.text}</p>
        <span class="body-michelin__location"> <i class="fa-solid fa-location-dot"></i> ${item.location}</span>
        </div>
        </div>`
       } else {
        return `
        <div class="body-michelin-item">
         <div class="order col l-7 m-12 c-12">
            <h3 class="body-michelin__name">${item.name}</h3>
            <p class="body-michelin__contain">${item.text}</p>
            <span class="body-michelin__location"> <i class="fa-solid fa-location-dot"></i> ${item.location}</span>
        </div>
        <div class="col l-5 m-12 c-12">
        <img lazy-load="${item.ava}" src="${item.ava}" alt="" class="body-michelin__img">
        </div>
        </div>
       `
       }
    })
    block.innerHTML = html.join('')
}
function renderCooker(items) {
    const block = document.querySelector('.body-profes-main')
    let html = items.map(item =>{
        return`<div class="change col l-4 c-12">
        <div class="body-profes__item">
         <img lazy-load="${item.img}" src="${item.img}" alt="" class="body-profes__avt">
         <div class="body-profes-infor">
             <h3 class="body-profes-infor__name">${item.name}</h3>
             <p class="body-profes-infor__achive"></p>
         </div>
        </div>
     </div>`
    })
    block.innerHTML = html.join('')
}
function renderAbout(items) {
    const blockTitle =document.querySelector('.body-intro__msg')
    const blockText =document.querySelector('.body-intro__text')
    const blockHTML =document.querySelector('.body-intro')
    var html = items.map((item,index) => {
        return `
            <div class="col l-5 m-12 c-12">
                <h3 class="body-intro__title">About us</h3>
                <p class="body-intro__msg">${item.title}</p>
                <span class="body-intro__text">${item.text}</span>
            </div>
            <div class="col l-6 l-o-1 m-12 c-12">
                <img lazy-load="https://i.pinimg.com/originals/23/8c/aa/238caa47648eb1e44e7360234a9b3c62.jpg" src="" alt="Image" class="body-intro__img">
            </div>
    `
    })
    blockHTML.innerHTML = html.join(' ')

} 
function renderFeature(items) {
    const blockImg = document.querySelectorAll('.body-suggest__img')
    const blockText = document.querySelectorAll('.body-suggest__text')
    const block = document.querySelector('.body-suggest')
    var html = items.map(item => {
        return `
        <div class="col l-4">
            <a href="#menu" tag="north" class="body-suggest-outline">
                <img lazy-load="${item.img}" src="${item.img}" alt="" class="body-suggest__img">
                <h3 class="body-suggest__region">${item.region}</h3>
                <p class="body-suggest__text">${item.text}</p>
            </a>
        </div>
        `
    })
    block.innerHTML = html.join('')
} 
function renderMenu(items) {
    var val = document.querySelector('.menu-nav-list__item.menu-nav-list__item--active').getAttribute('val')
    const blockList= document.querySelectorAll('.menu-food-item')
    const blockName =document.querySelectorAll('.menu-food-item__text-name')
    const blockIntro = document.querySelectorAll('.menu-food-item__text-intro') 
    const blockAva = document.querySelectorAll('.menu-food-item__img')
    const blockcontral = document.querySelectorAll('.menu-nav-list__item')
    const blockFeature = document.querySelectorAll('.body-suggest-outline')
    const blockItems = document.querySelectorAll('.menu-food-list')
    function track() {
        items[val].forEach((item,index) => {
            blockName[index].innerText = item.name  
            blockIntro[index].innerText = item.intro
            if(blockAva[index].src) {
                blockAva[index].src=item.img
            }
            blockAva[index].setAttribute('lazy-load',item.img)
        })
        var maxHeight = 0
        blockItems.forEach((item,idx) =>{
            if(item.offsetHeight> maxHeight)
            {
                maxHeight = item.offsetHeight
            }
        })
        blockItems.forEach((item,idx) =>{
            item.style.minHeight = `${maxHeight}px`
        })

    }
    track()
    blockcontral.forEach((control) => {
        control.addEventListener("click",change)
        function change() {
            val = document.querySelector('.menu-nav-list__item.menu-nav-list__item--active').getAttribute('val')
            blockList.forEach((item)=>{
                 item.style.animation = ""
            })
            setTimeout(()=> {
                blockList.forEach((item)=>{
                    item.style.animation = "fadeIn linear 1s"
                })
                track()
            },100)
        }
    })
    blockFeature.forEach((item,idx) => {
        item.addEventListener("click",changeMenu)
        function changeMenu () {
            let active = document.querySelector('.menu-nav-list__item.menu-nav-list__item--active')
                active.classList.remove('menu-nav-list__item--active')
            val = document.querySelector('.body-suggest-outline').getAttribute('tag')
            blockcontral[idx+1].classList.add('menu-nav-list__item--active')
            blockList.forEach((item)=>{
                item.style.animation = ""
            })
            setTimeout(()=> {
                blockList.forEach((item)=>{
                    item.style.animation = "fadeIn linear 1s"
                })
                track()
            },100)
        }
    })
}
function renderRate(items) {
    var index =0
    const avatar = document.querySelector('.body-rate-head__infpr-avt')
    const name = document.querySelector('.body-rate-head__infor-name')
    const career = document.querySelector('.body-rate-head__infor-job')
    const comment = document.querySelector('.body-rate-contain__text')
    const control = document.querySelectorAll('.body-rate-contral__btn')
    function track() {
        avatar.setAttribute("lazy-load",items.Avatar[index])
        avatar.src = items.Avatar[index]
        name.innerText = items.Name[index]
        career.innerText = items.Career[index]
        comment.innerText = items.Comment[index]
    }
    track()
    control.forEach((item,idx)=>{
        item.addEventListener("click",changeData)
        function changeData() {
             index = idx
             track()
        }
     })
}
start()


}