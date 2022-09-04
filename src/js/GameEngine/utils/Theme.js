import _ from "lodash"

export let Theme = {
    primary: '#FFFFFF', 
    secondary: '#0000FF',
    primaryFont: '#000000',
    secondaryFont: '#000000',
    backgroundColor: '#4488aa'
}

export function getPrimary(hex) {
    if(hex)
        return Theme.primary

    return trimHex(Theme.primary)
}

export function getSecondary(hex) {
    if(hex)
        return Theme.secondary

    return trimHex(Theme.secondary)
}

export function getPrimaryFont(hex) {
    if(hex)
        return Theme.primaryFont

    return trimHex(Theme.primaryFont)
}

function trimHex(value) {
    return _.toNumber('0x'+_.trim(value, '#'))
}