import { useState } from "react";
import { Link } from "react-router-dom";
import "./GallerySection.css";

const GallerySection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [likedIndices, setLikedIndices] = useState(new Set());

  const galleryItems = [
    {
      id: 1,
      title: "Modern dinnerware",
      description: "Showcase elegant, everyday tableware designed to make every meal feel curated.",
      image: "https://images.unsplash.com/photo-1541544182778-2adbdf0498f0?auto=format&fit=crop&w=900&q=80",
      category: "Dinnerware",
      items: "12 sets available",
      tag: "Bestseller"
    },
    {
      id: 2,
      title: "Warm wooden accents",
      description: "Capture the artisanal charm of wooden spoons, spatulas, and serving pieces.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      category: "Utensils",
      items: "24 pieces",
      tag: "Eco-friendly"
    },
    {
      id: 3,
      title: "Stoneware collections",
      description: "Highlight the texture and color of ceramic sets that elevate every kitchen.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
      category: "Stoneware",
      items: "8 collections",
      tag: "Premium"
    }
  ];

  const toggleLike = (index) => {
    const newLiked = new Set(likedIndices);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
    }
    setLikedIndices(newLiked);
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="section landing-gallery">
      <div className="section-header">
        <div>
          <p className="eyebrow">Seasonal selections</p>
          <h2>Photography that tells your kitchen story</h2>
        </div>
      </div>

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <article
            key={item.id}
            className={`gallery-card fade-in-up delay-${index + 1} ${expandedIndex === index ? "expanded" : ""}`}
            onMouseEnter={() => setExpandedIndex(index)}
            onMouseLeave={() => setExpandedIndex(null)}
          >
            {/* Image Container */}
            <div className="gallery-image-container">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="gallery-image"
              />

              {/* Overlay with gradient */}
              <div className="gallery-overlay"></div>

              {/* Tag Badge */}
              <span className="gallery-tag">{item.tag}</span>

              {/* Expanded Info Overlay */}
              <div className="gallery-expanded-info">
                <span className="gallery-category">{item.category}</span>
                <span className="gallery-items">{item.items}</span>
              </div>

              {/* Action Buttons */}
              <div className="gallery-actions">
                <button
                  className="gallery-like-btn"
                  onClick={() => toggleLike(index)}
                  title={likedIndices.has(index) ? "Remove from favorites" : "Add to favorites"}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={likedIndices.has(index) ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>

                <Link to="/products" className="gallery-view-btn">
                  View collection
                </Link>
              </div>
            </div>

            {/* Content */}
            <div className="gallery-card-body">
              <div className="gallery-header">
                <h3>{item.title}</h3>
                <button
                  className="gallery-expand-btn"
                  onClick={() => toggleExpand(index)}
                  title={expandedIndex === index ? "Collapse" : "Expand"}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                </button>
              </div>
              <p>{item.description}</p>

              {expandedIndex === index && (
                <div className="gallery-extended-content">
                  <div className="gallery-specs">
                    <div className="spec-item">
                      <span className="spec-label">Category</span>
                      <span className="spec-value">{item.category}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Available</span>
                      <span className="spec-value">{item.items}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
