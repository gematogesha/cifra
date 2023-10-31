document.addEventListener("turbo:load", () => {

    console.log('plugin/script load');

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
            $("body").removeClass();
            $("body").addClass("narrow");
        } else if ($(window).width() >= 600 && $(window).width() < 1024) {
            $("body").removeClass();
            $("body").addClass("middle");
        } else if ($(window).width() >= 1024 && $(window).width() < 1300) {
            $("body").removeClass();
            $("body").addClass("wide");
        } else if (1300 <= $(window).width()) {
            $("body").removeClass();
            $("body").addClass("widest");
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

});

document.addEventListener("turbo:before-fetch-response", function (e) {
    let frame = document.getElementById("users");
    if (frame.complete) {
        
        var childNodes = frame.childNodes;

        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].nodeType !== 3) { // nodeType 3 is a text node
              childNodes[i].className = "current";  // <a>
              break;
            }        
        }
        
    } else {
      frame.loaded.then(() => {
      
        frame.classList.add('in')
      
      })
    }
  })