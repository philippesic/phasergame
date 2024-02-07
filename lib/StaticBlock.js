class StaticBlock extends GameObject {
    constructor(scene, pose = new Pose()) {
        super(scene, "player", pose, new GameObjectSettings(true, 1))

        this.addSprite(scene.add.circle(0, 0, 8, 0xff5588))

        this.makePhysicBody({
            shape: {
                type: 'circle',
                radius: 8,
                maxSides: 40
            },
            isStatic: true,
        })
    }

    update() {
    }
}