<?php

$db = new Database($config["database"]["dsn"], $config["database"]["username"], $config["database"]["password"]);

$product = new Product($db);

header('Content-Type: application/json');
echo json_encode($product->bulkDelete($data));
exit;