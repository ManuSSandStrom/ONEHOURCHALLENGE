export default function PageHero({ badge, title, highlight, description }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-hero-card reveal">
          {badge ? <div className="section-badge">{badge}</div> : null}
          <h1 className="page-hero-title">
            {title} {highlight ? <span>{highlight}</span> : null}
          </h1>
          {description ? <p className="page-hero-description">{description}</p> : null}
        </div>
      </div>
    </section>
  );
}
