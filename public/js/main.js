$(function () {
    console.log("Init js.");

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

    var thehash = e.target.hash;
    $(thehash).prop("id", thehash.substr(1) + "-noscroll");
    window.location.hash = e.target.hash;
    $(thehash + "-noscroll").prop("id", thehash.substr(1));
});

// $(window).scroll(function (event) {
//     debugger;
//     var scroll = $(window).scrollTop();
//     console.log("scrol val: ", scroll);
// });
