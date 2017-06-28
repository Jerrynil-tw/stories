var ElementTransitions = {
  init: function() {
    $(document).on('turbolinks:request-start.transition', function() {
      $('[data-animation="fadeInUp-fadeOutDown"]').addClass('animated fadeOutDown');
      $('[data-animation="fadeInUp-fadeOutDown-slow"]').addClass('animated fadeOutDown-small');
      $('[data-animation="bounceInLeft-bounceOutLeft"]').addClass('animated bounceOutLeft');
    });

    $(document).on('turbolinks:load.transition', function() {
      $('[data-animation="fadeInUp-fadeOutDown"]').addClass('animated fadeInUp');
      $('[data-animation="fadeInUp-fadeOutDown-slow"]').addClass('animated fadeInUp-small');
      $('[data-animation="bounceInLeft-bounceOutLeft"]').addClass('animated bounceInLeft');
    });
  }

};

$(document).on('turbolinks:load', ElementTransitions.init);
$loading = $('<div class="loader"><div class="bullet"></div><div class="bullet"></div><div class="bullet"></div><div class="bullet"></div></div>');

var EndlessScroll = {
  init: function() {
    if ($('[data-behavior="endless-scroll"]').length > 0) {
      $(window).scroll(function() {
        var url = $('.pagination .next_page').attr('href');
        if ( url && ($(window).scrollTop() > $(document).height() - $(window).height() - 80) ) {
          $('.pagination').html($loading);
          $.getScript(url);
        }
      });
      $(window).scroll();
    }
  }
};

$(document).on( 'turbolinks:load', EndlessScroll.init );
var NavbarAnimation = {
  init: function() {
    var lastScrollTop = 0;
    var $navbar = $('[data-behavior="animated-navbar"]');
    $(window).scroll(function(event) {
      var st = $(this).scrollTop();
      if (st > 500 && st > lastScrollTop) {
        // downscroll event
        $navbar.removeClass('is-inView');
        $navbar.addClass('is-hidden');
      } else {
        // upscroll event
        $navbar.removeClass('is-hidden');
        $navbar.addClass('is-inView');
      }
      lastScrollTop = st;
    });
  }
};

$(document).on( 'turbolinks:load', NavbarAnimation.init )
;
var Overlay = {
  init: function() {
    $('[data-behavior="trigger-overlay"]').click(Overlay.open);
    $('[data-behavior="close-overlay"]').click(Overlay.close);
  },

  open: function(event) {
    event.preventDefault();
    $('[data-behavior="overlay"]').addClass('open');
  },

  close: function(event) {
    event.preventDefault();
    $('[data-behavior="overlay"]').removeClass('open');
  }
};

$(document).on( 'turbolinks:load', Overlay.init );
var ProgressBar = {
  init: function() {
    // Hook into Turbolinks event
    $(document).on('turbolinks:request-start', function() {
      $('[data-behavior="progress-bar"]').addClass('active');
    });

    $(document).on('turbolinks:request-end', function() {
      $('[data-behavior="progress-bar"]').removeClass('active');
    });
  }
};

// override default progress bar
// turbolinks version > 3 provides default progress bar
Turbolinks.ProgressBar.prototype.refresh = function() {};
Turbolinks.ProgressBar.defaultCSS = "";

// custom 50ms threshold to show progress bar
// default is 500ms 
// Turbolinks.BrowserAdapter.prototype.showProgressBarAfterDelay = function() {
//   return this.progressBarTimeout = setTimeout(this.showProgressBar, 50);
// };

$(document).on('turbolinks:load', ProgressBar.init);
