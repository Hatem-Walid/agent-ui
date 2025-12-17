import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage"; 
import About from "./pages/About";
import SplineChatPage from "./pages/SplineChatPage";
import FAQ from "./pages/FAQ";
import Docs from "./pages/Docs";
// import PlanPage from "./pages/PlanPage";
import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";
import Page404 from "./pages/Page404";
import Page404joke from "./pages/Page404joke";
import './App.css';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/auth","/doc"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/ai" element={<SplineChatPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/doc" element={<Docs />} />
        {/* <Route path="/plan" element={<PlanPage />} /> */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactUs />} /> 
        <Route path="*" element={<Page404 />} />
        <Route path="*" element={<Page404joke />} />
      </Routes>
    </>
  );
}

export default App;
