$(document).ready(function () {

  var $window = $(window);
  var $body = $('body');
  var COLUMNS_COUNT = contentConfig.columnsCount;
  var buttonColumnWidth;
  var $banner = $('.header-banner');
  var stickyBanner = headerConfig.banner && headerConfig.banner.sticky;

  var isMobile = false; //initiate as false
  // device detection
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

  var isSafari = (function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
  })();

  // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';

  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1+
  var isChrome = !!window.chrome && !!window.chrome.webstore;

  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;

  var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  $.initTextFill();
  applyConfig();

  setTimeout(function () {
    $body.addClass('fadeIn animated');
  }, 50);

  function applyConfig() {
    applyHeaderConfig();
    applyContentColors();
    applyFooterConfig();

    applyColorsMap();
    changeMarginTopHTML();

    $(window).resize(changeMarginTopHTML);
  }

  function changeMarginTopHTML() {
    var isMobile = window.innerWidth <= 640;
    $banner.toggleClass('sticky', isMobile || stickyBanner);
    $('html').css({
      'margin-top' : isMobile || stickyBanner ?
        $('.header-banner').css('height') : 0
    });
  }

  function applyHeaderConfig() {
    //Apply banner config
    var bannerConfig = headerConfig.banner;
    if (isMac && (isChrome || isFirefox || isOpera)) {
      $banner.css({'padding-top': '0.37em', 'padding-bottom': 0});
    } else if (isMobile) {
      $banner.css({'padding-top': '0.67em'});
    }
    $banner.toggle(bannerConfig.enabled !== false);
    if (!bannerConfig.enabled) $('section > .content').css('padding-top', 0);
    var $bannerText = $banner.find('.banner-text');
    $bannerText.html(bannerConfig.text);
    if (isSafari && !isMobile) {
      $bannerText.css({position: 'relative', top: '0.1em'});
    }

    //$banner.textfill(40);
    if (!bannerConfig.text) $banner.css('height', '40px');

    //Apply intro and directions text config
    var $textPart = $('.content .text-part');

    var introConfig = headerConfig.introText;
    $textPart.find('.intro-text').html(introConfig.text)
      .toggle(introConfig.enabled !== false);

    var directionConfig = headerConfig.directionText;
    $textPart.find('.direction-text').html(directionConfig.text)
      .toggle(directionConfig.enabled !== false);
  }

  function applyContentColors() {
    var $pageBack = $('.page-background');
    if ($pageBack.length) {
      if (contentConfig.backgroundColor) $pageBack.css('background-color', contentConfig.backgroundColor);
      if (contentConfig.backgroundImage) $pageBack.css('background-image', 'url("img/' + contentConfig.backgroundImage + '")');
      if (contentConfig.backgroundOpacity) $pageBack.css('opacity', contentConfig.backgroundOpacity);
    }
  }

  function applyButtonsConfig() {

    var footerButtons = footerConfig.buttons.filter(function (el, index) {
      if (typeof el.text !== 'undefined') return true;
    });

    buttonColumnWidth = countColumns(footerButtons);

    footerButtons.map(function (el, index) {
      if (el.enabled === false) {
        return;
      }

      var $buttonWrapper = $('<div class="col-xs-' + buttonColumnWidth + '">' +
        '<a class="btn" target="_blank">' + el.text + '</a>' +
        '</div>');

      // Save button
      if (headerConfig.pdf) {
        $buttonWrapper.find('.btn').attr('href', headerConfig.pdf)
      }

      // Share button
      if (el.subject) {
        $buttonWrapper.find('.btn').attr(
          'href',
          'mailto:?subject=' + encodeURIComponent(el.subject) + '&body=' + encodeURIComponent(el.body)
        )
      }

      // Like buttons
      if (el.type === 'like') {
        var buttonEvents = ['love', 'like', 'neutral', 'confused', 'bored', 'dislike'];
        var feedback = $('<div class="btn likebuttons"><div class="likebuttons__inner"></div></div>');
        var buttonText = $buttonWrapper.find('.btn').text();
        buttonEvents.map(function (value, i) {
          var buttonWrapper
          var button = $('<div class="likebuttons__button-wrapper">' +
            '<div class="likebuttons__text">' + value + '</div>' +
            '<img class="likebuttons__button" ' +
              'data-event="' + value + '" src="' + getBaseUrl() + 'img/likebuttons/' + value + '.png"></div>');
          feedback.find('.likebuttons__inner').append(button);
        });
        $buttonWrapper.find('.btn').replaceWith(feedback);
        feedback.append(buttonText);
      }

      // Apply class
      if (typeof el.class !== 'undefined') {
        $buttonWrapper.find('.btn').addClass(el.class);
      }

      // center buttons
      if (buttonColumnWidth === 6 && index === 0) {
        $buttonWrapper.css({
          'text-align': 'right'
        })
      }

      if (buttonColumnWidth === 6 && index === 1) {
        $buttonWrapper.css({
          'text-align': 'left'
        })
      }

      if (buttonColumnWidth === 4 && index === 0) {
        $buttonWrapper.css({
          'text-align': 'right'
        })
      } else if (buttonColumnWidth === 4 && index === 1) {
        $buttonWrapper.css({
          'text-align': 'center'
        })
      } else if (buttonColumnWidth === 4 && index === 2) {
        $buttonWrapper.css({
          'text-align': 'left'
        })
      } else if (buttonColumnWidth !== 6) {
        $buttonWrapper.css({
          'text-align': 'center'
        })
      }

      // Append to DOM
      $('.buttons .row').append($buttonWrapper);

      // Like buttons events
      $('.likebuttons').on('click', function (evt) {
        $(evt.target).find('.likebuttons__inner').toggleClass('is-active');
      });

      // Remove likebuttons when clicked outside of likebuttons
      $('body').on('click', function (evt) {
        if ($(evt.target).hasClass('likebuttons')
          || $(evt.target).hasClass('likebuttons__inner')
          || $(evt.target).hasClass('likebuttons__buttons')
        ) {
          return;
        } else {
          $('.likebuttons__inner').removeClass('is-active');
        }
      });

      $('.likebuttons__button').on('click', function (evt) {
        // Publish event
        var emotion = $(evt.target).data('event');
        userEvent(emotion).publish();

        // Notify user that feedback is sent
        var acknowledgeFeedbackText = $('<div class="likebuttons__ack">Feedback sent - thanks!</div>');
        $(evt.target).closest('.likebuttons').append(acknowledgeFeedbackText);

        // Remove notification
        setTimeout(function () {
          acknowledgeFeedbackText.remove();
          $(evt.target).closest('.likebuttons').addClass('is-disabled').off('click');
        }, 1000);

        // Hide button container
        $(evt.target).closest('.likebuttons__inner').removeClass('is-active');
      });

    });
  }

  function applyFooterConfig() {
    //Apply footer banner config
    var bannerConfig = footerConfig.banner;
    var $footer = $('.footer').toggle(bannerConfig.enabled).css('text-align', bannerConfig.textAlign);

    if (bannerConfig.enabled !== false) {
      var $imageContainer = $footer.find('.img-container');

      var logo1 = bannerConfig.logo1, logo2 = bannerConfig.logo2;
      if (logo1.position === 'right' && logo2.position === 'right') {
        var tempLogo = logo1;
        logo1 = logo2;
        logo2 = tempLogo;
      }

      var logosSamePos = logo1.position === logo2.position,
        logo1Center = logo1.position === 'center',
        logo2Center = logo2.position === 'center',
        logo2Position, logo2Margin;
      var $logo1 = createLogo(logo1, logo1Center ? '50%' : 0, logo1Center ? '-123px' : 0);
      if (!logo2.image) $logo1.addClass('single').css('margin', '');

      if (logo2Center) {
        logo2Position = '50%';
        logo2Margin = '8px';
      }
      else {
        logo2Position = (logosSamePos ? $logo1.outerWidth() : 0) + 'px';
        logo2Margin = logosSamePos ? '15px' : 0;
      }
      var $logo2 = createLogo(logo2, logo2Position, logo2Margin);
      if (!logo1.image) $logo2.addClass('single').css('margin', '');

      if (!logo1Center && !logo2Center) {
        $imageContainer.addClass('not-center');
        $footer.find('.footer-text').html(bannerConfig.text);
      }
      if (bannerConfig.textAlign === 'center') {
        $footer.addClass('logos-' + (logosSamePos ? logo1.position : 'sides'));
      }

      function createLogo(logo, offset, margin) {
        if (!logo || !logo.image) return;
        var direction = logo.position === 'center' ? 'left' : logo.position;
        var $logo = $('<img class="logo" src="' + logo.image + '">');
        $logo.css(direction, offset);
        $imageContainer.append($logo);
        return $logo.css('top', ($imageContainer.height() - +logo.height) / 2 + 'px')
          .css('margin-' + direction, margin).css('height', logo.height);
      }

      //Stick footer to window bottom if body height < window height
      var prevFooterStatic = null;

      function moveFooter() {
        var bh = $body.outerHeight(true), wh = $window.outerHeight(true), fh = $footer.outerHeight(true);
        if ((bh < wh) && (prevFooterStatic === null || prevFooterStatic)) {
          $footer.css({position: 'fixed', bottom: 0, left: 0, width: '100%'});
          prevFooterStatic = false;
        }
        else if ((bh + fh > wh) && !prevFooterStatic) {
          $footer.css({position: ''});
          prevFooterStatic = true;
        }
      }

      setTimeout(moveFooter, 0);
      setInterval(moveFooter, 30);
    }

    applyButtonsConfig();
  }

  // Images and content
  var images = {
    "<>": "li", "html": [
      {"<>": "img", "src": "${image}"}
    ]
  };
  $('.main_panes .nav ul').json2html(contentConfig.items, images);

  var content = {
    "<>": "div", "class": "pane", "html": [
      {
        "<>": "article", "html": function (item, j, k) {
        // If central media exists output only that
        if (typeof item.centralMedia === 'undefined') {
          return ('<h2>' + item.title + '</h2>' + item.content);
        } else if (typeof item.centralMedia.type !== 'undefined' && typeof item.centralMedia.style !== 'undefined') {
          var image = $('<img class="media-image-' + item.centralMedia.shape + ' type-' + item.centralMedia.type + '" />');
          image
            .attr('src', item.centralMedia.link)
            .css(item.centralMedia.style);

          // return stringified jquery element
          return image.prop('outerHTML');
        } else if (typeof item.centralMedia.type !== 'undefined' && typeof item.centralMedia.style === 'undefined') {
          var image = $('<img class="media-image-' + item.centralMedia.shape + ' type-' + item.centralMedia.type + '" />');
          image.attr('src', item.centralMedia.link);

          // return stringified jquery element
          return image.prop('outerHTML');
        }
      }
      },
      {
        "<>": "nav", "class": "${button_class}", "html": [
        {"<>": "a", "target": "_blank", "href": "${link}", "html": "${button}"}
      ]
      }
    ]
  }
  $('.main_panes .panes').json2html(contentConfig.items, content);

  // Central media: Timeout to be sure jsont2html parsed everything
  setTimeout(function () {
    $('.pane.active').map(function (i, el) {
      if ($(el).find('.media-image-circle').length > 0) {
        // Clear background on pane elements
        $('.pane').attr('style', '');

        // Apply image as background
        $(el).css({
          'background-image': 'url(' + $(el).find('.media-image-circle').attr('src') + ')'
        });

        // Hide the image element
        $(el).find('.media-image-circle').hide();
      } else if ($(el).find('.type-gif').length > 0) {
        $(el).css({
          'padding': 0
        })
        $(el).find('article').css({
          'width': '600px',
          'height': '600px',
          'padding-top': '0',
          'text-align': 'center',
          'display': 'table-cell',
          'vertical-align': 'middle'
        })
        $(el).find('.type-gif').css({
          'max-width': '100%',
          // 'border-radius': '50%'
        }).show();
      } else if ($(el).find('.media-image-square').length > 0) {
        // active pane
        $(el).css({
          'padding': 0,
          'display': 'table-cell',
          'vertical-align': 'middle',
          'text-align': 'center'
        });

        // Article wrapper
        $(el).find('article').css({
          'padding-top': '0',
        });

        // Image
        $(el).find('.media-image-square').css({
          'max-width': '100%',
          'padding': '0'
        }).show();
      }
    })

    $('.nav ul li').on('click', function (evt) {
      // Clear all pane styles on click
      $('.pane').attr('style', '');

      // Gif case
      if ($('.pane').eq($(evt.target).data('index')).find('.type-gif').length > 0) {
        $('.pane').attr('style', '');

        // Pane wrapper
        $('.pane').eq($(evt.target).data('index')).css({
          'padding': 0
        })

        // Article wrapper
        $('.pane').eq($(evt.target).data('index')).find('article').css({
          'width': '600px',
          'height': '600px',
          'padding-top': '0',
          'text-align': 'center',
          'display': 'table-cell',
          'vertical-align': 'middle'
        });

        // Image
        $('.pane').eq($(evt.target).data('index')).find('.media-image-circle').css({
          'max-width': '100%',
          'border-radius': '50%'
        }).show();
      }
      // png/jpg circle case
      else if ($('.pane').eq($(evt.target).data('index')).find('.media-image-circle').length > 0
        && ($('.pane').eq($(evt.target).data('index')).find('.type-jpg').length > 0
          || $('.pane').eq($(evt.target).data('index')).find('.type-png').length > 0)
      ) {
        var itemIndex = $(evt.target).data('index');
        console.log('circle click');

        // Apply image as background
        $('.pane').eq(itemIndex).css({
          'background-image': 'url(' + $('.pane').eq(itemIndex).find('.media-image-circle').attr('src') + ')'
        });

        // Hide the image element
        $('.pane').eq(itemIndex).find('.media-image-circle').hide();
      }

      // png/jpg square case
      else if ($('.pane').eq($(evt.target).data('index')).find('.media-image-square').length > 0
        && ($('.pane').eq($(evt.target).data('index')).find('.type-jpg').length > 0
          || $('.pane').eq($(evt.target).data('index')).find('.type-png').length > 0)
      ) {
        var itemIndex = $(evt.target).data('index');
        console.log('square click');

        // Pane
        $('.pane').eq($(this).data('index')).css({
          'padding': 0,
          'display': 'table-cell',
          'vertical-align': 'middle',
          'text-align': 'center'
        });

        // Article
        $('.pane').eq($(this).data('index')).find('article').css({
          'padding-top': '0',
        });

        // image
        $('.pane').eq($(this).data('index')).find('.media-image-square').css({
          'max-width': '100%',
          'padding': '0'
        }).show();
      }

    });
  }, 50);


  // main panes
  $('.main_panes').each(function () {

    $('.nav ul li', this).each(function (index) {
      $(this).attr('data-index', index);
    });

    $('.panes .pane', this).each(function (index) {
      $(this).attr('data-pane', index);
    });


    var clone = $('.nav ul', this).clone();
    $(this).prepend('<div class="nav_xs" />');
    $('.nav_xs', this).prepend(clone);


    $('.nav_xs', this).prepend('<a class="prev"/><a class="next"/>');

    var $panes = $('.panes'),
      $nav = $('.nav ul'),
      $nav_xs = $('.nav_xs ul');

    $nav_xs.slick({
      centerMode: true,
      centerPadding: '0px',
      slidesToShow: 1,
      arrow: false,
      prevArrow: $('.prev', this),
      nextArrow: $('.next', this),
      variableWidth: true,
    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      $panes.children()
        .removeClass('active')
        .filter('[data-pane=' + nextSlide + ']')
        .addClass('active')


      $nav.children()
        .removeClass('active')
        .filter('[data-index=' + nextSlide + ']')
        .addClass('active');

      //truncateContentText();
      //truncateHeaderText();
    });

    $panes.children().first()
      .addClass('active')
    $nav.children().first()
      .addClass('active');
    //truncateContentText();
    //truncateHeaderText();


    $('.nav ul li', this).on('click', function () {
      $nav_xs.slick('slickGoTo', $(this).data('index'));
    });


    function truncateContentText() {
      var ALLOWED_LENGTH = 390;
      var overflowElement = null;
      var totalTextLength = 0;
      var previousTextLength = 0;
      $('.pane.active p').each(function () {
        totalTextLength += this.textContent.length;
        if (totalTextLength > ALLOWED_LENGTH && !overflowElement) {
          overflowElement = this;
          return false;
        }
        if (!overflowElement) {
          previousTextLength += this.textContent.length;
        }
      });
      if (overflowElement) {
        var remainingTextLength = ALLOWED_LENGTH - previousTextLength;
        var originalTextContent = overflowElement.textContent;
        var newContent = originalTextContent.substring(0, remainingTextLength - 3);
        newContent += '...';
        overflowElement.textContent = newContent;
      }
    }

    function truncateHeaderText() {
      var ALLOWED_LENGTH = 25;
      var headerElement = $('.pane.active h2').get(0);
      if (headerElement.textContent > ALLOWED_LENGTH) {
        var newContent = headerElement.textContent.substring(0, ALLOWED_LENGTH - 3);
        newContent += '...';

        headerElement.textContent = newContent;
      }
    }

  });


  if (contentConfig.items.length === 3) {
    $('.nav > ul').addClass('triangle');
  } else if (contentConfig.items.length === 4) {
    $('.nav > ul').addClass('square');
  } else if (contentConfig.items.length === 5) {
    $('.nav > ul').addClass('pentagon');
  } else if (contentConfig.items.length === 6) {
    $('.nav > ul').addClass('hexagon');
  } else if (contentConfig.items.length === 7) {
    $('.nav > ul').addClass('heptagon');
  } else if (contentConfig.items.length === 8) {
    $('.nav > ul').addClass('octagon');
  } else if (contentConfig.items.length === 9) {
    $('.nav > ul').addClass('nonagon');
  } else if (contentConfig.items.length === 10) {
    $('.nav > ul').addClass('decagon');
  }
  // Assign index numbers to child elements
  $('.nav > ul > li').map(assignIndexClass);

});
