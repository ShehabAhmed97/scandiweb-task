import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddProduct() {
  const navigate = useNavigate();

  const [addError, setAddError] = useState("");

  const [form, setForm] = useState({
    sku: "",
    name: "",
    type: "Book",
    price: "",
    width: "",
    height: "",
    length: "",
    size: "",
    weight: "",
  });

  const [errors, setErrors] = useState({});

  const handleChangeType = (e) => {
    setForm((prev) => ({ ...prev, type: e.target.value }));
  };

  const handleChangeWeight = (e) => {
    setForm((prev) => ({ ...prev, weight: e.target.value }));
  };

  const handleChangeWidth = (e) => {
    setForm((prev) => ({ ...prev, width: e.target.value }));
  };

  const handleChangeHeight = (e) => {
    setForm((prev) => ({ ...prev, height: e.target.value }));
  };

  const handleChangeLength = (e) => {
    setForm((prev) => ({ ...prev, length: e.target.value }));
  };

  const handleChangeSize = (e) => {
    setForm((prev) => ({ ...prev, size: e.target.value }));
  };

  const handleChangeSKU = (e) => {
    setForm((prev) => ({ ...prev, sku: e.target.value }));
  };

  const handleChangeName = (e) => {
    setForm((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleChangePrice = (e) => {
    setForm((prev) => ({ ...prev, price: e.target.value }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!form.sku) newErrors.sku = "This field is mandatory";
    if (!form.name) newErrors.name = "This field is mandatory";
    if (!form.price) newErrors.price = "This field is mandatory";

    if (form.type === "DVD") {
      if (!form.size) newErrors.size = "This field is mandatory";
    } else if (form.type === "Book") {
      if (!form.weight) newErrors.weight = "This field is mandatory";
    } else if (form.type === "Furniture") {
      if (!form.height) newErrors.height = "This field is mandatory";
      if (!form.width) newErrors.width = "This field is mandatory";
      if (!form.length) newErrors.length = "This field is mandatory";
    }

    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      const data = {
        SKU: form.sku,
        name: form.name,
        price: Number(form.price),
      };

      if (form.type === "DVD") {
        data.type = "DVD-disc";
        data.attr = form.size;
      } else if (form.type === "Book") {
        data.type = "book";
        data.attr = form.weight;
      } else if (form.type === "Furniture") {
        data.type = "Furniture";
        data.attr = `${form.height}x${form.width}x${form.length}`;
      }

      fetch("https://shehabkhalel.me/scandiweb-task/add-product.php", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "SUCCESS") navigate("/");
          else if (data.message === "SKU Error")
            setAddError("SKU already exists, please use another SKU.");
          else
            setAddError(
              "OOPS! an error occured while adding your product, please try again later."
            );
        })
        .catch((e) => {
          setAddError(e.message);
        });
    }
  };

  return (
    <div className="container py-3">
      <Header title="Product Add">
        <button
          type="button"
          className="btn btn-sm btn-primary me-2"
          onClick={handleSubmit}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </Header>

      {addError && (
        <div className="form-text text-center text-danger">{addError}</div>
      )}

      <form id="product_form">
        <div className="row g-3 align-items-center mb-4">
          <div className="col-md-1">
            <label htmlFor="sku" className="form-label">
              SKU
            </label>
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              id="sku"
              aria-describedby="skuhelp"
              value={form.sku}
              onChange={handleChangeSKU}
            />
            {errors.sku && (
              <div id="skuHelp" className="form-text text-danger">
                {errors.sku}
              </div>
            )}
          </div>
        </div>

        <div className="row g-3 align-items-center mb-4">
          <div className="col-md-1">
            <label htmlFor="name" className="form-label">
              Name
            </label>
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="namehelp"
              value={form.name}
              onChange={handleChangeName}
            />
            {errors.name && (
              <div id="nameHelp" className="form-text text-danger">
                {errors.name}
              </div>
            )}
          </div>
        </div>

        <div className="row g-3 align-items-center mb-4">
          <div className="col-md-1">
            <label htmlFor="price" className="form-label">
              Price
            </label>
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              id="price"
              aria-describedby="pricehelp"
              value={form.price}
              onChange={handleChangePrice}
            />
            {errors.price && (
              <div id="priceHelp" className="form-text text-danger">
                {errors.price}
              </div>
            )}
          </div>
        </div>

        <div className="row g-3 align-items-center mb-4">
          <div className="col-md-1">
            <label htmlFor="productType" className="form-label">
              Product Type
            </label>
          </div>
          <div className="col-md-3">
            <select
              id="productType"
              className="form-select"
              aria-label="productType"
              value={form.type}
              onChange={handleChangeType}
            >
              <option id="DVD" value="DVD">
                DVD
              </option>
              <option id="Book" value="Book">
                Book
              </option>
              <option id="Furniture" value="Furniture">
                Furniture
              </option>
            </select>
          </div>
        </div>

        {form.type &&
          (form.type === "Book" ? (
            <div className="row g-3 align-items-center mb-4">
              <div className="col-md-1">
                <label htmlFor="weight" className="form-label">
                  Weight (KG)
                </label>
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  aria-describedby="weighthelp"
                  value={form.weight}
                  onChange={handleChangeWeight}
                />
                {errors.weight && (
                  <div id="weightHelp" className="form-text text-danger">
                    {errors.weight}
                  </div>
                )}
              </div>
            </div>
          ) : form.type === "DVD" ? (
            <div className="row g-3 align-items-center mb-4">
              <div className="col-md-1">
                <label htmlFor="size" className="form-label">
                  Size (MB)
                </label>
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  id="size"
                  aria-describedby="sizehelp"
                  value={form.size}
                  onChange={handleChangeSize}
                />
                {errors.size && (
                  <div id="sizeHelp" className="form-text text-danger">
                    {errors.size}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="row g-3 align-items-center mb-4">
                <div className="col-md-1">
                  <label htmlFor="height" className="form-label">
                    Height (CM)
                  </label>
                </div>
                <div className="col-md-3">
                  <input
                    type="number"
                    className="form-control"
                    id="height"
                    aria-describedby="heighthelp"
                    value={form.height}
                    onChange={handleChangeHeight}
                  />
                  {errors.height && (
                    <div id="heightHelp" className="form-text text-danger">
                      {errors.height}
                    </div>
                  )}
                </div>
              </div>

              <div className="row g-3 align-items-center mb-4">
                <div className="col-md-1">
                  <label htmlFor="width" className="form-label">
                    Width (CM)
                  </label>
                </div>
                <div className="col-md-3">
                  <input
                    type="number"
                    className="form-control"
                    id="width"
                    aria-describedby="widththelp"
                    value={form.width}
                    onChange={handleChangeWidth}
                  />
                  {errors.width && (
                    <div id="widthHelp" className="form-text text-danger">
                      {errors.width}
                    </div>
                  )}
                </div>
              </div>

              <div className="row g-3 align-items-center mb-4">
                <div className="col-md-1">
                  <label htmlFor="length" className="form-label">
                    Length (CM)
                  </label>
                </div>
                <div className="col-md-3">
                  <input
                    type="number"
                    className="form-control"
                    id="length"
                    aria-describedby="lengthhelp"
                    value={form.length}
                    onChange={handleChangeLength}
                  />
                  {errors.length && (
                    <div id="lengthHelp" className="form-text text-danger">
                      {errors.length}
                    </div>
                  )}
                </div>
              </div>
            </>
          ))}
      </form>
    </div>
  );
}

export default AddProduct;
