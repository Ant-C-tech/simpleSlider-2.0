function Slider(objSettings, objSource) {

    this.container = document.querySelector(objSettings.container)
    this.slidesCollection = objSource
    this.auto = objSettings.auto
    this.time = objSettings.time

    let counter = 0
    let interval
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

        btnNext.onclick = () => {
            clearInterval(interval)
            this.next()
        }

        btnPrev.onclick = () => {
            clearInterval(interval)
            this.prev()
        }
    })

    window.addEventListener('resize', () => {
        this.resizeContainer()
    })

    if (this.auto) {
        interval = setInterval(() => this.next(), this.time)
    }

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

}