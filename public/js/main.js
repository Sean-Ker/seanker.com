$(function (e) {
    $("html").css("overflow-x", "hidden");

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

    setTimeout(() => {
        var scrollPos = $(document).scrollTop();
        if (scrollPos > 50) {
            return;
        }
        toastr.options = {
            closeButton: true,
            newestOnTop: true,
            positionClass: "toast-top-center",
            preventDuplicates: true,
            onclick: null,
            showDuration: "500",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
        };

        toastr.info("This screen is interactive, try pressing on it!", "Pssss... ");
    }, 30000);

    $("#contact-form").submit(function (e) {
        if (!this.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            let form = $("#contact-form").get(0);
            fname = $("#fname").val();
            lname = $("#lname").val();
            email = $("#email").val();
            subject = $("#subject").val();
            message = $("#message").val();
            console.log(fname, lname, email, subject, message);

            debugger;
            $.ajax({
                url: "https://formsubmit.co/ajax/sean@seanker.com",
                method: "POST",
                accepts: "application/json",
                dataType: "json",
                data: {
                    name: fname + " " + lname,
                    email: email,
                    subject: subject,
                    message: message,
                },
                success: data => {
                    debugger;
                    // alert("thanks ofr the email!", data);
                    window.location.replace("/thanks");
                    return false;
                },
                error: data => {
                    debugger;
                    alert("Ajax failed: " + data["responseText"]);
                    return false;
                },
            });
            return false;
        }
        $(this).addClass("was-validated");
    });

    window.handleFormSubmit = handleFormSubmit;
});

function formSentConfirmation() {
    alert("thanks ofr the email!");
}

const handleFormSubmit = token => {
    $("#contact-form").submit();
};

function sendContactEmail() {
    debugger;
    let form = $("#contact-form").get(0);
    fname = $("#fName").val();
    lname = $("#lName").val();
    email = $("#email").val();
    subject = $("#subject").val();
    message = $("#message").val();
    console.log(fname, lname, email, subject, message);
    $.ajax({
        url: "https://formsubmit.co/ajax/your@email.com",
        method: "POST",
        accepts: "application/json",
        dataType: "json",
        data: {
            name: fname + " " + lname,
            email: email,
            subject: subject,
            message: message,
        },
        success: data => alert("thanks ofr the email!", data),
        error: data => alert("Ajax failed: " + data["responseText"]),
    });
}

function onScroll(event) {
    // debugger;
    var scrollPos = $(document).scrollTop();
    // console.log("scrol val: ", scrollPos);
    $("#header-nav a").each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (
            refElement.position().top < scrollPos &&
            refElement.position().top + refElement.height() > scrollPos
        ) {
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
