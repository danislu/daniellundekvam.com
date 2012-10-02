function Point(x, y, z, size, colour) {
    if (!size) size = 10;
    if (!colour) colour = "#ed9d33";

    this.colour = colour;
    this.curPos = new Vector(x, y, z);
    this.originalPos = new Vector(x, y, z);
    this.radius = size;
    this.size = size;
    this.travelDirection = new Vector(0, 0, 0);
    this.velocity = new Vector(0.0, 0.0, 0.0);
    this.loaded = false;
    this.springStrength = 0.1;
    this.friction = 0.85;

    this.hasCalculatedTouchPoints = new Array();
    
    this.hasCalculatedTouch = function(p){
        for (var i=0; i<this.hasCalculatedTouchPoints.length; i++){
            if (this.hasCalculatedTouchPoints[i].contains(p))
                return true;
        }
        return false;
    }
    
    this.addTouched = function(p){
        if (!this.hasCalculatedTouch(p)){
            this.hasCalculatedTouchPoints.push(new PointTouch(this, p));
        }
    }
    
    this.removeTouched = function(p){
        if (this.hasCalculatedTouch(p)){
            for (var i=0; i<this.hasCalculatedTouchPoints.length; i++){
                if (this.hasCalculatedTouchPoints[i].contains(p)){
                    this.hasCalculatedTouchPoints.splice(i,1);
                    return;
                }
            }
        }
    }
            
    this.isTouchingNow = function(other){
        var dx = this.curPos.x - other.curPos.x;
        var dy = this.curPos.y - other.curPos.y;
        var dd = (dx * dx) + (dy * dy);
        var d = Math.sqrt(dd);
        if (d < (this.radius + other.radius))
            return true;
        else
            return false;
    }
    
    this.updateVelocity = function(){
        if (this.travelDirection.x != 0) {
            var dx = this.travelDirection.x - this.curPos.x;
            this.velocity.x += dx;
        }
        this.velocity.x *= this.friction;

        if (this.travelDirection.y != 0) {
            var dy = this.travelDirection.y - this.curPos.y;
            this.velocity.y += dy;
        }
        this.velocity.y *= this.friction;
    }
    
    this.updatePosition = function(canvasWidth, canvasHeight) {
        var nextPosX = this.curPos.x + this.velocity.x;
        if (nextPosX > canvasWidth){
            this.velocity.x *= -1;
            this.curPos.x = canvasWidth - (nextPosX - canvasWidth);
        }
        else if (nextPosX < 0){
            this.velocity.x *= -1;
            this.curPos.x = nextPosX * -1;
        }
        else
            this.curPos.x = nextPosX;
        
        var nextPosY = this.curPos.y + this.velocity.y;
        if (nextPosY > canvasHeight){
            this.velocity.y *= -1;
            this.curPos.y = canvasHeight - (nextPosY - canvasHeight);
        }
        else if (nextPosY < 0){
            this.velocity.y *= -1;
            this.curPos.y = nextPosY * -1;
        }
        else
            this.curPos.y = nextPosY;
        
        /*
        var vx = this.velocity.x;
        var vy = this.velocity.y;
        var vd = (vx * vx) + (vy * vy);
        var d = Math.sqrt(vd);

        this.radius = (this.size * (d/100 + 1))*2;
        if (this.radius < 2) this.radius = 2;
        */
    };

    this.draw = function(ctx, img) {
    
        
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.curPos.x, this.curPos.y, this.radius, 0, Math.PI*2, true);
        ctx.fill();
  
  /*
        var centerX = this.curPos.x - this.radius;
        var centerY = this.curPos.y - this.radius;
        ctx.drawImage(img, centerX, centerY, this.radius, this.radius);
     */
    
        if (this.loaded){
            ctx.strokeStyle = "#000";
            ctx.beginPath();
            ctx.arc(this.curPos.x, this.curPos.y, this.radius, 0, Math.PI*2, true);
            ctx.stroke();
        }
     
    };
};