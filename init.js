function init(){
    $( "a#rect" ).click( function( e ){
        if( select_shape != undefined ){
            select_shape.bounds.length = 0;
            select_shape.unStroke();            
          //  select_shape = undefined;
        }
        global_color = undefined;
        active_tool = "rectangle";
        if( select_shape && select_shape.id == 1 )
            select_shape.bounds.length = 0;                
        return false;
     });
     $( "a#select" ).click( function( e ){
        if( select_shape != undefined ){
            select_shape.bounds.length = 0;
        //    select_shape = undefined;
        }     
        global_color = undefined;     
        active_tool = "select";
        if( select_shape )
            select_shape.bounds.length = 0;         
        return false;
     });
     $( "a#resize" ).click( function( e ){
        if( select_shape != undefined ){
            select_shape.bounds.length = 0;
      //      select_shape = undefined;
        }     
        global_color = undefined;     
        active_tool = "resize";
        if( select_shape != undefined )
            draw_bounds( select_shape.id );
        else
            alert( "You must select a shape.\n" );
        return false;
     });
     $( "a#line" ).click( function( e ){
        if( select_shape != undefined ){
            select_shape.bounds.length = 0;
            select_shape.unStroke();            
    //        select_shape = undefined;
        }     
        global_color = undefined;     
        active_tool = "line";
        return false;
     });
     $( "a#fhand" ).click( function( e ){
        if( select_shape != undefined ){
            select_shape.bounds.length = 0;
            select_shape.unStroke();            
  //          select_shape = undefined;
        }     
        global_color = undefined;     
        active_tool = "fhand";
        return false;
     });
     $( "a#circle" ).click( function( e ){
        if( select_shape != undefined ){
            select_shape.bounds.length = 0;
            select_shape.unStroke();
//            select_shape = undefined;
        }     
        global_color = undefined;     
        active_tool = "circle";
        return false;
     });
     $( "div#color_tray" ).click( function( e ){
        if( select_shape != undefined ){
            select_shape.bounds.length = 0;
        }     
        global_color = undefined;     
        if( select_shape != undefined ){
            active_tool = "fill";
            global_color = $(event.target).attr( "id" );
        }
        else{
            alert( "you must select a shape.\n" );
        }
     });
}
