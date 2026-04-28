import { motion as Motion } from 'framer-motion';

export default function PageHero({
  badge,
  eyebrow,
  title,
  highlight,
  description,
  actions,
  metrics = [],
}) {
  const previewMetrics = metrics.slice(0, 3);

  return (
    <section className="page-hero">
      <div className="page-hero-aurora page-hero-aurora-left"></div>
      <div className="page-hero-aurora page-hero-aurora-right"></div>
      <div className="container">
        <Motion.div
          className="page-hero-card reveal"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="page-hero-layout page-hero-centered">
            <div className="page-hero-main">
              {badge ? <div className="section-badge">{badge}</div> : null}
              {eyebrow ? <div className="page-hero-eyebrow">{eyebrow}</div> : null}
              <h1 className="page-hero-title">
                {title} {highlight ? <span>{highlight}</span> : null}
              </h1>
              {description ? <p className="page-hero-description">{description}</p> : null}
              {actions ? <div className="page-hero-actions">{actions}</div> : null}
              {previewMetrics.length ? (
                <div className="page-hero-metrics">
                  {previewMetrics.map((metric) => (
                    <div className="page-hero-metric" key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
