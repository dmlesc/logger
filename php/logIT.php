<?php
  $action = date("m-d-y - H:i") . " - " . $_GET["who"] . " - " . $_GET["node"] . " - " . $_GET["what"] . "\n";
  $logFile = fopen('logger.txt', 'a+');
  fwrite($logFile, $action);
  fclose($logFile);
  if (isset($_GET["notify"])) {
    $to = "john.doe@example.com";
    $subject = "logger notification";
    $body = "who: " . $_GET["who"] . "\r\n" . "node: " . $_GET["node"] . "\r\n" . "what: " . $_GET["what"];
    $headers = "From: NoReply";
    mail($to, $subject, $body, $headers);
  }
  echo "success";
?>
