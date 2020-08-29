function Slider(objSettings, objSource) {

    //Default settings
    const settings = {
        auto: false,
        time: 0
    }

    //Default source
    const imgCollectionDefault = {
        slide1: ['https://picsum.photos/900', '#'],
        slide2: ['https://picsum.photos/901', '#'],
        slide3: ['https://picsum.photos/902', '#'],
        slide4: ['https://picsum.photos/903', '#'],
        slide5: ['https://picsum.photos/904', '#'],
    }

    //Constructor
    this.objSettings = objSettings || settings
    this.slidesCollection = objSource || imgCollectionDefault
    this.auto = objSettings.auto || settings.auto
    this.time = objSettings.time || settings.time

    this.container = document.querySelector(objSettings.container)



    // Main variables:
    let counter = 0

    let slideshowInterval
    let startSlidShowInterval
    
    let images
    let btnPrev
    let btnNext
    let btnGroup

    let slideName = `${objSettings.container.slice(1)}-slide`
    let btnPrevName = `${objSettings.container.slice(1)}-btnPrev`
    let btnNextName = `${objSettings.container.slice(1)}-btnNext`
    let btnGroupName = `${objSettings.container.slice(1)}-btnGroup`

    window.addEventListener('load', () => {
        this.createContent()
        images = document.querySelectorAll(`.${slideName}`)
        btnPrev = document.querySelector(`.${btnPrevName}`)
        btnNext = document.querySelector(`.${btnNextName}`)
        btnGroup = document.querySelector(`.${btnGroupName}`)
        this.addStyles()

        images[counter].addEventListener('load', () => {
            this.resizeContainer()
        })

        this.startSlideShow()

        btnNext.onclick = () => {
            clearInterval(slideshowInterval)
            clearInterval(startSlidShowInterval)

            startSlidShowInterval = setTimeout(() => {
                this.startSlideShow()
            }, 5000)
            this.next()
        }

        btnPrev.onclick = () => {
            clearInterval(slideshowInterval)
            clearInterval(startSlidShowInterval)

            startSlidShowInterval = setTimeout(() => {
                this.startSlideShow()
            }, 5000)
            this.prev()
        }
    })

    window.addEventListener('resize', () => {
        this.resizeContainer()
    })

    this.createContent = function () {
        let content = ''
        Object.keys(this.slidesCollection).forEach((key) => {
            content += `<img class="img-fluid ${slideName} rounded" src="${this.slidesCollection[key][0]}" alt="${this.slidesCollection[key][1]}">`
        })
        content += `<div class="btn-group ${btnGroupName} text-center d-block" role="group" aria-label="Button group">
                        <button class="btn btn-secondary ${btnPrevName}" type="button">Prev</button>
                        <button class="btn btn-secondary ${btnNextName}" type="button">Next</button>
                    </div>`
        this.container.innerHTML = content
    }

    this.prev = function () {
        images[counter].style.opacity = 0
        counter--
        if (counter < 0) {
            counter = images.length - 1
        }
        images[counter].style.opacity = 1
        this.resizeContainer()
    }

    this.next = function () {
        images[counter].style.opacity = 0
        counter++
        if (counter >= images.length) {
            counter = 0
        }
        images[counter].style.opacity = 1
        this.resizeContainer()
    }

    this.resizeContainer = function () {
        this.container.style.height = images[counter].offsetHeight + 'px'
    }

    this.addStyles = function () {
        this.container.style.position = 'relative'

        for (let item of images) {
            item.style.position = 'absolute'
            item.style.top = 0
            item.style.left = '50%'
            item.style.transform = 'translateX(-50%)'
            item.style.opacity = 0
            item.style.transition = 'all 0.7s'
        }
        images[0].style.opacity = 1

        btnGroup.style.position = 'absolute'
        btnGroup.style.bottom = '15px'
        btnGroup.style.left = '50%'
        btnGroup.style.transform = 'translateX(-50%)'
    }

    this.startSlideShow = function () {
        if (this.auto) {
            slideshowInterval = setInterval(() => this.next(), this.time)
        }
    }

}