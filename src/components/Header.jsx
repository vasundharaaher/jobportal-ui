import { Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
} from "@mui/material";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const handleLogout = async () => {
    try {
        await api.post("/logout/", {
            refresh: localStorage.getItem("refresh"),
        });

    } catch (err) {
        console.log(err);
    } finally {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        navigate("/signin");
    }
};
const isLoggedIn = !!localStorage.getItem("access");

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

                    <Button href="#about" color="inherit">
                        About
                    </Button>

                    <Button component={Link} to="/joblist" color="inherit">
                        Jobs
                    </Button>

                    <Button component={Link} to="/contactus" color="inherit">
                        Contact
                    </Button>

                   {isLoggedIn ? (
                        <>
                            <Button component={Link} to="/profile">
                                Profile
                            </Button>

                            <Button onClick={handleLogout}>
                                Logout
                            </Button>
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