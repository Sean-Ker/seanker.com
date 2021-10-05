$(function () {
    console.log("Init js.");

    $("nav .nav-link").on("click", function (e) {
        // e.preventDefault();
        $(this).parents().find(".active").removeClass("active");
        $(this).addClass("active");
    });

    // var scene = document.getElementById("scene");
    // var parallaxInstance = new Parallax(scene);

    // const img = document.getElementById("skills_hive");
    // console.log(img);
    // new simpleParallax(img, {
    //     orientation: "right",
    // });

    console.log("here");
    $(".js-tilt").tilt({
        scale: 1.2,
        glare: true,
        maxGlare: 0.5,
        // axis: "x",
    });

    var thehash = e.target.hash;
    $(thehash).prop("id", thehash.substr(1) + "-noscroll");
    window.location.hash = e.target.hash;
    $(thehash + "-noscroll").prop("id", thehash.substr(1));
});

$(window).scroll(function (event) {
    debugger;
    var scroll = $(window).scrollTop();
    console.log("scrol val: ", scroll);
});
