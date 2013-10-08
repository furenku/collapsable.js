
/*

1-FALTA MOSTRAR BARRA TÍTULO DE ÚLTIMO DIV CUANDO ÉSTE ESTÁ COLAPSADO
2-ELIMINAR SLIDERS SIGUIENTES CUANDO SE CARGA NUEVO CONTENIDO
3-ASIGNAR FUNCION A NUEVAS CORTINAS PARA QUE SUS LINKS SE ABRAN EN UN SLIDER NUEVO
4-REVISAR ESTRUCTURA PRA MODULARIZAR MEJOR ESTE TIPO DE FUNCIONES

*/

Cortina = function( parent ){


    this.parent = parent;

    this.create = function(){
	
        var html;
        
        var nombre = "nombre";

        html = $('<div>').attr('class','slider');

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

	this.titulo.find('.xpndcllps').fadeIn();
	
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

    this.expand = function(){

	var collapsables = this.parent.cortinas;
	var index = $.inArray( this, collapsables );
	var totalW = 0;

	this.titulo.find('.xpndcllps').fadeOut();

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
	    totalW -= index * lastTtlW;

	} else {
	    for( i in collapsables ) {
		if( index != i ) {
		    totalW += collapsables[index].titulo.width(); 		
		} 
	    }
	}

	var newW = this.parent.parent.parent().width() - totalW;
	var collapsable = this;
	this.contenido.find('.pad_div').animate(
            { width: newW  });

	this.contenido.animate(
            { width: newW  },
            1000, "",
            function(){


		//if(index==collapsables.length-1){
		    //collapsable.ocultar_titulo();
		//}
                this.collapsed = false;
            }
        );
	this.titulo.animate({width:0},1000);

	this.titulo.animate({left:this.contenido.width()},1000);


	for( i in collapsables ) {
	    if( i != index ) {
		
		collapsables[i].collapse();
	    }
	}

    }

    var cortina = this;

    this.titulo.click(function() {

        if( cortina.collapsed ) {
	    cortina.collapse();
//	    cortina.collapsed = false;
        }
        else {
	    cortina.expand();
//	    cortina.collapsed = true;
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
//	    if( i < this.cortinas.length - 1 ) {
	       tituloW += this.cortinas[i].titulo.width();
//	   }
	}
	var newW = ( this.parent.parent().width() - tituloW );

	for(i in this.cortinas){
	    if( this.hideNext ) {}
	    else {	
		this.cortinas[i].contenido.width(newW);
		this.cortinas[i].contenido.find('.pad_div').width(newW - 20);
	    }
	}
	this.collapse();
        
	this.posicionarTitulos();
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
         $('.slider .txt_vertical').each(function(){
             $(this).width( $(this).parent().height() );
             $(this).offset({ left : $(this).parent().offset().left });
             $(this).offset({ top : $(this).parent().offset().top });
         });

     };

}
