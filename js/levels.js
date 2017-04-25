var level1 = {

	levelNumber : 1,

    levelLayout : function(){
	let layout = [];
	layout[0] = [0, 0, 0, 0, 3];
	layout[1] = [0, 0, 0, 0, 0];
	layout[2] = [0, 0, 0, 0, 0];
	layout[3] = [1, 1, 0, 0, 0];
	layout[4] = [2, 0, 0, 0, 0];

	return layout;
    },
	
	nextLevel : level2

};

var level2 = {

	levelNumber : 2,

    levelLayout : function(){
	let layout = [];
	layout[0] = [0, 0, 0, 0, 0, 0, 3];
	layout[1] = [0, 1, 0, 0, 0, 0, 0];
	layout[2] = [0, 0, 0, 0, 0, 1, 0];
	layout[3] = [0, 0, 0, 0, 0, 0, 0];
	layout[4] = [0, 0, 0, 0, 1, 0, 0];
	layout[5] = [1, 0, 0, 0, 0, 0, 0];
	layout[6] = [2, 0, 0, 0, 0, 0, 0];

	return layout;
    },
	
	nextLevel : level3

};

var level3 = {

	levelNumber : 3,

    levelLayout : function(){
	let layout = [];
	layout[0] = [0, 0, 0, 0, 0];
	layout[1] = [0, 0, 0, 0, 0];
	layout[2] = [0, 0, 3, 0, 0];
	layout[3] = [0, 0, 0, 0, 0];
	layout[4] = [2, 0, 0, 0, 0];

	return layout;
    },
	
	nextLevel : level4

};

var level4 = {

	levelNumber : 4,

    levelLayout : function(){
	let layout = [];
	layout[0] = [0, 0, 0, 0, 0];
	layout[1] = [0, 0, 0, 0, 0];
	layout[2] = [0, 0, 1, 0, 0];
	layout[3] = [3, 0, 0, 0, 0];
	layout[4] = [2, 0, 0, 0, 0];

	return layout;
    },
	
	nextLevel : level1

};