import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import View from "./pages/View";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { UserState } from "./context/UserState";
import Home from "./pages/Home";
import AddClient from "./pages/AddClient";

import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <UserState>
      <Router>
        <Navbar />
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/addclient" element={<AddClient />} />
          <Route exact path="/update/:id" element={<AddClient />} />
          <Route exact path="/view/:id" element={<View />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </UserState>
  );
}

export default App;
