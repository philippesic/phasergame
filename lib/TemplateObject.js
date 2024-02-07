class Template extends GameObject {
    constructor(scene, name, pose = new Pose()) {
        super(scene, name, pose, new GameObjectSettings())
    }

    update() {
        super.update()

        // code goes here

        super.updateDisplay()
    }
}