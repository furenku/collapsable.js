 Cortina = function(){

    this.create = function(){

        var html;
        
        var nombre = "nombre";

        html = $('<div>').attr('class','slider');

        var titulo = $('<div>').attr('class','titulo').html(
            $('<div>').attr('class','txt_vertical').html( nombre )
        );
        var contenido = $('<div>').attr('class','contenido'); 
        
        html.append( titulo );
        html.append( contenido );

        return html;
	
    }


    this.div = this.create();


    this.bgcolor = "#eeeeee";
    
    this.html = function() {
        return this.div.html();
    }

    
    this.contenido = this.div.find(".contenido");
    this.titulo = this.div.find(".txt_vertical");

    this.setTitulo = function( titulo ) {
	this.titulo.html( titulo );
    }

    this.width = "300px";

    this.load = function(html) {
        if( this.contenido.length !== 0 ) {
            this.contenido.html( html );
        }
    }


    this.collapse = function(){
        var tituloW = this.titulo.width();
        this.div.animate(
            { width: tituloW + "px" },
            1000,
            function(){
                this.collapsed = true;
            }
        );
    }

    this.expand = function(){
        this.div.animate(
            { width: this.width },
            1000,
            function(){
                this.collapsed = false;
            }
        );
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

    this.añadir = function( titulo, html )
    {             
        var cortina = new Cortina();
	cortina.setTitulo( titulo );
        cortina.load(html);
        this.cortinas.push( cortina );             
        parent.append( cortina.div );
        
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
