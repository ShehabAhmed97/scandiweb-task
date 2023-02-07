<?php

function URIs($path)
{
  return $_SERVER["REQUEST_URI"] === $path ? true : false;
}
;

function abort($code = 404)
{
  http_response_code($code);

  header('Content-Type: application/json');
  echo json_encode(["res" => "not found"]);
  exit;

}