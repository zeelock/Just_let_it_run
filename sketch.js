

var inc = 0.01;
var scl = 50;
var cols,rows;
var zoff = 0.01;

var par = [];
var map = [];

function setup() {
  createCanvas (windowWidth,windowHeight);
    cols = floor(width/scl);
    rows = floor(height/scl);
  
  
  map = new Array(cols*rows);
  
  for( i = 0 ; i < 2500 ; i ++  ){
    
    par[i] = new Bug ();
    
    
    
  }
  
   background(0);
}
function draw() {
//background(255);
  
  for(i = 0 ; i < 1000 ; i ++){ 
  
  
  var yoff = 0;
  
    for(var y = 0 ; y < rows ; y++ ){
      
        var xoff = 0;
  
          for( var x = 0; x < cols; x++){
      
          var index = (x + y * cols);
          
         
          
          map[index] = v;
          
          
          
          var angle = noise(xoff,yoff,zoff)*TWO_PI*4;
             
             
          var v = p5.Vector.fromAngle(angle);
          
          v.setMag(0.20);
          
          xoff += inc;
           // stroke(0);
         //   push();
      ///      translate ( x * scl, y * scl);
      
    //        rotate(v.heading());
    //   line( 0 , 0 , scl ,0);
          //  pop();
        
        
    }

   yoff += inc;
     zoff += 0.0004;
  }
    for( var i = 0 ; i < par.length ; i++){
      par[i].follow(map);
       par[i].end();
      par[i].show();
      par[i].update();
      par[i].accforce();
     
     }
  }
}
function Bug (){

  this.pos = createVector(random(width),random(height));
  this.v   = createVector(0,0);
  this.acc = createVector(0,0);
  
  this.preV = this.pos.copy();
  
  
  this.speed = 4 ;
  
  this.update = function(){
     
    this.v.add(this.acc);
    this.v.limit(this.speed);
    this.pos.add(this.v);
    this.acc.mult(0);
    
   
  
  };
  this.accforce = function(force){
    
    this.acc.add(force);
    
    
    
  };
  this.show = function (){
    
    
    stroke(255,1);
    strokeWeight(1);
    point(this.pos.x,this.pos.y);
    //this.updatepreV();

    }
    
  };
  this.end = function(){
  
  if(this.pos.x < 0){
    this.pos.x = width;
    this.preV.x = this.pos.x;
  }
  
   if(this.pos.x > width){
    this.pos.x = 0;
    this.preV.x = this.pos.x;
  }
  
   if(this.pos.y < 0){
    this.pos.y = height;
    this.preV.y = this.pos.y;
  }
  
     if(this.pos.y > height){
    this.pos.y = 0;
    this.preV.y = this.pos.y;
  }
  
  
  
  };

  
  this.follow = function(vectors){
    var x = floor(this.pos.x/scl);
    var y = floor(this.pos.y/scl);
    var index = x+y* cols;
    
    var force = vectors[index];
    
    this.accforce(force);
    
    
    
    
    
    
  };
}


