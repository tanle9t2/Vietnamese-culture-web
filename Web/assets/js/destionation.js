function eventDestination() {
    var listImg = document.querySelectorAll('.body-intro__banner')
    let imgMain = document.querySelector('header');
    let thumbnail = document.querySelector('.header__thumnail')
    let next = document.querySelector('.circle--right');
    let prev = document.querySelector('.circle--left');
    let changePosition = document.getElementById('body-intro')
    const listDetail =document.querySelectorAll('.body-detail__item')
    const city = document.querySelectorAll('.body-destination__item')
    const bodyDetail =document.getElementById('body-detail')
    const heritage = document.querySelectorAll('.line')
    const comeback = document.querySelector('#body-detail')
    const imgActivites = document.querySelectorAll('.body-activity__img-1')
    const bodyActivity = document.getElementById('body-activity')
    var index = 0;
    const click= (item) => {
        item.onclick = () => {
            let active = document.querySelector(`.${item.classList[0]}`+'--active')
                active.classList.remove(`${item.classList[0]}`+'--active')
                item.classList.add(`${item.classList[0]}`+'--active')
        }
    }
    listDetail.forEach((item)=> {
        function back () {
            comeback.scrollIntoView({behavior: "smooth"})
        }
        item.addEventListener("click",back)
    })
    imgActivites.forEach((item)=> {
        function back () {
            bodyActivity.scrollIntoView({behavior: "smooth"})
        }
        item.addEventListener("click",back)
    })
    listDetail.forEach((item)=> {
        item=click(item)
    })
    function change () {
        imgMain.style.backgroundImage = `url('${listImg[index].currentSrc}')`;
    }
    function slider () {
        setTimeout(()=> {
            change(index)
            thumbnail.style.animation = 'lefttoright linear 0.3s'
        },100)
    }
    function slidel() {
        setTimeout(()=> {
            change(index)
            thumbnail.style.animation = 'righttoleft linear 0.3s'
        },100)
    }
    changePosition.onmouseover = function changeP (e) {
        var prevX ,prevY 
        var x = 0, y= 0
        const updatePositon = (e) =>{
            let newX = e.x
            let newY = e.y
            if(prevX < newX) 
                changePosition.style.backgroundPositionX = `${x-=8}px`
            else
                changePosition.style.backgroundPositionX = `${x+=8}px`

            if(prevY < newY) 
                changePosition.style.backgroundPositionY = `${y-=8}px`
            else
                changePosition.style.backgroundPositionY = `${y+=8}px`

            prevX = newX
            prevY = newY
        }
        changePosition.onmouseover = updatePositon
    }
    listImg.forEach(function(img, idx) {
        img.onclick = function () {
            if(index < idx) {
                index = idx 
                slider(index)
            }
            else if(index >idx) {
                index =idx
                slidel(index);
            }
        }
    })
    next.onclick = function () {
        if(index === listImg.length-1) 
            index = 0;
        else 
            index++;  
        thumbnail.style.animation = ''
        slider(index)
    }
    prev.onclick = function () {
        if(index === 0) 
            index = listImg.length-1;
        else 
            index--;  
        thumbnail.style.animation = ''
        slidel(index)
    }
}
export default eventDestination;