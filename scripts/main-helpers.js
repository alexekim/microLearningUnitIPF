var colorsMap = {
  bannerColor: {selector: 'section > .header-banner', prop: 'background-color'},
  bannerImage: {selector: 'section > .header-banner', prop: 'background-image'},
  bannerOpacity: {selector: 'section > .header-banner', prop: 'opacity'},

  titleText: {selector: 'section > .header-banner .banner-text', prop: 'color'},
  introText: {selector: 'section > .content .intro-text', prop: 'color'},
  directionText: {selector: 'section > .content .direction-text', prop: 'color'},

  footer: {selector: 'section > .footer', prop: 'background-color'},
  copyrightText: {selector: 'section > .footer .footer-text', prop: 'color'},

  backgroundColor: {selector: 'body > .page-background', prop: 'background-color'},
  backgroundImage: {selector: 'body > .page-background', prop: 'background-image'},
  backgroundOpacity: {selector: 'body > .page-background', prop: 'opacity'},

  flashcards: {
    flipIcon: {selector: '.flashcard .flip img', prop: 'background-color'},
    frontTextBoxColor: {selector: '.flashcard .front .text-box', prop: 'background-color'},
    frontTextBoxOpacity: {selector: '.flashcard .front .text-box', prop: 'rgba-opacity'},
    backTextBoxColor: {selector: '.flashcard .back .text-box', prop: 'background-color'},
    backTextBoxOpacity: {selector: '.flashcard .back .text-box', prop: 'rgba-opacity'}
  },

  horizontalCnL: {
    outlineColor: {selector: '.item .item--icon', prop: 'border-color'},
    outlineThickness: {selector: '.item .item--icon', prop: 'border-width'}
  },

  customCnL: {
    hotspotInside: {selector: '.hotspot', prop: 'background-color'},
    hotspotOutline: {selector: '.hotspot', prop: 'border-color'},
    circularItemImageColor: {selector: '.hotspot-info--img', prop: 'background-color'}
  },

  selectAndReflect: {
    lineBackground: {selector: '.page__content li span', prop: 'background'},
    heading: {selector: '.page__descr', prop: 'color'}
    //ONLY VIA CODE
    //titleText: {selector: '.modal__img-section--descr', prop: 'color'},
    //titleBox: {selector: '.modal__img-section--descr', prop: 'background-color'},
    //modalBorder: {selector: '.modal', prop: 'border-color'},
    //textBoxOutline: {selector: 'textarea', prop: 'border-color'}
    //selectedBackground: {}
  },

  article: {
    //ONLY VIA CODE
    //carouselDots: {selector: '.carousel-indicators li', prop: 'background-color'},
    //carouselCaptions: {selector: '.main-carousel-caption', prop: 'color'},
    boxColor: null // ???
  },

  accordion: {
    itemText: {selector: '.collapse-block__header--descr', prop: 'color'},
    itemBorder: {selector: '.collapse-block', prop: 'border-color'},
    itemBackground: {selector: '.collapse-block__header--descr', prop: 'background-color'}
  },

  videopage: {
    imageBorderColor: {selector: '.media-image', prop: 'border-color'},
    imageBorderThickness: {selector: '.media-image', prop: 'border-width'}
  }
};

function applyColorsMap(customField) {
  var confColors = colorsConfig.colors;
  var confElements = colorsConfig.elements;
  var customElements = confElements[customField];
  var customColorsMap = colorsMap[customField];

  if (typeof customElements === 'object' && typeof customColorsMap === 'object') {
    for (var customKey in customElements) {
      var newCustomKey = customField + '-' + customKey;
      confElements[newCustomKey] = customElements[customKey];
      colorsMap[newCustomKey] = customColorsMap[customKey];
    }
    delete confElements[customField];
    delete colorsMap[customField];
  }

  for (var confKey in colorsMap) {
    var confValue = confElements[confKey], value;
    var confValueType = typeof confValue;
    if (!confValue || confValueType !== 'string' && confValueType !== 'number') continue;

    var conf = colorsMap[confKey];
    if (conf == null) continue;
    var selector = conf.selector, prop = conf.prop;

    var $el = $(selector);
    $el = $el.filter(function () {
      var style = $(this).attr('style');
      return !style ||
        style.indexOf(" " + prop + ":") === -1 &&
        style.indexOf(";" + prop + ":") === -1 &&
        style.indexOf(prop + ":") !== 0;
    });

    if (prop.indexOf('color') > -1) {
      value = confColors[confValue] || confValue;
      if (prop === 'background-color') {
        var opacityKey = findInObject(colorsMap, function (c) {
          return c && c.selector === conf.selector && c.prop === 'rgba-opacity';
        });
        var opacityValue = +confElements[opacityKey];
        if (opacityKey && (opacityValue || opacityValue === 0)) {
          value = new w3color(value);
          value.opacity = opacityValue;
          value = value.toRgbaString();
        }
      }
    }
    else if (prop === 'rgba-opacity') {
      continue;
    }
    else if (prop === 'background-image') {
      value = 'url("img/' + confValue + '")';
    }
    else {
      value = confValue;
    }

    $el.css(prop, value);
  }
}

function getCustomColorsMap(customField) {
  var confColors = colorsConfig.colors;
  var confElements = colorsConfig.elements;
  var customElements = confElements[customField];
  var res = {};

  for (var key in customElements) {
    var colorKey = customElements[key];
    res[key] = confColors[colorKey] || colorKey;
  }

  return res;
}

function findInObject(obj, predicate) {
  for (var key in obj) {
    if (predicate(obj[key])) return key;
  }
  return '';
}

function assignIndexClass(index, el) {
  var parentClass = $(el).parent().attr('class');
  $(el).addClass(parentClass + '--item-' + (index + 1));
}

function fromPt(pt) {
  return pt / 0.75;
}

function sentencesCount(str) {
  if (!str || !str.match) return 0;
  var res = str.match(/[.?!](\s|$)/g);
  return res && res.length || 0;
}

function countColumns(buttons) {
  var sum = buttons.reduce(function (previousValue, currentValue, currentIndex, array) {
    if (currentValue.enabled) {
      return previousValue + 1;
    } else {
      return previousValue;
    }
  }, 0);

  if (sum === 0) {
    return 12;
  } else {
    return 12 / sum;
  }
}

function getBaseUrl() {
  var re = new RegExp(/^.*\//);
  return re.exec(window.location.href);
}
