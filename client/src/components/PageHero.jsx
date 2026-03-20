export default function PageHero({
  badge,
  eyebrow,
  title,
  highlight,
  description,
  actions,
  metrics = [],
  asideTitle,
  asideText,
  asideItems = [],
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-hero-card reveal">
          <div className={`page-hero-layout ${asideTitle || asideItems.length ? 'has-aside' : ''}`}>
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

            {asideTitle || asideText || asideItems.length ? (
              <aside className="page-hero-aside">
                {asideTitle ? <h3>{asideTitle}</h3> : null}
                {asideText ? <p>{asideText}</p> : null}
                {asideItems.length ? (
                  <div className="page-hero-aside-list">
                    {asideItems.map((item) => (
                      <div className="page-hero-aside-item" key={item.label}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                    ))}
                  </div>
                ) : null}
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
