import { Navigate } from "react-router-dom";
import CandidateProfile from "./Candidate/CandidateProfile";
import CompanyProfile from "./Company/CompanyProfile";
import { getStoredUser, normalizeRole } from "../services/authSession";

const ProfileRouter = () => {
    const user = getStoredUser();

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    const role = normalizeRole(user.role);
    if (role === "candidate") {
        return <CandidateProfile />;
    } else if (role === "company") {
        return <CompanyProfile />;
    }

    // Default fallback
    return <Navigate to="/" replace />;
};

export default ProfileRouter;
