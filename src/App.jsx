import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AgentDashboard from "./pages/AgentDashboard";
import AuthPage from "./pages/AuthPage"; 
import About from "./pages/About";
import '../src/App.css';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<AgentDashboard />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
