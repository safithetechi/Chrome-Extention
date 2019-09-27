function start() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
   });
}


function stop() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "stop"});
   });
}




document.addEventListener("DOMContentLoaded", function() {
document.getElementById("start").addEventListener("click", start);
document.getElementById("stop").addEventListener("click", stop);
});