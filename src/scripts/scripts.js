(function ($) {


    /* Инпуты */

    /* Select placeholder */
    function selectPlaceholder($element) {
        if ($element.val() === 'placeholder') {
            $element.parent('.input').addClass('input--placeholder-is-chosen');
        } else {
            $element.parent('.input').removeClass('input--placeholder-is-chosen');
        }
    }

    $('select.input__widget').each(function () {
        selectPlaceholder($(this));
    }).on('change', function () {
        selectPlaceholder($(this));
    });

    /* Expanding textarea */
    function expandTextarea($element) {
        $element.css('height', 'auto');
        $element.css('height', ($element[0].scrollHeight + 2 * parseInt($element.css('border-width'), 10)) + 'px');
    }

    const $expandableInputs = $('.input--expandable .input__widget');

    $expandableInputs.each(function () {
        expandTextarea($(this));
    }).on('input', function () {
        expandTextarea($(this));
    });

    $(window).on('resize', function () {
        $expandableInputs.each(function () {
            expandTextarea($(this));
        });
    });


    /* Error field */
    $('.input__widget').on('focus', function () {
        $(this).parents('.input').removeClass('input--error');
        $(this).parents('.input').nextUntil(':not(.helper--error)').remove();
    });



    /* Маска для телефона -- используем старую версию input.mask
     * Для неё есть плагин для номеров телефонов, который понимает
     * русские города. Например, при ввооде +74852 скобочка увеличивается
     * с трёх до четырёх штук.
     */

    $('[type="tel"]').inputmask({
        alias: 'phoneru',
    });



    /* Модалка */

    const $fixedHeader = $('.header__fixed-part');
    const scrollWidth = $(window).outerWidth() - $(window).width();

    $('.mfp-handler').magnificPopup({
        type: 'inline',
        removalDelay: 200,
        showCloseBtn: false,
        callbacks: {
            open: function () {

                // Перезапускаем обсчёт expanding textareas для инстансов внутри откртой модалки
                const instance = $.magnificPopup.instance;
                const modalContent = instance.content[0];
                const textareas = $(modalContent).find('.input--expandable .input__widget');

                textareas.each(function () {
                    expandTextarea($(this));
                });

                /* Шапка фиксированная, ей тоже надо корректировать пропавшее пространство подскроллбаром */
                $fixedHeader.css({'margin-right': scrollWidth});
            },
            close: function () {
                $fixedHeader.css({'margin-right': '0'});
            }
        }
    });


    /* Карусели */

    document.querySelectorAll('.carousel').forEach(($carousel) => {

        if( $carousel.classList.contains('carousel--js-init-portfolio') ) {
            new Swiper(document.querySelector('.carousel--js-init-portfolio .swiper'), {
                slidesPerView: 1,
                slidesPerGroup: 1,
                autoHeight: true,
                pagination: {
                    el: $carousel.querySelector('.carousel__pagination'),
                    type: "bullets", /* переделать на fraction, если слишком много точек */
                    bulletClass: 'carousel__bullet',
                    bulletActiveClass: 'carousel__bullet--current',
                    clickable: true
                }
            });
        }

        if( $carousel.classList.contains('carousel--js-init-gallery') ) {
            new Swiper(document.querySelector('.carousel--js-init-gallery .swiper'), {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16,
                autoHeight: true,
                pagination: {
                    el: $carousel.querySelector('.carousel__pagination'),
                    type: "bullets", /* переделать на fraction, если слишком много точек */
                    bulletClass: 'carousel__bullet',
                    bulletActiveClass: 'carousel__bullet--current',
                    clickable: true
                },
                navigation: {
                    prevEl: $carousel.querySelector('.carousel__button--prev'),
                    nextEl: $carousel.querySelector('.carousel__button--next'),
                    disabledClass: 'carousel__button--disabled',
                },
                breakpoints: {
                    740: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                        spaceBetween: 70,
                        speed: 800,
                        centeredSlides: true, // Центрирование нужно, чтобы активным подсвечивался центральный айтем
                        loop: true, // а чтобы слева, до первого айтема не было дыры приходится зацикливаться
                    },
                    1850: {
                        slidesPerView: 5,
                        slidesPerGroup: 1,
                    }
                }
            });
        }

    });






})(jQuery);
