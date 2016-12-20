// NOTE object below must be a valid JSON
window.Leave = $.extend(true, window.Leave, {
  "config": {
    "layoutSet": "navbar",
    "navigation": [
      {
        "title": "Home",
        "onExecute": "#home",
        "icon": "home"
      },
      {
        "title": "About",
        "onExecute": "#about",
        "icon": "info"
      },
      {
        "title": "login",
        "onExecute": "#login",
        "icon": "login"
      }
    ]
  }
});