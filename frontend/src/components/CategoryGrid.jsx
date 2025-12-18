const CategoryGrid = ({ categories }) => (
  <section className="section">
    <div className="section-header">
      <div>
        <p className="eyebrow">Shop by task</p>
        <h2>Dial in your setup</h2>
      </div>
      <p className="muted">Curated kits to cover prep, cook, bake, and serve. Mix and match or build your own.</p>
    </div>
    <div className="grid four">
      {categories.map((cat) => (
        <div key={cat.id} className="card category-card">
          <div className="pill subtle">{cat.items} items</div>
          <h3>{cat.name}</h3>
          <p>{cat.description}</p>
          <a href={`/products?category=${cat.id}`} className="link">
            Browse {cat.name.toLowerCase()}
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default CategoryGrid;
