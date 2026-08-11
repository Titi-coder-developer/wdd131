( function( $ ) {
    /**
     * @param $scope The Widget wrapper element as a jQuery element
     * @param $ The jQuery alias
     */
    var WidgetCMSProgressBarHandler = function( $scope, $ ) {
        setTimeout(function(){
            elementorFrontend.waypoint($scope.find('.cms-progress-bar'), function () {
                var $progressbar = $(this);
                //$progressbar.css({'width': $progressbar.data('max') + '%', 'display':'block'});
                $progressbar.css({'width': $progressbar.data('max') + '%'});
            });
        }, 300);
    };

    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_progressbar.default', WidgetCMSProgressBarHandler );
    } );
} )( jQuery );