import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import api from "../services/api.js";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const category = searchParams.get("category") || "all";
  const q = searchParams.get("q") || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get("/products", { params: { category: category !== "all" ? category : undefined, q } }),
          api.get("/products/categories")
        ]);
        setProducts(prodRes.data.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, q]);

  const handleFilterChange = (newCategory) => {
    const next = new URLSearchParams(searchParams);
    if (newCategory === "all") next.delete("category");
    else next.set("category", newCategory);
    setSearchParams(next);
  };

  const handleSearch = (term) => {
    const next = new URLSearchParams(searchParams);
    if (term) next.set("q", term);
    else next.delete("q");
    setSearchParams(next);
  };

  const categoryNames = useMemo(
    () => [{ id: "all", name: "All" }, ...categories.map((c) => ({ id: c.id, name: c.name }))],
    [categories]
  );

  return (
    <div className="section">
      <div className="section-header">
        <div>
          <p className="eyebrow">Browse collection</p>
          <h1>Find your next everyday tool</h1>
        </div>
        <div className="filters">
          <input
            type="search"
            placeholder="Search utensils..."
            defaultValue={q}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="chip-row">
            {categoryNames.map((cat) => (
              <button
                key={cat.id}
                className={`chip ${category === cat.id ? "active" : ""}`}
                onClick={() => handleFilterChange(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid three">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.length === 0 && <p>No products found.</p>}
        </div>
      )}
    </div>
  );
};

export default Products;
