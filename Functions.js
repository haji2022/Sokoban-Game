let finito=0;
const drawMap = () => {

  document.getElementById("game-board").innerHTML ="";

  for(let y = 0; y<tileMap01.mapGrid.length;y ++)
  {
    const row = tileMap01.mapGrid[y]
    for(let x =0; x<row.length;x++)
    {
      let div = document.createElement("div");

      if (tileMap01.mapGrid[y][x] =="P"){
          div.classList.add(Entities.Character);
         
      }
      else if (tileMap01.mapGrid[y][x] =="W") {
        div.classList.add(Tiles.Wall);
    }
    else if (tileMap01.mapGrid[y][x] =="B") {
        div.classList.add(Entities.Block);
       
    }
    else if (tileMap01.mapGrid[y][x] =="G") {
      div.classList.add(Tiles.Goal);
    }
      else  {
          div.classList.add(Tiles.Space);
      }
     
      div.id = `${x},${y}`;

  
      div.classList.add("tile");

      document.getElementById("game-board").append(div);
    }   
  }
};


drawMap();

function movePlayer(a){
  let offsetXcoord = 0;
  let offsetYcoord = 0;

  if (a==='r') { offsetXcoord = 1}
  if (a==='l') { offsetXcoord = -1}
  if (a==='u') { offsetYcoord = -1}
  if (a==='d') { offsetYcoord = 1}

 

  let player = document.getElementsByClassName(Entities.Character)[0];
  console.log(player)
    let playerPos = player;
    let playerXcoordinate = playerPos.id.split(',')[0];
    let playerYcoordinate = playerPos.id.split(',')[1];

    let playerNextXcoordinate = Math.floor(playerXcoordinate) + offsetXcoord;
    let playerNextYcoordinate = Math.floor(playerYcoordinate) + offsetYcoord;
    let playerNextId = `${playerNextXcoordinate},${playerNextYcoordinate}`;
    console.log(playerNextId);

    let targetPos = document.getElementById(playerNextId);

    if (targetPos.classList.contains('tile-wall')) {
      return;
    }

    if (targetPos.classList.contains(Entities.Block)) {
      let boxNextXcoordinate = Math.floor(playerXcoordinate) + offsetXcoord*2;
      let boxNextYcoordinate = Math.floor(playerYcoordinate) + offsetYcoord*2;
      let boxNextId = `${boxNextXcoordinate},${boxNextYcoordinate}`;
      let afterBoxPos = document.getElementById(boxNextId);
      console.log(boxNextId);
      if (afterBoxPos.classList.contains(Entities.Block) || afterBoxPos.classList.contains(Tiles.Wall)) {
        return;
      }
      else{
        //Move the block
        if (afterBoxPos.classList.contains(Tiles.Goal)){
            afterBoxPos.classList.add(Entities.BlockDone)
       finito++;
        } if  (finito==6 ){
          endGame();
        }
        
        targetPos.classList.remove(Entities.Block);
        afterBoxPos.classList.add(Entities.Block);

        if (targetPos.classList.contains(Tiles.Goal)){
         targetPos.classList.remove(Entities.BlockDone);
         finito--;
       
        }
      }
      
    }
    playerPos.classList.remove(Entities.Character);
    targetPos.classList.add(Entities.Character);
   
  }

  const endGame = ()  =>{
   
    return alert(" Game finish") ;
  }
 
let player = document.querySelectorAll(".entity-player");

 

addEventListener("keydown", function (event) {
    event.preventDefault();
    const key = event.key; // 
    switch (key) {
    case "ArrowLeft":
        movePlayer('l');
    break;

    case "ArrowRight":
       movePlayer('r');
    break;

    case "ArrowUp":
      movePlayer('u');
    break;


    case "ArrowDown":
      movePlayer('d');
    break;

    default:

        console.log('No options');
    break;
    
}

});