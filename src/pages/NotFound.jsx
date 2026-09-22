import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import site from '../content/site.json';
import './NotFound.css';

function NotFound() {
  return (
    <>
      <SEOHead
        title="Page Not Found | Genesis Garden"
        description="The page you were looking for could not be found."
        noindex
      />

      <section className="page-hero not-found">
        <div className="container">
          <h1>Page not found</h1>
          <p>
            We couldn't find that page. It may have moved, or the link may be out of date.
          </p>
          <p className="not-found__call">
            Need housing help now? Call or text{' '}
            <a href={site.phoneHref}>{site.phone}</a>.
          </p>
          <div className="not-found__links">
            <Link to="/" className="btn btn--accent">Go to the home page</Link>
            <Link to="/housing-services" className="btn btn--outline-white">Housing services</Link>
            <Link to="/contact-us" className="btn btn--outline-white">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
