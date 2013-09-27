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
        this.contenido.animate(
            { width: 0 },
            1000,
            function(){
                this.collapsed = true;
            }
        );
	this.titulo.animate({left:0},1000);
    }

    this.expand = function(){
	var collapsables = this.parent.cortinas;
	var index = $.inArray( this, collapsables );
	console.log('ind ' + index);
	var totalW = 0;

	var lastTtlW = 0;

	for( i in collapsables ) {
	    if( i < index ) {
		lastTtlW = collapsables[i].titulo.width(); 
		totalW += lastTtlW;
		totalW += collapsables[i].div.width();
	    }
	}

	totalW -= index * lastTtlW;
	console.log( 'tW ' + totalW );
        this.contenido.animate(
            { width: this.parent.parent.parent().width() - totalW },
            1000,
            function(){
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



}

var Cortinas = function( parent ) {
    this.cortinas = [];
    this.parent = parent; 

    this.añadir = function( titulo, html )
    {             
	var cortina = new Cortina( this );
	cortina.setTitulo( titulo );
        cortina.load(html);
        this.cortinas.push( cortina );             
        this.parent.append( cortina.div );
        
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
