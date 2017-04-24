var controller = {

    nbTilesX : 5,
    nbTilesY : 5,
    selecting : false,
    containerCallBack : undefined,
    previousTileStart : undefined,

    init : function(container, level){
	controller.containerCallBack = container;
	controller.destroy();
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
		case 3:
			tile.classList.add("goalTile");
			break;
	}
	tile.onmousedown = controller.tileClick;
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
		else if(tile.classList.contains("goalTile")){
			controller.endSelection();
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
	if(controller.previousTileStart){
		controller.previousTileStart.classList.remove("emptyTile");
		controller.previousTileStart.classList.add("startTile");
	}
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
	let startTile = document.getElementsByClassName("startTile");
	if(emptyTiles.length === 0 && startTile.length === 0){
	    let winMessage = document.createElement("p");
	    winMessage.innerHTML = "GAME WON !";
	    controller.containerCallBack.appendChild(winMessage);
	}
	else if(startTile.length === 0){
		let loseMessage = document.createElement("p");
	    loseMessage.innerHTML = "GAME LOST.";
	    controller.containerCallBack.appendChild(loseMessage);
		
	}
    },
	
	destroy : function(){
		if(controller.containerCallBack){
			let node = controller.containerCallBack;
			while(node.firstChild){
				node.removeChild(node.firstChild);
			}
		}
	}

};

window.onload = function(){
    let mainContainer = document.getElementById("pathfinder-game");
    controller.init(mainContainer, level1);
}

window.onmouseup = function(event){
	controller.abortSelection();
}

var mouseX = 0;
var mouseY = 0;
window.onmousemove = function(event){
	let deltaX = event.pageX - mouseX;
	let deltaY = event.pageY - mouseY;
	if((Math.abs(deltaX) > 100)
		|| (Math.abs(deltaY) > 100)){
		controller.abortSelection();
	}
	mouseX = event.pageX;
	mouseY = event.pageY;
}
