function PointTouch(p1, p2){
    this.point1 = p1;
    this.point2 = p2;
    
    this.handled = false;
    
    this.contains = function(p){
        return (p == this.point1 || p == this.point2);
    }
};