function obser () {
    const observer = new IntersectionObserver(entries=> {
        entries.forEach(entry => {
            entry.target.classList.toggle('entries',entry.isIntersecting)
        })
    }, {
        // thresdhold: 0.7
    })
    const observerImg = new IntersectionObserver(entries => {
        entries.forEach(entry =>{
            let src =entry.target.getAttribute('lazy-load')
            if(entry.isIntersecting && src) {
                entry.target.src = src
                observerImg.unobserve(entry.target)
            }
        })
    },{
            
    })
    const imgs = document.querySelectorAll('img[lazy-load]')
    imgs.forEach(img => {
        observerImg.observe(img)
    })
    const items = document.querySelectorAll('.entry')
    items.forEach(item => {
        observer.observe(item)
    })
}
export default obser;