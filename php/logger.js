var word, user;
var users = new Array("test","David","Bryan");
var currentUser, regex, who, node, what, notify, ajax, currentFace, currentForm;
var seconds = 0;
var back, currentFocusBig, currentFocusSmall, focusResizeBig, focusResizeSmall;
var focusResizeRate = 0.25;
var currentFontSize;
var focusFontSizeBig = 14;
var focusFontSizeSmall = 18;
var text = "";
var str = "";
var index = 0;
var currentID = "";
var moves = 5;
var moveRate = 1;
var moveSteps = 100;
var moveUpCur = 30;

function init() {
  browser = navigator.userAgent;
  var chrome = /chrome/i;
  var firefox = /firefox/i;

  if (chrome.test(browser))
    ;
  else if (firefox.test(browser))
    setFirefox();
  else
    getID("background").innerHTML = "you must use chrome or firefox, please.";

  giveFocus("you");
  currentFace = "oneFace";
}
function setFirefox() {
  getID("oneInput_what").cols = 33;
}
function checkWho(evt) {
  if (evt.keyCode == 13 || checkUser())
    admitted();
}
function checkUser() {
  var input = getID("you").value;
  for (i=0; i<users.length; i++) {
    regex = new RegExp(users[i], "i");
    if (regex.test(input)) {
      who = users[i];
      return true;
    }
  }
  return false;
}
function admitted(){
  hideID("who");
  getID("oneFace").style.display = "block";
  giveFocus("oneInput_node");}
function listenForEnter(event){
    if (event.keyCode == 13)
      logIT();}
function notifynobody(){logIT();}
function notifyAllIT(){logIT("AllIT");}
function notifySMSIT(){logIT("SMSIT");}
function logIT(notifyWho){
    node = getID("oneInput_node").value;
    what = getID("oneInput_what").value;
    text = who + " - " + node + " - " + what;
    notify = notifyWho;
    createAction();}
function createAction(){
    hideID(currentFace);
    showID("display");
    currentID = "display";
    createActionRecur();}
function createActionRecur(){
    if (index < text.length){
      str += text.charAt(index);
      getID(currentID).innerHTML = str;
      index++;
      createActionOn = setTimeout("createActionRecur()",50);}
    else {
      clearTimeout(createActionOn);
      index = 0;
      str = "";
      logAction();}}
function logAction(){
    ajax = new XMLHttpRequest();
    var url = "logIT.php?who=" + who + "&node=" + node + "&what=" + what;
    if (notify)
      url += "&notify=" + notify;
    ajax.onreadystatechange=confirmITlogged;
    ajax.open("GET", url, true);
    ajax.send();}
function confirmITlogged(){
    if (ajax.responseText == "success")
      timer();}
function timer(){timerRecur();}
function timerRecur(){
    if (seconds < 2){
      seconds++;
      timerOn = setTimeout("timerRecur()",1000);}
    else
      timerStop();}
function timerStop(){
clearTimeout(timerOn);
seconds = 0;
    toTheCloud();}
function toTheCloud(){
    moveRight();
    moveUp();}
function moveRight(){moveRightRecur();}
function moveRightRecur(){
    if (moves < moveSteps){
      moves += moveRate;
      getID("display").style.left = moves;
      moveRightOn = setTimeout("moveRightRecur()",5);}
    else {
      clearTimeout(moveRightOn);
      moves = 5;
      hideID("display");
      getID("display").style.left = moves;}}
function moveUp(){
    moveUpRecur();}
function moveUpRecur(){
    if (moveUpCur > -20){
      moveUpCur--;
      getID("display").style.top = moveUpCur;
      moveUpOn = setTimeout("moveUpRecur()",5);}
    else {
      clearTimeout(moveUpOn);
      moveUpCur = 30;
      hideID("display");
      getID("display").style.top = moveUpCur;
      backToFace();}}
function backToFace(){
    showID(currentFace);
    getID("oneInput_node").value = "";
    getID("oneInput_what").value = "";
    giveFocus("oneInput_node");}
function resizeSmall(id){
  currentFocusSmall = id;
  resizeFocusSmallRecur();}
function resizeFocusSmallRecur(){
    if (focusFontSizeSmall > 14){
      focusFontSizeSmall -= focusResizeRate;
      getID(currentFocusSmall).style.fontSize = focusFontSizeSmall;
      focusResizeSmallOn = setTimeout("resizeFocusSmallRecur()",3);}
    else {
      clearTimeout(focusResizeSmallOn);
      focusFontSizeSmall = 18;}}
function resizeBig(id){
  currentFocusBig = id;
  resizeFocusBigRecur();}
function resizeFocusBigRecur(){
    if (focusFontSizeBig < 18){
      focusFontSizeBig += focusResizeRate;
      getID(currentFocusBig).style.fontSize = focusFontSizeBig;
      focusResizeBigOn = setTimeout("resizeFocusBigRecur()",3);}
    else {
      clearTimeout(focusResizeBigOn);
      focusFontSizeBig = 14;}}
function giveFocus(id){
    getID(id).focus();}
function getID(id){
    return document.getElementById(id);}
function hideID(id){
    getID(id).style.display = "none";}
function showID(id){ getID(id).style.display = "block";}
