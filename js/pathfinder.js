var controller = {

    nbTilesX : 5,
    nbTilesY : 5,
    selecting : false,
    containerCallBack : undefined,
	currentLevel : 0,
    previousTileStart : undefined,

    init : function(container, level){
	controller.containerCallBack = container;
	controller.currentLevel = level;
	controller.destroy();
	let layout = levels.levelLayout()[level];
	container.style.width = ((layout[0].length) * 52) + "px";
	for(let j=0, layoutY=layout.length; j<layoutY; j++){
	    for(let i=0, layoutX=layout[j].length; i<layoutX; i++){
		let tile = controller.createTile(layout[j][i]);
		container.appendChild(tile);
	    }
	    let lineBreak = document.createElement("div");
	    lineBreak.className = "lineBreak";
	    container.appendChild(lineBreak);
	}
	let resetButton = document.createElement("input");
		resetButton.id = "gameInteractButton";
		resetButton.value = "Reset level";
		resetButton.type = "button";
		resetButton.onclick = function() { controller.init(controller.containerCallBack, controller.currentLevel) };
		container.appendChild(resetButton);
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
		case '-':
			tile.classList.add("emptyTile");
			tile.classList.add("hOnlyTile");
			break;
		case '|':
			tile.classList.add("emptyTile");
			tile.classList.add("vOnlyTile");
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
		if(!controller.isMoveValid(tile)){
			controller.abortSelection();
		}
	    else if(tile.classList.contains("blocking")
	      || tile.classList.contains("commitedTile")
	      || tile.classList.contains("selectedTile")){
		controller.abortSelection();
	    }
		else if(tile.classList.contains("goalTile")){
			controller.endSelection();
		}
		else if(tile.classList.contains("hOnlyTile")){
			let tileRect = tile.getBoundingClientRect();
			if(mouseY < tileRect.top
			|| mouseY > tileRect.bottom){
				controller.abortSelection();	
			}
			else{
				tile.classList.remove("emptyTile");
				tile.classList.add("startTile");
			}
		}
		else if(tile.classList.contains("vOnlyTile")){
			let tileRect = tile.getBoundingClientRect();
			if(mouseX < tileRect.left
			|| mouseX > tileRect.right){
				controller.abortSelection();	
			}
			else{
				tile.classList.remove("emptyTile");
				tile.classList.add("startTile");
			}
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
		if(tile.classList.contains("hOnlyTile")){
			let tileRect = tile.getBoundingClientRect();
			if(event.pageY < tileRect.top
			|| event.pageY > tileRect.bottom){
				controller.abortSelection();	
			}
		}
		else if(tile.classList.contains("vOnlyTile")){
			let tileRect = tile.getBoundingClientRect();
			if(event.pageX < tileRect.left
			|| event.pageX > tileRect.right){
				controller.abortSelection();	
			}
		}
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
	    winMessage.innerHTML = "LEVEL WON !";
	    controller.containerCallBack.appendChild(winMessage);
		
		let nextLevelButton = document.getElementById("gameInteractButton");
		nextLevelButton.value = "Next level";
		nextLevelButton.onclick = function() { menu.selectLevel('pathfinder-game', (controller.currentLevel + 1)) };
	}
	else if(startTile.length === 0){
		let loseMessage = document.createElement("p");
	    loseMessage.innerHTML = "GAME LOST.";
		let resetButton = document.getElementById("gameInteractButton");
		resetButton.value = "Reset level";
		resetButton.onclick = function() { controller.init(controller.containerCallBack, controller.currentLevel) };
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
	},
	
	isMoveValid : function(tile){
		let tileRect = tile.getBoundingClientRect();
		if((mouseX < tileRect.left && mouseY < tileRect.top)
			|| (mouseX < tileRect.left && mouseY > tileRect.bottom)
			|| (mouseX > tileRect.right && mouseY < tileRect.top)
			|| (mouseX > tileRect.right && mouseY > tileRect.bottom)){
			return false;
		}
		return true
	}

};

window.onload = function(){
	let menuContainer = document.getElementById("menu");
	menu.generateMenu(menuContainer);
	let buttonContainer = document.getElementById("Level1");
	menu.selectLevel("pathfinder-game", 0);
}

window.onmouseup = function(event){
	controller.abortSelection();
}

var mouseX = 0;
var mouseY = 0;
window.onmousemove = function(event){
	let deltaX = event.pageX - mouseX;
	let deltaY = event.pageY - mouseY;
	if((Math.abs(deltaX) > 50)
		|| (Math.abs(deltaY) > 50)){
		controller.abortSelection();
	}
	mouseX = event.pageX;
	mouseY = event.pageY;
}
