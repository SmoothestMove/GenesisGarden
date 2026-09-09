import { useEffect } from 'react';

const defaultMeta = {
  title: 'Genesis Garden | Safe, Stable Housing in Western Illinois',
  description: 'Genesis Garden provides safe, stable, and affordable housing options in McDonough County and surrounding Western Illinois communities.',
};

function SEOHead({ title, description }) {
  const pageTitle = title || defaultMeta.title;
  const pageDescription = description || defaultMeta.description;

  useEffect(() => {
    document.title = pageTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDescription);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = pageDescription;
      document.head.appendChild(metaDesc);
    }
  }, [pageTitle, pageDescription]);

  return null;
}

export default SEOHead;
