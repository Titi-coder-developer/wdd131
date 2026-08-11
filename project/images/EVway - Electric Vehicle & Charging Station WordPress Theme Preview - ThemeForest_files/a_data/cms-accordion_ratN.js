( function( $ ) {
    /**
     * @param $scope The Widget wrapper element as a jQuery element
     * @param $ The jQuery alias
     */
    var WidgetCMSAccordionHandler = function( $scope, $ ) {
        $scope.find('.cms-accordion .cms-accordion-item').on('click', function(e){
            e.preventDefault();
            var target                      = $(this).data('target'),
                parent                      = $(this).parent('.cms-accordion'),
                active_items                = parent.find('.cms-accordion-item.active'),
                active_icon                 = parent.data('icon-open'),
                close_icon                  = parent.data('icon-close'),
                title_color                 = 'text-'+parent.data('title-color'),
                title_hover_color           = 'text-'+parent.data('title-hover-color'),
                explain_icon_color          = parent.data('icon-open-color'),
                explain_icon_close_color    = parent.data('icon-close-color'),
                explain_icon_bg_color       = 'bg-'+parent.data('title-color'),
                explain_icon_bg_hover_color = 'bg-'+parent.data('title-hover-color');

            $.each(active_items, function (index, item) {
                var item_target = $(item).data('target'),
                    current_icon = $(item).find('.cms-ac-title--icon').hasClass(active_icon);
                if(item_target != target){
                    $(item).removeClass('active');
                    $(item).find('.cms-ac-title').toggleClass(title_color +' '+ title_hover_color);
                    $(item).find('.cms-ac-title--icon').toggleClass('active '+active_icon+' '+close_icon+' '+explain_icon_bg_color+' '+explain_icon_bg_hover_color+' '+explain_icon_color+' '+explain_icon_close_color);
                    $(item_target).slideUp(400);
                }
            });

            $(this).toggleClass('active');
            $(this).find('.cms-ac-title').toggleClass(title_color +' '+ title_hover_color);
            $(this).find('.cms-ac-title--icon').toggleClass('active '+active_icon+' '+close_icon+' '+explain_icon_bg_color+' '+explain_icon_bg_hover_color+' '+explain_icon_color+' '+explain_icon_close_color);
            $(target).slideToggle(400);
        });
    };

    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_accordion.default', WidgetCMSAccordionHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_map.default', WidgetCMSAccordionHandler );
    } );
} )( jQuery );