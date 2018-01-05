var uls = $("#templatelist-663538086").children()[0]
var lis = $(uls).children();
for (var i = 0; i < lis.length; i++) {
  var p = lis[0];
  var q = lis[1];
  p.parentNode.removeChild(p);
  q.parentNode.removeChild(q);
  $(uls).prepend(p);
  $(uls).prepend(q);
}
