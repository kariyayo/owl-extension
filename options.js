function reflectOptions() {
  var username = document.getElementById("username").value;
  localStorage["owlextension_username"] = username;
}

function restoreOptions() {
  var username = localStorage["owlextension_username"];
  if (username) {
    var usernameInputElm = document.getElementById("username");
    usernameInputElm.value = username;
  }
}

document.getElementById('save_button').addEventListener('click', reflectOptions, false);
window.addEventListener('load', restoreOptions, false);

