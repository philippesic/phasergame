// Game configuration object 
let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    backgroundColor: 0x000000,
    scene: [Scene1],
    parent: "phaser-div",
    dom: {
        createContainer: true
    },
    fontFamily: `Arial`,
    physics: {
        default: 'matter',
        matter: {
            debug: {
                showBody: false,
                showStaticBody: false
            },
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
};

//global data object
let data = {
    //score: 0,
    //lives: 3,
    //health 100,
}


//Create a Phaser Game using the config
const game = new Phaser.Game(config);
