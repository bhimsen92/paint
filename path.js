function Path( obj ){
    // Initial points are must.
    this.x1 = obj.x1;
    this.y1 = obj.y1;
    // array will be used to store intermediate points.
    this.points = new Array();
    // end points.
    this.x2 = undefined;
    this.y2 = undefined;
    this.stroke_color = obj.stroke_color || undefined;
    this.bounds = new Array();
}

Path.prototype.draw = function( ctx ){
    var i, len = this.points.length;
    ctx.save();
    ctx.strokeStyle = this.stroke_color || "black";
    ctx.beginPath();
    ctx.moveTo( this.x1, this.y1 );
    for( i = 0; i < len; i++ ){
        ctx.lineTo( this.points[ i ].x, this.points[ i ].y );
        ctx.stroke();
    }
    ctx.lineTo( this.x2, this.y2 );
    ctx.stroke();
    ctx.restore();
}

Path.prototype.move = function( sp, ep ){
}

Path.prototype.checkPointsWithin = function( mouse ){
}

Path.prototype.stroke = function( color ){
    this.prev_stroke_color = this.stroke_color;
    this.stroke_color = color;
}

Path.prototype.unStroke = function(){
    this.stroke_color = this.prev_stroke_color;
}

Path.prototype.withinBounds = function( mouse ){
}

Path.prototype.resize = function(){
}

Path.prototype.fill = function( color ){
    this.stroke_color = color;
}
