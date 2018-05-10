//=include svg4everybody/dist/svg4everybody.min.js
//=include objectFitPolyfill/dist/objectFitPolyfill.min.js
//include tiny-slider/dist/min/tiny-slider.js

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// Sets the correct transition event depending on browser
function whichTransitionEvent() {
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  }
  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}
var transitionEvent = whichTransitionEvent();

// Helper function to see if we're in a child element (for elements added dynamically)
function checkParents(el, selector) {
  var cur = el;
  var all = document.querySelectorAll(selector);
  while (cur) {
    for (var i = 0; i < all.length; i++) {
      if (all[i] == cur) {
        return cur;
      }
    }
    cur = cur.parentNode;
  }
  return false;
}

// Helper function for sending form data via ajax
function serializeForm(form) {
  var field, s = [];
  var len = form.elements.length;
  for (i = 0; i < len; i++) {
    field = form.elements[i];
    if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
      if (field.type == 'select-multiple') {
        for (ii = form.elements[i].options.length - 1; ii >= 0; ii--) {
          if (field.options[ii].selected) {
            s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[ii].value);
          }
        }
      } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
        s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
      }
    }
  }
  return s.join('&').replace(/%20/g, '+');
}

// Helper function for scrolling
function onScreen(el) {
  var isVisible = false;
  if (el) {
    if (el.offsetParent == null) {
      return false;
    }
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;
    // isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight); // if bottom of element is on screen
    isVisible = (elemTop >= 0) && (elemTop <= window.innerHeight); // if top of element is on screen
  }
  return isVisible;
}

// Lightbox logic
var lbs = document.querySelectorAll('a.lightbox-link');
for (i = 0; i < lbs.length; i++) {
  lbs[i].addEventListener('click', function(event) {
    event.preventDefault();
    var lb = document.createElement('div');
    lb.classList.add('lightbox');
    lb.setAttribute('role', 'dialog');
    var lbc = document.createElement('div');
    lbc.classList.add('container');
    lbc.classList.add('row');
    var lbh = document.createElement('div');
    lbh.classList.add('col-xs-12');
    lbh.classList.add('lightbox-header');
    var lbbtn = document.createElement('button');
    lbbtn.classList.add('lightbox-close');
    lbbtn.setAttribute('aria-label', 'Close Dialog');
    var lbsvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    lbsvg.setAttribute('viewBox', '0 0 24 24');
    var lbpath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    lbpath.setAttribute('d', 'M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z');
    var lbr = document.createElement('div');
    lbr.classList.add('col-xs-12');
    lbr.classList.add('lightbox-content');
    var lbv = document.createElement('div');
    lbv.classList.add('video-container');
    var lbi = document.createElement('iframe');
    lbi.setAttribute('src', this.getAttribute('href'));
    lbi.setAttribute('frameborder', '0');
    lbi.setAttribute('webkitallowfullscreen', '');
    lbi.setAttribute('mozallowfullscreen', '');
    lbi.setAttribute('allowfullscreen', '');
    lb.appendChild(lbc);
    lbc.appendChild(lbh);
    lbh.appendChild(lbbtn);
    lbbtn.appendChild(lbsvg);
    lbsvg.appendChild(lbpath);
    lbc.appendChild(lbr);
    lbr.appendChild(lbv);
    lbv.appendChild(lbi)
    document.body.insertBefore(lb, document.body.firstChild);
    document.body.classList.add('no-scroll');
    window.setTimeout(function() {
      document.querySelector('.lightbox').classList.add('show');
    }, 10)
  });
}
document.addEventListener('click', function(event) {
  if (checkParents(event.target, '.lightbox-close')) {
    var lightbox = document.querySelector('.lightbox');
    lightbox.classList.remove('show');
    lightbox.addEventListener(transitionEvent, function(event) {
      event.target.removeEventListener(event.type, arguments.callee);
      document.body.classList.remove('no-scroll');
      var lightbox = document.querySelector('.lightbox');
      try {
        lightbox.parentElement.removeChild(lightbox);
      }
      catch (err) {}
    });
  }
});

