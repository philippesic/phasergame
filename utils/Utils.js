function radians_to_degrees(radians) {
    return radians * (180 / Math.PI)
}

function degrees_to_radians(degrees) {
    return degrees / (180 / Math.PI)
}

function print(x) {
    console.log(x)
}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max)
}

function numberFromBooleans(boolPos = false, boolNeg = false) {
    return (boolPos ? 1 : 0) + (boolNeg ? -1 : 0)
}

function fixAngle(angle) {
    angle = angle % 360
    if (angle > 180)
        angle -= 360
    return angle
}