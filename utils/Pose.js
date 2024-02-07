

class Pose {
    constructor(translation = new Translation(), rotation = 0) {
        this.translation = translation
        this.rotation = fixAngle(rotation)
    }

    lookAt(point) {
        let vectorToPoint = point.subtract(this.translation)
        return new Pose(
            new Translation(this.translation.x, this.translation.y),
            radians_to_degrees(vectorToPoint.angle()))
    }

    add(poseToAdd, applyRotationToPoseToAdd = false) {
        let thisPose = this.clone()
        let pose = poseToAdd.clone()
        if (applyRotationToPoseToAdd) {
            pose = pose.rotateBy(thisPose.rotation)
            return new Pose(thisPose.translation.add(pose.translation), pose.rotation)
        } else {
            return new Pose(thisPose.translation.add(pose.translation), thisPose.rotation + pose.rotation)
        }
    }

    rotateBy(rotation, addRotation = true) {
        let newTranslation = new Translation(
            this.translation.x * Math.cos(degrees_to_radians(rotation))
            - this.translation.y * Math.sin(degrees_to_radians(rotation)),
            this.translation.x * Math.sin(degrees_to_radians(rotation))
            + this.translation.y * Math.cos(degrees_to_radians(rotation))
        )
        let newRotation = null
        if (addRotation) {
            newRotation = this.rotation + rotation
        } else {
            newRotation = this.rotation
        }
        return new Pose(newTranslation, newRotation)
    }

    relativeTo(pose) {
        return pose.negate().add(this, true)
    }

    negate() {
        return new Pose(this.clone().translation.negate(), -this.rotation)
    }

    clone() {
        return new Pose(new Translation(this.translation.x, this.translation.y), this.rotation)
    }

    length() {
        return this.translation.length()
    }

    scale(scalar) {
        return new Pose(new Translation(this.translation.x * scalar, this.translation.y * scalar), this.rotation)
    }
}

// easier vector
class Translation extends Phaser.Math.Vector2 { }

function translationFromBooleans(up = false, down = false, left = false, right = false, normalize = true) {
    let translation = new Translation(numberFromBooleans(right, left), numberFromBooleans(down, up))
    if (normalize) {
        translation = translation.normalize()
    }
    return translation
}

function poseFromBooleans(up = false, down = false, left = false, right = false, ccw = false, cw = false, normalize = true) {
    return new Pose(translationFromBooleans(up, down, left, right, normalize), numberFromBooleans(cw, ccw))
}