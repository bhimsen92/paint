// this function is useful for selecting existing rectangle or creating a new one.
function handledown_rectangle( ctx, shapes, $this, event, selected ){
    var rects = getRectangles( shapes );
    var mouse = getPosition( $this, event );
    
    var new_rect = undefined, i;
//    var bx1, bx2, by1, by2, obj;
/*    for( i = 0; i < rects.length; i++ ){
        obj = rects[ i ];
        obj.computeHeightWidth();
        if( selected && mouse.x >= obj.points[ 0 ].x && 
            mouse.x <= obj.width &&
            mouse.y >= obj.points[ 0 ].y &&
            mouse.y <= obj.height ){
            
            new_rect = i;
            global_rect = shapes[ i ];
            break;
        }
    }*/
    // new rectangle is being drawn
    if( new_rect == undefined ){
        shapes.push( new Rectangle( { points : [ new Point( mouse.x, mouse.y ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ) ],
                                      width : 0,
                                      height : 0,
                                      stroke_color: "black",
                                      fill_color : undefined } ) );
                                                 
        global_rect = shapes[ shapes.length - 1 ];
    }
}


function handlemove_rectangle( ctx, shapes, $this, event ){
    if( global_rect != undefined ){
        var mouse = getPosition( $this, event );
        
        // get width
        global_rect.width = mouse.x - global_rect.points[ 0 ].x;
        
        // get height
        global_rect.height = mouse.y - global_rect.points[ 0 ].y;
        
        // compute other points too.
        global_rect.points[ 1 ].x = global_rect.points[ 0 ].x + global_rect.width;
        global_rect.points[ 1 ].y = global_rect.points[ 0 ].y;
        global_rect.points[ 2 ].x = global_rect.points[ 1 ].x;
        global_rect.points[ 2 ].y = global_rect.points[ 1 ].y + global_rect.height;
        global_rect.points[ 3 ].x = global_rect.points[ 0 ].x;
        global_rect.points[ 3 ].y = global_rect.points[ 0 ].y + global_rect.height;
    }
}

function handledown_circle( ctx, shapes, $this, event ){
    if( global_circle == undefined ){
        var mouse = getPosition( $this, event );
        global_circle = new Circle( { x : mouse.x,
                                      y : mouse.y,
                                      radius : 0,
                                      fill_color : undefined,
                                      stroke_color: "black"
                                    });
                                    
        shapes.push( global_circle );
    }
}
function handlemove_circle( ctx, shapes, $this, event ){
    if( global_circle != undefined ){
        var mouse = getPosition( $this, event );
        var radius = Math.floor( Math.sqrt( Math.pow( mouse.x - global_circle.x, 2 ) + Math.pow( mouse.y - global_circle.y, 2 ) ) );
        global_circle.radius = radius;
    }
}

function handledown_line( ctx, shapes, $this, event ){
    // new line is being drawn.
    if( global_line == undefined ){
        var mouse = getPosition( $this, event );
        global_line = new Line( { x1 : mouse.x, y1 : mouse.y, width : 1 } );
        //shapes.push( global_line );
    }
}

function handlemove_line( ctx, shapes, $this, event ){
    if( global_line != undefined ){
        if( shapes[ shapes.length - 1 ] != global_line )
            shapes.push( global_line );
        var mouse = getPosition( $this, event );
        global_line.extend( mouse.x, mouse.y );
    }
}

function handledown_fhand( ctx, shapes, $this, event ){
    var mouse = getPosition( $this, event );
    var p = new Path( {
                        x1 : mouse.x,
                        y1 : mouse.y
                      } );
    shapes.push( p );
    global_path = p;
    start = true;
}

function handlemove_fhand( ctx, shapes, $this, event ){
    if( start && global_path != undefined ){
        var mouse = getPosition( $this, event );
        var p = new Point( mouse.x, mouse.y );
        global_path.points.push( p );
    }
}

function handledown_select( ctx, shapes, $this, event ){
    // get mouse coordinates.
    var mouse = getPosition( $this, event );
    var i;
    var len = shapes.length;
    // flag is used to track whether any object is selected when mouse down event fires.
    var flag = false;
    // check whether the mouse coordinates are within any shapes.
    for( i = 0; i < len; i++ ){
        if( shapes[ i ].checkPointsWithin( mouse ) ){
            if( select_shape != undefined )
                select_shape.unStroke();
            select_shape = shapes[ i ];
            select_shape.stroke( "red" );
            global_position.x = mouse.x;
            global_position.y = mouse.y;
            flag = true;
            break;
        }
    }
    if( !flag && select_shape != undefined ){
        select_shape.unStroke();
        select_shape = undefined;
    }
    
}

