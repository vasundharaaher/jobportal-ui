import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Menu,
    MenuItem,
} from "@mui/material";
import { getStoredUser, normalizeRole } from "../services/authSession";

// Helper to decode JWT payload without any library
function parseJwt(token) {
    try {
        const base64Payload = token.split(".")[1];
        const payload = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(payload);
    } catch {
        return null;
    }
}

function Header() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [companyAnchorEl, setCompanyAnchorEl] = useState(null);
    const [candidateAnchorEl, setCandidateAnchorEl] = useState(null);
    useLocation();
    const token = localStorage.getItem("access");
    const tokenUser = token ? parseJwt(token) : null;
    const user = getStoredUser() || tokenUser;
    const role = normalizeRole(user?.role || tokenUser?.role);
    const isCompany = role === "company";
    const isCandidate = role === "candidate";

    const isLoggedIn = Boolean(token);
    const username = user?.firstname
        ? `${user.firstname} ${user.lastname}`
        : user?.email || "Account";

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleCompanyMenuOpen = (event) =>
        setCompanyAnchorEl(event.currentTarget);
    const handleCompanyMenuClose = () => setCompanyAnchorEl(null);
    const handleCandidateMenuOpen = (event) =>
        setCandidateAnchorEl(event.currentTarget);
    const handleCandidateMenuClose = () => setCandidateAnchorEl(null);

    const handleLogout = () => {
        handleMenuClose();
        handleCompanyMenuClose();
        handleCandidateMenuClose();
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        navigate("/signin");
    };

    return (
        <AppBar
            position="sticky"
            elevation={1}
            sx={{
                backgroundColor: "#fff",
                color: "#000",
            }}
        >
            <Toolbar>

                <Typography
                    variant="h5"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 700,
                        color: "#3ae296",
                    }}
                >
                    SkillScouter
                </Typography>

                <Box>

                    <Button component={Link} to="/" color="inherit">
                        Home
                    </Button>

                    <Button component={Link} to="/#about" color="inherit">
                        About
                    </Button>
{/* 
                    <Button
                        component={Link}
                        to={isCandidate ? "/candidate/jobs" : "/joblist"}
                        color="inherit"
                    >
                        Jobs
                    </Button> */}

                    <Button component={Link} to="/contactus" color="inherit">
                        Contact
                    </Button>

                    {isLoggedIn && isCompany && (
                        <>
                            <Button
                                onClick={handleCompanyMenuOpen}
                                color="inherit"
                            >
                                Jobs
                            </Button>
                            <Menu
                                anchorEl={companyAnchorEl}
                                open={Boolean(companyAnchorEl)}
                                onClose={handleCompanyMenuClose}
                            >
                                <MenuItem
                                    component={Link}
                                    to="/dashboard"
                                    onClick={handleCompanyMenuClose}
                                >
                                    Dashboard
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/dashboard/post-job"
                                    onClick={handleCompanyMenuClose}
                                >
                                    Post a Job
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/dashboard/manage-jobs"
                                    onClick={handleCompanyMenuClose}
                                >
                                    Manage Jobs
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/dashboard/applications"
                                    onClick={handleCompanyMenuClose}
                                >
                                    Applicants
                                </MenuItem>
                                {/* <MenuItem
                                    component={Link}
                                    to="/profile"
                                    onClick={handleCompanyMenuClose}
                                >
                                    Company Profile
                                </MenuItem> */}
                            </Menu>
                        </>
                    )}

                    {isLoggedIn && isCandidate && (
                        <>
                            <Button
                                onClick={handleCandidateMenuOpen}
                                color="inherit"
                            >
                                Candidate
                            </Button>
                            <Menu
                                anchorEl={candidateAnchorEl}
                                open={Boolean(candidateAnchorEl)}
                                onClose={handleCandidateMenuClose}
                            >
                                <MenuItem
                                    component={Link}
                                    to="/candidate/jobs"
                                    onClick={handleCandidateMenuClose}
                                >
                                    Browse Jobs
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/candidate/applied-jobs"
                                    onClick={handleCandidateMenuClose}
                                >
                                    Applied Jobs
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/profile"
                                    onClick={handleCandidateMenuClose}
                                >
                                    Candidate Profile
                                </MenuItem>
                            </Menu>
                        </>
                    )}

                    {isLoggedIn ? (
                        <>
                            <Button onClick={handleMenuOpen} sx={{ fontWeight: 'bold', textTransform: 'capitalize', color: "primary.main", }}>
                                {username}
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    sx: {
                                        mt: 1.5,
                                        width: "auto", // Increase menu width
                                    },
                                }}

                            >
                                <MenuItem component={Link} to="/profile" onClick={handleMenuClose} >
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button component={Link} to="/signin">
                            Login
                        </Button>
                    )}

                </Box>

            </Toolbar>
        </AppBar>
    );
}

export default Header;