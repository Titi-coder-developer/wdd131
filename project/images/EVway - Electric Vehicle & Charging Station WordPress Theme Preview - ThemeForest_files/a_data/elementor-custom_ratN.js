(function($) {
    "use strict";
    $( window ).on( 'elementor/frontend/init', function() {
    	var _elementor = typeof elementor != 'undefined' ? elementor : elementorFrontend;

    	/**
	     * Check right to left
	    */
	    function evway_is_rtl(){
	    	'use strict';
	        var rtl = $('html[dir="rtl"]'),
	            is_rtl = rtl.length ? true : false;
	        return is_rtl;
	    }
    } );
}(jQuery));