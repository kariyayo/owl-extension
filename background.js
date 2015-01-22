window.onload = init;

function init() {
  chrome.extension.onRequest.addListener( function ( message , sender , sendResponse) {
    if (message.action === "search") {
      $.ajax({
        url: message.url + "/search/json?q=" + message.q
      }).done(function(response) {
        sendResponse({value: response});
      });
    } else if (message.action === "notification") {
      croll(message.url, message.username);
    }
  }) ;
}

function croll(urlBase, username) {
  $.ajax({
    url: urlBase + "/" + username
  }).then(function(response) {
    var as = $(response).find(".item p a[class!=username]");
    var promises = $.map(as, function(x){
      return $.ajax({url: x.href});
    });
    return $.when.apply($, promises);
  }).then(function(r0, r1, r2, r3, r4, r5, r6, r7, r8, r9){
    var rs = [r0, r1, r2, r3, r4, r5, r6, r7, r8, r9];
    var arr = JSON.parse(localStorage["owlextention_commenttimes"]) || [];
    console.log(arr);
    for(var i = 0; i < 10; i++) {
      if (rs[i] && rs[i][1] === "success") {
        var $lastCommentDate = $(rs[i][0]).find("#comment-container .media-body .right div:first-child").last();
        if ($lastCommentDate.length > 0) {
          var savedTime = getCommentTime(arr, this[i].url);
          var lastCommentTime = Date.parse($lastCommentDate.html());
          if (!savedTime || lastCommentTime > savedTime) {
            arr.push({
              "url" : this[i].url,
              "commentTime" : lastCommentTime
            });
            showNotification(urlBase);
          }
        }
      }
    }
    for (var i = arr.length - 10; i > 0; i--) {
      arr.splice(0, 1);
    }
    localStorage["owlextention_commenttimes"] = JSON.stringify(arr);
  });
}

function getCommentTime(as, url) {
  for (var i = 0; i < as.length; i++) {
    if (as[i].url === url) return as[i].commentTime;
  }
  return null;
}

function showNotification(urlBase) {
  chrome.notifications.getPermissionLevel(function(level){
    if(level === "granted") {
      var displayPeriod = localStorage["display_period_msec"];
      if (!displayPeriod) displayPeriod = 5000;
      var message = [];
      message.push("hoge");
      chrome.notifications.create("", {
        type: "basic",
        title: "hoge",
        message: message.join(''),
        iconUrl: urlBase + "/img/owl_logo_mini.png",
        eventTime: Date.now() + displayPeriod
      }, function(){});
    }
  });
}

