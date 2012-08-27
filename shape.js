function toRadian( angle ){
    return ( Math.PI/180 ) * angle;
}
function Shape(){
    this.vX = 0;
    this.vY = 0;
    this.aX = 0;
    this.aY = 0;
    this.mass = 0;
}
            
function Circle( obj ){
    this.x = obj.x || 0;
    this.y = obj.y || 0;
    this.radius = obj.radius || 1;
    this.start_angle = toRadian( obj.sa ) || 0;
    this.end_angle = toRadian( obj.ea ) || Math.PI * 2;
    this.clock_wise = obj.flag || false; // false means clockwise.
    this.color = obj.color || "black";
}
Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;

Circle.prototype.setVelocity = function( obj ){
    this.vX = obj.vx;
    this.vY = obj.vy;
}

Circle.prototype.setAccelaration = function( obj ){
    this.aX = obj.ax;
    this.aY = obj.ay;
}

Circle.prototype.draw = function( ctx ){
                ctx.save();
                ctx.fillStyle = this.color;
//              ctx.strokeStyle = this.stroke_style;
                
                ctx.beginPath();
                ctx.arc( this.x, this.y, this.radius, this.start_angle, this.end_angle, this.clock_wise );
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
            
Circle.prototype.move = function( ctx ){
                // Add accelaration.
                this.vX += this.aX;
                this.vY += this.aY;
                
                // Add gravity to velocity
                this.vY += Constants.gravity;
                
                // Move the ball.
                this.x += this.vX;
                this.y += this.vY;
                
            }
function Line( obj ){
    this.x1 = obj.x1;
    this.y1 = obj.y1;
    this.x2 = obj.x2;
    this.y2 = obj.y2;
    this.length = obj.length || undefined;
    this.angle = toRadian( obj.angle ) || undefined;
    this.stroke_color = obj.stroke_color || "black";
    this.width = obj.width || 2;
}
Line.prototype = new Shape();

Line.prototype.setVelocity = function( obj ){
    this.vX = obj.vx;
    this.vY = obj.vy;
}

Line.prototype.setAccelaration = function( obj ){
    this.aX = obj.ax;
    this.aY = obj.ay;
}            
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
            }
            
Line.prototype.move = function( ctx ){
                // Add accelaration.
                this.vX += this.aX;
                this.vY += this.aY;
                
                // Add gravity
                this.vY += Constants.gravity;
                
                // Add velocity
                this.x1 += this.vX;
                this.x2 += this.vX;
                this.y1 += this.vY;
                this.y2 += this.vY;
                             
            }
