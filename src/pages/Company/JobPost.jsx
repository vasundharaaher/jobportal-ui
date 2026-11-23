import { useState } from "react";
import { Container, Typography } from "@mui/material";
import Layout from "../../components/Layout";
import PostForm from "../../components/PostForm";

function JobPost() {

    // Job Post Form State
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

    // Job Posted State
    const [jobs, setJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(false);


    return (
        <Layout>
            <Container maxWidth="md" sx={{ py: 5 }}>
                <Typography
                    variant="h4"
                    align="center"
                    fontWeight="bold"
                    mb={4}
                >
                    Post a New Job Opening
                </Typography>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom mb={3}>
                        Post a New Job Opening
                    </Typography>

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
                <PostForm />
            </Container>
        </Layout>
    );
}

export default JobPost;