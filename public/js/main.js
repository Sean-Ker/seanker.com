$(function (e) {
    console.log("Init js.");

    // $(document).on("scroll", onScroll);

    $("nav .nav-link").on("click", function (e) {
        // e.preventDefault();
        $(this).parents().find(".active").removeClass("active");
        $(this).addClass("active");
    });

    let width = $(window).width();
    // if (width > 768) {
    var scene = document.getElementById("skills_hive");
    var parallaxInstance = new Parallax(scene, {
        relativeInput: false,
        hoverOnly: false,
        frictionX: 0.1,
        frictionY: 0.1,
    });
    // }
    // onScroll(e);

    // $('a[href^="#"]').on("click", function (e) {
    //     // debugger;
    //     console.log("here!");
    //     e.preventDefault();
    //     $(document).off("scroll");

    //     $("nav.navbar a").each(function () {
    //         $(this).removeClass("active");
    //     });
    //     $(this).addClass("active");

    //     var target = this.hash,
    //         menu = target;
    //     $target = $(target);
    //     $("html, body")
    //         .stop()
    //         .animate(
    //             {
    //                 scrollTop: $target.offset().top + 2,
    //             },
    //             500,
    //             "swing",
    //             function () {
    //                 window.location.hash = target;
    //                 $(document).on("scroll", onScroll);
    //             }
    //         );
    // });
});

function onScroll(event) {
    // debugger;
    var scrollPos = $(document).scrollTop();
    // console.log("scrol val: ", scrollPos);
    $("#header-nav a").each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top < scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $("#header-nav a").removeClass("active");
            currLink.addClass("active");
        } else {
            currLink.removeClass("active");
        }
    });
}

// if (scroll > 50) {
//     $("nav.navbar").addClass("fixed-top");
//     // add padding top to show content behind navbar
//     navbar_height = $("nav.navbar").height();
//     document.body.style.paddingTop = navbar_height + "px";
// } else {
//     $("nav.navbar").removeClass("fixed-top");
//     // remove padding top from body
//     document.body.style.paddingTop = "0";
// }
