// ----- include widget code -----------------------------------------------------
var scriptFolder = (function() {
  //var result = document.currentScript.getAttribute("src", 2);
  return "./widgets/" 
  //result.substring(0, result.lastIndexOf("/") +1);
}());

function include(script) {
  script = scriptFolder + script;
  $.ajax({
    url: script,
    dataType: "script",
    async: false,
    error: function () {
      alert("Could not load '" + script + "'");
    }
  });
}

// -----------------------------------------------------------------------------
// W I D G E T S
// -----------------------------------------------------------------------------
include("basic2.js");
include("widget_uzsu.js");

// ----- swipe navigation events -----------------------------------------------------
$(document).on('swipeleft swiperight', function (event) {
 if(event.type == 'swiperight') {
  var prevpage = '#index'; 
  $.mobile.changePage(prevpage, {
   transition: 'slide',
   reverse: true
  });
 }
 if(event.type == 'swipeleft') {
  var nextpage = '#' + $.mobile.activePage.next('div[data-role="page"]')[0].id;
  $.mobile.changePage(nextpage, {
   transition: 'slide',
   reverse: false
  });
 }
});

// ----- browser and platform identification -----------------------------------------------------
var b = document.documentElement;
    b.setAttribute('data-useragent',  navigator.userAgent);
    b.setAttribute('data-platform', navigator.platform );
    b.className += ((!!('ontouchstart' in window) || !!('onmsgesturechange' in window))?' touch':'');