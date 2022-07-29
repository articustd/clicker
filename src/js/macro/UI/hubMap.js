Macro.add('hubMap', {
    skipArgs: false,
    handler: function () {
        let $container = $('<div/>').addClass('hubMap').append(createSVG())
        $(this.output).append($container)
    }
})

function createSVG() {
    let ns = 'http://www.w3.org/2000/svg'

    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttributeNS(null, 'viewBox', '0 0 684 994')

    let image = document.createElementNS(ns, 'image')
    image.setAttributeNS(null, 'width', '684')
    image.setAttributeNS(null, 'height', '994')
    image.setAttributeNS(null, 'href', 'assets/Bedroom_layout.png')

    svg.appendChild(image)
    svg.appendChild(createRectClickArea(ns,'desk', 405, 517, 259, 464))
    svg.appendChild(createRectClickArea(ns,'bed', 402, 18, 258, 479))
    svg.appendChild(createRectClickArea(ns,'dresser', 22, 17, 187, 108))
    svg.appendChild(createRectClickArea(ns,'bedsideTable', 227, 14, 158, 104))
    svg.appendChild(createRectClickArea(ns,'closet', 37, 944, 314, 50))
    svg.appendChild(createRectClickArea(ns,'door', 2, 318, 40, 174))
    return svg
}

function createRectClickArea(ns, passage, x, y, width, height) {
    let a = document.createElementNS(ns, 'a')
    let rect = document.createElementNS(ns, 'rect')
    rect.setAttributeNS(null, 'x', x)
    rect.setAttributeNS(null, 'y', y)
    rect.setAttributeNS(null, 'fill', '#fff')
    rect.setAttributeNS(null, 'opacity', '0')
    rect.setAttributeNS(null, 'width', width)
    rect.setAttributeNS(null, 'height', height)
    rect.classList.add('loc')

    a.appendChild(rect)

    a.onclick = function() {
        Engine.play(passage)
    }

    return a
}