function handledown_fill( ctx, shapes, $this, event ){
    if( select_shape != undefined ){
        var mouse = getPosition( $this, event );
        var i, len = shapes.length;
        for( i = 0; i < len; i++ ){
            if( shapes[ i ].checkPointsWithin( mouse ) && shapes[ i ] == select_shape ){
                select_shape.fill( global_color );
                console.log( global_color );
                break;
            }
        }
    }
}
function handlemove_select( ctx, shapes, $this, event ){
    if( select_shape != undefined && mouse_control ){
        // get the current coordinates.
        var mouse = getPosition( $this, event );
        var pos = new Point(), pos1 = new Point();
        var dx = (mouse.x - global_position.x);
        var dy = (mouse.y - global_position.y);
        
        if( select_shape.id == 1 ){
            pos.x = (mouse.x - global_position.x) + select_shape.points[ 0 ].x;
            pos.y = (mouse.y - global_position.y) + select_shape.points[ 0 ].y;
        }
        else if( select_shape.id == 2 ){
            pos.x = dx + select_shape.x1;
            pos.y = dy + select_shape.y1;
            pos1.x = dx + select_shape.x2;
            pos1.y = dy + select_shape.y2;
        }
        else if( select_shape.id == 3 ){
            pos.x = (mouse.x - global_position.x) + select_shape.x;
            pos.y = (mouse.y - global_position.y) + select_shape.y;
        }
        global_position.y = mouse.y;
        global_position.x = mouse.x;
        
        // move the shape to the new place.
        select_shape.move( pos, pos1 );
    }
}


function handledown_resize( ctx, shapes, $this, event ){
    if( global_point == undefined ){
        if( select_shape != undefined ){
            var mouse = getPosition( $this, event );
            // if it is a rectangle.
            if( select_shape.id == 1 ){
                global_point = select_shape.withinBounds( mouse );
//                console.log( global_point + "\n" + "hurr\n" );
            }
            else if( select_shape.id == 2 ){
                global_point = select_shape.withinBounds( mouse );
            }
            else if( select_shape.id == 3 )
                global_point = select_shape.withinBounds( mouse );
        }
    }
}

function handlemove_resize( ctx, shapes, $this, event ){    
    if( global_point != undefined ){
        if( select_shape != undefined ){
            var mouse = getPosition( $this, event );
            if( select_shape.id == 1 ){
                if( global_point == 0 ){
                    // points 1,3 needs modification.
                    select_shape.points[ 1 ].y = mouse.y;
                    select_shape.points[ 3 ].x = mouse.x;
                    
                    // compute new width & height.
                    select_shape.width = Math.abs( select_shape.points[ 2 ].x - select_shape.points[ 3 ].x );
                    select_shape.height = Math.abs( select_shape.points[ 2 ].y - select_shape.points[ 1 ].y );
                    
                    //select_shape.points[ 1 ].x = mouse.x + select_shape.width;
                    
                    // new origin.
                    select_shape.points[ 0 ].x = mouse.x;
                    select_shape.points[ 0 ].y = mouse.y;
                }
                else if( global_point == 1 ){
                    // point 2s x needs to changed and 0s y needs to changed.
                    select_shape.points[ 2 ].x = mouse.x;
                    
                    select_shape.width = Math.abs( mouse.x - select_shape.points[ 0 ].x );
                    select_shape.height = Math.abs( mouse.y - select_shape.points[ 2 ].y );
                    
                    select_shape.points[ 1 ].x = select_shape.points[ 0 ].x + select_shape.width;
                    select_shape.points[ 1 ].y = select_shape.points[ 2 ].y - select_shape.height;
                    
                    // set new origin
                    select_shape.points[ 0 ].x = select_shape.points[ 3 ].x;
                    select_shape.points[ 0 ].y = select_shape.points[ 3 ].y - select_shape.height;
                    
                }
                else if( global_point == 2 ){
                    // point 1 and 3 needs to be changed.
                    select_shape.points[ 1 ].x = mouse.x;
                    select_shape.points[ 3 ].y = mouse.y;
                    
                    select_shape.width = Math.abs( mouse.x - select_shape.points[ 3 ].x );
                    select_shape.height = Math.abs( mouse.y - select_shape.points[ 1 ].y );
                    
                    select_shape.points[ 2 ].x = select_shape.points[ 3 ].x + select_shape.width;
                    select_shape.points[ 2 ].y = select_shape.points[ 1 ].y + select_shape.height;
                    
                    // no need to compute new origin.
                }
                else if( global_point == 3 ){
                    select_shape.points[ 2 ].y = mouse.y;
                    
                    select_shape.width = Math.abs( mouse.x - select_shape.points[ 2 ].x );
                    select_shape.height = Math.abs( mouse.y - select_shape.points[ 0 ].y );
                    
                    select_shape.points[ 3 ].x = mouse.x;//select_shape.points[ 2 ].x - select_shape.width;
                    select_shape.points[ 3 ].y = mouse.y;//select_shape.points[ 2 ].x - select_shape.width;
                    
                    //  set new origin;
                    select_shape.points[ 0 ].x = select_shape.points[ 1 ].x - select_shape.width;
                    select_shape.points[ 0 ].y = select_shape.points[ 2 ].y - select_shape.height;
                    
                }
            }
            // Line resize.
            else if( select_shape.id == 2 ){
                if( global_point == 0 ){
                    select_shape.resize( mouse.x, mouse.y, select_shape.x2, select_shape.y2 );
                }
                else if( global_point == 1 ){
                    select_shape.resize( select_shape.x1, select_shape.y1, mouse.x, mouse.y );
                }                
            }
            else if( select_shape.id == 3 ){
                if( global_point == 0 ){
                    select_shape.resize( mouse.x, mouse.y );
                }
            }
        }
    }
}

