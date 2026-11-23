
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
// import "./VerifyOTP.css";
import { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import TextField from '@mui/material/TextField'

function VerifyOTP() {


    const location = useLocation();
    const email = location.state?.email;

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        otp: "",
    });

    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");




    const validate = () => {
        const newErrors = {};

        if (!formData.otp.trim()) {
            newErrors.otp = "OTP is required.";
        } else if (!/^\d{6}$/.test(formData.otp)) {
            newErrors.otp = "OTP must be exactly 6 digits.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await authService.verifyOtp({
                email,
                otp: formData.otp,
            });

            navigate("/signin");

        } catch (error) {
            setError(error.response?.data?.message || "Invalid OTP.");
        }
    };

    return (
        <Container maxWidth="sm" >
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
            >
                <Card sx={{ width: "100%", p: 2 }}>
                    <CardContent>

                        <Box sx={{ marginBottom: 3, }}>

                            <EmailOutlinedIcon color="error" sx={{ fontSize: 70 }} />

                            <Typography
                                variant="h4"
                                align="center"
                                fontWeight="bold"
                                mb={3}
                                sx={{
                                    fontWeight: 700,
                                    color: "#3ae296ff",
                                    letterSpacing: 1,
                                    mb: 3,
                                }}
                            >
                                SkillScouter
                            </Typography>

                            <Typography variant="h5" >
                                Verify OTP
                            </Typography>

                            <Typography color="text.secondary" >
                                We sent an OTP to
                            </Typography>

                            <Typography sx={{
                                fontWeight: 700,
                                color: "#3ae296ff",
                                letterSpacing: 1,
                                mb: 3,
                            }}>
                                {email}
                            </Typography>

                            {error && (
                                <Typography
                                    color="error"
                                    align="center"
                                    sx={{ mb: 2 }}
                                >
                                    {error}
                                </Typography>
                            )}
                        </Box>

                        <Box component="form" onSubmit={handleSubmit}>

                            <TextField
                                fullWidth
                                label="Enter OTP"
                                name="otp"
                                value={formData.otp}
                                onChange={handleChange}
                                error={!!errors.otp}
                                helperText={errors.otp}
                                inputProps={{ maxLength: 6 }}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                type="submit"
                                sx={{ mt: 3, py: 1.5, backgroundColor: "#2aba79ff", color: "#ffffff" }}
                            >
                                Verify OTP
                            </Button>

                        </Box>

                        <Typography align="center" mt={2}>
                            Didn't receive the OTP?
                        </Typography>

                        <Box sx={{ textAlign: "center" }}>
                            <Button variant="text">
                                Resend OTP
                            </Button>
                        </Box>

                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default VerifyOTP;