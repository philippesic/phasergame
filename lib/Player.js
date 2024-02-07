class Player extends GameObject {
    constructor(scene, pose = new Pose()) {
        super(scene, "player", pose, new GameObjectSettings(true, 10))

        this.addSprite(scene.add.circle(0, 0, 8, 0xffee28))
        this.addSprite(scene.add.circle(0, -5, 5, 0x00ffff))


        this.w = this.scene.add.key("w");
        this.s = this.scene.add.key("s");
        this.a = this.scene.add.key("a");
        this.d = this.scene.add.key("d");
        this.shift = this.scene.add.key("shift");

        scene.camera.setChildOf(this)
        scene.camera.pose = new Pose()
        scene.camera.doScroll(true, 1)
        scene.camera.rotateCamera = false

        this.makePhysicBody({
            frictionAir: 0.2,
            shape: {
                type: 'circle',
                radius: 8,
                maxSides: 40
            },
        })
    }

    update() {
        // translation
        this.scene.matter.applyForce(this.physicsObject, translationFromBooleans(
            this.w.isPressed(),
            this.s.isPressed(),
            this.a.isPressed(),
            this.d.isPressed()
        ).scale(this.deltaTimeSec / 100 * (this.shift.isPressed() ? 2 : 1)))
        // rotation
        this.scene.matter.setAngularVelocity(this.physicsObject,
            fixAngle(this.getAngleToObject(this.scene.pointer) + 90 - this.pose.rotation) / 100
        )
    }
}