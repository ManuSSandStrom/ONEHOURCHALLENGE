import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildCanonicalUrl, buildSeoSchema, DEFAULT_OG_IMAGE, getSeoForPath, SITE_NAME } from '../utils/seo';

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    const meta = getSeoForPath(location.pathname);
    const canonical = buildCanonicalUrl(location.pathname);
    const robots = location.pathname.startsWith('/admin') ? 'noindex, nofollow' : 'index, follow';
    const keywords = Array.isArray(meta.keywords) ? meta.keywords.join(', ') : meta.keywords;
    const schema = buildSeoSchema(location.pathname);

    document.title = meta.title;
    document.documentElement.lang = 'en';

    upsertMeta('meta[name="description"]', { name: 'description', content: meta.description });
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
    upsertMeta('meta[name="author"]', { name: 'author', content: SITE_NAME });
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color', content: '#006d3c' });

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: meta.description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_OG_IMAGE });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: meta.description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: DEFAULT_OG_IMAGE });

    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonical });

    let script = document.head.querySelector('script[data-seo-schema="true"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-schema', 'true');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [location.pathname]);

  return null;
}
