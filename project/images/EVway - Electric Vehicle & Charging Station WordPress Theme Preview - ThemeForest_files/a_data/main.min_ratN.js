;(function ($) {

    "use strict";

    /* ===================
     Page reload
     ===================== */
    var scroll_top;
    var window_height;
    var window_width;
    var scroll_status = '';
    var lastScrollTop = 0;
    // Fire on document ready.
    $( document ).ready( function() {
        // menu
        evway_dropdown_mega_menu_full_width();
        evway_open_mobile_menu();
        evway_dropdown_menu();
        evway_map_pointer();
        evway_open_secondary_menu();
        // hidden sidebar
        evway_header_hidden_sidebar();
        // page title
        evway_pagetitle();
        // WooCommerce
        evway_open_cart_popup();
        evway_open_cart_popup_position();
        evway_wc_single_product_gallery();
        evway_quantity_plus_minus();
        evway_quantity_plus_minus_action();
        // background image moving
        evway_background_moving();
        
        evway_elementor_section_remove();
        // widget
        evway_widget_nav_menu();
        // modal
        evway_open_html_modal();
        // Contact form 7
        evway_cf7_date_time();
        // SVG
        /*
         * Replace all SVG images with inline SVG
         */
        $('img').filter(function() {
            return this.src.match(/.*\.svg$/);
        }).each(function(){
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });
    });

    $(window).on('load', function () {
        $(".cms-loader").fadeOut("slow");
        window_width = $(window).width();
        // Menu
        evway_header_ontop();
        evway_header_sticky();
        //evway_dropdown_mega_menu_full_width();
        // page title
        //footer
        evway_footer_fixed();
        evway_scroll_to_top();
        evway_video_size();
        evway_open_cart_popup_position();
    });

    $(window).on('resize', function () {
        window_width = $(window).width();
        evway_open_cart_popup_position();
        evway_video_size();
        // menu
        evway_dropdown_mega_menu_full_width();
        evway_dropdown_menu();
        evway_map_pointer();
        // mobile menu
        if (window_width > 1200){
           $('.cms-navigation').find('.sub-menu').css({'display':''}); 
        }
        // page title
    });

    $(window).on('scroll', function () {
        scroll_top = $(window).scrollTop();
        window_height = $(window).height();
        window_width = $(window).width();
        if (scroll_top > lastScrollTop) {
            scroll_status = 'down';
        } else if(scroll_top < lastScrollTop) {
            scroll_status = 'up';
        } else {
            scroll_status = 'no';
        }
        lastScrollTop = scroll_top;
        
        evway_header_sticky();
        evway_open_cart_popup_position();
        evway_scroll_to_top();
        // remove Hideen content
        $('.cms-header-hidden-content').removeClass('active');
        $('.cms-header-hidden-content-content').removeClass('open').css({'top':''});
    });

    // Ajax Complete
    $(document).ajaxComplete(function(event, xhr, settings){
        "use strict";
        $.sep_grid_refresh(); // this need to add last function
        evway_video_size();
    });

    $.sep_grid_refresh = function (){
        $('.cms-grid-masonry').each(function () {
            var iso = new Isotope(this, {
                itemSelector: '.cms-grid-item',
                layoutMode: $(this).data('layout'),
                fitRows: {
                    gutter: -1
                },
                percentPosition: true,
                masonry: {
                    columnWidth: '.cms-grid-sizer',
                },
                containerStyle: null,
                stagger: 0,
                sortBy : 'name'
            });
            var filtersElem = $(this).parent('.cms-grid').find('.cms-grid-filter-wrap');
            filtersElem.on('click', function (event) {
                var filterValue = event.target.getAttribute('data-filter');
                iso.arrange({filter: filterValue});
            });

            var filterItem = $(this).parent('.cms-grid').find('.cms-filter-item');
            filterItem.on('click', function (e) {
                filterItem.removeClass('active');
                $(this).addClass('active');
            });

            var filtersSelect = $(this).parent().find('.cms-select-filter-wrap');
            filtersSelect.change(function() {
                var filters = $(this).val();
                iso.arrange({filter: filters});
            });

            var orderSelect = $(this).parent().find('.cms-select-order-wrap');
            orderSelect.change(function() {
                var e_order = $(this).val();
                if(e_order == 'asc') {
                    iso.arrange({sortAscending: false});
                }
                if(e_order == 'des') {
                    iso.arrange({sortAscending: true});
                }
            });

        });
    }
    // load more
    $(document).on('click', '.cms-load-more', function(){
        var loadmore    = $(this).data('loadmore');
        var _this       = $(this).parents(".cms-grid");
        var layout_type = _this.data('layout');
        var loading_text = $(this).data('loading-text');
        var no_text = $(this).data('no-text');

        loadmore.maxPages  = parseInt(_this.data('max-pages'));
        loadmore.paged  = parseInt(_this.data('start-page')) +1;

        _this.find('.cms-grid-overlay').addClass('loader');
        $(this).addClass('loading');
        $(this).find('.cms-btn-icon').addClass('loading');
        $(this).find('.cms-btn-text').text(loading_text);
        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            beforeSend: function () {

            },
            data: {
                action: 'evway_load_more_post_grid',
                settings: loadmore
            }
        })
        .done(function (res) {
            if(res.status == true){
                _this.find('.cms-grid-inner').append(res.data.html);
                _this.data('start-page', res.data.paged);
                _this.find('.cms-grid-overlay').removeClass('loader');
                _this.find('.cms-load-more').removeClass('loading');
                _this.find('.cms-btn-icon').removeClass('loading');
                _this.find('.cms-btn-text').text('Load More');
                if(res.data.paged == loadmore.maxPages){
                    _this.find('.cms-load-more').addClass('no-more');
                    _this.find('.cms-btn-text').text(no_text);
                }
                if(layout_type == 'masonry'){
                    $.sep_grid_refresh();
                }
            } else if (res.status == false){
                _this.find('.cms-load-more').addClass('no-more');
            }
        })
        .fail(function (res) {
            _this.find('.cms-load-more').addClass('no-more');
            return false;
        })
        .always(function () {
            return false;
        });
    });

    // pagination
    $(document).on('click', '.cms-grid-pagination .ajax a.page-numbers', function(){
        var _this = $(this).parents(".cms-grid");
        var loadmore = _this.find(".cms-grid-pagination").data('loadmore');
        var query_vars = _this.find(".cms-grid-pagination").data('query');
        var layout_type = _this.data('layout');
        var paged = $(this).attr('href');
        paged = paged.replace('#', '');
        loadmore.paged = parseInt(paged);
        query_vars.paged = parseInt(paged);
        _this.find('.cms-grid-overlay').addClass('loader');
        $('html,body').animate({scrollTop: _this.offset().top - 100}, 750);
        // reload pagination
        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            beforeSend: function () {

            },
            data: {
                action: 'evway_get_pagination_html',
                query_vars: query_vars
            }
        }).done(function (res) {
            if(res.status == true){
                _this.find(".cms-grid-pagination").html(res.data.html);
                _this.find('.cms-grid-overlay').removeClass('loader');
            }
            else if(res.status == false){
            }
        }).fail(function (res) {
            return false;
        }).always(function () {
            return false;
        });
        // load post
        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            beforeSend: function () {

            },
            data: {
                action: 'evway_load_more_post_grid',
                settings: loadmore
            }
        }).done(function (res) {
            if(res.status == true){
                _this.find('.cms-grid-inner .cms-grid-item').remove();
                _this.find('.cms-grid-inner').append(res.data.html);
                _this.data('start-page', res.data.paged);
                if(layout_type == 'masonry'){
                    $.sep_grid_refresh();
                }
            }
            else if(res.status == false){
            }
        }).fail(function (res) {
            return false;
        }).always(function () {
            return false;
        });
        return false;
    });
    /**
     * Check right to left
    */
    function evway_is_rtl(){
        "use strict"; 
        var rtl = $('html[dir="rtl"]'),
            is_rtl = rtl.length ? true : false;
        return is_rtl;
    }
    /**
     * HTML Modal
    */
    function evway_open_html_modal(){
        $('.cms-modal').on('click', function(e){
            //alert( "Handler for .focus() called." );
            e.preventDefault();
            var html = $(this).attr('href');
            $(html).toggleClass('open');
            setTimeout(function(){
                $('.cms-search-form-popup input[name="s"]').focus();
            },500);
        });
        $('.cms-modal-close').on('click', function(e){
            e.preventDefault();
            $(this).parent().removeClass('open');
        });
        $('a[href="#"]').on('click', function (e){
            e.preventDefault();
        });
    }
    // Header ontop
    function evway_header_ontop() {
        'use strict';
        var header    = $('#cms-header'),
            offsetTop = $('#cms-header-top').outerHeight(),
            nextSection = header.parent().next(),
            nextSectionTopSpace = parseInt(nextSection.css('padding-top')),
            headerHeight = header.outerHeight(),
            nextSectionTopSpaceNew = nextSectionTopSpace + headerHeight,
            // Elementor element
            elementor_nextSection = header.parent().next('#cms-main').find('.cms-page-title-wrapper'),
            elementor_nextSectionTopSpace = parseInt(elementor_nextSection.css('padding-top')),
            elementor_nextSectionTopSpaceNew = elementor_nextSectionTopSpace + headerHeight,
            // Header Button 
            header_btn1 = header.find('.cms-header-btn1 .h-btn'),
            header_btn2 = header.find('.cms-header-btn2 .h-btn'),
            header_btn_phone = header.find('.cms-hotline-phone .h-btn'),
            header_btn1_classes = header_btn1.data('classes'),
            header_btn2_classes = header_btn2.data('classes'),
            header_phone_classes = header_btn_phone.data('classes');
        if(header.hasClass('is-ontop')) {
            header.css({
                //'top': offsetTop
            });
            // add top space for next section of header
            header.parent().next('#cms-pagetitle').css({
                //'padding-top': nextSectionTopSpaceNew
            });
            // fix for elementor CMS Page title element 
            // Elementor element
            elementor_nextSection.css({
                'padding-top': elementor_nextSectionTopSpaceNew
            });
            // Buttons
            if(header_btn1.length > 0 ){
                header_btn1.removeClass(header_btn1_classes['default']).addClass(header_btn1_classes['ontop']);
            }
            if(header_btn2.length > 0 ){
                header_btn2.removeClass(header_btn2_classes['default']).addClass(header_btn2_classes['ontop']);
            }
            if(header_btn_phone.length > 0 ){
                header_btn_phone.removeClass(header_phone_classes['default']).addClass(header_phone_classes['ontop']);
            }
        } else {
            // Buttons
            if(header_btn1.length > 0 ){
                header_btn1.removeClass(header_btn1_classes['ontop']).addClass(header_btn1_classes['default']);
            }
            if(header_btn2.length > 0 ){
                header_btn2.removeClass(header_btn2_classes['ontop']).addClass(header_btn2_classes['default']);
            }
            if(header_btn_phone.length > 0 ){
                header_btn_phone.removeClass(header_phone_classes['ontop']).addClass(header_phone_classes['default']);
            }
        }
    }
    // header sticky
    function evway_header_sticky() {
        'use strict';
        var header             = $('#cms-header'),
            offsetTop          = header.outerHeight(),
            h_header           = $('.fixed-height').outerHeight(),
            offsetTopAnimation = offsetTop + 200,
            topSpace           = $('html').css('margin-top'),
            header_btn         = header.find('.h-btn'),
            header_cart_content = header.parents('body').find('.cms-header-cart-content'),
            // Header Button 
            header_btn1 = header.find('.cms-header-btn1 .h-btn'),
            header_btn2 = header.find('.cms-header-btn2 .h-btn'),
            header_btn_phone = header.find('.cms-hotline-phone .h-btn'),
            header_btn1_classes = header_btn1.data('classes'),
            header_btn2_classes = header_btn2.data('classes'),
            header_phone_classes = header_btn_phone.data('classes');

        if(header.hasClass('is-sticky')) {
            if(scroll_status == 'up' && lastScrollTop != 0){
                header.parent().find('#cms-header-top').addClass('main-header-fixed');
                header.addClass('header-sticky').removeClass('header-ontop').css({'top':''});
                header_cart_content.css({'position':'fixed'});
                // Buttons
                if(header_btn1.length > 0 ){
                    header_btn1.removeClass(header_btn1_classes['ontop']).addClass(header_btn1_classes['default']);
                }
                if(header_btn2.length > 0 ){
                    header_btn2.removeClass(header_btn2_classes['ontop']).addClass(header_btn2_classes['default']);
                }
                if(header_btn_phone.length > 0 ){
                    header_btn_phone.removeClass(header_phone_classes['ontop']).addClass(header_phone_classes['default']);
                }

                // fix break when scroll
                if(!header.hasClass('is-ontop')){
                    header.parents('#cms-page').css({'padding-top': offsetTop});
                }
            } else {
                header.parent().find('#cms-header-top').removeClass('main-header-fixed');
                header.removeClass('header-sticky');
                if(header.hasClass('is-ontop')){
                    header.addClass('header-ontop');
                    // Buttons
                    if(header_btn1.length > 0 ){
                        header_btn1.removeClass(header_btn1_classes['default']).addClass(header_btn1_classes['ontop']);
                    }
                    if(header_btn2.length > 0 ){
                        header_btn2.removeClass(header_btn2_classes['default']).addClass(header_btn2_classes['ontop']);
                    }
                    if(header_btn_phone.length > 0 ){
                        header_btn_phone.removeClass(header_phone_classes['default']).addClass(header_phone_classes['ontop']);
                    }
                }
                header_cart_content.css({'position':''});
                // fix break when scroll
                if(!header.hasClass('is-ontop')){
                    header.parents('#cms-page').css({'padding-top': '0'});
                }
            }
        }
        if (window_width > 992) {
            $('.fixed-height').css({
                'height': h_header
            });
        }
    }
    /**
     * Dropdown Mega Menu
     * Full Width
    **/
    function evway_dropdown_mega_menu_full_width(){
        'use strict';
        var parentPos     = $('.cms-primary-menu');
        parentPos.find('.megamenu').each(function () {
            var megamenu      = $(this).find('> .cms-megamenu-full');
            if(megamenu.length == 1 && $(this).offset().left != 'undefined'){
                var megamenuPos    = $(this).offset().left;
                if(evway_is_rtl()){
                    megamenu.css({'right': megamenuPos, 'left':'auto'});
                } else {
                    megamenu.css({'left':megamenuPos*-1, 'right':'auto'});
                }
            }
            // Mega menu container
            var megamenu_container      = $(this).find('> .cms-megamenu-container');
            if(megamenu_container.length == 1 && $(this).offset().left != 'undefined'){
                var megamenu_container_w = megamenu_container.outerWidth(),
                    window_width = $(window).width(),
                    menuoffset    = megamenu_container.offset().left,
                    megamenuPos = (menuoffset + megamenu_container_w - window_width)/-1;
                    
                if ( (menuoffset + megamenu_container_w) > window_width) {
                    if(evway_is_rtl()){
                        megamenu_container.css({'right': megamenuPos, 'left':'auto'});
                    } else {
                        megamenu_container.css({'left':megamenuPos, 'right':'auto'});
                    }
                } else {
                    megamenu_container.css({'left':'', 'right':''});
                }
            }
        });
    }
    /* =================
     Menu Mobile
    =================== */
    function evway_open_mobile_menu(){
        'use strict';
        $("#main-menu-mobile .open-menu").on('click', function () {
            $(this).toggleClass('opened');
            $('.cms-navigation').toggleClass('navigation-open');
        });
        /* Add toggle button to parent Menu */
        $('.main-menu-toggle').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('open');
            $(this).parent().parent().parent('.menu-item').find('> .sub-menu').toggleClass('submenu-open');
            $(this).parent().parent().parent('.menu-item').find('> .sub-menu').slideToggle();
        });
    }
    /* =================
     Menu Dropdown Touched Side
     =================== */
    function evway_dropdown_menu(){
        'use strict';
        var $menu = $('.cms-main-navigation');    
        $menu.find('.cms-primary-menu li').each(function () {
            var $submenu = $(this).find('> .sub-menu');
            if ($submenu.length == 1 && $submenu.offset().left != 'undefined') {
                if ( ($submenu.offset().left + $submenu.outerWidth()) > $(window).width()) {
                    $submenu.addClass('back');
                } else if ($submenu.offset().left < 0) {
                    //$submenu.addClass('back');
                    $submenu.removeClass('back');
                }
            }
        });
        $('.sub-menu .current-menu-item').parents('.menu-item-has-children').addClass('current-menu-ancestor');
    }
    /* =================
     Map poiter Touched side
     =================== */
    function evway_map_pointer(){
        'use strict';
        var $pointers = $('.cms-locate-pointer');
        $pointers.find('.item-pointer').each(function () {
            var $pointer = $(this).find('.item-holder'),
                $pointerW    = $pointer.outerWidth(),
                offsetLeft   = $(this).offset().left,
                arrow        = $(this).find('.inner-holder-arrow'),
                $pointerPos  = 0;
            if( $(window).width() < ( offsetLeft + $pointerW ) ){
                $pointerPos = ( (offsetLeft + $pointerW) - $(window).width())/-1;
                if(evway_is_rtl()){
                    $pointer.css({'right': $pointerPos, 'left':'auto'});
                    arrow.css({'right':($pointerPos*-1)+10});
                } else {
                    $pointer.css({'left': $pointerPos});
                    arrow.css({'left':($pointerPos*-1)+10});
                }
            } else {
                $pointer.css({'left': '', 'right':'' });
                arrow.css({'left':'', 'right':''});
            }
        });
    }
    /* =================
     Open Secondary Menu
     =================== */
    function evway_open_secondary_menu(){
        'use strict';
        $('.cms-secondary-menu-title').on('click', function(e){
            e.preventDefault();
            $(this).toggleClass('active');
            $(this).next('#cms-secondary-menu').toggleClass('open').slideToggle();
        });
    }
    
    /* =================
     Hidden Side bar
    =================== */
    function evway_header_hidden_sidebar(){
        'use strict';

        $(".cms-header-hidden-sidebar").on('click', function (e) {
            e.preventDefault();
            $('.cms-hidden-sidebar').toggleClass('open');
        });
        $(".cms-hidden-close").on('click', function (e) {
            e.preventDefault();
            $(this).parent().removeClass('open');
        });

        // Not active
        var header_hidden_content = $(".cms-header-hidden-content"),
            header_hidden_content_content = $(".cms-header-hidden-content-content");
        header_hidden_content.on('click', function (e) {
            e.preventDefault();
            var headerHeight = $('#cms-header').outerHeight(),
                adminbarHeight = $('#wpadminbar').outerHeight(),
                offsetTop = headerHeight + adminbarHeight;
            $(this).toggleClass('active');
            header_hidden_content_content.toggleClass('open').css({'top':offsetTop});
        });
    }
    /* ====================
      Page Title
     ====================== */
     function evway_pagetitle(){
        'use strict';
        var pageTitle = $('#cms-pagetitle'),
            paddingBottom = parseInt(pageTitle.css('padding-bottom')),
            extraPaddingBottom = pageTitle.find('.cms-ptitle-scroll').innerHeight(),
            newpaddingBottom = paddingBottom + extraPaddingBottom;
            // new spacing
            pageTitle.css({'padding-bottom':newpaddingBottom});
     }
    /* ====================
      Fixed Footer
     ====================== */
     function evway_footer_fixed(){
        'use strict';
        var offsetFooter = $('#cms-footer').outerHeight();
        if($('#cms-footer').hasClass('cms-footer-fixed')) {
            $('#cms-page').css({
                'padding-bottom': offsetFooter
            });
        }
     }
    /* ====================
     Scroll To Top
     ====================== */
    function evway_scroll_to_top() {
        'use strict';
        if (scroll_top < window_height) {
            $('.cms-scroll-top').addClass('off').removeClass('on');
            $('#cms-footer').addClass('scroll-off').removeClass('scroll-on');
        }
        if (scroll_top > window_height) {
            $('.cms-scroll-top').addClass('on').removeClass('off');
            $('#cms-footer').addClass('scroll-on').removeClass('scroll-off');
        }
        if(scroll_top + window_height > ($(document).height() - 300) ) {
           //you are at bottom
           $('.cms-scroll-top').addClass('off').removeClass('on');
       }
    }

    /**
     * Media Embed dimensions
     * 
     * Youtube, Vimeo, Iframe, Video, Audio.
     * @author Chinh Duong Manh
     */
    function evway_video_size() {
        'use strict';
        setTimeout(function(){
            $('.cms-featured iframe , .cms-featured  video, .cms-featured .wp-video-shortcode').each(function(){
                var v_width = $(this).parent().width();
                var v_height = Math.floor(v_width / (16/9));
                $(this).attr('width',v_width).css('width',v_width);
                $(this).attr('height',v_height + 59).css('height',v_height + 59);
            });
        }, 100);
    }
    /**
     * Widgets
     * $('a[href="#"]').on('click', function (e) {
            e.preventDefault();
            $(this).find('>.cms-menu-toggle').toggleClass('open');
            $(this).parent('.cms-widget-menu-item').find('>ul').slideToggle();
        });
    ***/
    function evway_widget_nav_menu(){
        'use strict';
        $('.cms-menu-toggle').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('open');
            $(this).parent().parent('.cms-widget-menu-item').find('>ul').slideToggle();
        });
    }
    /**
     * WooCommerce
     * Single Product
    */
    // open cart popup
    function evway_open_cart_popup(){
        'use strict';
        $('.cms-header-cart').on('click', function (e) {
            e.preventDefault();
            var shoppingCart = $(this).parents('body').find('.cms-header-cart-content');
            shoppingCart.toggleClass('open');
        });
    }
    function evway_open_cart_popup_position(){
        'use strict';
        var parentPos           = $('.cms-header-cart'),
            shoppingCart        = $('.cms-header-cart-content');
            if(parentPos.length === 0 || shoppingCart.length === 0) return;
        var shoppingCartW       = shoppingCart.outerWidth(),
            shoppingCart_inside = parentPos.find('.cms-header-cart-content.inside'),
            adminbarHeight      = 0, 
            headerTopHeight     = 0,
            headerTopHeight_HeaderFixed = 0,
            headerHeight        = 0,
            headerCartHeight    = 40,
            offsetLeft          = parentPos.offset().left,
            shoppingCartPos     = 0;
            if( $(window).width() < ( offsetLeft + shoppingCartW ) ){
                shoppingCartPos = $(window).width() - shoppingCartW;
            } else {
                shoppingCartPos = offsetLeft;
            }
            if ( $( "#wpadminbar" ).length ) {
                adminbarHeight = $('#wpadminbar').outerHeight();
            } 
            if ( $( "#cms-header-top" ).length ) {
                headerTopHeight = $('#cms-header-top').outerHeight();
            }
            // Header top when header fixed
            if ( $( ".main-header-fixed" ).length ) {
                headerTopHeight_HeaderFixed = $('.main-header-fixed').outerHeight();
            }

            if ( $( "#cms-header" ).length ) {
                headerHeight = $('#cms-header').outerHeight();
            }
        var headerCartoffsetTop = headerTopHeight + headerHeight + adminbarHeight - headerTopHeight_HeaderFixed;
        shoppingCart.css({'top': headerCartoffsetTop});
        if(evway_is_rtl()){
            if (shoppingCartPos > 0) {
                shoppingCart.css({'left': shoppingCartPos, 'right':'auto'});
            } else {
                shoppingCart.css({'right': shoppingCartPos, 'left':'auto'});
            }
        } else {
            if (shoppingCartPos > 0) {
                shoppingCart.css({'left':shoppingCartPos, 'right':'auto'});
            } else {
                shoppingCart.css({'right': shoppingCartPos, 'left':'auto'});
            }
        }
    }
    //quantity number field custom
    function evway_quantity_plus_minus(){
        "use strict";
        $( ".quantity input" ).wrap( "<div class='cms-quantity'></div>" );
        $('<span class="quantity-button quantity-down"></span>').insertBefore('.quantity input');
        $('<span class="quantity-button quantity-up"></span>').insertAfter('.quantity input');
        // contact form 7 input number
        $('<span class="cms-input-number-spin"><span class="cms-input-number-spin-inner cms-input-number-spin-up"></span><span class="cms-input-number-spin-inner cms-input-number-spin-down"></span></span>').insertAfter('.wpcf7-form-control-wrap input[type="number"]');
    }
    function evway_ajax_quantity_plus_minus(){
        "use strict";
        $('<span class="quantity-button quantity-down"></span>').insertBefore('.quantity input');
        $('<span class="quantity-button quantity-up"></span>').insertAfter('.quantity input');
    }
    function evway_quantity_plus_minus_action(){
        "use strict";
        $(document).on('click','.quantity .quantity-button',function () {
            var $this = $(this),
                spinner = $this.closest('.quantity'),
                input = spinner.find('input[type="number"]'),
                step = input.attr('step'),
                min = input.attr('min'),
                max = input.attr('max'),value = parseInt(input.val());
            if(!value) value = 0;
            if(!step) step=1;
            step = parseInt(step);
            if (!min) min = 0;
            var type = $this.hasClass('quantity-up') ? 'up' : 'down' ;
            switch (type)
            {
                case 'up':
                    if(!(max && value >= max))
                        input.val(value+step).change();
                    break;
                case 'down':
                    if (value > min)
                        input.val(value-step).change();
                    break;
            }
            if(max && (parseInt(input.val()) > max))
                input.val(max).change();
            if(parseInt(input.val()) < min)
                input.val(min).change();
        });
        $(document).on('click','.cms-input-number-spin-inner',function () {
            var $this = $(this),
                spinner = $this.parents('.wpcf7-form-control-wrap'),
                input = spinner.find('input[type="number"]'),
                step = input.attr('step'),
                min = input.attr('min'),
                max = input.attr('max'),value = parseInt(input.val());
            if(!value) value = 0;
            if(!step) step=1;
            step = parseInt(step);
            if (!min) min = 0;
            var type = $this.hasClass('cms-input-number-spin-up') ? 'up' : 'down' ;
            switch (type)
            {
                case 'up':
                    if(!(max && value >= max))
                        input.val(value+step).change();
                    break;
                case 'down':
                    if (value > min)
                        input.val(value-step).change();
                    break;
            }
            if(max && (parseInt(input.val()) > max))
                input.val(max).change();
            if(parseInt(input.val()) < min)
                input.val(min).change();
        });
    }
    // WooCommerce Single Product Gallery 
    function evway_wc_single_product_gallery(){
        'use strict';
        if(typeof $.flexslider != 'undefined'){
            $('.wc-gallery-sync').each(function() {
                var itemW      = parseInt($(this).attr('data-thumb-w')),
                    itemH      = parseInt($(this).attr('data-thumb-h')),
                    itemN      = parseInt($(this).attr('data-thumb-n')),
                    itemMargin = parseInt($(this).attr('data-thumb-margin')),
                    itemSpace  = itemH - itemW + itemMargin;
                if($(this).hasClass('thumbnail-vertical')){
                    $(this).flexslider({
                        selector       : '.wc-gallery-sync-slides > .wc-gallery-sync-slide',
                        animation      : 'slide',
                        controlNav     : false,
                        directionNav   : true,
                        prevText       : '<span class="flex-prev-icon"></span>',
                        nextText       : '<span class="flex-next-icon"></span>',
                        asNavFor       : '.woocommerce-product-gallery',
                        direction      : 'vertical',
                        slideshow      : false,
                        animationLoop  : false,
                        itemWidth      : itemW, // add thumb image height
                        itemMargin     : itemSpace, // need it to fix transform item
                        move           : 3,
                        start: function(slider){
                            var asNavFor     = slider.vars.asNavFor,
                                height       = $(asNavFor).height(),
                                height_thumb = $(asNavFor).find('.flex-viewport').height(),
                                window_w = $(window).width();
                            if(window_w > 1024) {
                                slider.css({'max-height' : height_thumb, 'overflow': 'hidden'});
                                slider.find('> .flex-viewport > *').css({'height': height, 'width': ''});
                            }
                        }
                    });
                }
                if($(this).hasClass('thumbnail-horizontal')){
                    $(this).flexslider({
                        selector       : '.wc-gallery-sync-slides > .wc-gallery-sync-slide',
                        animation      : 'slide',
                        controlNav     : true,
                        directionNav   : false,
                        prevText       : '<span class="flex-prev-icon"></span>',
                        nextText       : '<span class="flex-next-icon"></span>',
                        asNavFor       : '.woocommerce-product-gallery',
                        slideshow      : false,
                        animationLoop  : false, // Breaks photoswipe pagination if true.
                        itemWidth      : itemW,
                        itemMargin     : itemMargin,
                        start: function(slider){

                        }
                    });
                };
            });
        }
    }
    /**
     * Contact form7
     * custom date/time
     * $(this).on('hover', function(){
          $(this).find('>.cms-placeholder').addClass('active');
            $(this).find('.wpcf7-time, .wpcf7-date').addClass('active');
        });

        $(this).on('mouseover', function(){
            $(this).find('>.cms-placeholder').addClass('active');
            $(this).find('.wpcf7-time, .wpcf7-date').addClass('active');
        });
     * @since 1.0.0 
    **/
    function evway_cf7_date_time(){
        'use strict';
        var $this = $('.wpcf7-form-control-wrap.cms-date-time'),
            $date = $this.find('.wpcf7-form-control').val();
        $this.each(function(){
            $(this).on('click', function(){
                $(this).find('>.cms-placeholder').addClass('active');
                $(this).find('.wpcf7-time, .wpcf7-date').addClass('active');
            });
            
            $(this).on('focus', function(){
                $(this).find('>.cms-placeholder').addClass('active');
                $(this).find('.wpcf7-time, .wpcf7-date').addClass('active');
            });
        })
    }
    /**
     * BACKGROUND IMAGE MOVING FUNCTION BY= jquery.bgscroll.js
    */
    (function() {
        'use strict';
        $.fn.bgscroll = $.fn.bgScroll = function( options ) {
            
            if( !this.length ) return this;
            if( !options ) options = {};
            if( !window.scrollElements ) window.scrollElements = {};
            
            for( var i = 0; i < this.length; i++ ) {
                
                var allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                var randomId = '';
                for( var l = 0; l < 5; l++ ) randomId += allowedChars.charAt( Math.floor( Math.random() * allowedChars.length ) );
                
                    this[ i ].current = 0;
                    this[ i ].scrollSpeed = options.scrollSpeed ? options.scrollSpeed : 70;
                    this[ i ].direction = options.direction ? options.direction : 'h';
                    window.scrollElements[ randomId ] = this[ i ];
                    
                    eval( 'window[randomId]=function(){var axis=0;var e=window.scrollElements.' + randomId + ';e.current -= 1;if (e.direction == "h") axis = e.current + "px 0";else if (e.direction == "v") axis = "0 " + e.current + "px";else if (e.direction == "d") axis = e.current + "px " + e.current + "px";$( e ).css("background-position", axis);}' );
                                                             
                    setInterval( 'window.' + randomId + '()', options.scrollSpeed ? options.scrollSpeed : 70 );
                }
                
                return this;
            }
    })(jQuery);   
    function evway_background_moving(){
        "use strict";
        // allow direction v, d
        //$('.cms-bg-moving-h').bgscroll({scrollSpeed:20 , direction:'h' });
    }
    // Elementor section remove
    function evway_elementor_section_remove(){
        'use strict';
        $('.cms-remove-row-yes').on('click', function(e){
            e.preventDefault();
            $(this).parent().remove();
        });
    }
})(jQuery);

