(function ($) {


    /* Глобальные константы */

    let isDesktop; /* т.е. не смартфон, а любой десктоп */

    function initGlobalConstant() {
        isDesktop = window.matchMedia("(min-width: 740px)").matches;
    }

    /* При открытии страницы */
    initGlobalConstant();

    /* При ресайзе страницы */
    window.addEventListener('resize', initGlobalConstant);


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
            new Swiper($carousel.querySelector('.swiper'), {
                slidesPerView: 1,
                slidesPerGroup: 1,
                autoHeight: true,
                pagination: {
                    el: $carousel.querySelector('.carousel__pagination'),
                    type: "fraction", /* можно переделать на bullets, но когда добавлено много слайдов с проектами, они не влезают */
                    bulletClass: 'carousel__bullet',
                    bulletActiveClass: 'carousel__bullet--current',
                    clickable: true
                }
            });
        }

        if( $carousel.classList.contains('carousel--js-init-stories') ) {
            new Swiper($carousel.querySelector('.swiper'), {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16,
                autoHeight: true,
                pagination: {
                    el: $carousel.querySelector('.carousel__pagination'),
                    type: "fraction", /* можно переделать на bullets или сделать всю секцию false */
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
                    450: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
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
                        spaceBetween: 70,
                        speed: 800,
                        centeredSlides: true, // Центрирование нужно, чтобы активным подсвечивался центральный айтем
                        loop: true, // а чтобы слева, до первого айтема не было дыры приходится зацикливаться
                    }
                }
            });
        }

        if( $carousel.classList.contains('carousel--js-init-folder') ) {
            new Swiper($carousel.querySelector('.swiper'), {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 16,
                autoHeight: true,
                speed: 600,
                loop: true,
                autoplay: {
                    delay: 2000,
                },
                pagination: {
                    el: $carousel.querySelector('.carousel__pagination'),
                    type: "fraction", /* можно переделать на bullets или сделать всю секцию false */
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
                    500: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                    },
                    740: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                        spaceBetween: 54,
                    },
                    1850: {
                        slidesPerView: 5,
                        slidesPerGroup: 1,
                        spaceBetween: 84,
                    }
                }
            });
        }

        if( $carousel.classList.contains('carousel--js-init-gallery') ) {
            new Swiper($carousel.querySelector('.swiper'), {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16,
                autoHeight: true,
                speed: 600,
                pagination: {
                    el: $carousel.querySelector('.carousel__pagination'),
                    type: "fraction", /* можно переделать на bullets или сделать всю секцию false */
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
                    400: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                    740: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        spaceBetween: 54,
                    },
                    1850: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                        spaceBetween: 84,
                    }
                },
                on: {
                    init: function () {
                        toggleNavigationAndPagination(this);
                    },
                    resize: function () {
                        toggleNavigationAndPagination(this);
                    },
                },
            });
        }

    });


    /* Детектим кейс, когда в свайпере недостаточно айтемов для прокрутки хотя бы один раз, и убираем стрелочки/пагинацию */
    function toggleNavigationAndPagination(swiper) {
        const totalSlides = swiper.slides.length;
        const slidesPerView = swiper.params.slidesPerView;

        if (totalSlides <= slidesPerView) {
            swiper.el.closest('.carousel').classList.add('carousel--not-enough-slides');
        } else {
            swiper.el.closest('.carousel').classList.remove('carousel--not-enough-slides');
        }
    }



    const $html = $('html');


    /* Бургер */

    let rememberedPageScrollPosition = 0;

    $('.header__toggle-menu').on('click', function () {

        if (!$html.hasClass('burger-expanded')) {

            if (!isDesktop) {
                rememberedPageScrollPosition = $(window).scrollTop(); /* Запомнить скролл пользователя, так как display: none на .page его сбросит (смотри .burger-expanded .page) */
            }

            $html.addClass('burger-expanded');

            if (!isDesktop) {
                $(window).scrollTop(0); /* При открытии меню, его скролл должен быть в начале */
            }

        } else {

            $html.removeClass('burger-expanded');

            if (!isDesktop) {
                $(window).scrollTop(rememberedPageScrollPosition);/* При закрытии меню скролл должен быть там, где пользователь его оставил */
            }
        }
    });


    $(document).on('click', function (event) {
        if (!$(event.target).closest('.menu__navigation, .menu__contacts, .header__toggle-menu, .header__detachable-part, .mfp-bg, .mfp-wrap').length) {
            $html.removeClass('burger-expanded');
        }
    });


    $(document).on('keyup', function (event) {
        if (event.keyCode === 27) {
            $html.removeClass('burger-expanded');
        }
    });

    $('.header__close-menu').on('click', function () {
        $html.removeClass('burger-expanded');
    })



    /* Якоря */

    $('.solutions__category').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 30
        }, 600);
    });

})(jQuery);
