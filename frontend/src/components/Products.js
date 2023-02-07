import { useState } from "react";
import useProducts from "../hooks/useProducts";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
function Products() {
  const { products, refetch } = useProducts();
  const navigate = useNavigate();

  const [deleteProducts, setDeleteProducts] = useState([]);

  const handleCheck = (e) => {
    if (e.target.checked) {
      const newDeleteProducts = [...deleteProducts];
      newDeleteProducts.push(e.target.id);
      setDeleteProducts(newDeleteProducts);
    } else
      setDeleteProducts(deleteProducts.filter((sku) => sku !== e.target.id));
  };

  const handleMassDelete = () => {
    if (deleteProducts.length)
      fetch("https://shehabkhalel.me/scandiweb-task/delete-products.php", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(deleteProducts),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "SUCCESS") navigate("/");
        })
        .catch((e) => {
          console.log(e.message);
        })
        .finally(() => {
          setDeleteProducts([]);
          refetch();
        });
  };

  //if (!status) return error;
  return (
    <div className="container py-3">
      <Header title="Products">
        <button
          type="button"
          className="btn btn-sm btn-primary me-2"
          onClick={() => navigate("/add-product")}
        >
          ADD
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          //disabled={!deleteProducts.length}
          onClick={handleMassDelete}
          id="delete-product-btn"
        >
          MASS DELETE
        </button>
      </Header>
      <main>
        <div className="row row-cols-1 row-cols-md-4 mb-3 text-center">
          {products?.map((product) => (
            <div className="col" key={product.SKU}>
              <div className="card mb-4 rounded-3 shadow-sm">
                <div className="form-check m-2">
                  <input
                    type="checkbox"
                    className="form-check-input delete-checkbox"
                    id={`${product.SKU}`}
                    onChange={handleCheck}
                  />
                </div>
                <div className="card-body">
                  <ul className="list-unstyled mb-4">
                    <li>{product.SKU}</li>
                    <li>{product.product_name}</li>
                    <li>{product.price} $</li>
                    {product.type === "book"
                      ? `Weight: ${product.attr} Kg`
                      : product.type === "DVD-disc"
                      ? `Size: ${product.attr} MB`
                      : `Dimentions: ${product.attr} HxWxL`}
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
  //return <div className="Products">products</div>;
}

export default Products;
