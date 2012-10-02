function Target(x, y, z, range, strength, colour){
    this.pos = new Vector(x, y, z);
    this.size = 10;
    this.range = range;
    this.strength = strength;
    this.colour = colour;
    this.bullseyeCount = 0;

    this.draw = function(ctx) {
        ctx.fillStyle = "#acc";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.range, 0, Math.PI*2, true);
        ctx.fill();

        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI*2, true);
        ctx.fill();

        if (this.bullseyeCount > 0){
            ctx.fillStyle = "black";
            ctx.fillText(this.bullseyeCount, this.pos.x + this.size, this.pos.y + this.size);
        }
    }
}