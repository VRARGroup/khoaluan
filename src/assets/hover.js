$('ul.dropdown-menu li').hover(function() {
  $(this).find('.dropdown-content').stop(true, true).delay(200).fadeIn(500);
}, function() {
  $(this).find('.dropdown-content').stop(true, true).delay(200).fadeOut(500);
});