// Logic for ajax email forms
var forms = document.querySelectorAll('.ajax-form');
for (i = 0; i < forms.length; i++) {
  forms[i].addEventListener('submit', function(event) {
    event.preventDefault();
    var btn = this.querySelector('input[type=submit]');
    var btnText = btn.value;
    var errorDiv = this.querySelector('.error-msg');
    btn.value = 'Sending...';
    btn.disabled = true;
    var req = new XMLHttpRequest();
    req.open('POST', locals.ajax_url, true);
    req.onload = function() {
      var jsonRes = JSON.parse(req.response);
      if ((req.status >= 200 && req.status < 400) && jsonRes.success) {
        errorDiv.innerHtml = '';
        btn.outerHTML = jsonRes.data;
      } else {
        btn.value = btnText;
        btn.disabled = false;
        errorDiv.innerHTML = jsonRes.data;
      }
    }
    req.onerror = function() {
      this.querySelector('.error-msg').innerHTML = '<p>We are sorry, but it appears that something has gone wrong. Please try again at a later time.</p>';
    }
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.send(serializeForm(this));
  });
}

// Add class to header if page is not at its top
var scrollCheck = (function scrollCheck() {
  if (window.scrollY > 50) {
    document.querySelector('#site-header').classList.add('scroll-menu');
  } else {
    document.querySelector('#site-header').classList.remove('scroll-menu');
  }
  return scrollCheck;
}());
window.addEventListener('scroll', function() {
  scrollCheck();
});

// Slider Logic (Tiny Slider library)
var tinys = document.querySelectorAll('.slider-container');
for (i = 0; i < tinys.length; i++) {
  var tiny = tns({
    container: tinys[i].querySelector('.slider'),
    items: 1,
    mouseDrag: true
  });
}

// Display google maps
// function initMap() {
//   var mapz = document.querySelectorAll('.google-map');
//   for (i = 0; i < mapz.length; i++) {
//     var mapObj = mapz[i];
//     if (mapObj.querySelector('.map-canvas > *')) {
//       google.maps.event.trigger(mapObj.map, 'resize');
//       mapObj.map.fitBounds(mapObj.bounds);
//       if (zoom = mapObj.querySelector('.map-canvas').getAttribute('zoom')) {
//         mapObj.map.setZoom(mapObj.map.getZoom() - parseInt(zoom));
//       } else {
//         mapObj.map.setZoom(mapObj.map.getZoom() - 1);
//       }
//       continue;
//     }
//     var map = new google.maps.Map(mapObj.querySelector('.map-canvas'), {
//       center: {lat: 37.09, lng: -95.71},
//       scrollwheel: false,
//       streetViewControl: false,
//       mapTypeControl: false,
//       fullscreenControl: false,
//       zoom: 4
//     });
//     var markers = [];
//     var locs = mapObj.querySelectorAll('.location');
//     for (ii = 0; ii < locs.length; ii++) {
//       var coords = locs[ii].value.split('~%~%~');
//       var directions = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURI(coords[4].replace('<br>', ', '));
//       var infoWindow = new google.maps.InfoWindow({
//         content: '<div class="map-info-window"><a href="' + coords[2] + '">' + coords[3] + '</a><p>' + coords[4] + '</p><a href="' + directions + '" target="_blank">Get Directions</a></div>'
//       });
//       markers[ii] = new google.maps.Marker({
//         position: {
//           lat: parseFloat(coords[0]),
//           lng: parseFloat(coords[1])
//         },
//         map: map
//       });
//       markers[ii].addListener('click', function() {
//         infoWindow.open(map, markers[ii]);
//       });
//     }
//     var bounds = new google.maps.LatLngBounds();
//     for (ii = 0; ii < markers.length; ii++) {
//       bounds.extend(markers[ii].getPosition());
//     }
//     map.fitBounds(bounds);
//     map.set('mapObj', mapObj);
//     mapObj.map = map;
//     mapObj.bounds = bounds;
//     google.maps.event.addListenerOnce(map, 'bounds_changed', function() {
//       if (zoom = this.mapObj.querySelector('.map-canvas').getAttribute('zoom')) {
//         this.setZoom(this.getZoom() - parseInt(zoom));
//       } else {
//         this.setZoom(this.getZoom() - 1);
//       }
//     });
//   }
// }

// Social Media share buttons
var shares = document.querySelectorAll('.share-button');
for (i = 0; i < shares.length; i++) {
  shares[i].addEventListener('click', function(event) {
    event.preventDefault();
    window.open(this.getAttribute('href'), this.getAttribute('target'), 'resizeable,width=550,height=520');
  })
}

