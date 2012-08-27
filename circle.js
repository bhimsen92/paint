function Circle( obj ){
    this.id = 3;
    this.x = obj.x || 0;
    this.y = obj.y || 0;
    this.radius = obj.radius || 1;
    this.start_angle = toRadian( obj.sa ) || 0;
    this.end_angle = toRadian( obj.ea ) || Math.PI * 2;
    this.clock_wise = obj.flag || false; // false means clockwise.
    this.fill_color = obj.fill_color || undefined;
    this.stroke_color = obj.stroke_color;
    this.prev_stroke_color = undefined;
    this.bounds = new Array();
}
Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function( ctx ){
    var i;
    ctx.save();
    ctx.fillStyle = this.fill_color;
    ctx.strokeStyle = this.stroke_color;
                
    ctx.beginPath();
    ctx.arc( this.x, this.y, this.radius, this.start_angle, this.end_angle, this.clock_wise );
    ctx.closePath();    
    if( this.fill_color != undefined )
        ctx.fill();
    else
        ctx.stroke();
    // draw bounds.
    for( i = 0; i < this.bounds.length; i++ ){
        this.bounds[ i ].draw( ctx );
    }
    ctx.restore();
}

Circle.prototype.move = function( mouse ){
    this.x = mouse.x;
    this.y = mouse.y;
}

Circle.prototype.checkPointsWithin = function( mouse ){
    if( mouse.x >= this.x - this.radius && mouse.x <= this.x + this.radius &&
        mouse.y >= this.y - this.radius && mouse.y <= this.y + this.radius )
        return true;
    else 
        return false;
}

Circle.prototype.stroke = function( color ){
    this.prev_stroke_color = this.stroke_color;
    this.stroke_color = color;
}

Circle.prototype.unStroke = function(){
    this.stroke_color = this.prev_stroke_color;
}

Circle.prototype.withinBounds = function( mouse ){
/*    console.log( "x: " + mouse.x + ", y: " + mouse.y );
    console.log( "x1: " + this.x + this.radius + ", x2: " + this.x + this.radius + 8 );
    console.log( "y1: " + this.y + 8 + ", y2: " + this.y + 8 );*/
    if( mouse.x >= this.x + this.radius && mouse.x <= this.x + this.radius + 4 &&
        mouse.y >= this.y && mouse.y <= this.y + 4 )
//        console.log( "bhimsen" );
        return 0;
}

Circle.prototype.resize = function( x, y ){
    this.radius = Math.floor( Math.sqrt( Math.pow( this.x - x, 2 ) + Math.pow( this.y - y, 2 ) ) );
}

Circle.prototype.fill = function( color ){
    this.fill_color = color;
}
