import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Divider,
  Avatar,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import companyService from "../../services/companyService";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const PostJobPage = () => {
  const navigate = useNavigate();
  const [profileLoading, setProfileLoading] = useState(true);
  
  const [jobFormData, setJobFormData] = useState({
    jobname: "",
    companyname: "",
    companyaddress: "",
    jobdescription: "",
    qualification: "",
    responsibilties: "",
    location: "",
    companywebsite: "",
    companyemail: "",
    companycontact: "",
    salarypackage: "",
    experience: "",
    job_type: "Full Time",
    jobcategory: "IT & Software",
    logo: null,
  });
  
  const [logoPreview, setLogoPreview] = useState(null);
  const [postMsg, setPostMsg] = useState({ type: "", text: "" });
  const [postLoading, setPostLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const data = await companyService.getProfile();
        setJobFormData((prev) => ({
          ...prev,
          companyname: data.company_name || "",
          companyaddress: data.address || "",
          companywebsite: data.website || "",
          companyemail: data.email || "",
          companycontact: data.contact || "",
        }));
      } catch (error) {
        console.error("Failed to load company profile", error);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchCompanyProfile();
  }, []);

  const handleJobFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setJobFormData({ ...jobFormData, logo: files[0] });
      if (files[0]) {
        setLogoPreview(URL.createObjectURL(files[0]));
      }
    } else {
      setJobFormData({ ...jobFormData, [name]: value });
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setPostMsg({ type: "", text: "" });
    setPostLoading(true);

    const data = new FormData();
    Object.keys(jobFormData).forEach((key) => {
      if (jobFormData[key] !== null && jobFormData[key] !== undefined) {
        if (key === "logo" && !jobFormData[key]) return;
        data.append(key, jobFormData[key]);
      }
    });

    try {
      const response = await companyService.postJob(data);
      if (response.data.success) {
        setPostMsg({ type: "success", text: "Job posted successfully!" });
        setJobFormData((prev) => ({
          ...prev,
          jobname: "",
          jobdescription: "",
          qualification: "",
          responsibilties: "",
          location: "",
          salarypackage: "",
          experience: "",
          logo: null,
        }));
        setLogoPreview(null);
      } else {
        setPostMsg({ type: "error", text: response.data.message || "Failed to post job." });
      }
    } catch (error) {
      console.error(error);
      setPostMsg({
        type: "error",
        text: error.response?.data?.message || "Error posting job. Please check all fields.",
      });
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <Layout>
      <Box sx={{ bgcolor: "#0F172A", color: "#fff", py: 4, textAlign: "center", mb: 5 }}>
        <Container>
          <Typography variant="h4" fontWeight="bold">Post a New Job</Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pb: 8 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate("/dashboard")}
          sx={{ mb: 3 }}
        >
          Back to Dashboard
        </Button>

        {profileLoading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            {postMsg.text && (
              <Alert severity={postMsg.type} sx={{ mb: 3 }}>
                {postMsg.text}
              </Alert>
            )}

            <Box component="form" onSubmit={handleJobSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Job Title"
                    name="jobname"
                    value={jobFormData.jobname}
                    onChange={handleJobFormChange}
                    placeholder="e.g. Senior React Developer"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Job Category</InputLabel>
                    <Select
                      name="jobcategory"
                      value={jobFormData.jobcategory}
                      label="Job Category"
                      onChange={handleJobFormChange}
                    >
                      <MenuItem value="IT & Software">IT & Software</MenuItem>
                      <MenuItem value="Marketing">Marketing</MenuItem>
                      <MenuItem value="Finance & Accounting">Finance & Accounting</MenuItem>
                      <MenuItem value="Sales & Business Development">Sales & Business Development</MenuItem>
                      <MenuItem value="Human Resources">Human Resources</MenuItem>
                      <MenuItem value="Engineering & Design">Engineering & Design</MenuItem>
                      <MenuItem value="Healthcare">Healthcare</MenuItem>
                      <MenuItem value="Education">Education</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Job Type</InputLabel>
                    <Select
                      name="job_type"
                      value={jobFormData.job_type}
                      label="Job Type"
                      onChange={handleJobFormChange}
                    >
                      <MenuItem value="Full Time">Full Time</MenuItem>
                      <MenuItem value="Part Time">Part Time</MenuItem>
                      <MenuItem value="Remote">Remote</MenuItem>
                      <MenuItem value="Internship">Internship</MenuItem>
                      <MenuItem value="Contract">Contract</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Job Location"
                    name="location"
                    value={jobFormData.location}
                    onChange={handleJobFormChange}
                    placeholder="e.g. Pune, Maharashtra / Remote"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Salary Package"
                    name="salarypackage"
                    value={jobFormData.salarypackage}
                    onChange={handleJobFormChange}
                    placeholder="e.g. ₹6,00,000 - ₹9,00,000 P.A."
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Experience Required (Years)"
                    name="experience"
                    value={jobFormData.experience}
                    onChange={handleJobFormChange}
                    placeholder="e.g. 2"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>Company Details</Divider>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Company Name"
                    name="companyname"
                    value={jobFormData.companyname}
                    onChange={handleJobFormChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company Website"
                    name="companywebsite"
                    value={jobFormData.companywebsite}
                    onChange={handleJobFormChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Company Email"
                    name="companyemail"
                    value={jobFormData.companyemail}
                    onChange={handleJobFormChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company Contact"
                    name="companycontact"
                    value={jobFormData.companycontact}
                    onChange={handleJobFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Company Address"
                    name="companyaddress"
                    value={jobFormData.companyaddress}
                    onChange={handleJobFormChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>Job Descriptions</Divider>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={4}
                    label="Job Description"
                    name="jobdescription"
                    value={jobFormData.jobdescription}
                    onChange={handleJobFormChange}
                    placeholder="Provide a comprehensive job description..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={3}
                    label="Qualifications"
                    name="qualification"
                    value={jobFormData.qualification}
                    onChange={handleJobFormChange}
                    placeholder="e.g. B.E. / B.Tech in Computer Science, MCA..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Responsibilities"
                    name="responsibilties"
                    value={jobFormData.responsibilties}
                    onChange={handleJobFormChange}
                    placeholder="List the key responsibilities..."
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Job/Company Logo Upload
                  </Typography>
                  <Box display="flex" alignItems="center" gap={3}>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<CloudUploadIcon />}
                      sx={{ textTransform: "none" }}
                    >
                      Choose File
                      <input
                        type="file"
                        hidden
                        name="logo"
                        accept="image/*"
                        onChange={handleJobFormChange}
                      />
                    </Button>
                    {logoPreview && (
                      <Avatar
                        src={logoPreview}
                        variant="rounded"
                        sx={{ width: 60, height: 60, border: "1px solid #ddd" }}
                      />
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={postLoading}
                    sx={{
                      bgcolor: "#2aba79",
                      px: 5,
                      py: 1.5,
                      fontWeight: "bold",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#239a64",
                      },
                    }}
                  >
                    {postLoading ? <CircularProgress size={24} color="inherit" /> : "Publish Job"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        )}
      </Container>
    </Layout>
  );
};

export default PostJobPage;
