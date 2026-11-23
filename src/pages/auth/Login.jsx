import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        role: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
        const response = await authService.login(formData);

        if (response.data.success) {
            const { access, refresh } = response.data.tokens || response.data;
            if (
                typeof access !== "string" ||
                !access.trim() ||
                access === "undefined" ||
                typeof refresh !== "string" ||
                !refresh.trim() ||
                refresh === "undefined"
            ) {
                throw new Error(
                    "Login response did not include valid access and refresh tokens."
                );
            }

            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);
            const user =
                response.data.user && typeof response.data.user === "object"
                    ? response.data.user
                    : {
                        id: response.data.user_id,
                        email: response.data.email,
                    };
            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...user,
                    role: user.role || response.data.role || formData.role,
                })
            );

            // Redirect to Home page
            navigate("/");
        } else {
            throw new Error(response.data.message || "Login failed.");
        }
    } catch (error) {
        setError(
            error.response?.data?.message ||
                error.response?.data?.detail ||
                error.message ||
                "Invalid email or password."
        );
    }
};

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Card elevation={5} sx={{ width: "100%", borderRadius: 3 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography
                            variant="h3"
                            align="center"
                            sx={{
                                fontWeight: "bold",
                                color: "#3ae2b3",
                                mb: 1,
                            }}
                        >
                            SkillScouter
                        </Typography>

                        <Typography
                            variant="h5"
                            align="center"
                            gutterBottom
                        >
                            Login
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Select Role</InputLabel>

                                <Select
                                    name="role"
                                    value={formData.role}
                                    label="Select Role"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Candidate">
                                        Candidate
                                    </MenuItem>

                                    <MenuItem value="Company">
                                        Company
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                type="submit"
                                sx={{ mt: 3, py: 1.5, backgroundColor: "#2aba79ff", color: "#ffffff" }}
                            >
                                Login
                            </Button>
                        </Box>

                        <Typography align="center" sx={{ mt: 3 }}>
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                style={{
                                    textDecoration: "none",
                                    color: "#1976d2",
                                    fontWeight: 600,
                                }}
                            >
                                Register
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default Login;