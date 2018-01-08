// this code exists because Kim wanted the PDF link to be below the web link under 'National Financial Statements'
// this loop will intentionally break if there are any 2018 links added$(document).ready(function(){
  var uls = $("#templatelist-663538086").children()[0]
  var lis = $(uls).children();
  for (var i = 0; i < lis.length; i++) {
    if(lis[i].innerHTML.indexOf('2018') != -1){
      console.warn('there are 2018 report statements, no longer reorganizing. code out of date');
      break;
    } else {
      var p = lis[0];
      var q = lis[1];
      p.parentNode.removeChild(p);
      q.parentNode.removeChild(q);
      $(uls).prepend(p);
      $(uls).prepend(q);
    }
  }
})
