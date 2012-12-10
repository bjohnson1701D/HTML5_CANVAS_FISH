		function getR(x, r){
			if(r==undefined){r=0};
			return Math.floor(Math.random()*x)+r;
		}
		
		function newCoord_util(fish){
			var pos = fish.getCoord();
			var x1 = getR(200,-100);
			var y1 = getR(200,-100);		
			var x2 = Math.floor(Math.random()*$(document).width());
			var y2 = Math.floor(Math.random()*$(document).height());
			if(((x1+pos.x)<=0||(x1+pos.x)>=$(document).width())||((y1+pos.y)<=0||(y1+pos.y)>=$(document).height())){
				fish.setCoord({"x":x2,"y":y2});
			}
			else
			fish.setCoord({"x":(pos.x + x1),"y":(pos.y + y1)});
		}
		
		function getFill(){
			var retval =  {start: {x: 7.5, y: -10},
					end: {x: 7.5, y: 0},
					colorStops: [0, getRGB(),1,"#424242"]};
			return retval;
		}
		
		function getRGB(){
			return "rgb("+getR(255)+","+getR(255)+","+getR(255)+")";
		}
		
		