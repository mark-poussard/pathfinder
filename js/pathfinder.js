var controller = {

    nbTilesX : 5,
    nbTilesY : 5,
    selecting : false,
    containerCallBack : undefined,
    previousTileStart : undefined,

    init : function(container, level){
	controller.containerCallBack = container;
	let layout = level.levelLayout();
	for(let j=0, layoutY=layout.length; j<layoutY; j++){
	    for(let i=0, layoutX=layout[j].length; i<layoutX; i++){
		let tile = controller.createTile(layout[j][i]);
		container.appendChild(tile);
	    }
	    let lineBreak = document.createElement("div");
	    lineBreak.className = "lineBreak";
	    container.appendChild(lineBreak);
	}
    },

    createTile : function(tileType){
	let tile = document.createElement("div");
	tile.classList.add("gameTile");
	switch(tileType){
	    case 0:
	        tile.classList.add("emptyTile");
	        break;
	    case 1:
	        tile.classList.add("blocking");
	        break;
	    case 2:
	        tile.classList.add("startTile");
	        controller.previousTileStart = tile;
	        break;
	}
	tile.onclick = controller.tileClick;
	tile.onmouseover = controller.tileOver;
	tile.onmouseenter = controller.tileEnter;
	tile.onmouseleave = controller.tileLeave;
	tile.onmouseup = controller.endSelection;
	return tile;
    },

    tileClick : function(event){
	let tile = event.target;
	if(!tile.classList.contains("blocking")
	  && tile.classList.contains("startTile")){
	    controller.selecting = true;
	}
    },

    tileOver : function(event){
	let tile = event.target;
	tile.classList.add("mouseOver");
    },

    tileEnter : function(event){
	if(controller.selecting){
	    let tile = event.target;
	    if(tile.classList.contains("blocking")
	      || tile.classList.contains("commitedTile")
	      || tile.classList.contains("selectedTile")){
		controller.abortSelection();
	    }
	    else{
		tile.classList.remove("emptyTile");
		tile.classList.add("startTile");
	    }
	}
    },

    tileLeave : function(event){
	let tile = event.target;
	tile.classList.remove("mouseOver");
	if(controller.selecting){
	    tile.classList.add("selectedTile");
	    tile.classList.remove("startTile");
	}
    },

    abortSelection : function(){
	let selectedTiles = document.getElementsByClassName("selectedTile");
	while(selectedTiles.length){
	    selectedTiles[0].classList.add("emptyTile");
	    selectedTiles[0].classList.remove("selectedTile");
	}
	let startTile = document.getElementsByClassName("startTile");
	while(startTile.length){
	    startTile[0].classList.add("emptyTile");
	    startTile[0].classList.remove("startTile");
	}
	controller.selecting = false;
	controller.previousTileStart.classList.add("startTile");
    },

    endSelection : function(){
	if(controller.selecting){
	    let selectedTiles = document.getElementsByClassName("selectedTile");
	    while(selectedTiles.length){
		selectedTiles[0].classList.add("commitedTile");
		selectedTiles[0].classList.remove("selectedTile");
	    }
	    let startTile = document.getElementsByClassName("startTile");
	    controller.previousTileStart = startTile[0];
	    controller.selecting = false;
	    controller.checkGameStatus();
	}
    },

    checkGameStatus : function(){
	let emptyTiles = document.getElementsByClassName("emptyTile");
	if(emptyTiles.length === 0){
	    let winMessage = document.createElement("p");
	    winMessage.innerHTML = "GAME WON !";
	    controller.containerCallBack.appendChild();
	}
    }

};

window.onload = function(){
    let mainContainer = document.getElementById("pathfinder-game");
    controller.init(mainContainer, level1);
}
