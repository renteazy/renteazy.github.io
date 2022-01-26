/* Template: Tivo - SaaS App HTML Landing Page Template
/* Template: Tivo - SaaS App HTML Landing Page Template
   Author: Inovatik
   Created: Sep 2019
   Description: Custom JS file
*/
var wloading = false;

(function ($) {
  'use strict';

  /* Preloader */

  $(window).on('load', function () {
    var preloaderFadeOutTime = 500;

    function hidePreloader() {
      var preloader = $('.spinner-wrapper');
      setTimeout(function () {
        preloader.fadeOut(preloaderFadeOutTime);
      }, 500);
    }

    hidePreloader();
  });

  /* Navbar Scripts */
  // jQuery to collapse the navbar on scroll
  $(window).on('scroll load', function () {
    if ($('.navbar').offset().top > 60) {
      $('.fixed-top').addClass('top-nav-collapse');
    } else {
      $('.fixed-top').removeClass('top-nav-collapse');
    }
  });

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function () {
    $(document).on('click', 'a.page-scroll', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 600, 'easeInOutExpo');
      event.preventDefault();
    });
  });

  // closes the responsive menu on menu item click
  $('.navbar-nav li a').on('click', function (event) {
    if (!$(this).parent().hasClass('dropdown')) $('.navbar-collapse').collapse('hide');
  });

  /* Image Slider - Swiper */
  var imageSlider = new Swiper('.image-slider', {
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    breakpoints: {
      // when window is <= 580px
      580: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      // when window is <= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window is <= 992px
      992: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      // when window is <= 1200px
      1200: {
        slidesPerView: 4,
        spaceBetween: 20
      }

    }
  });

  /* Text Slider - Swiper */
  var textSlider = new Swiper('.text-slider', {
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  /* Video Lightbox - Magnific Popup */
  $('.popup-youtube, .popup-vimeo').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
    iframe: {
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: function id(url) {
            var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
            if (!m || !m[1]) return null;
            return m[1];
          },
          src: 'https://www.youtube.com/embed/%id%?autoplay=1'
        },
        vimeo: {
          index: 'vimeo.com/',
          id: function id(url) {
            var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
            if (!m || !m[5]) return null;
            return m[5];
          },
          src: 'https://player.vimeo.com/video/%id%?autoplay=1'
        }
      }
    }
  });

  /* Details Lightbox - Magnific Popup */
  $('.popup-with-move-anim').magnificPopup({
    type: 'inline',
    fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
  });

  /* Move Form Fields Label When User Types */
  // for input and textarea fields
  $('input, textarea').keyup(function () {
    console.log('---------TEST');
    if ($(this).val() != '') {
      $(this).addClass('notEmpty');
    } else {
      $(this).removeClass('notEmpty');
    }
  });

  /* Sign Up Form */
  $('#signUpForm').validator().on('submit', function (event) {
    if (event.isDefaultPrevented()) {
      // handle the invalid form...
      sformError();
      ssubmitMSG(false, 'Please fill all fields!');
    } else {
      // everything looks good!
      event.preventDefault();
      ssubmitForm();
    }
  });

  function ssubmitForm() {
    // initiate variables with form content
    var email = $('#semail').val();
    var name = $('#sname').val();
    var password = $('#spassword').val();
    var terms = $('#sterms').val();

    $.ajax({
      type: 'POST',
      url: 'php/signupform-process.php',
      data: 'email=' + email + '&name=' + name + '&password=' + password + '&terms=' + terms,
      success: function success(text) {
        if (text == 'success') {
          sformSuccess();
        } else {
          sformError();
          ssubmitMSG(false, text);
        }
      }
    });
  }

  function sformSuccess() {
    $('#signUpForm')[0].reset();
    ssubmitMSG(true, 'Sign Up Submitted!');
    $('input').removeClass('notEmpty'); // resets the field label after submission
  }

  function sformError() {
    $('#signUpForm').removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass();
    });
  }

  function ssubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = 'h3 text-center tada animated';
    } else {
      var msgClasses = 'h3 text-center';
    }
    $('#smsgSubmit').removeClass().addClass(msgClasses).text(msg);
  }

  /* Log In Form */
  $('#waitListForm').validator().on('submit', function (event) {
    if (event.isDefaultPrevented()) {
      // handle the invalid form...
      wformError();
      wsubmitMSG(false, 'Please fill all fields!');
    } else {
      // everything looks good!
      event.preventDefault();
      wsubmitForm();
    }
  });

  function wsubmitForm() {
    // initiate variables with form content
    var email = $('#wemail').val();
    var customerType = $('#wcustomerType').val();
    var name = $('#wname').val();

    var data = {
      'email': email,
      'customerType': customerType,
      'name': name
    };

    wformToggleLoading(true);

    $.ajax({
      type: 'POST',
      url: 'https://g6gtqb4crj.execute-api.us-west-2.amazonaws.com/default/addToWaitlist',
      data: JSON.stringify(data),
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      complete: function complete(xhr, textStatus) {
        wformToggleLoading(false);
      },
      success: function success(data, textStatus, xhr) {
        if (xhr.status === 200) {
          wformSuccess();
        } else {
          wformError();
          wsubmitMSG(false, text);
        }
      },
      error: function error(request, status, _error) {}
    });
  }

  function wformToggleLoading(loading) {
    wloading = loading;
    if (wloading) {
      $('wmsgSubmit').addClass('loading');
      wsubmitMSG(true, 'Submitting...');
    }
  }

  function wformSuccess() {
    $('#waitListForm')[0].reset();
    wsubmitMSG(true, 'Added to the waiting list :partying_face:');
    $('input').removeClass('notEmpty'); // resets the field label after submission
    $('wmsgSubmit').addClass('notEmpty'); // resets the field label after submission
  }

  function wformError() {
    $('#waitListForm').removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass();
    });
  }

  function wsubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = 'h3 text-center tada animated';
    } else {
      var msgClasses = 'h3 text-center';
    }
    $('#wmsgSubmit').removeClass().addClass(msgClasses).text(msg);
  }

  /* Newsletter Form */
  $('#newsletterForm').validator().on('submit', function (event) {
    if (event.isDefaultPrevented()) {
      // handle the invalid form...
      nformError();
      nsubmitMSG(false, 'Please fill all fields!');
    } else {
      // everything looks good!
      event.preventDefault();
      nsubmitForm();
    }
  });

  function nsubmitForm() {
    // initiate variables with form content
    var email = $('#nemail').val();
    var terms = $('#nterms').val();
    $.ajax({
      type: 'POST',
      url: 'php/newsletterform-process.php',
      data: 'email=' + email + '&terms=' + terms,
      success: function success(text) {
        if (text === 'success') {
          nformSuccess();
        } else {
          nformError();
          nsubmitMSG(false, text);
        }
      }
    });
  }

  function nformSuccess() {
    $('#newsletterForm')[0].reset();
    nsubmitMSG(true, 'Subscribed!');
    $('input').removeClass('notEmpty'); // resets the field label after submission
  }

  function nformError() {
    $('#newsletterForm').removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass();
    });
  }

  function nsubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = 'h3 text-center tada animated';
    } else {
      var msgClasses = 'h3 text-center';
    }
    $('#nmsgSubmit').removeClass().addClass(msgClasses).text(msg);
  }

  /* Privacy Form */
  $('#privacyForm').validator().on('submit', function (event) {
    if (event.isDefaultPrevented()) {
      // handle the invalid form...
      pformError();
      psubmitMSG(false, 'Please fill all fields!');
    } else {
      // everything looks good!
      event.preventDefault();
      psubmitForm();
    }
  });

  function psubmitForm() {
    // initiate variables with form content
    var name = $('#pname').val();
    var email = $('#pemail').val();
    var select = $('#pselect').val();
    var terms = $('#pterms').val();

    $.ajax({
      type: 'POST',
      url: 'php/privacyform-process.php',
      data: 'name=' + name + '&email=' + email + '&select=' + select + '&terms=' + terms,
      success: function success(text) {
        if (text == 'success') {
          pformSuccess();
        } else {
          pformError();
          psubmitMSG(false, text);
        }
      }
    });
  }

  function pformSuccess() {
    $('#privacyForm')[0].reset();
    psubmitMSG(true, 'Request Submitted!');
    $('input').removeClass('notEmpty'); // resets the field label after submission
  }

  function pformError() {
    $('#privacyForm').removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass();
    });
  }

  function psubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = 'h3 text-center tada animated';
    } else {
      var msgClasses = 'h3 text-center';
    }
    $('#pmsgSubmit').removeClass().addClass(msgClasses).text(msg);
  }

  /* Back To Top Button */
  // create the back to top button
  $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
  var amountScrolled = 700;
  $(window).scroll(function () {
    if ($(window).scrollTop() > amountScrolled) {
      $('a.back-to-top').fadeIn('500');
    } else {
      $('a.back-to-top').fadeOut('500');
    }
  });

  /* Removes Long Focus On Buttons */
  $('.button, a, button').mouseup(function () {
    $(this).blur();
  });
})(jQuery);