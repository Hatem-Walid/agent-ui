import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage"; 
import About from "./pages/About";
// import SplineChatPage from "./pages/SplineChatPage";
import './App.css';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/auth"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/About" element={<About />} />
        {/* <Route path="/ai" element={<SplineChatPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
