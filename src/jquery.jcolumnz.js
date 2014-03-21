/**
 * jColumnz
 *
 * @Author MARTIN Damien
 * @License MIT public license
 */

(function( $ ) {

    /**
     * Explore the data tree recursively extracting elements.
     *
     * @param $container
     * @param root
     */
    var exploreTree = function( id_parent, $container, elements ) {

        var id = Math.random().toString(36).substr(2, 9),
            entries = [];

        for ( var i=0, element ; element = elements[i] ; i++ ) {

            if ( typeof element.children !== "undefined" ) {

                element.parent = id_parent;
                element.id = id;
                element.target = exploreTree( id, $container, element.children );

            }

            entries.push( element );

        }

        createNewPanel( id, $container, elements );

        return id;

    }

    /**
     * Create a new panel inside the main container.
     *
     * @param $container
     * @param elements
     */
    var createNewPanel = function( panel_id, $container, elements ) {

        var id;

        // Build <ul>.

        var $ul = $(document.createElement('ul')).addClass('jColumnz-list'),
            $li;
        
        for ( var i=0, element ; element = elements[i] ; i++ ) {

            id = Math.random().toString(36).substr(2, 9);

            $li = $("<li class='jcolumnz-line jcolumnz-line-" + id +"'>" + element.label + "</li>");

            // Add onClick behaviour on the list item.

            element.on_click && $li.click(element.on_click);

            // Add tree system
            
            if ( element.target ) {

                $li.addClass('jcolumnz-parent');
                
                $li.click((function(element){
                    return function(){
                        // Add and remove active class
                        $container.find('.jcolumnz-line').removeClass('jcolumnz-active');
                        $(this).addClass('jcolumnz-active');
                        
                        // Add and remove last class
                        $container.find('.jcolumnz-panel').removeClass('jcolumnz-last');
                        $('.jcolumnz-panel-'+ element.target).addClass('jcolumnz-last');
                        
                        // Hide every panel, excepted the one clicked, its parent and the children's panel
                        var not_parent = element.parent ? ':not(.jcolumnz-panel-'+ element.parent +')' : '';
                        $container.find(
                            '.jcolumnz-panel' +
                            ':not(.jcolumnz-panel-'+ element.id +')' +
                            not_parent +
                            ':not(.jcolumnz-panel-'+ element.target +')'
                        ).hide(400);
                        
                        // Show needed panels (son and parent)
                        $container.find('.jcolumnz-panel-'+ element.target +', .jcolumnz-panel-'+ element.parent).show(400);
                    }
                }(element)));

            }
            else {
                $li.addClass('jcolumnz-final');
            }
            
            $ul.append($li);

        }

        $container.prepend($('<div class="jcolumnz-panel jcolumnz-panel-' + panel_id + '"></div>').append($ul));

    }

    /**
     * Function accessible through the user's code.
     *
     * @param data
     * @returns {$.fn}
     */
    $.fn.columnz = function( data ) {

        data = data || [];

        // Add a class to our container for easy styling.
        
        this.addClass("jcolumnz-container");

        var first = exploreTree( null, this, data );
        
        this.find('.jcolumnz-panel:not(.jcolumnz-panel-'+ first +')').hide();

        return this;

    };

}( jQuery ));