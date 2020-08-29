'use strict'

const imgCollection = {
    slide1: ['https://picsum.photos/800', '#'],
    slide2: ['https://picsum.photos/801', '#'],
    slide3: ['https://picsum.photos/802', '#'],
    slide4: ['https://picsum.photos/803', '#'],
    slide5: ['https://picsum.photos/804', '#'],
}

const imgCollection2 = {
    slide1: ['https://picsum.photos/500', '#'],
    slide2: ['https://picsum.photos/501', '#'],
    slide3: ['https://picsum.photos/502', '#'],
    slide4: ['https://picsum.photos/503', '#'],
    slide5: ['https://picsum.photos/504', '#'],
}

let slider = new Slider({
        container: '.galery',
        auto: true,
        time: 3000
    },
    imgCollection)

let slider2 = new Slider({
        container: '.galery2',
    })
