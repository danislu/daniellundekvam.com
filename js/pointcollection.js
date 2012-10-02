function PointCollection() {
    this.mousePos = new Vector(0, 0);
    this.points = new Array();
    this.targets = new Array();
    this.touchMode = false;
    this.extraTime = 0;
    this.canvasWidth;
    this.canvasHeight;
    this.img;

    this.newPoint = function(x, y, z) {
        var point = new Point(x, y, z);
        this.points.push(point);
        return point;
    };

    this.findPointOnPos = function(pos){
        var pointsLength = this.points.length;
        for(var i=0; i<pointsLength; i++){
            var point = this.points[i];
            if (point == null)
                continue;

            var dx = point.curPos.x - pos.x;
            var dy = point.curPos.y - pos.y;
            if (dx < 0) dx *= -1;
            if (dy < 0) dy *= -1;
            if ((dx < point.size) && (dy < point.size))
                return point;
        }
        return null;
    };

    this.calculateMousePush = function(point){
        var dx = this.mousePos.x - point.curPos.x;
        var dy = this.mousePos.y - point.curPos.y;
        var dd = (dx * dx) + (dy * dy);
        var d = Math.sqrt(dd);
        if (d < 100) {
            point.travelDirection.x += point.curPos.x - dx;
            point.travelDirection.y += point.curPos.y - dy;
        }
    };

    this.isOnATarget = function(p){
		var targets = this.targets;
		var targetsLength = targets.length;
		for (var i = 0; i < targetsLength; i++){
			var target = targets[i];
			if (target == null) 
                continue;

            var dx = p.curPos.x - target.pos.x;
            var dy = p.curPos.y - target.pos.y;
            if (dx < 0) dx *= -1;
            if (dy < 0) dy *= -1;
            if ((dx < target.size) && (dy < target.size)){
				if ((p.velocity.x < 0.2) && (p.velocity.y < 0.2)){
                    target.bullseyeCount++;
                    this.extraTime +=  100000/target.range;
					return true;
                }
			}
		}
		return false;
	};
    
    this.calculateTargetPull = function(point) {
        var targetsLength = this.targets.length;
        for (var j = 0; j < targetsLength; j++){
            var target = this.targets[j];
            
            var dx = target.pos.x - point.curPos.x;
            var dy = target.pos.y - point.curPos.y;
            var dd = (dx * dx) + (dy * dy);
            var d = Math.sqrt(dd);

            if (d < target.range){
                point.travelDirection.x += point.curPos.x + (dx * target.strength);
                point.travelDirection.y += point.curPos.y + (dy * target.strength);
            }
        }
    };

  
    this.calculateCrashes = function(point){ 
        var pointsLength = this.points.length;
        for (var i=0; i < pointsLength; i++){      
            var otherPoint = this.points[i];
            if (otherPoint == null || otherPoint == point)
                continue;
            
            if (point.hasCalculatedTouch(otherPoint)){
                if (!point.isTouchingNow(otherPoint)){
                    point.removeTouched(otherPoint);
                }
                continue;
            }
            
            if (!point.isTouchingNow(otherPoint))
                continue;
            
            var dx = otherPoint.curPos.x - point.curPos.x;
            var dy = otherPoint.curPos.y - point.curPos.y;
            var dd = (dx * dx) + (dy * dy);
            var d = Math.sqrt(dd);
            if (d < otherPoint.radius + point.radius){
                otherPoint.travelDirection.x += otherPoint.curPos.x + (dx * 0.5);
                otherPoint.travelDirection.y += otherPoint.curPos.y + (dy * 0.5);
            }
            point.addTouched(otherPoint);
        } 
    };
    
    this.update = function() {
        var removePoint = new Array();
        var pointsLength = this.points.length;
        for (var i = 0; i < pointsLength; i++) {
            var point = this.points[i];
            if (point == null)
                continue;
            
            if (this.touchMode)
                this.calculateMousePush(point);
            
            this.calculateTargetPull(point);
            
            point.updateVelocity();
            
            this.calculateCrashes(point);

            point.updatePosition(this.canvasWidth, this.canvasHeight);
            point.travelDirection.set(0,0,0);

            if (this.isOnATarget(point))
                removePoint.push(point);
        };
        
        var rLength = removePoint.length;
        for (var i=0; i<rLength; i++){
            var pLength = this.points.length;
            for(var j=0; j<pLength; j++){
                if (removePoint[i] == this.points[j]){
                    this.points.splice(j,1);
                    break;
                }                
            }
        }
    };

    this.draw = function(ctx) {
        var targetsLength = this.targets.length;
        for (var j = 0; j < targetsLength; j++) {
            var target = this.targets[j];

            if (target == null)
                continue;

            target.draw(ctx);
        }

        var pointsLength = this.points.length;
        for (var i = 0; i < pointsLength; i++) {
            var point = this.points[i];

            if (point == null)
                continue;

            point.draw(ctx, this.img);
        };
    };
};