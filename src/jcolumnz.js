/**
 * jColumnz
 *
 * @Author MARTIN Damien
 * @License MIT public license
 */

(function( $ ) {

    $.fn.columnz = function( options ) {

        // Load options and save them into 'settings'.

        var settings = $.extend({
            data: []
        }, options );

        // Add a class to our container for easy styling.

        $(this).addClass("jcolumnz-container");

        return this;

    };

}( jQuery ));