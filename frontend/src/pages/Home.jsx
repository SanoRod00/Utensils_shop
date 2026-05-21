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
      <section className="section landing-gallery">
        <div className="section-header">
          <div>
            <p className="eyebrow">Seasonal selections</p>
            <h2>Photography that tells your kitchen story</h2>
          </div>
        </div>
        <div className="gallery-grid">
          <article className="gallery-card fade-in-up delay-1">
            <img src="https://images.unsplash.com/photo-1541544182778-2adbdf0498f0?auto=format&fit=crop&w=900&q=80" alt="Modern grey dinnerware set" />
            <div className="gallery-card-body">
              <h3>Modern dinnerware</h3>
              <p>Showcase elegant, everyday tableware designed to make every meal feel curated.</p>
            </div>
          </article>
          <article className="gallery-card fade-in-up delay-2">
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80" alt="Wooden utensils in a holder" />
            <div className="gallery-card-body">
              <h3>Warm wooden accents</h3>
              <p>Capture the artisanal charm of wooden spoons, spatulas, and serving pieces.</p>
            </div>
          </article>
          <article className="gallery-card fade-in-up delay-3">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80" alt="Stacked ceramic plates" />
            <div className="gallery-card-body">
              <h3>Stoneware collections</h3>
              <p>Highlight the texture and color of ceramic sets that elevate every kitchen.</p>
            </div>
          </article>
        </div>
      </section>
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
