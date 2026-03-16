import { Routes, Route, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom"; // أضفنا هذه
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage"; 
import ProfileEdit from "./pages/profile_edit"; 
import About from "./pages/About";
import SplineChatPage from "./pages/SplineChatPage";
import FAQ from "./pages/FAQ";
import Docs from "./pages/Docs";
import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";
// import PlanPage from "./pages/PlanPage";
// import Page404joke from "./pages/Page404joke";
import Page404 from "./pages/Page404";
import './App.css';
import RetellAgent from './components/RetellAgent';

// مكون الـ Layout الذي يحتوي على العناصر المشتركة
const MainLayout = ({ hideNavbarRoutes }) => {
  const location = useLocation();
  // التحقق من إخفاء الـ Navbar في مسارات معينة (مثل /auth) داخل الصفحات الرئيسية
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <RetellAgent />
      <Outlet /> {/* هنا سيتم عرض محتوى الصفحة (Home, About, etc.) */}
    </>
  );
};

function App() {
  // المسارات التي لا تريد ظهور الـ Navbar فيها (لكن الـ RetellAgent سيظهر)
  const hideNavbarRoutes = ["/auth", "/doc", "/info"];

  return (
    <Routes>
      {/* 1. المسارات التي يظهر فيها الـ RetellAgent والـ Navbar */}
      <Route element={<MainLayout hideNavbarRoutes={hideNavbarRoutes} />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/info" element={<ProfileEdit />} />
        <Route path="/about" element={<About />} />
        <Route path="/ai" element={<SplineChatPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/doc" element={<Docs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* <Route path="/plan" element={<PlanPage />} />  */}
        {/* <Route path="*" element={<Page404joke />} />  */}
      </Route>

      {/* 2. صفحة الـ 404 (خارج الـ Layout لضمان عدم ظهور أي شيء معها) */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;

