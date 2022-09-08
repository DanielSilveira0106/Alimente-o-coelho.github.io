const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var rope;
var fruit;
var fruit_con;
var bg_img;
var fruit_img;
var bunny_img;
var button
var blink;
var eat;
var sad;
var air_sound, eating_sound, sad_sound, sound1_sound, ropecut_sound;
var blower;
var mute_button;
var button2, button3;
var rope2, rope3;
var fruit_con2, fruit_con3;
var canH, canW;
function preload() {
  bg_img = loadImage("background.png");
  fruit_img = loadImage("melon.png");
  bunny_img = loadImage("Rabbit-01.png");
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  sound1_sound = loadSound("sound1.mp3");
  sad_sound = loadSound("sad.wav");
  ropecut_sound = loadSound("rope_cut.mp3");
  air_sound = loadSound("air.wav");
  eating_sound = loadSound("eating_sound.mp3");

  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;
}


function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    canW = dislayWidth;
    canH = displayHeight;
    createCanvas(displayWidth + 80, displayHeight);
  }
  else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);



  }
  engine = Engine.create();
  world = engine.world;
  


  sound1_sound.play();
  sound1_sound.setVolume(0.5);


  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  


  ground = new Ground(200, canH, 1900, 20);
  rope = new Rope(8, { x: 40, y: 30 });
  rope2 = new Rope(7, { x: 370, y: 40 });
  rope3 = new Rope(4, { x: 400, y: 225 });

  var fruit_options = {
    density: 0.001
  }
  fruit = Bodies.circle(300, 300, 20, fruit_options)
  Matter.Composite.add(rope.body, fruit)
  fruit_con = new Link(rope, fruit);
  fruit_con2 = new Link(rope2, fruit);
  fruit_con3 = new Link(rope3, fruit);

  bunny = createSprite(170, canH - 80, 100, 100);
  bunny.addImage(bunny_img)
  bunny.scale = 0.2;
  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.changeAnimation("blinking");
  bunny.addAnimation("crying", sad);


  button = createImg("cut_btn.png");
  button.position(20, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  blower = createImg("balloon.png");
  blower.position(10, 250);
  blower.size(150, 100);
  blower.mouseClicked(airblow);

  mute_button = createImg("mute.png");
  mute_button.position(450, 20);
  mute_button.size(50, 50);
  mute_button.mouseClicked(mute);

  button2 = createImg("cut_btn.png");
  button2.position(330, 35);
  button2.size(60, 60);
  button2.mouseClicked(drop2);

  button3 = createImg("cut_btn.png");
  button3.position(360, 200);
  button3.size(60, 60);
  button3.mouseClicked(drop3);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

}

function draw() {
  background(51);




  image(bg_img, 0, 0, displayWidth + 80, displayHeight);



  //ellipse(fruit.position.x,fruit.position.y,30,30);
  push();
  imageMode(CENTER);
  if (fruit != null) {
    image(fruit_img, fruit.position.x, fruit.position.y, 60, 70)
  }
  pop();
  Engine.update(engine);
  ground.show();
  rope.show();
  rope2.show();
  rope3.show();



  drawSprites();



  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation("eating");
    eating_sound.play();
  }
  if (collide(fruit, ground.body) == true) {
    bunny.changeAnimation("crying");



  }
  if (fruit != null && fruit.position.y >= 650) {
    //image(fruit_img,fruit.position.x,fruit.position.y,60,70)
    bunny.changeAnimation("crying");
    sad_sound.play();
    sound1_sound.stop();
    fruit = null;
    //airblow();
    //collide(body,sprite);
  };
};
function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  ropecut_sound.play();



}
function drop2() {
  ropecut_sound.play();
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;



}
function drop3() {
  ropecut_sound.play();
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;


}
function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 100) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;


    } else {
      return false;


    }
  }



}
function airblow() {
  Matter.Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0.01, y: 0 });
  air_sound.play();



}
function mute() {
  if (sound1_sound.isPlaying()) {
    sound1_sound.stop();
  } else {
    sound1_sound.play();

  }


}


