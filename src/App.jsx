import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import HousingServices from './pages/HousingServices';
import JobOpenings from './pages/JobOpenings';
import SummerMeals from './pages/SummerMeals';
import AboutUs from './pages/AboutUs';
import Partners from './pages/Partners';
import Donate from './pages/Donate';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/housing-services" element={<HousingServices />} />
        <Route path="/job-openings" element={<JobOpenings />} />
        <Route path="/summer-meals" element={<SummerMeals />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Route>
    </Routes>
  );
}

export default App;
