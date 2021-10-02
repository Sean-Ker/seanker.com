$(function () {
    console.log("Init js.");
    $(window).scrollTop(0);
});

$(window).scroll(function (event) {
    debugger;
    var scroll = $(window).scrollTop();
    console.log("scrol val: ", scroll);
});
