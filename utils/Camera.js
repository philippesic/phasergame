class Camera extends GameObject {
    constructor(scene) {
        super(scene, "camera", new Pose(), new GameObjectSettings())
        this.rotateCamera = false
    }

    giveCam(camera) {
        this.camera = camera
        this.pose.translation.x = this.camera.midPoint.x
        this.pose.translation.y = this.camera.midPoint.y
    }

    // note zooming in increases zoom
    doScroll(enabled, speed = 1, min = 0.5, max = 2) {
        if (enabled) {
            this.scene.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
                if (deltaY > 0) {
                    this.scene.cameras.main.zoom = clamp(this.scene.cameras.main.zoom - speed * 0.1, min, max)
                }
                if (deltaY < 0) {
                    this.scene.cameras.main.zoom = clamp(this.scene.cameras.main.zoom + speed * 0.1, min, max)
                }
            })
        } else {
            this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => { })
        }
    }

    updateCameraPos() {
        this.camera.centerOn(
            this.getGloblePose().translation.x,
            this.getGloblePose().translation.y
        )
        if (this.rotateCamera) {
            this.camera.rotation = -degrees_to_radians(this.getGloblePose().rotation)
        } else {
            this.pose.rotation -= this.getGloblePose().rotation + -radians_to_degrees(this.camera.rotation)
        }
    }
}