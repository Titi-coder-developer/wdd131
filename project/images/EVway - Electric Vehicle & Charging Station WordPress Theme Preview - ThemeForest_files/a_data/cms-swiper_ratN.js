( function( $ ) {
    var CMSSwiperHandler = function( $scope, $ ) {
        var breakpoints_size       = elementorFrontend.config.breakpoints,
            responsive_breakpoints = elementorFrontend.config.responsive.breakpoints,
            carousel               = $scope.find(".cms-swiper-container"),
            carousel_thumb         = $scope.find(".cms-swiper-container.cms-swiper-thumb");
        if(carousel.length == 0){
            return false;
        }
        var screen_mobile       = responsive_breakpoints['mobile']['value'], //767
            screen_mobile_extra = responsive_breakpoints['mobile_extra']['value'],  // 880
            screen_tablet       = responsive_breakpoints['tablet']['value'], // 1024
            screen_tablet_extra = responsive_breakpoints['tablet_extra']['value'], // 1200
            screen_laptop       = responsive_breakpoints['laptop']['value'], // 1366
            screen_desktop      = 1440, // 1440
            screen_widescreen   = responsive_breakpoints['widescreen']['value']; // 2400
            
        var data = carousel.data(), 
            settings = data.settings,
            custom_dots = data.customdot,
            custom_dotshtml = data.customdothtml;
            carousel_settings = {
                direction: settings['slide_direction'],
                effect: settings['slide_mode'],
                wrapperClass : 'cms-swiper-wrapper',
                slideClass: 'cms-swiper-slide',
                slidesPerColumn: settings['slide_percolumn'],
                spaceBetween: settings['slides_gutter'],
                autoHeight: false, 
                navigation: {
                    nextEl: ".cms-swiper-arrow-next",
                    prevEl: ".cms-swiper-arrow-prev",
                },
                speed: settings['speed'],
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                //screen_mobile
                slidesPerView: settings['slides_to_show_mobile'],
                slidesPerGroup: settings['slides_to_scroll_mobile'],
                breakpoints: {
                  768 :{ // screen_mobile
                    slidesPerView: settings['slides_to_show_mobile_extra'],
                    slidesPerGroup: settings['slides_to_scroll_mobile_extra'],
                  },
                  880 : { //screen_mobile_extra
                    slidesPerView: settings['slides_to_show_tablet'],
                    slidesPerGroup: settings['slides_to_scroll_tablet'],
                  },
                  1025 : { //screen_tablet
                    slidesPerView: settings['slides_to_show_tablet_extra'],
                    slidesPerGroup: settings['slides_to_scroll_tablet_extra'],
                  },
                  1281 : { //screen_tablet_extra
                    slidesPerView: settings['slides_to_show_laptop'],
                    slidesPerGroup: settings['slides_to_scroll_laptop'],
                  },
                  1367 : { //screen_laptop
                    slidesPerView: settings['slides_to_show'],
                    slidesPerGroup: settings['slides_to_scroll'],
                  },
                  2401 : { //screen_widescreen
                    slidesPerView: settings['slides_to_show_widescreen'],
                    slidesPerGroup: settings['slides_to_scroll_widescreen'],
                  }
                }
            };
            // loop
            if(settings['loop'] === 'true'){
                carousel_settings['loop'] = true;
            }
            // auto play
            if(settings['autoplay'] === 'true'){
                carousel_settings['disableOnInteraction'] = true;

                carousel_settings['autoplay'] = {
                    delay : settings['delay'],
                    disableOnInteraction : true, //settings['pause_on_interaction'],
                    pauseOnMouseEnter: true
                };
            } else {
                carousel_settings['autoplay'] = false;
            }
            // custom dots style
            if(settings['dots_style'] === 'number'){
                carousel_settings['pagination'] = {
                    el: settings['dots_el'],
                    clickable : true,
                    modifierClass: 'cms-swiper-pagination-',
                    bulletClass : 'cms-swiper-pagination-number',
                    bulletActiveClass: 'active',
                    renderBullet:  function (index, className) {
                        number = index + 1;
                        if(number < 10 ) number = '0'+number;
                        return '<span class="' + className + '">' + number + "</span>";
                    }
                }
            } else if(settings['dots_style'] === 'html'){
                var dots = custom_dotshtml.split(",");
                carousel_settings['pagination'] = {
                    el: '.cms-swiper-dots.cms-swiper-dots--text, .cms-swiper-dots.cms-swiper-dots--image, .cms-swiper-dots.cms-swiper--dots',
                    clickable : true,
                    //modifierClass: 'cms-swiper-pagination-',
                    bulletClass : 'cms-swiper-pagination-html',
                    bulletActiveClass: 'active',
                    renderBullet:  function (index, className) {
                        return '<span class="' + className + '">' + (dots[index]) + "</span>";
                    }
                }
            } else if(settings['dots_style'] === 'divider'){
                carousel_settings['pagination'] = {
                    type: 'bullets',
                    el: settings['dots_el'],
                    clickable : true,
                    modifierClass: 'cms-swiper-pagination-',
                    bulletClass : 'cms-swiper-pagination-divider',
                    bulletActiveClass: 'active',
                    renderBullet:  function (index, className) {
                        return '<span class="' + className + '"><span class="' + className + '-inner"></span></span>';
                    }
                }
            } else if(settings['dots_style'] === 'circle'){
                carousel_settings['pagination'] = {
                    //type: 'bullets',
                    el: settings['dots_el'],
                    clickable : true,
                    modifierClass: 'cms-swiper-pagination-',
                    bulletClass : 'cms-swiper-pagination-circle',
                    bulletActiveClass: 'active'
                }
            } else {
                carousel_settings['pagination'] = {
                    type: settings['dots_style'],
                    el: settings['dots_el'],
                    clickable : true,
                    modifierClass: 'cms-swiper-pagination-',
                    bulletClass : 'cms-swiper-pagination-divider',
                    bulletActiveClass: 'active'
                }
            }
            // Effect
            if(settings['slide_mode'] === 'cube'){
                carousel_settings['cubeEffect'] = {
                  shadow: false,
                  slideShadows: false,
                  shadowOffset: 0,
                  shadowScale: 0, //0.94,
                };
            }
            if(settings['slide_mode'] === 'coverflow'){
                carousel_settings['centeredSlides'] = true;
                carousel_settings['coverflowEffect'] = {
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
                };
            }
        carousel.each(function(index, element) {
            var swiper = new Swiper(element, carousel_settings);

            // Pause on Hover
            if(settings['autoplay'] === 'true' && settings['pause_on_hover'] === 'true'){
                $(this).on({
                  mouseenter: function mouseenter() {
                    this.swiper.autoplay.stop();
                  },
                  mouseleave: function mouseleave() {
                    this.swiper.autoplay.start();
                  }
                });
            }
        });  
    };
    var CMSSliderHandler = function( $scope, $ ) {
        var breakpoints = elementorFrontend.config.breakpoints,
            carousel = $scope.find(".cms-slider-container");
        if(carousel.length == 0){
            return false;
        }
        var data            = carousel.data(), 
            settings        = data.settings,
            custom_dots     = data.customdot,
            custom_dotshtml = data.customdothtml;
            
            settings['pause_on_hover'] === 'true';
            carousel_settings = {
                direction: settings['slide_direction'],
                effect: settings['slide_mode'],
                wrapperClass : 'cms-swiper-slider',
                slideClass: 'cms-slider-item',
                slidesPerView: 1,
                slidesPerGroup: 1,
                slidesPerColumn: 1,
                spaceBetween: 0,
                navigation: {
                  nextEl: ".cms-swiper-arrow-next",
                  prevEl: ".cms-swiper-arrow-prev",
                },
                speed: settings['speed'],
                on: {
                    init : function (swiper){
                        var activeIndex = this.activeIndex;
                        var current = this.slides.eq(activeIndex);
                        $('.swiper-slide .cms-animate').each(function(){
                            var data = $(this).data('settings');
                            $(this).removeClass('animated '+data['animation']).addClass('cms-invisible');
                        });
                        current.find('.cms-animate').each(function(){
                            var  $item = $(this), 
                                 data = $item.data('settings');
                            setTimeout(function () {
                                $item.removeClass('cms-invisible').removeClass('elementor-invisible').addClass('animated ' + data['animation']);
                            }, data['animation_delay']);
                        });  
                    },
                    slideChangeTransitionStart : function (swiper){
                        var activeIndex = this.activeIndex;
                        var current = this.slides.eq(activeIndex);
                        $('.swiper-slide .cms-animate').each(function(){
                            var data = $(this).data('settings');
                            $(this).removeClass('animated '+data['animation']).addClass('cms-invisible');
                        });
                        current.find('.cms-animate').each(function(){
                            var  $item = $(this), 
                                 data = $item.data('settings');
                            setTimeout(function () {
                                $item.removeClass('cms-invisible').removeClass('elementor-invisible').addClass('animated ' + data['animation']);
                            }, data['animation_delay']);
                        });
                    },
                    slideChange: function (swiper) {
                        var activeIndex = this.activeIndex;
                        var current = this.slides.eq(activeIndex);
                        $('.swiper-slide .cms-animate').each(function(){
                            var data = $(this).data('settings');

                            $(this).removeClass('animated '+data['animation']).addClass('cms-invisible');
                        });
                        current.find('.cms-animate').each(function(){
                            var  $item = $(this), 
                                 data = $item.data('settings');
                            setTimeout(function () {
                                $item.removeClass('cms-invisible').removeClass('elementor-invisible').addClass('animated ' + data['animation']);
                            }, data['animation_delay']);
                        });
                    }
                },
                autoHeight: false
            };
            // loop
            if(settings['loop'] === 'true'){
                carousel_settings['loop'] = true;
            }
            // auto play
            if(settings['autoplay'] === 'true'){
                carousel_settings['autoplay'] = {
                    delay : settings['delay'],
                    disableOnInteraction : settings['pause_on_interaction']
                };
            } else {
                carousel_settings['autoplay'] = false;
            }
            // custom dots style
            if(settings['dots_style'] === 'number'){
                carousel_settings['pagination'] = {
                    el: '.cms-swiper-dots',
                    clickable : true,
                    modifierClass: 'cms-swiper-pagination-',
                    bulletClass : 'cms-swiper-pagination-number',
                    bulletActiveClass: 'active',
                    renderBullet:  function (index, className) {
                        number = index + 1;
                        if(number < 10 ) number = '0'+number;
                        return '<span class="' + className + '">' + number + "</span>";
                    }
                }
            } else if(settings['dots_style'] === 'html'){
                var dots = custom_dotshtml.split(",");
                carousel_settings['pagination'] = {
                    //el: '.cms-swiper-dots',
                    el: '.cms-swiper-dots.cms-swiper--dots, .cms-swiper-dots.cms-swiper-dots-text, .cms-swiper-dots.cms-swiper-dots-divider',
                    clickable : true,
                    modifierClass: 'cms-swiper-pagination-',
                    bulletClass : 'cms-swiper-pagination-html',
                    bulletActiveClass: 'active',
                    renderBullet:  function (index, className) {
                        return '<span class="' + className + '">' + dots[index] + "</span>";
                    }
                }
            } else if(settings['dots_style'] === 'divider'){
                carousel_settings['pagination'] = {
                    type: 'bullets',
                    el: '.cms-swiper-dots',
                    clickable : true,
                    modifierClass: 'cms-swiper-pagination-',
                    bulletClass : 'cms-swiper-pagination-divider',
                    bulletActiveClass: 'active',
                    renderBullet:  function (index, className) {
                        return '<span class="' + className + '"><span class="' + className + '-inner"></span></span>';
                    }
                }
            } else if(settings['dots_style'] === 'circle'){
                carousel_settings['pagination'] = {
                    //type: 'bullets',
                    el: '.cms-swiper-dots',
                    clickable : true,
                    modifierClass: 'cms-swiper-pagination-',
                    bulletClass : 'cms-swiper-pagination-circle',
                    bulletActiveClass: 'active'
                }
            } else {
                carousel_settings['pagination'] = {
                    type: settings['dots_style'],
                    el: '.cms-swiper-dots',
                    clickable : true,
                    modifierClass: 'cms-swiper-pagination-',
                    bulletClass : 'cms-swiper-pagination-divider',
                    bulletActiveClass: 'active'
                }
            }
            // Effect
            if(settings['slide_mode'] === 'cube'){
                carousel_settings['cubeEffect'] = {
                  shadow: true,
                  slideShadows: true,
                  shadowOffset: 20,
                  shadowScale: 0.94,
                };
            }
        carousel.each(function(index, element) {
            var swiper = new Swiper(element, carousel_settings);
            if(settings['autoplay'] === 'true' && settings['pause_on_hover'] === 'true'){
                $(this).on({
                  mouseenter: function mouseenter() {
                    this.swiper.autoplay.stop();
                  },
                  mouseleave: function mouseleave() {
                    this.swiper.autoplay.start();
                  }
                });
            }
        });     
    };
    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        // Swipers
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_counter.default', CMSSwiperHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_heading.default', CMSSwiperHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_post_carousel.default', CMSSwiperHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_testimonial.default', CMSSwiperHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_fancy_box.default', CMSSwiperHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_clients.default', CMSSwiperHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_teams.default', CMSSwiperHandler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_howitwork.default', CMSSwiperHandler );
        // Sliders
        elementorFrontend.hooks.addAction( 'frontend/element_ready/cms_slider.default', CMSSliderHandler );
    } );
} )( jQuery );