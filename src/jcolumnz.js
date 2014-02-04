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
    function jcolumnz_exploreTree( container, root ) {

        var elements = [];

        for ( entry of root ) {

            console.log(entry);

            if ( typeof entry.children !== "undefined" ) {

                jcolumnz_exploreTree( container, entry.children );

            }

            elements.push( entry );

        }

        jcolumnz_createNewPanel( container, elements );

    }

    /**
     * Create a new panel inside the main container.
     *
     * @todo Change iteration (for..of is only accepted by Firefox).
     * @param container
     * @param elements
     */
    function jcolumnz_createNewPanel( container, elements ) {

        console.log("New Panel >> " + elements);

        // Build <li>s.

        var li = "";
        for ( element of elements ) {
            li += "<li>" + element.label + "</li>";
        }

        container.append('<div class="jcolumnz-panel"><ul>' + li + '</ul></div>');

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

        jcolumnz_exploreTree( $(this), settings.data )

        return this;

    };

}( jQuery ));