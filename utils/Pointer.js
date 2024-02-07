class Pointer extends GameObject {
    constructor(scene) {
        super(scene, "pointer")
        this.realPointer = game.input.mousePointer
        //print(this)
        //game.input.on('pointerdown', function (pointer){
        //    this.input.mouse.requestPointerLock();})
    }

    update() {
        this.scene.input.activePointer.updateWorldPoint(this.scene.cameras.main);
        this.pose.translation = new Translation(this.realPointer.worldX, this.realPointer.worldY)
    }
}