
/*

1-ELIMINAR SLIDERS SIGUIENTES CUANDO SE CARGA NUEVO CONTENIDO2
-2ASIGNAR FUNCION A NUEVAS CORTINAS PARA QUE SUS LINKS SE ABRAN EN UN SLIDER NUEVO
3-REVISAR ESTRUCTURA PRA MODULARIZAR MEJOR ESTE TIPO DE FUNCIONES

*/


Cortina = function( parent ){


    this.parent = parent;
    var parent = this.parent;

    this.create = function(){
	
        var html;
        
        var nombre = "nombre";

        html = $('<div>').attr('class','collapsable');

	var xpndcllps = $('<div>').attr('class','xpndcllps').html( '+' );

	var ttl = $('<div>').attr('class','txt_vertical').html( nombre );

        var titulo = $('<div>').attr('class','titulo').html(
	    ttl
        );

	titulo.append(xpndcllps);

        var contenido = $('<div>').attr('class','contenido').html($('<div>').attr('class','pad_div')); 
        
        html.append( contenido );
        html.append( titulo );

        return html;
	
    }


    this.destroy = function() {

	this.titulo.remove();
	this.contenido.remove();
	this.div.remove();

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

    this.collapsed = false;

    this.collapse = function(){

	var collapsables = this.parent.cortinas;
	var index = $.inArray( this, collapsables );
	var allcollapsed = true;

	this.titulo.find('.xpndcllps').show();
	
	var w = this.contenido.width();

	var contenido = this.contenido; 
	if( w > 0 ) {

	
	    this.contenido.animate(
		{ width: 0 },
		1000,
		function(){
                    this.collapsed = true;
		    
		}
            );
	    this.titulo.animate({width:'50px'},100);
	    this.titulo.animate({left:0},1000);
	    
	}
    
    }

    this.expand = function(){

	var collapsables = this.parent.cortinas;
	var index = $.inArray( this, collapsables );
	var totalW = 0;

	this.titulo.find('.xpndcllps').hide();

	 var lastTtlW = 0;

	 if( index != collapsables.length - 1 ) {
	     var all_collapsed = true;


	 }


	 if( this.hideNext ) {

	     for( i in collapsables ) {
		 if( i < index ) {
		     lastTtlW = collapsables[i].titulo.width(); 
		     totalW += lastTtlW;
		     totalW += collapsables[i].contenido.width();
		 }
	     }

	} else {
	    for( i in collapsables ) {
		if( index != i ) {
		    totalW += collapsables[index].titulo.width(); 		
		} 
	    }
	    if(collapsables.length==1) {
		totalW -= index * lastTtlW;
	    }

	   
	    

	}

	var newW = this.parent.parent.parent().width() - totalW;
	var collapsable = this;
	this.contenido.find('.pad_div').animate(
            { width: newW - 30 });


	for( i in collapsables ) {
	    if( i != index ) {		
		collapsables[i].collapse();
	    }
	}

	this.contenido.animate(
            { width: newW - 30  },
            1000, "",
            function(){

		parent.active = index;
		parent.expandCallback();

		//if(index==collapsables.length-1){
		    //collapsable.ocultar_titulo();
		//}
                this.collapsed = false;
            }
        );
	this.titulo.animate({width:0},1000);

	this.titulo.animate({left:this.contenido.width()},1000);


    }

    var cortina = this;

    this.titulo.click(function() {

        if( cortina.collapsed ) {
	    cortina.collapse();
        }
        else {
	    cortina.expand();
        }

    })
;
    this.ocultar_titulo = function() {
	this.titulo.hide();
    }

    this.mostrar_titulo = function() {
	this.titulo.show();
    }

    this.setupLinks = function() {
	var comp = new RegExp(location.host);

	var parent = this.parent;

	var this_cortina = this;

	this.contenido.find('a').each(function(){

	    var link = $(this);
	    var url = link.attr('href');
	    link.click(function(e){
		e.preventDefault();
		e.stopPropagation();

		if(comp.test(url)){
		    $.get( url, function( data ) {
			parent.clearNext(this_cortina);
			var title = link.find('.title');
			if( title.length == 0 ) {
			    title = link.text();
			} else {
			    title = title.text();
			}
			parent.añadir(title, data );
			
		    });
		}
		else{
//		    alert("external");
		}
	    });
	});
    }

}

var Cortinas = function( parent ) {
    this.cortinas = [];
    this.parent = parent; 
    this.hideNext = false;

    this.active = null;

    this.expandCallback = function() {
	console.log( "expand callback" );
    }

    this.añadir = function( titulo, html )
    {          
	if(this.cortinas.length>0) {
	    for(i in this.cortinas) {
		var index = this.cortinas.length - i;
		this.cortinas[i].div.css('zIndex', index);   
	    }
	    
	}

	var cortina = new Cortina( this );
	
	cortina.hideNext = this.hideNext;
	cortina.setTitulo( titulo );
        cortina.load(html);

        this.cortinas.push( cortina );             
        this.parent.append( cortina.div );

	var tituloW = 0;
	for(i in this.cortinas){ 
//	    if( i < this.cortinas.length - 1 ) {
	       tituloW += this.cortinas[i].titulo.width();
//	   }
	}
	var newW = ( this.parent.parent().width() - tituloW );

	// for(i in this.cortinas){
	//     if( this.hideNext ) {}
	//     else {
		
		// if( this.cortinas[i].contenido.width() > 0 ) {
		//     this.cortinas[i].contenido.width( newW );
		//     this.cortinas[i].contenido.find( '.pad_div' ).width( newW - 50 );
		// }
	cortina.contenido.width( newW );
	cortina.contenido.find( '.pad_div' ).width( newW - 50 );
	var parentW = this.parent.width();

	this.parent.width( parentW + newW );

	//     }
	// }

	cortina.setupLinks();

	this.collapse();
        
	this.posicionarTitulos();

	this.active = this.cortinas.length - 1;
	this.expandCallback();
	
    }

    this.quitar = function() {
        var c = this.cortinas.pop();
        c.div.remove();
        
    }

    this.collapse = function() {
        for(i in this.cortinas) {
	    if( i < this.cortinas.length - 1 ){
		this.cortinas[i].collapse();
	    }
        }
    }

    this.posicionarTitulos = function(){
         $('.collapsable .txt_vertical').each(function(){
             $(this).width( $(this).parent().height() );
             $(this).offset({ left : $(this).parent().offset().left });
             $(this).offset({ top : $(this).parent().offset().top });
         });

     };


    this.clearNext = function( child ) {
	var index = $.inArray( child, this.cortinas );

	if( index + 1 < this.cortinas.length ) {

	    var toDelete = this.cortinas.splice( index + 1 , this.cortinas.length );

	    for(i in toDelete) {
		toDelete[i].destroy();
	    }

	}

    }

}
