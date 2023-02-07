<?php

$path = parse_url($_SERVER["REQUEST_URI"])["path"];

$routes = [
  "/products" => [
    "method" => "GET",
    "controller" => "controllers/products.controller.php"
  ],
  "/add-product" => [
    "method" => "POST",
    "controller" => "controllers/add.controller.php"
  ],
  "/delete-products" => [
    "method" => "DELETE",
    "controller" => "controllers/delete.controller.php"
  ],
];

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Content-Type: application/json');

if (array_key_exists($path, $routes) && $_SERVER['REQUEST_METHOD'] === $routes[$path]["method"]) {

  $data = json_decode(file_get_contents("php://input"));

  require($routes[$path]["controller"]);
} else if (array_key_exists($path, $routes) && $_SERVER['REQUEST_METHOD'] === "OPTIONS") {
  echo "safe";
} else {
  abort(404);
}