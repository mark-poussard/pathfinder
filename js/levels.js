var levels = {

    levelLayout : function(){
	let layout = [];
	
	layout[0] = []
	layout[0][0] = [0, 0, 0, 0, 3];
	layout[0][1] = [0, 0, 0, 0, 0];
	layout[0][2] = [0, 0, 0, 0, 0];
	layout[0][3] = [1, 1, 0, 0, 0];
	layout[0][4] = [2, 0, 0, 0, 0];

	layout[1] = []
	layout[1][0] = [0, 0, 0, 0, 0, 0, 3];
	layout[1][1] = [0, 1, 0, 0, 0, 0, 0];
	layout[1][2] = [0, 0, 0, 0, 0, 1, 0];
	layout[1][3] = [0, 0, 0, 0, 0, 0, 0];
	layout[1][4] = [0, 0, 0, 0, 1, 0, 0];
	layout[1][5] = [1, 0, 0, 0, 0, 0, 0];
	layout[1][6] = [2, 0, 0, 0, 0, 0, 0];
	
	layout[2] = []
	layout[2][0] = [0, 0, 0, 0, 0];
	layout[2][1] = [0, 0, 0, 0, 0];
	layout[2][2] = [0, 0, 3, 0, 0];
	layout[2][3] = [0, 0, 0, 0, 0];
	layout[2][4] = [2, 0, 0, 0, 0];
	
	layout[3] = []
	layout[3][0] = [0, 0, 0, 0, 0];
	layout[3][1] = [0, 0, 0, 0, 0];
	layout[3][2] = [0, 0, 1, 0, 0];
	layout[3][3] = [3, 0, 0, 0, 0];
	layout[3][4] = [2, 0, 0, 0, 0];
	
	layout[4] = []
	layout[4][0] = [0,  0 , '-', 0,  0 ];
	layout[4][1] = [0,  0 , '-', 0,  0 ];
	layout[4][2] = [0, '|',  1 , 0, '|'];
	layout[4][3] = [3,  0 ,  0 , 0,  0 ];
	layout[4][4] = [2,  0 ,  0 , 0,  0 ];
	
	layout[5] = []
	layout[5][0] = [0, 0, 0, 0, 0, 0, 0, 0];
	layout[5][1] = [0, 0, 0, 0, 0, 0, 0, 0];
	layout[5][2] = [0, 0, 0, 0, 0, 0, 0, 0];
	layout[5][3] = [0, 0, 0, 2, 0, 0, 0, 0];
	layout[5][4] = [0, 0, 0, 3, 0, 0, 0, 0];
	layout[5][5] = [0, 0, 0, 0, 0, 0, 0, 0];
	
	return layout;
    }

};