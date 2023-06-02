(function (window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["API_SERVICE_BASE_URL"] = "${API_SERVICE_BASE_URL}";
  window['env']['API_SERVICE_CLIENT_ID'] = "${API_SERVICE_CLIENT_ID}";
  window['env']['API_SERVICE_CLIENT_SECRECT'] = "${API_SERVICE_CLIENT_SECRECT}";
  window["env"]["debug"] = "${DEBUG}";
})(this);
