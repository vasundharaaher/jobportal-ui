import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import VerifyOTP from "./pages/auth/VerifyOTP";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import JobListPage from "./pages/JobListPage";
import ProfileRouter from "./pages/ProfileRouter";
import CompanyDashboard from "./pages/Company/CompanyDashboard";
import PostJobPage from "./pages/Company/PostJobPage";
import ManageJobsPage from "./pages/Company/ManageJobsPage";
import ApplicationsPage from "./pages/Company/ApplicationsPage";
import { getStoredUser, normalizeRole } from "./services/authSession";
import CandidateJobsPage from "./pages/Candidate/CandidateJobsPage";
import AppliedJobsPage from "./pages/Candidate/AppliedJobsPage";
import ApplyJobPage from "./pages/Candidate/ApplyJobPage";

function CompanyRoute({ children }) {
  const token = localStorage.getItem("access");
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/signin" replace />;
  }

  return normalizeRole(user.role) === "company"
    ? children
    : <Navigate to="/" replace />;
}

function CandidateRoute({ children }) {
  const token = localStorage.getItem("access");
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/signin" replace />;
  }

  return normalizeRole(user.role) === "candidate"
    ? children
    : <Navigate to="/" replace />;
}

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
        <Route path="/profile" element={<ProfileRouter />} />
        <Route path="/candidate/jobs" element={<CandidateRoute><CandidateJobsPage /></CandidateRoute>} />
        <Route path="/candidate/applied-jobs" element={<CandidateRoute><AppliedJobsPage /></CandidateRoute>} />
        <Route path="/apply/:jobId" element={<CandidateRoute><ApplyJobPage /></CandidateRoute>} />
        <Route path="/dashboard" element={<CompanyRoute><CompanyDashboard /></CompanyRoute>} />
        <Route path="/dashboard/post-job" element={<CompanyRoute><PostJobPage /></CompanyRoute>} />
        <Route path="/dashboard/manage-jobs" element={<CompanyRoute><ManageJobsPage /></CompanyRoute>} />
        <Route path="/dashboard/applications" element={<CompanyRoute><ApplicationsPage /></CompanyRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
