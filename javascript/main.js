    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.oRequestAnimationFrame || 
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();    
    
    var fishes = [];
    var travelPoints = [];
	var stage;
	var bgRect;
	var layer;
	var title;
//TODO: light source & shadow.
function start(){
	stage = new Kinetic.Stage({
	          container: "bgc",
	          width: $(document).width(),
	          height: $(document).height()
	});
	
	$(window).resize(function () {
		stage.setSize($(window).width(),$(window).height());
		bgRect.setHeight($(window).height());
		bgRect.setWidth($(window).width());
		stage.draw();
	});
	
	layer = new Kinetic.Layer();
	
	var fishnum=200;
	
	for(var i=0;i<fishnum;i++){
		createFish();
	}
	
	var bglayer = new Kinetic.Layer();
	bgRect = new Kinetic.Rect({
		x:0,
		y:0,
		height:$(window).height(),
		width:$(window).width()
	})
	bglayer.add(bgRect);
	bglayer.on("click",function(e){
		setScaredFish(e);
	});
	layer.on("click",function(e){
		setScaredFish(e);
	});
	
	
	//Text object to display values on canvas
	//TODO: finish!
	title = new Kinetic.Text({
          y: 50,
          text: "",
          fontSize: 36,
          fontFamily: "Snap ITC",
          textFill: "green",
          align: "center",
          verticalAlign: "middle"
    });
	
	title.setX(($(window).width() / 2)-(title.getWidth()/2));
	layer.add(title);
	stage.add(bglayer);
	stage.add(layer);
	animate();
}

function animate(){
	   logic();
	   layer.draw();
	   requestAnimFrame(function() {
       animate();
     });
}

function createFish(){
	var i = fishes.length;
	var r1 = getR(30,30)/100;
	travelPoints[i] = new Kinetic.Shape({});
	fishes[i] = new Kinetic.Shape({
		drawFunc: function() {
		  var context = this.getContext();
		  context.beginPath();
		  context.moveTo(0, 0);
		  context.lineTo(10, -10);
		  context.bezierCurveTo(10, -10 ,15, -13, 20, -5); 
		  context.bezierCurveTo(20, -5 ,15 ,3, 10, 0); 
		  context.lineTo(0,-10);
		  context.closePath();
		  this.fill();
		  this.stroke();
		},
		fill:getFill(),
		stroke: "black",
		scale:[r1,r1],
		strokeWidth: 1/*,
		shadow: {//better FPS w/o shadows?
			color: 'black',
			blur: 10,
			alpha: 1
		  }*/
	  });
	fishes[i].setX(getR(stage.getWidth()));
	fishes[i].setY(getR(stage.getHeight()));
	fishes[i].setScared(false);
	travelPoints[i].setCoord({"x":0,"y":0});
	layer.add(fishes[i]);		
}

function logic(){
	for(var i = 0; i<fishes.length; i++){
		var x2 = fishes[i].getX();
		var y2 = fishes[i].getY();		
		var speed = 0 + (fishes[i].getScale().x*100);
		fishMovement(i,speed,x2,y2);
		}
	}

function fishMovement(i,speed,x2,y2){
	if(fishes[i].getScared())scaredMovement((speed/2),fishes[i],travelPoints[i],i,x2,y2);
	else{
	var pos = stage.getMousePosition();
	var x3 = travelPoints[i].getX();
	var y3 = travelPoints[i].getY();
	var cc = travelPoints[i].getCoord();
	if((cc.x==0&&cc.y==0)){
		newCoord_util(travelPoints[i]);
	}
	var dx = travelPoints[i].getCoord().x - x3;
	var dy = travelPoints[i].getCoord().y - y3;
	var dist =  Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
	if(dist<25){
		if(pos){
			var range = 150;
			var t = getR(10);
		    if(t==9){
				range=250;
			}
			var newX = getR(range,-(range/2));
			var newY = getR(range,-(range/2));
			travelPoints[i].setCoord({"x":pos.x+newX,"y":pos.y+newY});
		}
		else
		newCoord_util(travelPoints[i]);
	}
	var angle =  Math.atan2(dx, dy);
	var x = x3 + (Math.sin(angle)*(dist/(speed/1.3)));
	var y = y3 + (Math.cos(angle)*(dist/(speed/1.3)));
	travelPoints[i].setX(x);
	travelPoints[i].setY(y);
	var dx2 = travelPoints[i].getX() - x2;
	var dy2 = travelPoints[i].getY() - y2;
	var dist =  Math.sqrt(Math.pow(dx2,2) + Math.pow(dy2,2));
	var angle =  Math.atan2(dx2, dy2); 
	var x = x2 + (Math.sin(angle)*(dist/(speed/1)));
	var y = y2 + (Math.cos(angle)*(dist/(speed/1)));
	fishes[i].setX(x);
	fishes[i].setY(y);
	fishes[i].setRotation((angle+((3*Math.PI)/2))*-1);
	}
}

function setScaredFish(e){
	for(var i = 0; i<fishes.length; i++){
		var x2 = fishes[i].getX();
		var y2 = fishes[i].getY();		
		var pos = stage.getMousePosition();
		var x3 = e.pageX;
		var y3 = e.pageY;
		var dx = x2 - x3;
		var dy = y2 - y3;
		var dist =  Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
		if(dist<150){
			fishes[i].setScared(true);
			fishes[i].setScaredInit(true);
		}
	}
}

function scaredMovement(speed,fish,travel,i,x2,y2){
	if(fish.getScaredInit()){
			var pos = fish.getCoord();
			var f1 = Math.floor(Math.random()*($(document).width()*2))-$(document).width()*1;
			var f2 = Math.floor(Math.random()*($(document).width()*2))-$(document).width()*1;
			travel.setCoord({"x":f1,"y":f2});
	}
	fish.setScaredInit(false);
	
	var x3 = travel.getX();
	var y3 = travel.getY();
	var dx = travel.getCoord().x - x3;
	var dy = travel.getCoord().y - y3;
	var dist =  Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
	if(dist<25){
		newCoord_util(travel);
		fish.setScared(false);
	}
	var angle =  Math.atan2(dx, dy); 
	var x = x3 + (Math.sin(angle)*(dist/(speed/1.3)));
	var y = y3 + (Math.cos(angle)*(dist/(speed/1.3)));
	travel.setX(x);
	travel.setY(y);
	
	var dx2 = travel.getX() - x2;
	var dy2 = travel.getY() - y2;
	var dist =  Math.sqrt(Math.pow(dx2,2) + Math.pow(dy2,2));
	var angle =  Math.atan2(dx2, dy2); 
	var x = x2 + (Math.sin(angle)*(dist/(speed/1)));
	var y = y2 + (Math.cos(angle)*(dist/(speed/1)));
	fish.setX(x);
	fish.setY(y);
	fish.setRotation((angle+((3*Math.PI)/2))*-1);
}
