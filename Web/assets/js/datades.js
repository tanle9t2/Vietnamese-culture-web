import obser from './obser.js';
import eventDestination from './destionation.js'
window.onload = () => {
//API
var containAPI = 'https://5ghw2m-3000.csb.app/activity'
const cityAPI ='https://5ghw2m-3000.csb.app/city'
const heritageAPI = 'https://5ghw2m-3000.csb.app/heritage'
var introAPI = 'https://5ghw2m-3000.csb.app/intro'

const spinner = document.querySelector('.spinner__all')

var index = 0
async function start() {
   try {
    await getData(render,containAPI)
    await getData(renderCity,cityAPI)
    await getData(renderHeritage,heritageAPI)
    await getData(renderIntro,introAPI)
    spinner.style.display = 'none'
    eventDestination()
    obser()
   }
   catch {
    alert("Web sap roi")
   }
}
async function getData(callback,API) {
    const res = await fetch(API)
    const data = await res.json()
    callback(data)
} 
function renderHeritage(items) {
    let title = document.querySelector('.body-hertitage__title')
    var blockContain = document.querySelector('.body-heritage__contain')
    title.innerHTML  = `<div class="col l-4 l-o-4 m-12">
        <h2 class="heritage-title__head">${items.title}</h2>
        <p class="heritage-title__text">${items.text}</p>
    </div>
    `
    let html = items.contain.map((item,index) => { 
        if(index%2===0) {
            return`<div class="line col l-3 m-6 c-12">
            <img lazy-load="${item.img}" src="" alt="" class="heritage-contain__img heritage-contain__img--down">
            <div class="heritage-contain__msg heritage-contain__msg--down">
                <h3 class="heritage-contain__year heritage-contain__year--down">${item.year}</h3>
                <p class="heritage-contain__text">${item.text}</p>
            </div>
        </div>`
        } else {
            return `<div class="line col l-3 m-6 c-12">
            <div class="heritage-contain__msg heritage-contain__msg--up">
                <p class="heritage-contain__text">${item.text}</p>
                <h3 class="heritage-contain__year heritage-contain__year--up">${item.year}</h3>
            </div>
            <img lazy-load="${item.img}" src="" alt="" class="heritage-contain__img heritage-contain__img--up">
        </div>`
        }
    })
    blockContain.innerHTML = html.join('')
}
function renderIntro(items) {
    const blockIntro = document.querySelector('.body-deatail-main')
    const nav = document.querySelector('.body-detail__nav')
    let test= 'Ho Chi Minh'
    let city = items.listcity.map((item,idx) => {
        let res
        if(idx === 0) {
            res = ` <li tag="${item}" class="body-detail__item body-detail__item--active">
            <i class="body-detail__item-icon fa-solid fa-camera"></i>
            <span class="body-detail__text">${item}</span>
        </li>`
        } else {
           res = ` <li tag="${item}" class="body-detail__item">
                <i class="body-detail__item-icon fa-solid fa-camera"></i>
                <span class="body-detail__text">${item}</span>
             </li>`
        }
        return res;
    })
    nav.innerHTML = city.join('')
    var active  =document.querySelector('.body-detail__item--active').getAttribute('tag')
    function track () {
        let html = items[active].map(item => {
            return `<h3 class="body-detail__title">${item.name}</h3>
            <p class="body-detail__msg">${item.text1}</p>
            <p class="body-detail__msg">${item.text2}</p>
            <img lazy-load ="${item.img}" src="${item.img}" alt="" class="body-detail__img">
            <div class="body-detail-paramer">
                <div class="body-detail__infor">
                    <h3 class="body-detail__infor-title">PROVINCE</h3>
                    <span class="body-detail__infor-text">${item.province}</span>
                </div>
                <div class="body-detail__infor">
                <h3 class="body-detail__infor-title">AREA</h3>
                <span class="body-detail__infor-text">${item.area}</span>
            </div>
            <div class="body-detail__infor">
                <h3 class="body-detail__infor-title">POPULATION</h3>
                <span class="body-detail__infor-text">${item.population}</span>
            </div>
            <div class="body-detail__infor">
                <h3 class="body-detail__infor-title">LOCATION</h3>
                <span class="body-detail__infor-text">${item.location}</span>
            </div>
            <div class="body-detail__infor">
                <h3 class="body-detail__infor-title">TEMPERTURE</h3>
                <span class="body-detail__infor-text">${item.temperture}</span>
            </div>
            </div>
            `
        })
        blockIntro.innerHTML = html.join('')
    }
    track()
    const listItem =document.querySelectorAll('.body-detail__item')
    const link = document.querySelectorAll('.body-destination__item')
    listItem.forEach(item => {
        item.addEventListener("click", changeCity)
    })
    function changeCity () {
        const block = document.querySelector('.body-deatail-main')
        const img = document.querySelector('.body-detail__img')
        let prev =document.querySelector('.body-detail__item--active')
        prev.classList.remove('body-detail__item--active')
        this.classList.add('body-detail__item--active')
        active = this.getAttribute('tag')
        block.style.animation = ''
        setTimeout(() => {
            block.style.animation = 'fadeIn linear 1s'
            track()
        }, 100);
    }
}
function renderCity(items) {
    const block = document.querySelector('.body-city')
    var html = items.map(item=> {
        return `<div class="col l-4 m-6 c-12 body-destination-list">
        <a href="#body-detail" class="body-destination__item">
            <img lazy-load="${item.img}" src="" alt="" class="body-destionation__item-img">
            <h3 class="body-destination__item-text"><i class="fa-solid fa-location-dot"></i> ${item.name}</h3>
        </a>
    </div>`
    })
    block.innerHTML = html.join('')
}

function render(items) {
    const img = document.querySelector('.body-activity__img-2')
    const blockImg = document.querySelector('.body-activity__img')
    const header = document.querySelector('.body-activities__head')
    const intro = document.querySelector('.body-activity__text')
    const extral = document.querySelector('.body-activity__extral')
    const next = document.querySelector('.body-activity__contral-icon-right')
    const prev = document.querySelector('.body-activity__contral-icon-left')
    var type
    var blocks = document.querySelector('.body-activities__body')
    var listData
    let imgItem = items.listImg.map(item => {
        return ` <div class="body-activity-outline" tag = "${item.text}">
        <img lazy-load="${item.img}" src="" alt="" class="body-activity__img-1">
        <span class="body-activity-outline__text">
            ${item.text}
            <i class="body-activity-outline__icon fa-solid fa-angle-right"></i>  
        </span>
    </div>`
    })
    blockImg.innerHTML = imgItem.join('')
    const typeAc = document.querySelectorAll('div[tag]')
    const blockMain = document.querySelector('.body-activity__body')
    type = typeAc[0].getAttribute('tag')
    function track() {  
        header.innerText = items[type].Title
        intro.innerText =items[type].Intro
        extral.innerText =items[type].Extral
        img.src= items[type].Img
        listData = items[type].Contain.map((item)=> {
            return [
                item.name,
                item.location,
                item.difficult,
                item.bestime
            ]
        }) 
        var html = listData[index].map((item) => {
        return ` <li class="body-activities__item">${item}</li>`
        })
        blocks.innerHTML = html.join('')
    }
    track()
    next.onclick = () => {
        if(index ===listData.length-1)
            index =0
        else 
            index++
        blocks.style.animation =''
        setTimeout(() => {
            blocks.style.animation = 'lefttoright linear 0.3s'
            track()
        }, 100);
    }
    prev.onclick = () => {
        if(index === 0)
            index = listData.length-1
        else 
            index--
        blocks.style.animation =''
        setTimeout(() => {
            blocks.style.animation = 'righttoleft linear 0.3s'
            track()
        }, 100);
    }
    typeAc.forEach((item,index)=> {
        item.onclick = (e) => {
            e.preventDefault()
            type = item.getAttribute('tag')
            blocks.style.animation = ''
            setTimeout(() => {
                blocks.style.animation = 'fadeIn linear 0.3s'
                track()
            }, 100);
        }
    })
}
start()
}