
    function eventCuisine() {
        const listMenu = document.querySelectorAll('.menu-nav-list__item')
    const contralRate = document.querySelectorAll('.body-rate-contral__btn')
    const contralProfes = document.querySelectorAll('.body-profes-contral__btn')
    const bodySay =document.querySelector('.body-rate-main')
    
    var index =0
    var prev =0;
    var position = 0;
    function slider (item) {
        setTimeout(()=> {
            item.style.animation = 'lefttoright linear 0.3s'
        },100)
    }
    function slidel(item) {
        setTimeout(()=> {
            item.style.animation = 'righttoleft linear 0.3s'
        },100)
    }
    const click= (item,idx) => {
       item.addEventListener("click",changColor)
       function changColor() {
            let active = document.querySelector(`.${item.classList[0]}`+'--active')
            active.classList.remove(`${item.classList[0]}`+'--active')
            item.classList.add(`${item.classList[0]}`+'--active')
       }
    }
    listMenu.forEach((menu,index) => {
        menu = click(menu)
    })
    contralRate.forEach((item,idx)=> {
        item.addEventListener("click",slide)
        function slide () {
            bodySay.style.animation =""
            if(index < idx) {
                index =idx
                slidel(bodySay)
            }
            else if(index >idx) {
                index = idx
                slider(bodySay)
            }
        }
        item=click(item,index)
    })
    contralProfes.forEach((item,idx)=> {
        var i = document.querySelector('.body-profes-main')
        item.addEventListener("click",changeP)
        var step
        function changeP() {
            const listItem = document.querySelector('.body-profes-main')
            if(prev < idx) {
                step = idx -prev
                prev = idx 
                listItem.style.transform = `translateX(${position-=33.33*step}%)`
                listItem.style.transition =`all linear ${step*0.2}s`
            } else if(prev > idx) {
                step = prev-idx
                prev = idx;
                listItem.style.transform = `translateX(${position+=33.33*step}%)`
                listItem.style.transition =`all linear ${step*0.2}s`
            } 
        }
        item=click(item)
    })
    }

export default eventCuisine;




