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
        if ($('html').attr('theme') == "default") {
            $('.change_theme_night').addClass('harakiri');
            $('.change_theme_day').addClass('rocky');
        } else {
            $('.change_theme_night').addClass('rocky');
            $('.change_theme_day').addClass('harakiri');
        }

        $('.change_theme_night').click(function () {
            if ($('html').attr('theme') == "default") {
                $('.change_theme_night').toggleClass('harakiri rocky');
                $('html').attr('theme', "dark");
                document.cookie = "theme=dark";
                $('.change_theme_day').toggleClass('rocky harakiri');
            }
        });

        $('.change_theme_day').click(function () {
            if ($('html').attr('theme') == "dark") {
                $('.change_theme_day').toggleClass('harakiri rocky');
                $('html').attr('theme', "default");
                document.cookie = "theme=default";
                $('.change_theme_night').toggleClass('rocky harakiri');
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

    $(function () {
        if ($(window).width() < 600) {
            document.cookie = "breakpoint=narrow";
        } else if ($(window).width() >= 600 && $(window).width() < 1024) {
            document.cookie = "breakpoint=middle";
        } else if ($(window).width() >= 1024 && $(window).width() < 1300) {
            document.cookie = "breakpoint=wide";
        } else if (1300 <= $(window).width()) {
            document.cookie = "breakpoint=widest";
        }
    });



    $(function () {
        if ($("body").hasClass('narrow')) {
            $(".RLayoutDashboard__head").find(".RRadioButton__content").css("display", "none")
            $(".RLayoutDashboard__head").find(".RAvatar").toggleClass("aethelsa themise")
        }
    });

    $(function () {
        $(".RLayoutDashboard__hamburger").click(function () {
            $(".RLayoutDashboard__menu").addClass("open")
        })

        $(".RLayoutDashboard__close").click(function () {
            $(".RLayoutDashboard__menu").removeClass("open")
        })

        $(".RLayoutDashboard__compact").click(function () {
            if (!$(".RLayoutDashboard__menu").hasClass("compact")) {
                document.cookie = "menu=compact";
                $(".RLayoutDashboard__menu").addClass("compact")
            } else {
                document.cookie = "menu=full";
                $(".RLayoutDashboard__menu").removeClass("compact")
            }
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
        $(".RInput").keyup(function () {
            if (!$(this).find("input").val() == "") {
                $(this).addClass("active");
                $(this).find(".RInput__label").addClass("active");
            } else {
                $(this).removeClass("active");
                $(this).find(".RInput__label").removeClass("active");
            }
        });

        $(".RInput").each(function () {
            if (!$(this).find("input").val() == "") {
                $(this).addClass("active");
                $(this).find(".RInput__label").addClass("active");
            } else {
                $(this).removeClass("active");
                $(this).find(".RInput__label").removeClass("active");
            }
        });

        $(".RTextarea").keyup(function () {
            if (!$(this).find("textarea").val() == "") {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });

        $(".RTextarea").each(function () {
            if (!$(this).find("textarea").val() == "") {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
    });


});
