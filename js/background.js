//global variables
var windowid = null;
var youtubeUrl;

var WindowSize_height, WindowSize_width , YoutubeTheme , YoutubeAutoplay;


chrome.browserAction.onClicked.addListener(function (tab) {
  WindowSize_height = parseInt(localStorage["WindowSize_height"]);
  WindowSize_width = parseInt(localStorage["WindowSize_width"]);
  YoutubeTheme = localStorage["youtube_theme"];
  YoutubeAutoplay = localStorage["youtube_autoplay"];
  console.log(YoutubeTheme);


  youtubeUrl = generateURL(tab.url);
  

  var props = {
    url: youtubeUrl,
    height: WindowSize_height,
    width: WindowSize_width,
    type: "panel",
    focused: true
  }
  
  OpenWindow(props);
});


function OpenWindow(props) {
  if(windowid == null) {
    chrome.windows.create(props, function(window){
      saveid(window.id);
    
      if(window.alwaysOnTop) {
        window.open("enable_panels.html", "_blank")
      }

    });
  } else {
    UpdateWindow();
  }
}

function saveid(id){
  windowid = id;
}

function UpdateWindow() {
  var props = {
    url: youtubeUrl,
    height: WindowSize_height,
    width: WindowSize_width,
    type: "panel",
    focused: true
  }

  chrome.windows.remove(windowid);
  windowid = null;
  OpenWindow(props);
}

function generateURL(url) {
  var vid = getUrlVars(url)["v"];
  var listid = getUrlVars(url)["list"];
  var youtubeTheme = localStorage['youtube_theme'];
  var newurl = null;
  
  if(listid != undefined) {
    console.log(listid);
    newurl = "https://www.youtube.com/embed?list=" + listid + "&autoplay=" + YoutubeAutoplay + "&theme=" + YoutubeTheme +"&showsearch=1&origin=1";
  } else {
    newurl = "https://www.youtube.com/embed/" + getUrlVars(url)["v"] + "?autoplay=" + YoutubeAutoplay + "&theme=" + YoutubeTheme +"&showsearch=1";
  }

  console.log(newurl);  
  return newurl;
}

function getUrlVars(url) {
  var vars = {};
  var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}
