import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarC from "./components/navbar/NavbarC";
import Footer from "./components/footer/Footer";
// import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <Router>
      <NavbarC />
      <Routes>
        <Route />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
