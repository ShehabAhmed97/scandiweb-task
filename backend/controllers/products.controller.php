<?php

$db = new Database($config["database"]["dsn"], $config["database"]["username"], $config["database"]["password"]);

$product = new Product($db);

$products = $product->getAll();

header('Content-Type: application/json');
echo json_encode($products);
exit;



