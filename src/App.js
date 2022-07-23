import NavBar from "./components/navBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
// import "bootstrap/dist/css/bootstrap.min.css";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
