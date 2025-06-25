import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarC from "./components/navbar/NavbarC";
import Footer from "./components/footer/Footer";
import { Login } from "./components/login/Login";
// import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <Router>
      <NavbarC />
      <Routes>
        <Route />
          <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
