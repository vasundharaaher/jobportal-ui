import { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import candidateService from "../../services/candidateService";
import Layout from "../../components/Layout";

const CandidateProfile = () => {
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
    state: "",
    city: "",
    address: "",
    dob: "",
    gender: "",
    min_salary: "",
    max_salary: "",
    job_type: "",
    jobcategory: "",
    country: "",
    highesedu: "",
    experience: "",
    website: "",
    shift: "",
    profile_pic: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await candidateService.getProfile();
        setFormData((prev) => ({
          ...prev,
          ...data,
          profile_pic: null,
        }));
        if (data.profile_pic) {
          setPreview(`http://127.0.0.1:8000/${data.profile_pic}`);
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile_pic") {
      setFormData({
        ...formData,
        profile_pic: files[0],
      });

      if (files[0]) {
        setPreview(URL.createObjectURL(files[0]));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        // If it's a file but we didn't upload a new one (it's null), skip it
        if (key === "profile_pic" && !formData[key]) return;
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await candidateService.updateProfile(data);
      if (response.data.success) {
        setMsg({ type: "success", text: response.data.message });
      } else {
        setMsg({ type: "error", text: response.data.message || "Failed to update" });
      }
    } catch (error) {
      console.error(error);
      setMsg({ type: "error", text: "Error updating profile" });
    }
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper elevation={4} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            mb={4}
          >
            Candidate Profile
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  select
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Minimum Salary"
                  name="min_salary"
                  type="number"
                  value={formData.min_salary}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Maximum Salary"
                  name="max_salary"
                  type="number"
                  value={formData.max_salary}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  select
                  fullWidth
                  label="Job Type"
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleChange}
                >
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                  <MenuItem value="Freelance">Freelance</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                </TextField>
              </Grid>

              <Grid size={12}>
                <TextField
                  select
                  fullWidth
                  label="Job Category"
                  name="jobcategory"
                  value={formData.jobcategory}
                  onChange={handleChange}
                >
                  <MenuItem value="CustomerService">
                    Customer Service
                  </MenuItem>

                  <MenuItem value="BusinessDevelopment">
                    Business Development
                  </MenuItem>

                  <MenuItem value="Marketing">
                    Marketing
                  </MenuItem>

                  <MenuItem value="SalesCommunication">
                    Sales & Communication
                  </MenuItem>

                  <MenuItem value="ProjectManagement">
                    Project Management
                  </MenuItem>

                  <MenuItem value="HumanResources">
                    Human Resources
                  </MenuItem>

                  <MenuItem value="TeachingEducation">
                    Teaching & Education
                  </MenuItem>

                  <MenuItem value="DesignCreative">
                    Design & Creative
                  </MenuItem>
                </TextField>
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Highest Education"
                  name="highesedu"
                  value={formData.highesedu}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Shift"
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <Button
                  variant="outlined"
                  component="label"
                >
                  Upload Profile Picture

                  <input
                    hidden
                    type="file"
                    name="profile_pic"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Button>

                {preview && (
                  <Box sx={{ mt: 2 }}>
                    <img
                      src={preview}
                      alt="Preview"
                      width={150}
                      style={{
                        borderRadius: 10,
                      }}
                    />
                  </Box>
                )}
              </Grid>

              {msg.text && (
                <Alert severity={msg.type} sx={{ mb: 3 }}>
                  {msg.text}
                </Alert>
              )}

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                  }}
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default CandidateProfile;