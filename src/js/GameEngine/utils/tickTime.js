export function getTicks(minutes) {
    return minutesToTicks(minutes)
}

function minutesToTicks(minutes) {
    return 30 * minutes
}

export function hoursToMinutes(hours) {
    return hours * 60
}