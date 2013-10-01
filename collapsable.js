Cortina = function( parent ){


    this.parent = parent;

    this.create = function(){
	
        var html;
        
        var nombre = "nombre";

        html = $('<div>').attr('class','slider');

        var titulo = $('<div>').attr('class','titulo').html(
            $('<div>').attr('class','txt_vertical').html( nombre )
        );
        var contenido = $('<div>').attr('class','contenido').html($('<div>').attr('class','pad_div')); 
        
        html.append( contenido );
        html.append( titulo );

        return html;
	
    }


    this.div = this.create();


    this.bgcolor = "#eeeeee";
    
    this.html = function() {
        return this.div.html();
    }

    this.hideNext = false;

    this.contenido = this.div.find(".contenido");
    this.titulo = this.div.find(".titulo");

    this.setTitulo = function( titulo ) {
	this.titulo.find('.txt_vertical').html( titulo );
    }

    this.width = "300px";

    this.load = function(html) {
	var target = this.contenido.find('.pad_div');
        if( target.length !== 0 ) {
            target.html( html );
        }
    }

    this.collapse = function(){
	// var child = this.contenido.find('.pad_div');
	// child.animate({width: this.contenido.width() },1000);
	var collapsables = this.parent.cortinas;
	var index = $.inArray( this, collapsables );
	if( index != collapsables.length - 1 ) {
	    var all_collapsed = true;
	    
            this.contenido.animate(
		{ width: 0 },
		1000,
		function(){
                    this.collapsed = true;
		    /*
		      for( i in collapsables ) {
		      if( collapsables[i].collapsed ) {
		      all_collapsed = false;
		      break;
		      }
		      }
		      if ( all_collapsed ) {
		      collapsables[ collapsables.length - 1 ].expand();
		      }
		    */		
		}
            );
	    this.titulo.animate({left:0},1000);
	}
    }

    this.expand = function(){
	var collapsables = this.parent.cortinas;
	var index = $.inArray( this, collapsables );
	var totalW = 0;

	var lastTtlW = 0;

	for( i in collapsables ) {
	    if( i != index ) {
		collapsables[i].collapse();
	    }
	}

	if( this.hideNext ) {
	    
	    for( i in collapsables ) {
		if( i < index ) {
		    lastTtlW = collapsables[i].titulo.width(); 
		    totalW += lastTtlW;
		    totalW += collapsables[i].div.width();
		}
	    }
	    totalW -= index * lastTtlW;

	} else {
	    for( i in collapsables ) {
		if(i<collapsables.length-1) {
		    totalW += collapsables[i].titulo.width(); 
		}
	    }
	}

	var newW = this.parent.parent.parent().width() - totalW;
	var collapsable = this;
	this.contenido.animate(
            { width: newW },
            1000, "",
            function(){
		if(index==collapsables.length-1){
		    //collapsable.ocultar_titulo();
		}

                this.collapsed = false;
            }
        );
	this.titulo.animate({left:this.contenido.width()},1000);

    }

    var cortina = this;

    this.titulo.click(function() {

        if( cortina.collapsed ) {
	    cortina.collapse();
	    cortina.collapsed = false;
        }
        else {
	    cortina.expand();
	    cortina.collapsed = true;
        }

    });

    this.ocultar_titulo = function() {
	this.titulo.hide();
    }

    this.mostrar_titulo = function() {
	this.titulo.show();
    }



}

var Cortinas = function( parent ) {
    this.cortinas = [];
    this.parent = parent; 
    this.hideNext = false;

    this.añadir = function( titulo, html )
    {             
	var cortina = new Cortina( this );
	cortina.hideNext = this.hideNext;
	cortina.setTitulo( titulo );
        cortina.load(html);
        this.cortinas.push( cortina );             
        this.parent.append( cortina.div );
	var tituloW = 0;
	for(i in this.cortinas){ 
	    if( i < this.cortinas.length - 1 ) {
		tituloW += this.cortinas[i].titulo.width();
	    }
	}
	var newW = ( this.parent.parent().width() - tituloW );

	for(i in this.cortinas){
	    if( this.hideNext ) {}
	    else {	
		this.cortinas[i].contenido.width(newW);
		this.cortinas[i].contenido.find('.pad_div').width(newW - 20);
	    }
	}
        
    }

    this.quitar = function() {
        var c = this.cortinas.pop();
        c.div.remove();
        
    }

    this.collapse = function() {
        for(i in this.cortinas) {
            this.cortinas[i].collapse();
        }
    }

}
