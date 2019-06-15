define([
    'jquery',
    'Bss_BundleOptionImage/js/owl.carousel',
    "mage/translate",
    'mage/mage',
    "domReady!"
], function ($) {
    'use strict';
    $.widget('mage.BundleOptionImage', {
        options: {
            jsonbundle:[],
            class_option_bundle:'',
            height:'',
            width:'',
            itemsDesktop:'',
            speedSlide:'',
            autoSlide:''
        },

        _init: function () {
            if (this.options.jsonbundle !== '' && this.options.class_option_bundle!=='') {
                this._RenderOptionImage();
            } else {
                console.log('BundleOptionImage: No input data received');
            }
        },

        _create: function () {
            var $widget = this;
            $widget._EventListener();
        },

        _RenderOptionImage: function () {
            var jsbundle = this.options.jsonbundle;
            var $widget = this;
            var class_option = this.options.class_option_bundle;
            $(class_option).each(function () {
                var optionid = $(this).attr('name').match(/\d+/)[0];
                if ($(this).is("select")) {
                    if ($(this).is("select[multiple]")) {
                        $("<div class='multiple-option-bundle-image-bss'></div>").insertBefore($(this));
                        $(this).find('option').each(function () {
                            if ($(this).val() !='') {
                                var selection = $(this).val();
                                var productId = '';
                                productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
                                $('.all-image-bundle .child-product-' + productId).first().clone().appendTo($(this).parents('.control').find('.multiple-option-bundle-image-bss'));
                            }
                        })
                    } else {
                        $("<div class='dropdown-option-bundle-image-bss'></div>").insertBefore($(this));
                        $(this).find('option').each(function () {
                            if ($(this).val() !='') {
                                var selection = $(this).val();
                                var productId = '';
                                productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
                                $('.all-image-bundle .child-product-' + productId).first().clone().appendTo($(this).parents('.control').find('.dropdown-option-bundle-image-bss')).css('display','none');
                            }
                        })
                    }
                } else {
                    var selection = $(this).val();
                    if (selection !='') {
                        var productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];

                        if ($(this).parents('.field.option').find('input.bundle.option').length > 1) {
                            $('.all-image-bundle .child-product-' + productId).first().clone().insertAfter($(this).next());
                        } else {
                            $('.all-image-bundle .child-product-' + productId).first().clone().insertAfter($(this));
                        }
                    }
                }
            });
            $('select.bundle.option').each(function () {
                var optionid = $(this).attr('name').match(/\d+/)[0];
                if ($(this).val() !='') {
                    if ($(this).is("select[multiple]")) {
                        $(this).find('option:selected').each(function () {
                        var selection = $(this).val();
                            if (selection !='') {
                                var productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
                                $(this).parents('.control').find('.multiple-option-bundle-image-bss div#child-product-' + productId).addClass('selected');
                            }
                        });
                    } else {
                        var selection = $(this).val();
                        var productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
                        $(this).parent().find('.dropdown-option-bundle-image-bss div#child-product-' + productId).show();
                    }
                }
            })

            var image_H = this.options.height;
            $('.field.choice').each(function () {
                if ($(this).find('.image-child-bundle').length && $(window).width() > 480 && ($(window).width() < 768 || $(window).width() > 960)) {
                    $(this).css({
                        position: "relative",
                        height: image_H + 'px',
                        padding: "5px"
                    });
                    var margin = (image_H - $(this).find('input').height())/2;
                    var margin1 = (image_H - $(this).find('label').css("line-height").match(/\d+/)[0])/2;
                    $(this).find('input').css({float :'left','margin-top': margin + 'px'});
                    $(this).find('label').css({float :'left','margin-top': margin1 + 'px'});
                    $(this).find('.image-child-bundle').css('float','left');
                }
            })
            
            if ($(window).width() > 768) {
                $('.multiple-option-bundle-image-bss').css({'max-width':'500px'});
            }

            if ($(window).width() < 768) {
                $('.multiple-option-bundle-image-bss').css({'max-width':'320px'})
            }

            $('.multiple-option-bundle-image-bss').owlCarousel({
                items : this.options.itemsDesktop,
                itemsDesktop : this.options.itemsDesktop,
                itemsDesktopSmall :[979,3],
                itemsTablet:[768,2],
                itemsMobile:[479,1],
                margin:10,
                singleItem : false,
                itemsScaleUp : false,
                slideSpeed : this.options.speedSlide,
                paginationSpeed : 800,
                rewindSpeed : 1000,
                navigation : true,
                rewindNav : true,
                scrollPerPage : false,
                pagination : false,
                paginationNumbers: false,
                autoPlay : (this.options.autoSlide != '')? true : false,
                stopOnHover : true,
            })
        },

        _EventListener: function () {

            var $widget = this;

            $(document).on('click', '#reorder-select-all', function () {
                return $widget._OnClick($(this));
            });

            $(window).resize(function () {
                return $widget._Resize();
            });

            $('select.bundle.option').bind("change",function (e) {
                return $widget._Select($(this));
            })
            
            $('select[multiple="multiple"].bundle.option option').bind("click",function (e) {
                 return $widget._MultipleSelect($(this));
            })
        
        },

        _Select: function ($this) {
            var jsbundle = this.options.jsonbundle;
            var optionid = $this.attr('name').match(/\d+/)[0];
            if ($this.is("select[multiple]")) {
                var $slide = $this.parent().find('.multiple-option-bundle-image-bss');
                $this.parent().find('.multiple-option-bundle-image-bss div').removeClass('selected');
                var mv = false;
                $this.find('option:selected').each(function () {
                    var selection = $(this).val();
                    if (selection !='') {
                        var productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
                        $slide.find('.child-product-' + productId).addClass('selected');
                        if (!mv) {
                            mv = productId;
                        }
                    }
                });
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    if (mv !='') {
                        var index = $this.parent().find('.child-product-' + mv).parent().index();
                        $this.parent().find('.multiple-option-bundle-image-bss').trigger('owl.goTo', index);
                    }
                }
            } else {
                var selection = $this.val();
                if (selection !='') {
                    $this.parent().find('.dropdown-option-bundle-image-bss div').hide();
                    var productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
                    $this.parent().find('.dropdown-option-bundle-image-bss div.child-product-' + productId).show();
                } else {
                    $this.parent().find('.dropdown-option-bundle-image-bss div').hide();
                }
            }
        },

        _MultipleSelect: function ($this) {
            var jsbundle = this.options.jsonbundle;
            if ($this.is(':selected')) {
                    var parent = $this.parent();
                    var optionid = $(parent).attr('name').match(/\d+/)[0];
                    var selection = $this.val();
                    var productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
                    var control = $(parent).parent();
                    var index = $(control).find('.child-product-' + productId).parent().index();
                    $(control).find('.multiple-option-bundle-image-bss').trigger('owl.goTo', index);
            } else {
               // no thing
            }
        },

        _Resize: function ($this) {
            var image_H = this.options.height;
            $('.field.choice').each(function () {
                if ($(this).find('.image-child-bundle').length && $(window).width() > 480 && ($(window).width() < 768 || $(window).width() > 960)) {
                    $(this).css({
                        position: "relative",
                        height: image_H + 'px',
                        padding: "5px"
                    });
                    var margin = (image_H - $(this).find('input').height())/2;
                    var margin1 = (image_H - $(this).find('label').css("line-height").match(/\d+/)[0])/2;
                    $(this).find('input').css({float :'left','margin-top': margin + 'px'});
                    $(this).find('label').css({float :'left','margin-top': margin1 + 'px'});
                    $(this).find('.image-child-bundle').css('float','left');
                } else {
                    $(this).css({
                        position: "relative",
                        height: 'auto',
                        padding: "5px"
                    });
                    $(this).find('input').css({float :'left','margin-top':'auto'});
                    $(this).find('label').css({float :'none','margin-top':'auto'});
                    $(this).find('.image-child-bundle').css('float','none');
                }
            })
        },
    });
    return $.mage.BundleOptionImage;
});
