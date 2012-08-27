function Rectangle( obj ){
    this.id = obj.id || 1;
    this.points = obj.points;
    this.width = obj.width || undefined;
    this.height = obj.height || undefined;
    this.fill_color = obj.fill_color || undefined;
    this.stroke_color = obj.stroke_color;
    this.angle = toRadian( obj.angle ) || undefined;
    this.prev_stroke_color = undefined;
    this.bounds = new Array();
}

Rectangle.prototype = new Shape();

Rectangle.prototype.computeHeightWidth = function(){
    if( this.width == undefined )
        this.width = this.points[ 1 ].x - this.points[ 0 ].x;
    if( this.height == undefined )
        this.height = this.points[ 3 ].y - this.points[ 0 ].y;
}

Rectangle.prototype.draw = function( ctx ){
    if( this.width == undefined && this.height == undefined ){
        this.computeHeightWidth();
    }
    ctx.save();
    ctx.fillStyle = this.fill_color;
    ctx.strokeStyle = this.stroke_color;
    if( this.fill_color != undefined )
        ctx.fillRect( this.points[ 0 ].x, this.points[ 0 ].y, this.width, this.height );
    else
        ctx.strokeRect( this.points[ 0 ].x, this.points[ 0 ].y, this.width, this.height );
    if( this.bounds.length > 0 && this.bounds.length == 4 ){
        for( var i = 0; i < this.bounds.length; i++ ){
            ctx.strokeRect( this.bounds[i].points[ 0 ].x, this.bounds[i].points[ 0 ].y, this.bounds[i].width, this.bounds[i].height );
        }
    }
    ctx.restore();
}

Rectangle.prototype.move = function( point ){
    if( this.width == undefined && this.height == undefined )
        this.computeHeightWidth();
    this.points[ 0 ].x = point.x;
    this.points[ 0 ].y = point.y;
    
    // modify other points to.
    this.points[ 1 ].x = this.points[ 0 ].x + this.width;
    this.points[ 1 ].y = this.points[ 0 ].y;
    this.points[ 2 ].x = this.points[ 1 ].x;
    this.points[ 2 ].y = this.points[ 1 ].y + this.height;
    this.points[ 3 ].x = this.points[ 0 ].x;
    this.points[ 3 ].y = this.points[ 0 ].y + this.height;
}

Rectangle.prototype.stroke = function( color ){
    this.prev_stroke_color = this.stroke_color;
    this.stroke_color = color;
}

Rectangle.prototype.unStroke = function(){
    this.stroke_color = this.prev_stroke_color;
}

Rectangle.prototype.checkPointsWithin = function( point ){
    if( this.width == undefined && this.height == undefined )
        this.computeHeightWidth();
    var start_point = this.points[ 0 ];
    if( point.x >= start_point.x && 
        point.x <= start_point.x + this.width &&
        point.y >= start_point.y &&
        point.y <= start_point.y + this.height ){
            
        return true;
    }
    else
        return false;
}

Rectangle.prototype.withinBounds = function( mouse ){
 //   var bx1, bx2, bx3, bx4, by1, by2, by3, by4;
    if( ( mouse.x >= this.points[ 0 ].x - 2 && mouse.x <= this.points[ 0 ].x + 2 && mouse.y >= this.points[ 0 ].y - 2 && mouse.y <= this.points[ 0 ].y + 2 ) )
               return 0;
    else if( ( mouse.x >= this.points[ 1 ].x - 2 && mouse.x <= this.points[ 1 ].x + 2 && mouse.y >= this.points[ 1 ].y - 2 && mouse.y <= this.points[ 1 ].y + 2 ) )
               return 1;
    else if( ( mouse.x >= this.points[ 2 ].x - 2 && mouse.x <= this.points[ 2 ].x + 2 && mouse.y >= this.points[ 2 ].y - 2 && mouse.y <= this.points[ 2 ].y + 2 ) )
               return 2;
    else if( ( mouse.x >= this.points[ 3 ].x - 2 && mouse.x <= this.points[ 3 ].x + 2 && mouse.y >= this.points[ 3 ].y - 2 && mouse.y <= this.points[ 3 ].y + 2 ) )
               return 3;
}

Rectangle.prototype.fill = function( color ){
    this.fill_color = color;
}
