const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ground, snowball1;
var backgroundImg, slingshot;
var snowboy,platform;
var score=0
var gameState = "onSling";
function preload() {
  backgroundImg = loadImage("SNOWBackground.jpg");
  snowboy1=loadImage("snowboy.png")
  
}
function setup() {
  createCanvas(800,400);
  snowboy=createSprite(700, 350, 50, 50);
  
  snowboy.addImage(snowboy1)
  snowboy.scale=0.1
  
  engine = Engine.create();
  world = engine.world;

platform=new Ground(200,320,200,210)
  ground = new Ground(400,height,1200,20);
  snowball1 = new snowball(200, 50, 50, 50);


  slingshot = new SlingShot(snowball1.body,{x:200, y:50});
}

function draw() {
  background(backgroundImg); 
  Engine.update(engine); 
  snowball1.display()
  slingshot.display()
  ground.display()
  
  platform.display()
  
  fill("blue")
  textSize(30)
  text("Score="+score,50,100)
  
  
  drawSprites();
}
function mouseDragged(){
  if (gameState!=="launched"){
      Matter.Body.setPosition(snowball1.body, {x: mouseX , y: mouseY});
  }
}


function mouseReleased(){
  slingshot.fly();
  gameState = "launched";
  score++
}

function keyPressed(){
  if(keyCode === 32){
      snowball1.trajectory=[]
      Matter.Body.setPosition(snowball1.body,{x:200,y:50})
     slingshot.attach(snowball1.body);
  }
}