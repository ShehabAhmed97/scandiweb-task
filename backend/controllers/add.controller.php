<?php

$db = new Database($config["database"]["dsn"], $config["database"]["username"], $config["database"]["password"]);

$product = new Product($db);

echo json_encode($product->add($data));
exit;