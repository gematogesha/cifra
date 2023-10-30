document.addEventListener("turbo:load", () => {

    $(function () {
        $('.RRow').each(function () {
            $(this).addClass('dashboard wrap');
        });

        $('.RCol').each(function () {
            $(this).addClass('cols-widest-8 cols-wide-8 cols-middle-6 cols-narrow-6');
        });
        
        $('.RBulb__badge').each(function () {
            $(this).parent().addClass('RBulb');
        });
    });


    $(function () {
        $('.RMenu__item_parent').click(function () {
            if ($(this).children('.parent').css( "display") == "none") {
                $(this).find('.RMenu__arrow').addClass("active")
                $(this).children('.parent').css( "display", "flex" );
            } else {
                $(this).children('.parent').css( "display", "none" );
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
    })

    $(function () {
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
    });


    $(function() {
        $(".RTable").tablesorter();
        $(".tablesorter-header").each(function () {
            if (!$(this).attr("aria-sort") == "none") {
                $(this).find(".RTable__th").addClass("active")
            } else {
                $(".tablesorter-header").find(".RTable__th").removeClass("active")
            }

        })
      });

    console.log("turbo loaded");
});