// Infinite scroll
if (btns = document.querySelectorAll('.infinite-scroll-btn')) {
  for (i = 0; i < btns.length; i++) {
    var div = document.createElement('div');
    div.classList.add('col-xs-12', 'load-more');
    var btn = document.createElement('button');
    btn.innerHTML = 'load more +';
    div.appendChild(btn);
    btns[i].appendChild(div);
  }
}
document.addEventListener('click', function(event) {
  if (btn = checkParents(event.target, '.load-more button')) {
    event.preventDefault();
    var loopContainer = btn.parentNode.parentNode;
    btn.innerHTML = 'Loading...';
    btn.disabled = true;
    var req = new XMLHttpRequest();
    req.open('POST', locals.ajax_url, true);
    req.onload = function() {
      var jsonRes = JSON.parse(req.response);
      if ((req.status >= 200 && req.status < 400) && jsonRes.success) {
        if (jsonRes.data) {
          btn.parentNode.insertAdjacentHTML('beforebegin', jsonRes.data.output);
          btn.innerHTML = 'load more +';
          btn.disabled = false;
          if (page = loopContainer.getAttribute('page')) {
            loopContainer.setAttribute('page', parseInt(page) + 1);
          }
          else {
            loopContainer.setAttribute('page', 3);
          }
          if (!jsonRes.data.more) {
            btn.parentNode.removeChild(btn);
          }
          initMap();
          objectFitPolyfill();
        }
      } else {
        btn.innerHTML = 'Load More';
        btn.disabled = false;
      }
    }
    req.onerror = function() {
      btn.outerHTML = 'We are sorry, but it appears that something has gone wrong. Please try again at a later time.';
    }
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    var loop = JSON.parse(loopContainer.querySelector('.loop-var').value);
    var type = loopContainer.hasAttribute('type') ? '&type=' + loopContainer.getAttribute('type') : '';
    var l = encodeURIComponent(JSON.stringify(typeof loop !== 'undefined' ? loop: locals.wp_query));
    req.send('action=_ws_get_more_posts&page=' + (loopContainer.getAttribute('page') || '2') + '&loop=' + l + type);
  }
});
var loading = false;
if (scrolls = document.querySelectorAll('.infinite-scroll')) {
  for (i = 0; i < scrolls.length; i++) {
    var loopContainer = scrolls[i];
    var loading = false;
    var load = document.createElement('div');
    load.classList.add('col-xs-12', 'load-more');
    load.innerHTML = 'Loading...';
    loopContainer.appendChild(load);
    infiniteCheck(loopContainer);
  }
  window.addEventListener('scroll', function() {
    var containers = document.querySelectorAll('.infinite-scroll');
    for (i = 0; i < containers.length; i++) {
      infiniteCheck(containers[i]);
    }
  });
}
function infiniteCheck(loopContainer) {
  var load = loopContainer.querySelector('.load-more');
  if (onScreen(load) && !loading) {
    loading = true;
    var req = new XMLHttpRequest();
    req.open('POST', locals.ajax_url, true);
    req.onload = function() {
      var jsonRes = JSON.parse(req.response);
      if ((req.status >= 200 && req.status < 400) && jsonRes.success) {
        if (jsonRes.data) {
          load.insertAdjacentHTML('beforebegin', jsonRes.data.output);
          if (page = loopContainer.getAttribute('page')) {
            loopContainer.setAttribute('page', parseInt(page) + 1);
          }
          else {
            loopContainer.setAttribute('page', 3);
          }
          if (!jsonRes.data.more) {
            load.parentNode.removeChild(load);
          }
          loading = false;
          initMap();
          objectFitPolyfill();
          infiniteCheck(loopContainer);
        }
      } else {
        // Don't do anything
      }
    }
    req.onerror = function() {
      load.outerHTML = 'We are sorry, but it appears that something has gone wrong. Please try again at a later time.';
    }
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    if (loopVar = loopContainer.querySelector('.loop-var')) {
      var loop = JSON.parse(loopVar.value);
    }
    var type = loopContainer.hasAttribute('type') ? '&type=' + loopContainer.getAttribute('type') : '';
    var l = encodeURIComponent(JSON.stringify(typeof loop !== 'undefined' ? loop: locals.wp_query));
    req.send('action=_ws_get_more_posts&page=' + (loopContainer.getAttribute('page') || '2') + '&loop=' + l + type);
  }
}

