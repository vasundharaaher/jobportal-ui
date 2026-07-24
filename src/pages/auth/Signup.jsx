import { useState } from "react";
// import "./Signup.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
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
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    role: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

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
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.role) {
      newErrors.role = "Please select a role.";
    }

    if (!formData.fname.trim()) {
      newErrors.fname = "First name is required.";
    }

    if (!formData.lname.trim()) {
      newErrors.lname = "Last name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address.";
    }


    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    if (!formData.cpassword) {
      newErrors.cpassword = "Confirm password is required.";
    } else if (formData.password !== formData.cpassword) {
      newErrors.cpassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!validate()) return;

    try {
      const response = await api.post("/register/", formData);

      if (response.data.success) {
        navigate("/verify-otp", {
          state: {
            email: response.data.email,
          },
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed.");
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
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              mb={3}
            >
              Signup
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>

              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.role}
              >
                <InputLabel>Select Role</InputLabel>

                <Select
                  name="role"
                  value={formData.role}
                  label="Select Role"
                  onChange={handleChange}
                >
                  <MenuItem value="Candidate">Candidate</MenuItem>
                  <MenuItem value="Company">Company</MenuItem>
                </Select>

                <Typography
                  variant="caption"
                  color="error"
                  sx={{ ml: 2, mt: 0.5 }}
                >
                  {errors.role}
                </Typography>
              </FormControl>

              <TextField
                fullWidth
                margin="normal"
                label="First Name"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                error={!!errors.fname}
                helperText={errors.fname}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Last Name"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                error={!!errors.lname}
                helperText={errors.lname}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Confirm Password"
                type="password"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                error={!!errors.cpassword}
                helperText={errors.cpassword}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                sx={{ mt: 3, py: 1.5, backgroundColor: "#2aba79ff", color: "#ffffff" }}
              >
                Register
              </Button>

            </Box>

            <Typography
              align="center"
              sx={{ mt: 3 }}
            >
              Already have an account?{" "}
              <Link
                to="/signin"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontWeight: 600,
                }}
              >
                Login
              </Link>
            </Typography>

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Signup;