import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { buildCanonicalUrl, buildSeoSchema, DEFAULT_OG_IMAGE, getSeoForPath, SITE_NAME } from '../utils/seo';

export default function SEO() {
  const location = useLocation();
  const meta = getSeoForPath(location.pathname);
  const canonical = buildCanonicalUrl(location.pathname);
  const robots = location.pathname.startsWith('/admin') ? 'noindex, nofollow' : 'index, follow';
  const keywords = Array.isArray(meta.keywords) ? meta.keywords.join(', ') : meta.keywords;
  const schema = buildSeoSchema(location.pathname);

  return (
    <Helmet htmlAttributes={{ lang: 'en' }}>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="author" content={SITE_NAME} />
      <meta name="theme-color" content="#0b7a43" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      <link rel="canonical" href={canonical} />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
