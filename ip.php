<?php
header('Content-Type: application/json');
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
$resultJson = array("text" =>$input);
//echo json_encode($_POST);
echo json_encode($resultJson);