//const Engine = Matter.Engine;
//const World= Matter.World;
//const Bodies = Matter.Bodies;
//const Constraint = Matter.Constraint;
var gameState='landingPage';
var score;



function preload(){
jerryAnimation=loadAnimation("pics/run1.png","pics/run2.png","pics/run3.png");
dogAnimation=loadAnimation("pics/dog1.png","pics/dog2.png","pics/dog3.png","pics/dog4.png")
//tomJump=loadImage("pics/tomjump.png");
//tomfly=loadImage("pics/tomfly.png");

tomAnimation=loadAnimation("cat images/catrun1.png","cat images/catrun2.png","cat images/catrun3.png",
"cat images/catrun4.png","cat images/catrun5.png",
"cat images/catrun6.png","cat images/catrun7.png","cat images/catrun8.png");

Mainbackground=loadImage("pics/mainBG.png");
Next=loadImage("pics/next.png");
background1=loadImage("pics/background 1.jpeg");
background2=loadImage("pics/background 2.png");
}

function setup(){
    createCanvas(1200,600)
    level1=createSprite(displayWidth/2,displayHeight/2-100,30,30);
    level1.addImage(background1);
    level1.scale=2;
    level1.velocityX=-10;
    level1.visible=false;

    MainBackground=createSprite(displayWidth/2-450,displayHeight/2-250,30,30);
    MainBackground.addImage(Mainbackground);
    MainBackground.scale=0.5

    next=createSprite(1000,500,50,50);
    next.addImage(Next);
    next.scale=0.2

    level2BG=createSprite(displayWidth/2,displayHeight/2-300,30,30);
    level2BG.addImage(background2);
    level2BG.velocityX=-10
    level2BG.visible=false;
    level2BG.scale=1.5

    jerry=createSprite(400,500,20,20)
    jerry.addAnimation("jerryrun",jerryAnimation);
    jerry.scale=0.7;

    tom=createSprite(jerry.x-200,jerry.y,20,20);
    tom.addAnimation("tomrun",tomAnimation);

    ground=createSprite(600,580,1200,20);

   dogGroup=new Group();
    

    score=0;

    /*
    engine=Engine.create();
    world=engine.world;
    Engine.run(engine)
   jerry=new Jerry(200,200)
   tom=new Tom(50,jerry.body.position.y);
  jerry=Bodies.rectangle(100,100,50,50);
  World.add(world,jerry)
  jerry.addAnimation("jerryrun",jerryAnimation)
  */
}

function draw(){
background(0);

if(gameState=='landingPage'){
level1.visible=false;
next.visible=true;
jerry.visible=false;
tom.visible=false;
ground.visible=false;
//level2BG.visible=false;

if(mousePressedOver(next)){
    gameState='level1'
}

drawSprites();
}


if(gameState=='level1'){

    score=score+Math.round(getFrameRate()/60)
 level1.visible=true;
next.visible=false;
jerry.visible=true;
tom.visible=true;
//level2BG.visible=false;
MainBackground.visible=false;
ground.visible=false;
if(keyWentDown("right")){
    tom.velocityX=4;
}

if(keyWentUp("right")){
    tom.velocityX=0
}

if(keyWentDown("enter")){
    jerry.velocityX=4;
}

if(keyWentUp("enter")){
    jerry.velocityX=0
}
if(level1.x<0){
 level1.x=displayWidth/2
}

drawSprites();
fill("black")
textSize(20);
text("score:"+score,displayWidth-1000,50);

if(score>100 ){
    gameState="level2"
}
}

if (keyDown("space")){
    jerry.velocityY=-12
}


jerry.collide(ground);

jerry.velocityY=jerry.velocityY+0.5


   

if(gameState=="level2"){
    background("orange");
   level2BG.visible=true;
    level1.visible=false;
    tom.visible=false;
    next.visible=false;

    if(level2BG.x<0){
        level2BG.x=displayWidth/2
    }
    spawnDog();
    drawSprites();

}



}

function spawnDog(){
    if(World.frameCount%100===0){
        var dog=createSprite(displayWidth,height-100,10,10)
       dog.addAnimation("dogrun",dogAnimation);
        dog.velocityX=-10;
        dogGroup.add(dog);
        console.log("test")
    }
}