function getPosition( $this, event ){
    var obj = new Point( event.pageX - $this.offsetLeft, event.pageY - $this.offsetTop );
    return obj;
}

function getRectangles( shapes ){
    var i, len = shapes.length;
    var rects = new Array();
    for( i = 0; i < len; i++ )
        if( shapes[ i ].id == 1 )
            rects.push( shapes[ i ] );
    return rects;
}

function draw_bounds( id ){
    select_shape.bounds = new Array();
    if( id == 1 ){
        select_shape.bounds.push( new Rectangle( { points : [ new Point( select_shape.points[ 0 ].x - 2, select_shape.points[ 0 ].y - 2 ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ) ],
                                      width : 4,
                                      height : 4,
                                      stroke_color: "black",
                                      fill_color : undefined,
                                      id : 10 } ) );
        select_shape.bounds.push( new Rectangle( { points : [ new Point( select_shape.points[ 1 ].x - 2, select_shape.points[ 1 ].y - 2 ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ) ],
                                      width : 4,
                                      height : 4,
                                      stroke_color: "black",
                                      fill_color : undefined,
                                      id : 10 } ) );
        select_shape.bounds.push( new Rectangle( { points : [ new Point( select_shape.points[ 2 ].x - 2, select_shape.points[ 2 ].y - 2 ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ) ],
                                      width : 4,
                                      height : 4,
                                      stroke_color: "black",
                                      fill_color : undefined,
                                      id : 10 } ) );
        select_shape.bounds.push( new Rectangle( { points : [ new Point( select_shape.points[ 3 ].x - 2, select_shape.points[ 3 ].y - 2 ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ) ],
                                      width : 4,
                                      height : 4,
                                      stroke_color: "black",
                                      fill_color : undefined,
                                      id : 10 } ) );                                                                                    
    }
    else if( id == 2 ){
        select_shape.bounds.push( new Rectangle( { points : [ new Point( select_shape.x1 - 2, select_shape.y1 - 2 ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ) ],
                                      width : 4,
                                      height : 4,
                                      stroke_color: "black",
                                      fill_color : undefined,
                                      id : 10 } ) );
        select_shape.bounds.push( new Rectangle( { points : [ new Point( select_shape.x2 - 2, select_shape.y2 - 2 ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ) ],
                                      width : 4,
                                      height : 4,
                                      stroke_color: "black",
                                      fill_color : undefined,
                                      id : 10 } ) );
    }
    else if( id == 3 ){
        select_shape.bounds.push( new Rectangle( { points : [ new Point( select_shape.x + select_shape.radius, select_shape.y ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ),
                                                 new Point( undefined, undefined ) ],
                                      width : 4,
                                      height : 4,
                                      stroke_color: "black",
                                      fill_color : undefined,
                                      id : 10 } ) );
    }
}
