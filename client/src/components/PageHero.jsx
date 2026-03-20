export default function PageHero({
  badge,
  eyebrow,
  title,
  highlight,
  description,
  actions,
  metrics = [],
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-hero-card reveal">
          <div className="page-hero-layout">
            <div className="page-hero-main">
              {badge ? <div className="section-badge">{badge}</div> : null}
              {eyebrow ? <div className="page-hero-eyebrow">{eyebrow}</div> : null}
              <h1 className="page-hero-title">
                {title} {highlight ? <span>{highlight}</span> : null}
              </h1>
              {description ? <p className="page-hero-description">{description}</p> : null}
              {actions ? <div className="page-hero-actions">{actions}</div> : null}
              {metrics.length ? (
                <div className="page-hero-metrics">
                  {metrics.map((metric) => (
                    <div className="page-hero-metric" key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
