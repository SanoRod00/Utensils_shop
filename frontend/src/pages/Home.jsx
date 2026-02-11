import { useState, useEffect } from "react";
import api from "../services/api.js";
import HeroSection from "../components/HeroSection.jsx";
import FeatureCallouts from "../components/FeatureCallouts.jsx";
import CategoryGrid from "../components/CategoryGrid.jsx";
import ProductCard from "../components/ProductCard.jsx";
import NewsletterForm from "../components/NewsletterForm.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([api.get("/products"), api.get("/products/categories")]);
        setProducts(prodRes.data.data.slice(0, 4));
        setCategories(catRes.data);
      } catch (error) {
        console.error("Failed to load home data", error);
      }
    };
    load();
  }, []);

  return (
    <div className="stack">
      <HeroSection />
      <FeatureCallouts />
      {categories.length > 0 && <CategoryGrid categories={categories} />}
      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Editor&apos;s picks</p>
            <h2>Beautiful, hardworking tools</h2>
          </div>
          <a className="link" href="/products">
            View all
          </a>
        </div>
        <div className="grid four">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <NewsletterForm />
    </div>
  );
};

export default Home;
