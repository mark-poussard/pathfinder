var menu = {
	
	selectLevel : function(containerId, level){
		let container = document.getElementById(containerId);
		controller.init(container, level);
	}
	
};