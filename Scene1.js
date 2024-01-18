class Scene1 extends SimpleScene {
  constructor() {
    super("Scene1");
  }

  preload() {

  }

  create() {
    // add text
    this.info = this.add.text(10, 10, "This is Scene1.js", 0xFFFFFF);
    // add circle
    this.circ = this.add.circle(100, 100, 20, 0x00FF00);
    // add rectangle
    this.square = this.add.rectangle(100, 200, 40, 40, 0x0000FF);
    //enable click on square
    this.square.enableClick();

    //Emoji example 
    this.heart = this.add.emoji(100, 300, "🔥", 20);

    
    // Uncomment line below to draw the grid
    this.drawGrid();
  }

  update() {
    // check if square was clicked
    if (this.square.wasClicked()) {
      // move circle to the right
      this.circ.x += 10;
      this.heart.x += 5;
    }
  }
}