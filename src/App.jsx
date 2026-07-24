import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import VerifyOTP from "./pages/auth/VerifyOTP";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import JobListPage from "./pages/JobListPage";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/signin" element={<Login />} />       
        <Route path="/" element={<Home />} />       
        <Route path="/contactus" element={<Contact />} />
        <Route path="/joblist" element={<JobListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
