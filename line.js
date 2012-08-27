function Line( obj ){
    this.id = 2;
    this.x1 = obj.x1;
    this.y1 = obj.y1;
    this.x2 = obj.x2;
    this.y2 = obj.y2;
    this.length = obj.length || undefined;
    this.angle = toRadian( obj.angle ) || undefined;
    this.stroke_color = obj.stroke_color || "black";
    this.prev_stroke_color = undefined;
    this.width = obj.width || 2;
    this.bounds = new Array();
}
Line.prototype = new Shape();
            
Line.prototype.draw = function( ctx ){
    if( this.length != undefined ){
        this.x2 = this.x1 + Math.floor( this.length * Math.cos( this.angle ) );
        this.y2 = this.y1 + Math.floor( this.length * Math.sin( this.angle ) );
    }
    ctx.save();
    ctx.strokeStyle = this.stroke_color;
    ctx.lineWidth = this.width;
    ctx.beginPath();
    ctx.moveTo( this.x1, this.y1 );
    ctx.lineTo( this.x2, this.y2 );
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    for( var i = 0; i < this.bounds.length; i++ ){
        this.bounds[ i ].draw( ctx );
    }    
}
Line.prototype.extend = function( nx, ny ){
    // no need to increment.
    this.x2 = nx;
    this.y2 = ny;
}

Line.prototype.move = function( sp, ep ){
    this.x1 = sp.x;
    this.x2 = ep.x;
    this.y1 = sp.y;
    this.y2 = ep.y;
}

Line.prototype.checkPointsWithin = function( mouse ){
    console.log( mouse.x + ", " + mouse.y );
    console.log( "x1: " + this.x1 + " ,y1: " + this.y1 );
    console.log( "x1: " + this.x2 + " ,y1: " + this.y2 );
    
    if( ( mouse.x >= this.x1 ) && ( mouse.x <= this.x2 ) &&
        ( mouse.y >= this.y1 ) && ( mouse.y <= this.y2 )  ){        
        return true;
    }
    else if( mouse.x >= this.x1 && mouse.x <= this.x2 &&
             mouse.y <= this.y1 && mouse.y >= this.y2 )
             return true;
    else if( mouse.x <= this.x1 && mouse.x >= this.x2 &&
             mouse.y >= this.y1 && mouse.y <= this.y2 )
             return true;
    else if( mouse.x <= this.x1 && mouse.x >= this.x2 &&
             mouse.y <= this.y1 && mouse.y >= this.y2 )
             return true;
    else
        return false;
}

Line.prototype.stroke = function( color ){
    this.prev_stroke_color = this.stroke_color;
    this.stroke_color = color;
}

Line.prototype.unStroke = function(){
    this.stroke_color = this.prev_stroke_color;
}

Line.prototype.withinBounds = function( mouse ){
    if( mouse.x >= this.x1 - 2 && mouse.x <= this.x1 + 2 && mouse.y >= this.y1 - 2 && mouse.y <= this.y1 + 2 )
        return 0;
    else if( mouse.x >= this.x2 - 2 && mouse.x <= this.x2 + 2 && mouse.y >= this.y2 - 2 && mouse.y <= this.y2 + 2 )
        return 1;
}

Line.prototype.resize = function( x1, y1, x2, y2 ){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
}

Line.prototype.fill = function( color ){
    this.stroke_color = color;
    this.prev_stroke_color = color;
}
