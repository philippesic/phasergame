class Scene1 extends BaseWorldScene {
    constructor() {
        super("Scene1");
    }

    preload() {
    }

    create() {
        super.create()
        // make player
        this.world.addChild(new Player(this, new Pose(new Translation(300, 0), 0)))
        // this.world.addChild(new Player(this, new Pose(new Translation(300, 40), 0)))
        // this.world.addChild(new Player(this, new Pose(new Translation(340, 0), 0)))
        // this.world.addChild(new Player(this, new Pose(new Translation(340, 40), 0)))
        // make blocks
        this.world.addChild(new Block(this, new Pose(new Translation(250, 60), 0)))
        this.world.addChild(new Block(this, new Pose(new Translation(220, 50), 0)))
        this.world.addChild(new Block(this, new Pose(new Translation(230, 30), 0)))
        this.world.addChild(new StaticBlock(this, new Pose(new Translation(240, -30), 0)))
        this.world.addChild(new StaticBlock(this, new Pose(new Translation(260, 0), 0)))
    }

    update() {
        super.update()
    }
}