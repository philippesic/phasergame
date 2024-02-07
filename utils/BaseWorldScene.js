class BaseWorldScene extends SimpleScene {
    constructor(key) {
        super(key);
        // add scene settings
        this.sendStaticbodyWarning = true
    }

    preload() { }

    create() {
        this.input.setPollAlways();
        // makes the world which is the root of your scene
        this.world = new GameObject(this, "world")
        this.world.isRoot = true
        // adds a camera which represents your camera
        this.world.addChild(new Camera(this))
        this.camera = this.world.getChild("camera")
        // adds a pointer which represents your mouse
        this.world.addChild(new Pointer(this))
        this.pointer = this.world.getChild("pointer")
        this.realPointer = this.pointer.realPointer
        this.camera.giveCam(this.cameras.main)
    }

    update() {
        this.world.preUpdate()
        this.world.regUpdate()
        this.world.postUpdate()
        this.camera.updateCameraPos()
    }

    toggleFullscreen() {
        if (this.scale.isFullscreen) {
            this.scale.stopFullscreen();
        }
        else {
            this.scale.startFullscreen();
        }
    }
}