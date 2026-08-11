( function( $ ) {
    /**
     * @param $scope The Widget wrapper element as a jQuery element
     * @param $ The jQuery alias
     */
    var WidgetCMSParollerHandler = function( $scope, $ ) {
        var paroller = $scope.find(".cms-paroller"),
            paroller_inner = $scope.find(".cms-paroller-inner");
        paroller.paroller({
            factor: 0.05,            // multiplier for scrolling speed and offset
            factorXs: 0.05,           // multiplier for scrolling speed and offset
            type: 'foreground',     // background, foreground
            direction: 'vertical', // vertical, horizontal
            transition: 'transform 0.1s ease-in' // CSS transition
        });
        paroller_inner.paroller({
            factor: 0.05,            // multiplier for scrolling speed and offset
            factorXs: 0.05,           // multiplier for scrolling speed and offset
            type: 'foreground',     // background, foreground
            direction: 'vertical', // vertical, horizontal
            transition: 'transform 0.1s ease-in' // CSS transition
        });
    };

    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_counter.default', WidgetCMSParollerHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_testimonial.default', WidgetCMSParollerHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_video.default', WidgetCMSParollerHandler );
    } );
} )( jQuery );