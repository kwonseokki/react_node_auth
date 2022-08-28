import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandigPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
function App() {
  return (
    <div>
      <hr />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
