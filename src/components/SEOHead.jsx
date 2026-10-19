import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import site from '../content/site.json';

const SITE_URL = site.siteUrl || 'https://genesisgarden.vercel.app';

const defaultMeta = {
  title: 'Genesis Garden | Safe, Stable Housing in Western Illinois',
  description: 'Genesis Garden provides safe, stable, and affordable housing options in McDonough County and surrounding Western Illinois communities.',
};

function upsertHeadTag(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function SEOHead({ title, description, noindex = false }) {
  const pageTitle = title || defaultMeta.title;
  const pageDescription = description || defaultMeta.description;
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = pageTitle;

    const metaDesc = upsertHeadTag('meta[name="description"]', () => {
      const el = document.createElement('meta');
      el.name = 'description';
      return el;
    });
    metaDesc.setAttribute('content', pageDescription);

    const ogTitle = upsertHeadTag('meta[property="og:title"]', () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:title');
      return el;
    });
    ogTitle.setAttribute('content', pageTitle);

    const ogDesc = upsertHeadTag('meta[property="og:description"]', () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:description');
      return el;
    });
    ogDesc.setAttribute('content', pageDescription);
  }, [pageTitle, pageDescription]);

  useEffect(() => {
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;

    const canonical = upsertHeadTag('link[rel="canonical"]', () => {
      const el = document.createElement('link');
      el.rel = 'canonical';
      return el;
    });
    canonical.href = url;

    const ogUrl = upsertHeadTag('meta[property="og:url"]', () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:url');
      return el;
    });
    ogUrl.setAttribute('content', url);
  }, [pathname]);

  useEffect(() => {
    if (!noindex) return;
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, [noindex]);

  return null;
}

export default SEOHead;
