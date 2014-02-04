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
     * @todo Change iteration (for..of is only accepted by Firefox).
     * @param container
     * @param root
     */
    function jcolumnz_exploreTree( id, container, elements ) {

        var id = Math.random().toString(36).substr(2, 9);
        var entries = [];

        for ( element of elements ) {

            if ( typeof element.children !== "undefined" ) {

                element.target = jcolumnz_exploreTree( id, container, element.children );

            }

            //console.log(element);

            entries.push( element );

        }

        jcolumnz_createNewPanel( id, container, elements );

        return id;

    }

    /**
     * Create a new panel inside the main container.
     *
     * @todo Change iteration (for..of is only accepted by Firefox).
     * @param container
     * @param elements
     */
    function jcolumnz_createNewPanel( panel_id, container, elements ) {

        var id;

        console.log(elements);

        // Build <li>s.

        var li = "";
        for ( element of elements ) {

            id = Math.random().toString(36).substr(2, 9);

            li += "<li id='jcolumnz-entry-" + id +"'>" + element.label + "</li>";

            // Add onClick behaviour on the list item.

            if ( typeof element.on_click !== "undefined" ) {

                console.log("Attach behaviour to " + element.label);

                $('li').on('click', '#jcolumnz-entry-' + id, element.on_click);


            } else {

                if ( typeof element.target !== "undefined" ) {

                    console.log("Attach target to " + element.label);

                }

            }

        }

        container.append('<div id="jcolumnz-panel-' + panel_id + '" class="jcolumnz-panel"><ul>' + li + '</ul></div>');

    }

    /**
     * Function accessible through the user's code.
     *
     * @param options
     * @returns {$.fn}
     */
    $.fn.columnz = function( options ) {

        // Load options and save them into 'settings'.

        var settings = $.extend({
            data: []
        }, options );

        // Add a class to our container for easy styling.

        $(this).addClass("jcolumnz-container");

        jcolumnz_exploreTree( Math.random().toString(36).substr(2, 9), $(this), settings.data )

        return this;

    };

}( jQuery ));