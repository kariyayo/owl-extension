window.onload = init;

function init() {
  chrome.extension.onRequest.addListener( function ( message , sender , sendResponse) {
    if (message.action === "search") {
      $.ajax({
        url: message.url + "/search/json?q=" + message.q
      }).done(function(response) {
        sendResponse({value: response});
      });
    }
  }) ;
}

