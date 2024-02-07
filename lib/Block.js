class Block extends GameObject {
    constructor(scene, pose = new Pose()) {
        super(scene, "player", pose, new GameObjectSettings(true, 1))

        this.addSprite(scene.add.circle(0, 0, 8, 0x005588))

        this.makePhysicBody({
            frictionAir: 0.03,
            shape: {
                type: 'circle',
                radius: 8,
                maxSides: 40
            },
        })
    }

    update() {
    }
}