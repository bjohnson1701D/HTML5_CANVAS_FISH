   Kinetic.Shape.prototype.getCoord = function(){
        return this.coord;
    };
    Kinetic.Shape.prototype.setCoord = function(f){
        this.coord = f;
    };
   Kinetic.Shape.prototype.getScared = function(){
        return this.scared;
    };
    Kinetic.Shape.prototype.setScared = function(s){
        this.scared = s;
    };
    Kinetic.Shape.prototype.getTest = function(){
        return this.test;
    };
    Kinetic.Shape.prototype.setTest = function(t){
        this.test = t;
    };
    Kinetic.Shape.prototype.getScaredInit = function(){
        return this.scaredI;
    };
    Kinetic.Shape.prototype.setScaredInit = function(si){
        this.scaredI = si;
    };
	Kinetic.Shape.prototype.getId = function(){
        return this.id;
    };
    Kinetic.Shape.prototype.setId = function(i){
        this.id = i;
    };
    Kinetic.Shape.prototype.getSize = function(){
        return this.size;
    };    
    Kinetic.Shape.prototype.getHungry = function(){
        return this.hungry;
    };       
	Kinetic.Shape.prototype.setHungry = function(h){
        this.hungry = h;
    };   
    Kinetic.Shape.prototype.setSize = function(f){
        this.size = f;
    };   
	Kinetic.Shape.prototype.getName = function(){
        return this.name;
    };
	Kinetic.Shape.prototype.setName = function(name){
        this.name = name;
    };
	Kinetic.Shape.prototype.newColor = function(){
		this.setFill(getFill());
    }; 
	
	Kinetic.Circle.prototype.getFish = function(){
        return this.fish;
    };
    Kinetic.Circle.prototype.setFish = function(f){
        this.fish = f;
    };   
	Kinetic.Circle.prototype.getV = function(){
        return this.velocity;
    };
    Kinetic.Circle.prototype.setV = function(v){
        this.velocity = v;
    }; 
	Kinetic.Circle.prototype.isDrag = function(){
        return this.drag;
    };
    Kinetic.Circle.prototype.setDrag = function(d){
        this.drag = d;
    }; 
    
    Kinetic.Image.prototype.getScared = function(){
        return this.scared;
    };
    Kinetic.Image.prototype.setScared = function(s){
        this.scared = s;
    };
    Kinetic.Image.prototype.getScaredInit = function(){
        return this.scaredI;
    };
    Kinetic.Image.prototype.setScaredInit = function(si){
        this.scaredI = si;
    };
    
