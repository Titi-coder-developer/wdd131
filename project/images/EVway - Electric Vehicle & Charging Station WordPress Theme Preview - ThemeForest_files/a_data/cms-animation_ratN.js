( function( $ ) {
    /**
     * @param $scope The Widget wrapper element as a jQuery element
     * @param $ The jQuery alias
     */

    var WidgetAnimateHandler = function( $scope, $ ) {
        elementorFrontend.waypoint($scope.find('.elementor-invisible'), function () {
            var $heading = $(this),
                data = $heading.data('settings');

            if(typeof data['_animation'] != 'undefined'){
                //$heading.addClass(data['_animation']+' animated').removeClass('elementor-invisible');
                setTimeout(function () {
                    $heading.removeClass('elementor-invisible').addClass('animated ' + data['_animation']);
                }, data['animation_delay']);
            }
        });
    };

    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_accordion.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_button.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_chart.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_clients.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_commitment.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_countdown.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_counter.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_cta.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_ctf7.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_download.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_features.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_heading.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_howitwork.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_counter.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_page_title.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_post_carousel.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_post_grid.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_products.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_pricing_table.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_rating.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_slider.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_single_post.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_video.default', WidgetAnimateHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_images.default', WidgetAnimateHandler );
    } );
} )( jQuery );