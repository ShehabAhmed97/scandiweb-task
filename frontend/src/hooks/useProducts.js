import { useState, useEffect, useCallback } from "react";

const useProducts = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(() => {
    fetch("https://shehabkhalel.me/scandiweb-task/products.php")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setStatus(true);
      })
      .catch((e) => {
        console.log(e.message);
        setError(e.message);
        setStatus(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const refetch = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      setError(null);
      setLoading(true);
      setProducts(null);
      setStatus(null);
    };
  }, [fetchProducts]);

  return {
    products,
    loading,
    status,
    error,
    refetch,
  };
};

export default useProducts;
