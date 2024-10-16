$(document).ready(function () {
  "use strict";

  /*==================================
* Author        : "ThemeSine"
* Template Name : Khanas HTML Template
* Version       : 1.0
==================================== */

  /*=========== TABLE OF CONTENTS ===========
1. Scroll To Top 
2. Smooth Scroll spy
3. Progress-bar
4. owl carousel
5. welcome animation support
======================================*/

  // 1. Scroll To Top
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 600) {
      $(".return-to-top").fadeIn();
    } else {
      $(".return-to-top").fadeOut();
    }
  });
  $(".return-to-top").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500
    );
    return false;
  });

  // 2. Smooth Scroll spy

  $(".header-area").sticky({
    topSpacing: 0,
  });

  //=============

  $("li.smooth-menu a").bind("click", function (event) {
    event.preventDefault();
    var anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor.attr("href")).offset().top - 0,
        },
        1200,
        "easeInOutExpo"
      );
  });

  $("body").scrollspy({
    target: ".navbar-collapse",
    offset: 0,
  });

  // 3. Progress-bar

  var dataToggleTooTip = $('[data-toggle="tooltip"]');
  var progressBar = $(".progress-bar");
  if (progressBar.length) {
    progressBar.appear(function () {
      dataToggleTooTip
        .tooltip({
          trigger: "manual",
        })
        .tooltip("show");
      progressBar.each(function () {
        var each_bar_width = $(this).attr("aria-valuenow");
        $(this).width(each_bar_width + "%");
      });
    });
  }

  // 4. owl carousel

  // i. client (carousel)

  $("#client").owlCarousel({
    items: 7,
    loop: true,
    smartSpeed: 1000,
    autoplay: true,
    dots: false,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      415: {
        items: 2,
      },
      600: {
        items: 4,
      },
      1199: {
        items: 4,
      },
      1200: {
        items: 7,
      },
    },
  });

  $(".play").on("click", function () {
    owl.trigger("play.owl.autoplay", [1000]);
  });
  $(".stop").on("click", function () {
    owl.trigger("stop.owl.autoplay");
  });

  // 5. welcome animation support

  $(window).load(function () {
    $(".header-text h2,.header-text p")
      .removeClass("animated fadeInUp")
      .css({ opacity: "0" });
    $(".header-text a")
      .removeClass("animated fadeInDown")
      .css({ opacity: "0" });
  });

  $(window).load(function () {
    $(".header-text h2,.header-text p")
      .addClass("animated fadeInUp")
      .css({ opacity: "0" });
    $(".header-text a").addClass("animated fadeInDown").css({ opacity: "0" });
  });

  document
    .querySelector(".single-contact-btn")
    .addEventListener("click", (e) => {
      // stop the page from the reloading
      e.preventDefault();
      const contactForm = document.querySelector("#form");
      const name = document.querySelector('[name="name"]');
      const email = document.querySelector('[name="email"]');
      const subject = document.querySelector('[name="subject"]');
      const message = document.querySelector('[name="comment"]');
      // validation before sending the data
      if (
        name.value.length === 0 ||
        email.value.length === 0 ||
        message.value.length === 0 ||
        subject.value.length === 0
      ) {
        alert("please fill the inputs");
      } else {
        let data = new FormData(contactForm);

        fetch("https://formspree.io/f/mnnqqprr", {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              alert("Thanks for your submission! I'll contact you asap!");
              contactForm.reset();
            } else {
              response.json().then((data) => {
                let errorMsg = "";
                if (Object.hasOwn(data, "errors")) {
                  errorMsg = data["errors"]
                    .map((error) => error["message"])
                    .join(", ");
                } else {
                  errorMsg = "Oops! There was a problem submitting your form";
                }
                alert(errorMsg);
              });
            }
          })
          .catch((error) => {
            alert("Oops! There was a problem submitting your form");
          });
      }
    });
});
