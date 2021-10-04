$(function () {
    console.log("Init js.");
    $(window).scrollTop(0);

    $("nav .nav-link").on("click", function (e) {
        // e.preventDefault();
        $(this).parents().find(".active").removeClass("active");
        $(this).addClass("active");
    });
});

$(window).scroll(function (event) {
    debugger;
    var scroll = $(window).scrollTop();
    console.log("scrol val: ", scroll);
});
