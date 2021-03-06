var menu = {
	
	selectLevel : function(containerId, level){
		let container = document.getElementById(containerId);
		controller.init(container, level);
		let buttonContainer = document.getElementById("Level" + (level+1));
		let selectedButtons = document.getElementsByClassName("selectedButton");
		while(selectedButtons.length){
			selectedButtons[0].classList.remove("selectedButton");
		}
		buttonContainer.classList.add("selectedButton");
	},

	generateMenu : function(container){
		let list = document.createElement("ul");
		let levelList = levels.levelLayout();
		for(let i=0, nLevels=levelList.length; i<nLevels; i++){
			let menuItem = document.createElement("li");
			let menuButton = document.createElement("input");
			menuButton.id = "Level" + (i+1);
			menuButton.type = "button";
			menuButton.value = "Level " + (i+1);
			menuButton.onclick = function() { menu.selectLevel('pathfinder-game', i) };
			
			menuItem.appendChild(menuButton);
			list.appendChild(menuItem);
		}
		container.appendChild(list);
	}
	
};