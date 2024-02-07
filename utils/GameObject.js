class GameObject {
    constructor(scene, name, pose = new Pose(), settings = new GameObjectSettings()) {
        this.scene = scene
        this.name = name
        this.pose = pose
        this.settings = settings
        this.parent = null
        this.children = []
        this.spriteContainer = this.scene.add.container(this.pose.translation.x, this.pose.translation.y,)
        this.lastUpdate = new Date().getTime()
        this.isRoot = false
        this.deltaTimeMS = 0
        /** Check "https://brm.io/matter-js/docs/classes/Body.html" and "https://newdocs.phaser.io/docs/3.54.0/Phaser.Physics.Matter.MatterPhysics" for more info */
        this.physicsObject = null
    }

    addChild(child) {
        child.setParent(this)
        this.children.push(child)
    }

    remove(removeData = true) {
        if (removeData) {
            for (let child of this.children) {
                child.remove()
            }
            for (let sprite of this.sprites) {
                sprite.destroy()
            }
            for (let key of Object.keys(this)) {
                delete this[key]
            }
        }
        this.getParent().children = this.getParent().children.filter(
            function isNotThis(item) { return item != this })
    }

    setParent(parent) {
        this.parent = parent
    }

    getParent() {
        return this.parent
    }

    getChild(name = null, sameNameIndex = 0) {
        if (name == null) {
            return this.children[sameNameIndex]
        }
        for (let child of this.children) {
            if (child.name == name) {
                if (sameNameIndex <= 0) {
                    return child
                } else {
                    sameNameIndex -= 1
                }
            }
        }
        return null
    }

    setChildOf(object) {
        this.remove(false)
        object.addChild(this)
    }

    addSprite(texture, pose = null, layer = null) {
        if (pose != null) {
            texture.x = pose.translation.x
            texture.y = pose.translation.y
            texture.angle = pose.rotation
        }
        if (layer != null) {
            texture.setDepth(layer)
        }
        this.spriteContainer.add(texture)
        return this.spriteContainer.getIndex(texture)
    }

    getSprite(index = 0) {
        return this.spriteContainer.getAt(index)
    }

    getRelativeToParentPose() {
        return this.parent.pose.add(this.pose, true)
    }

    getRelativeToObject(otherObject) {
        return this.getGloblePose().relativeTo(otherObject.getGloblePose())
    }

    getGloblePose() {
        let pose = this.pose.clone()
        let object = this
        while (object.getParent() != null) {
            object = object.getParent()
            pose = object.pose.add(pose, true)
        }
        return pose
    }

    setGloblePose(pose) {
        this.pose = pose.relativeTo(this.parent.getGloblePose())
    }

    getAngleToObject(object) {
        let toObject = object.getGloblePose().relativeTo(new Pose(
            this.getParent().getGloblePose().translation,
            this.getParent().getGloblePose().rotation)).add(this.pose.negate())
        return radians_to_degrees(toObject.translation.angle())
    }

    getPoseToObject(object) {
        let toObject = object.getGloblePose().relativeTo(new Pose(
            this.getParent().getGloblePose().translation,
            this.getParent().getGloblePose().rotation)).add(this.pose.negate())
        return toObject
    }

    getGlobalLayer() {
        let layer = this.settings.layer
        if (this.settings.layerRelativeToParent) {
            let object = this
            while (object.getParent() != null) {
                object = object.getParent()
                layer = object.settings.layer + layer
            }
        }
        return layer
    }


    /**
     * Makes the GameObject react to physics
     *
     * @param   vertexSets  The vertices data. An array of vertices.
     * @param   config  The config for this physic body. Check "https://rexrainbow.github.io/phaser3-rex-notes/docs/site/matterjs-gameobject/#config" for more info
     * 
     */
    makePhysicBody(config = null) {
        config = this.makeConfig(config)
        if (config.position.x == null) {
            config.position.x = this.spriteContainer.x
        }
        if (config.position.y == null) {
            config.position.y = this.spriteContainer.y
        }
        if (config.angle == null) {
            config.angle = this.spriteContainer.angle
        }
        this.physicsObject = this.scene.matter.add.gameObject(this.spriteContainer, config).body;
    }

    makeConfig(configSetting) {
        let defaultConfigSetting = {
            label: 'Body',
            shape: {
                type: 'circle',
                radius: 10,
                maxSides: 25
            },
            chamfer: null,
            position: {},
            isStatic: false,
            isSensor: false,
            isSleeping: false,
            ignoreGravity: false,
            ignorePointer: false,

            sleepThreshold: 60,
            density: 0.001,
            restitution: 0,
            friction: 0.1,
            frictionStatic: 0.5,
            frictionAir: 0.01,

            force: { x: 0, y: 0 },
            angle: 0,
            torque: 0,

            collisionFilter: {
                group: 0,
                category: 0x0001,
                mask: 0xFFFFFFFF,
            },

            // parts: [],

            // plugin: {
            //     attractors: [
            //         (function(bodyA, bodyB) { return {x, y}}),
            //     ]
            // },

            slop: 0.05,

            timeScale: 1,
        }
        return Object.assign(defaultConfigSetting, configSetting)
    }

    isTrigger(isTrigger = true) {
        if (this.physicsObject == null) {
            print("Error: This game object is not a physic body")
        } else {
            this.physicsObject.setSensor(isTrigger)
        }
    }

    preUpdate() {
        if (this.physicsObject != null) {
            this.setGloblePose(
                new Pose(
                    new Translation(this.physicsObject.position.x, this.physicsObject.position.y),
                    radians_to_degrees(this.physicsObject.angle)
                )
            )
        }
        for (let child of this.children) {
            child.preUpdate()
        }
        this.deltaTimeMs = new Date().getTime() - this.lastUpdate
        this.deltaTimeSec = this.deltaTimeMs/1000
        this.lastUpdate = new Date().getTime()
    }

    regUpdate() {
        for (let child of this.children) {
            child.regUpdate()
        }
        this.update()
    }

    postUpdate() {
        if (this.physicsObject != null) {
            this.setGloblePose(
                new Pose(
                    new Translation(this.physicsObject.position.x, this.physicsObject.position.y),
                    radians_to_degrees(this.physicsObject.angle)
                )
            )
        }
        let globalPose = this.getGloblePose()
        this.spriteContainer.x = globalPose.translation.x
        this.spriteContainer.y = globalPose.translation.y
        this.spriteContainer.angle = globalPose.rotation

        let layer = this.getGlobalLayer()
        if (this.spriteContainer.depth != layer) {
            this.spriteContainer.setDepth(layer)
        }
        if (this.spriteContainer.visible != this.settings.isVisible) {
            this.spriteContainer.setVisible(this.settings.isVisible)
        }
        // start childern updating
        for (let child of this.children) {
            child.postUpdate()
        }
    }

    update() { }
}


/**
 * Represents the settings for a game object.
 * 
 * @param {boolean} isVisible - Indicates whether the game object is visible.
 * @param {number} layer - The layer of the game object.
 * @param {boolean} layerRelativeToParent - Indicates whether the layer is relative to the parent.
 * @param {boolean} doCollisions - Indicates whether collisions are enabled for the game object.
 * @param {number[]} collisionLayers - Layers that this game object collides on.
 * 
 */
class GameObjectSettings {
    constructor(isVisible = true, layer = 1, layerRelativeToParent = true, doCollisions = true, collisionLayers = [1]) {
        this.isVisible = isVisible
        this.layer = layer
        this.layerRelativeToParent = layerRelativeToParent
        this.doCollisions = doCollisions
        this.collisionLayers = collisionLayers
    }
}