// Replace select elements with more customizable unordered list
// var selects = document.querySelectorAll('select');
// for (i = 0; i < selects.length; i++) {
//   var list = '';
//   var hidden = '';
//   var visible = '';
//   var options = selects[i].querySelectorAll('option');
//   for (ii = 0; ii < options.length; ii++) {
//     var selected = '';
//     if (options[ii].selected) {
//       hidden = options[ii].value;
//       visible = options[ii].text;
//       selected = ' class="selected"';
//     }
//     list += '<li' + selected + ' value="' + options[ii].value + '">' + options[ii].text + '</li>';
//   }
//   var id = selects[i].getAttribute('id') ? 'id="' + selects[i].getAttribute('id') + '"' : '';
//   var name = selects[i].getAttribute('name') ? 'name="' + selects[i].getAttribute('name') + '"' : '';
//   selects[i].insertAdjacentHTML('afterend', '<div class="select"><input ' + id + ' ' + name + ' value="' + hidden + '" type="hidden" /><div><span>' + visible + '</span><svg><use xlink:href="/wp-content/themes/_ws/template-parts/sprites.svg#arrow-down"></use></svg></div><ul>' + list + '</ul></div>');
//   selects[i].parentNode.removeChild(selects[i]);
// }
// document.addEventListener('click', function(event) {
//   // If we click in the select div
//   if (div = checkParents(event.target, '.select')) {
//     if (!div.classList.contains('open')) {
//       var options = document.querySelectorAll('.select');
//       for (i = 0; i < options.length; i++) {
//         options[i].classList.remove('open');
//       }
//       div.classList.add('open');
//     }
//     else {
//       div.classList.remove('open');
//     }
//   }
//   // If we click on the list
//   if (li = checkParents(event.target, '.select li')) {
//     var div = checkParents(li, '.select');
//     for (i = 0; i < li.parentNode.children.length; i++) {
//       li.parentNode.children[i].classList.remove('selected');
//     }
//     li.classList.add('selected');
//     div.querySelector('input[type=hidden]').value = li.getAttribute('value');
//     var evt = document.createEvent('HTMLEvents');
//     evt.initEvent('change', true, true);
//     div.querySelector('input[type=hidden]').dispatchEvent(evt);
//     div.querySelector('span').innerHTML = li.innerHTML;
//     li.parentNode.parentNode.classList.remove('open');
//   }
//   // If we click anywhere that's not the select div
//   if (!checkParents(event.target, '.select')) {
//     var options = document.querySelectorAll('.select');
//     for (i = 0; i < options.length; i++) {
//       options[i].classList.remove('open');
//     }
//   }
// });

// Actually enforce the min/max for inputs
var numbers = document.querySelectorAll('input[type=number]');
for (i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('input', checkMinMax);
  numbers[i].addEventListener('keypress', checkMinMax);
}
function checkMinMax() {
  if (this.value > parseInt(this.getAttribute('max'))) {
    this.value = this.getAttribute('max');
  } else if (this.value < parseInt(this.getAttribute('min'))) {
    this.value = this.getAttribute('min');
  }
}

// Lazy load
var lazys = document.querySelectorAll('.lazy-load[data-src]');
for (i = 0; i < lazys.length; i++) {
  if (lazys[i].tagName=='IMG') {
    lazys[i].src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }
}
var lazyCheck = (function lazyCheck() {
  for (i = 0; i < lazys.length; i++) {
    if (onScreen(lazys[i])) {
      if (lazys[i].tagName=='IMG') {
        if (lazys[i].getAttribute('src')=='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7') {
          lazys[i].src = lazys[i].dataset['src'];
          objectFitPolyfill(lazys[i]);
        }
      }
      else {
        if (!lazys[i].style.backgroundImage) {
          lazys[i].style.backgroundImage = 'url(' + lazys[i].dataset['src'] + ')';
        }
      }
    }
  }
  return lazyCheck;
}());
window.addEventListener('scroll', function() {
  lazyCheck();
});

// Toggle slide
function checkToggles() {
  var toggleBtns = document.querySelectorAll('.toggle');
  for (var i = 0; i < toggleBtns.length; i++) {
    var btn = toggleBtns[i];
    var t = document.querySelector(btn.getAttribute('target'));
    t.style.height = 0;
    t.classList.remove('open');
    t.classList.add('closed');
    btn.addEventListener('click', function(event) {
      event.preventDefault();
      var t = document.querySelector(this.getAttribute('target'));
      if (t.style.height == '0px') {
        t.style.height = t.scrollHeight + 'px';
        this.classList.remove('closed');
        this.classList.add('open');
        t.classList.remove('closed');
        t.classList.add('open');
        if (this.classList.contains('location-heading')) {
          this.parentElement.classList.add('shadow');
        }
      }
      else {
        t.style.height = 0;
        this.classList.remove('open');
        this.classList.add('closed');
        t.classList.remove('open');
        t.classList.add('closed');
        if (this.classList.contains('location-heading')) {
          this.parentElement.classList.remove('shadow');
        }
      }
    });
  }
}
checkToggles();

//=include _custom.js

svg4everybody();
