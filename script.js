var display = function(results, urlBase) {
  if (results.length > 0) {
    var a = [];
    a.push('<div id="owl">');
    a.push('<p><img src="' + urlBase + '/img/owl_logo_mini.png" /></p>');
    a.push('<ul class="owl_ul">');
    for(var i = 0, l = results.length; i < l; i++) {
      a.push('<li class="owl_li"><a href="http');
      a.push(results[i].url);
      a.push('" >');
      a.push(results[i].title);
      a.push('</a></li>');
    }
    a.push('</ul>');
    a.push('</div>');
    $('#rhs').prepend(a.join(''));
  }
};

setTimeout(function(){
  var regex = /q=(.*?)&?$/;
  var matches = regex.exec(window.location.href);
  chrome.extension.sendRequest({
    action: "search",
    url: config.owlUrl,
    q: matches[1]
  }, function(response){
    display(response.value.list, config.owlUrl);
  });
}, 2000);

