document.addEventListener("turbo:load", () => {

    console.log('plugin/script load');

    $(function () {
        $('.RRow').each(function () {
            $(this).addClass('dashboard wrap');
        });

        $('.RRow').each(function () {
            $(this).find('.RRow').addClass('gapHidden');;
        });

        $('.RCol').each(function () {
            if (!$(this).hasClass("custom")) {
                $(this).addClass('cols-widest-8 cols-wide-8 cols-middle-6 cols-narrow-6');
            }
        });

        $('.RBulb__badge').each(function () {
            $(this).parent().addClass('RBulb');
        });
    });


    $(function () {
        $('.RMenu__item_parent').click(function () {
            if ($(this).children('.parent').css("display") == "none") {
                $(this).find('.RMenu__arrow').addClass("active")
                $(this).children('.parent').css("display", "flex");
            } else {
                $(this).children('.parent').css("display", "none");
                $(this).find('.RMenu__arrow').removeClass("active")
            }

        });
    });


    $(function () {
        var theme_day = $('.change_theme_day');
        var theme_night = $('.change_theme_night');

        if ($('html').attr('theme') == "default") {
            theme_night.addClass('harakiri');
            theme_day.addClass('rocky');
        } else {
            theme_night.addClass('rocky');
            theme_day.addClass('harakiri');
        }

        theme_night.click(function () {
            if ($('html').attr('theme') == "default") {
                $(this).toggleClass('harakiri rocky');
                $('html').attr('theme', "dark");
                localStorage.setItem('theme', 'dark');
                theme_day.toggleClass('rocky harakiri');
            }
        });

        theme_day.click(function () {
            if ($('html').attr('theme') == "dark") {
                $(this).toggleClass('harakiri rocky');
                $('html').attr('theme', "default");
                localStorage.setItem('theme', 'default');
                theme_night.toggleClass('rocky harakiri');
            }
        });
    })

    $(function () {
        $(".RTable").tablesorter();
        $(".tablesorter-header").each(function () {
            if (!$(this).attr("aria-sort") == "none") {
                $(this).find(".RTable__th").addClass("active");
            } else {
                $(".tablesorter-header").find(".RTable__th").removeClass("active");
            }

        })
    });

    function screen_check() {
        if ($(window).width() < 600) {
            localStorage.setItem('breakpoint', 'narrow');
        } else if ($(window).width() >= 600 && $(window).width() < 1024) {
            localStorage.setItem('breakpoint', 'middle');
        } else if ($(window).width() >= 1024 && $(window).width() < 1300) {
            localStorage.setItem('breakpoint', 'wide');
        } else if (1300 <= $(window).width()) {
            localStorage.setItem('breakpoint', 'widest');
        }
    }


    $(function () {
        var menu = $(".RLayoutDashboard__menu");
        
        if ($("body").hasClass('narrow')) {
            $(".RLayoutDashboard__head").find(".RRadioButton__content").css("display", "none");
            $(".RLayoutDashboard__head").find(".RAvatar").toggleClass("aethelsa themise");
        }

        $(".RLayoutDashboard__hamburger").click(function () {
            menu.addClass("open");
        })

        $(".RLayoutDashboard__close").click(function () {
            menu.removeClass("open");
        })

        $(".RLayoutDashboard__compact").click(function () {
            if (!menu.hasClass("compact")) {
                localStorage.setItem('menu', 'compact');
                menu.addClass("compact");
            } else {
                localStorage.setItem('menu', 'full');
                menu.removeClass("compact");
            }
        })
    });


    $(function () {
        $(window).resize(function () {
            screen_check()
        })
    });

    $(function () {
        var pie__block = $('.pie__block').children()
        var length = pie__block.length
        var deg_set = 0
        for (var i = 0; i < length; i++) {

            if (i > 0) {
                pie__block.eq(i).css("rotate", "calc(" + deg_set + " * 3.6deg");
            }

            var deg = pie__block.eq(i).css("--p");
            deg_set += Number(deg) + 4
        }
    });

    $(function () {
        var input = $(".RInput");
        var textarea = $(".RTextarea");

        input.keyup(function () {
            if (!$(this).find("input").val() == "") {
                $(this).addClass("active");
                $(this).find(".RInput__label").addClass("active");
            } else {
                $(this).removeClass("active");
                $(this).find(".RInput__label").removeClass("active");
            }
        });

        input.each(function () {
            if (!$(this).find("input").val() == "") {
                $(this).addClass("active");
                $(this).find(".RInput__label").addClass("active");
            } else {
                $(this).removeClass("active");
                $(this).find(".RInput__label").removeClass("active");
            }
        });

        textarea.keyup(function () {
            if (!$(this).find("textarea").val() == "") {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });

        textarea.each(function () {
            if (!$(this).find("textarea").val() == "") {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
    });

    $(function () {
        $(".rir-eye_16").parent().click(function () {
            var type = $(".rir-eye_16").parent().parent().find("input");
            if (type.attr('type') == "password") {
                type.attr('type', "text");
            } else {
                type.attr('type', "password");
            }
        });
    });

});


