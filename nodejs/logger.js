var who, node, what, currentView;
var input_node = getID("input_node");
var input_what = getID("input_what");
var sessionLogs = [];
var allLogs;
var input_logsearch = getID("input_logsearch");

function init() {
  getID("you").focus();
  currentView = "view_whoareyou";
}

function enterWho(event) {
  if (event.keyCode == 13) {
    who = getID("you").value;
    transition("view_logdetails");
    input_node.focus();
    updateCurrentLog();
  }
}

function updateCurrentLog() {
  getID("currentLogText").innerHTML = who + " - " + input_node.value + " - " + input_what.value;
}

function logIT(notify) {
  node = input_node.value;
  what = input_what.value;
  var url = "logIT?who=" + who + "&node=" + node + "&what=" + what;
  if (notify)
    url += "&notify=" + notify;
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
      if (ajax.responseText == "success") {
        updateSessionLogs(node, what);
        input_node.value = "";
        input_what.value = "";
        input_node.focus();
      }
    }
  };
  ajax.open("GET", url, true);
  ajax.send();
}

function updateSessionLogs(node, what) {
  sessionLogs.push({ "who": who, "node": node, "what": what });
  var html = "";
  for (var i = 0; i < sessionLogs.length; i++) {
    var log = sessionLogs[i];
    html += log.who + " - " + log.node + " - " + log.what + "</br>";
  }
  getID("sessionLogsText").innerHTML = html;
}

function viewAllLogs() {
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
      allLogs = JSON.parse(ajax.responseText);
      var html = "";
      for (var i = 0; i < allLogs.length; i++) {
        var log = allLogs[i];
        html += log.date + " - " + log.who + " - " + log.node + " - " + log.what + "</br>";
      }
      getID("allLogsText").innerHTML = html;
      transition("view_alllogs");
      input_logsearch.focus();
    }
  };
  ajax.open("GET", "logs.json", true);
  ajax.send();
}

function searchLogs() {
  var pattern = input_logsearch.value;
  var html = "";
  for (var i = 0; i < allLogs.length; i++) {
    var log = allLogs[i];

    if (log.date.search(pattern) != -1
      || log.who.search(pattern) != -1
      || log.node.search(pattern) != -1
      || log.what.search(pattern) != -1) {
      html += log.date + " - " + log.who + " - " + log.node + " - " + log.what + "</br>";
    }
  }
  getID("allLogsText").innerHTML = html;
}

function getID(id) { return document.getElementById(id); }

function transition(view) {
  getID(currentView).style.display = "none";
  getID(view).style.display = "block";
  currentView = view;
}
