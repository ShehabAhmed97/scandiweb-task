<?php
class Product
{
  private $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function getAll(): array
  {
    return $this->db->query("SELECT * FROM products")->fetchAll();
  }

  public function add($data)
  {
    $products = $this->db->query("SELECT * FROM products WHERE SKU = '$data->SKU'")->fetchAll();
    if ($products)
      return ["status" => "ERROR", "message" => "SKU Error", "product" => $products];

    $this->db->query("INSERT INTO products (SKU, product_name, type, price, attr) VALUES('$data->SKU', '$data->name', '$data->type', $data->price, '$data->attr')");
    return ["status" => "SUCCESS", "message" => "Product added successfully", "product" => $data];
  }

  public function bulkDelete($data)
  {
    foreach ($data as $p) {
      $this->db->query("DELETE FROM products WHERE SKU = $p");
    }

    return ["status" => "SUCCESS", "message" => "Products deleted successfully"];
  }
}