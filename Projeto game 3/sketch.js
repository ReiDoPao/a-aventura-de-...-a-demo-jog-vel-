//entidades
var boneco,boneco_paradoD, boneco_paradoE, boneco_correndoD, boneco_correndoE, boneco_caido;
var monstro,monstroD, monstroE;

//estrutura e colisão
var chao,chao2,chaoImg;
var chaoMal, chaoMalImg;
var chaoColisao, chaoColisao2, chaoColisao3;
var jump,jumpImg;
var ladoE, ladoD;
var terra1, terra1Img;
var nevoa,nevoaImg;

//extras
var vida = 3;
var isMoviment = false;
var left = false;
var iniciar = 0;

function preload (){
  boneco_paradoD = loadImage("assets/Sprite teste1.png");
  boneco_paradoE = loadImage("assets/Sprite teste2.png");
  boneco_correndoD = loadImage("assets/Sprite corre1.png");
  boneco_correndoE = loadImage("assets/Sprite corre2.png");
  boneco_caido = loadImage("assets/Sprite desmaia.png");

  chaoImg = loadImage("assets/terra.png");
  chaoMalImg = loadImage("assets/TexturaChão3.png");
  jumpImg = loadImage("assets/Jump.png");
  terra1Img = loadImage("assets/terra 2.png");
  nevoaImg = loadImage("assets/nevoa.png");

  monstroD = loadImage("assets/monstrinho1.png");
  monstroE = loadImage("assets/monstrinho2.png");
}


function setup() {
  createCanvas(1600,1600);
  chaoGrupo = new Group();
  
  //entidades
  boneco = createSprite(100,100,10,10);
  boneco.addImage(boneco_paradoD);
  boneco.scale = 0.03;

  monstro = createSprite(800,1430,10,10);
  monstro.velocityX = 5;
  monstro.addImage(monstroD);
  monstro.scale = 0.03;

  
 
  //chãos
/*for (c=0; c<=12; c++){
    chao = createSprite(28+64*c,390,64,64);
    chao.addImage(chaoImg);
    chaoGrupo.add(chao);
  }*/

/*for (i=0; i<=12; i++){
  chao2 = createSprite(1000+64*i,700,64,64);
  chao2.addImage(chaoImg);
  chaoGrupo.add(chao2);
}*/

for (i=0; i<=28; i++){
  chaoMal = createSprite(28+64*i,1500,64,64);
  chaoMal.addImage(chaoMalImg);
  chaoGrupo.add(chaoMal);
}

  nevoa = createSprite(800,1500,100,100);
  nevoa.addImage(nevoaImg);

  terra1 = createSprite(382,560,100,100);
  terra1.addImage(terra1Img);
  chaoGrupo.add(terra1);

  chao2 = createSprite(1350,910,100,100);
  chao2.addImage(chaoImg);
  chaoGrupo.add(chao2);

  chaoColisao = createSprite(390,374,800,19);
  chaoColisao.visible = false;

  chaoColisao2 = createSprite(1369,678,800,19);
  chaoColisao2.visible = false;

  chaoColisao3 = createSprite(800,1480,1600,10);
  chaoColisao3.visible = false;

  jump = createSprite(1000,635,30,30);
  jump.addImage(jumpImg);

  ladoE = createSprite(0,800,30,width);
  ladoD = createSprite(1600,800,30,width);
  ladoD.visible = false;
  ladoE.visible = false;


  //boneco.debug = true; 
}

function draw() 
{
  background(51);

  //colisões
  boneco.collide(chaoColisao);
  boneco.collide(chaoColisao2);
  boneco.collide(chaoColisao3);
  boneco.collide(ladoD);
  boneco.collide(ladoE);

  monstro.collide(chaoColisao3);



//Texto indicativo
fill('white');
textSize(20);
text('<-- pule aqui dentro', 1030, 650);
text('•Setinhas para andar', 80, 100);
text('•Espaço para pular', 80, 150);
text('⇦ ⇨', 325, 100);
text('⇧', 342, 90);
text('⇩', 342, 110);
text('▂▂▂▂▂▂',320, 150);
textSize(30);
text('Monstros!', 460, 640);
textSize(50);
text('⇩',400,650);




if (iniciar === 0){
textSize(40);
text('Presione espaço para iniciar',400, -300); 
if (keyDown("space")){
  iniciar = 1;
}
}


  //movimentos
  if (vida > 0 && iniciar === 1){
  textSize(25);
  text('vidas:' + vida, camera.x - 780, camera.y - 100);


if (keyIsDown(RIGHT_ARROW)){
   boneco.x = boneco.x + 8;
   isMoviment = true;
   left = false;
  }

  if (keyIsDown(LEFT_ARROW)){
    boneco.x = boneco.x - 8;
    isMoviment = true;
    left = true;
   }

   if (keyWentUp(RIGHT_ARROW) || keyWentUp(LEFT_ARROW)){
    isMoviment = false;
   }

  if (keyDown("space") && boneco.isTouching(chaoGrupo)){
  boneco.velocityY = boneco.velocityY - 15;
  }
    if (isMoviment == true && left == true){
    boneco.addImage(boneco_correndoE);
  }

  if (isMoviment == true && left == false){
    boneco.addImage(boneco_correndoD);
  }

  if(isMoviment == false && left == false){
    boneco.addImage(boneco_paradoD);
  }
  if(isMoviment == false && left == true){
    boneco.addImage(boneco_paradoE);
  }
}

  if (vida <= 0){
    textSize(50);
    fill('red');
    text('você desmaiou!', camera.x - 150, camera.y);
    textSize(20);
    fill('white');
    text('o monstro é forte demais pra atacar', camera.x - 150, camera.y +50);
    text('aperte K para ressurgir', camera.x - 87, camera.y +70);
    boneco.addImage(boneco_caido);

    if (keyDown("k")){
    boneco.x = 400;
    boneco.y = 200;
    vida = 3;
    boneco.addImage(boneco_paradoD);
  }

  
}

  //Jump
  if (boneco.isTouching(jump)){
    boneco.velocityY = boneco.velocityY - 10;
  }
  
  
  // camera
  camera.position.y = boneco.y - 200;

  
  //monstro coisas
    if (monstro.collide(boneco)){
    vida -= 1;
    if (left == true){
      boneco.x += 140;
      monstro.velocityX -= 5;
      monstro.addImage(monstroE);
    }
    if (left == false){
      boneco.x -= 140;
      monstro.velocityX += 5;
      monstro.addImage(monstroD);
    }
  }
 
  if(monstro.collide(ladoD)){
    monstro.velocityX -= 5;
    monstro.addImage(monstroE);
    
  }
  if (monstro.collide(ladoE)){
    monstro.velocityX += 5;
    monstro.addImage(monstroD);
    }
 
  //console.log(isMoviment);
  //console.log(iniciar);
  //console.log(vida)


  //gravidade
  boneco.velocityY = boneco.velocityY + 0.8;

  //Profundidade
  //boneco.depth = chao.depth;
  boneco.depth = boneco.depth + 1;

 
  drawSprites();


}
