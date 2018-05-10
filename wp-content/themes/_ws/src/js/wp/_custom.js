//=include bower-skrollr/skrollr.min.js

var s;
mySkrollr();
function mySkrollr() {
  s = skrollr.init({
    forceHeight: false,
    easing: {
      easeOut: function(p) {
        return 0 * (p * p * p * p * p) + 0 * (p * p * p * p) + 1 * (p * p * p) - 3 * (p * p) + 3 * p;
      }
    }
  });
  var things = document.getElementsByClassName('thing');
  for (var i = 0; i < things.length; i++) {
    if (window.innerWidth <= 768 && i > 15) {
      things[i].removeAttribute('data-start');
      things[i].removeAttribute('data-end');
      things[i].style.display = 'none';
      continue;
    }
    var size = (Math.random() * (window.innerWidth / 6)) + (window.innerWidth / 40);
    var left = (Math.random() * window.innerWidth) - (size / 2);
    var height = (Math.random() * (window.innerHeight * 2)) + (window.innerHeight / 8);
    var rot = Math.random() * 720 + 180;
    var rot2 = Math.random() < 0.5 ? '-' : '';
    things[i].style.width = size + 'px';
    things[i].style.height = size + 'px';
    things[i].style.left = left + 'px';
    things[i].setAttribute('data-start', 'top[easeOut]: -' + size + 'px; transform: rotate(0deg);');
    things[i].setAttribute('data-end', 'top[easeOut]: ' + height + 'px; transform: rotate(' + rot2 + rot + 'deg);');
  }
  s.refresh();
}
