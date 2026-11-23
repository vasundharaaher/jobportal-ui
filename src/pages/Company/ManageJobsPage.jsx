import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Chip,
} from "@mui/material";
import { Work as WorkIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import companyService from "../../services/companyService";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const ManageJobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const postedJobs = await companyService.getJobs();
        setJobs(postedJobs);
      } catch (error) {
        console.error("Failed to load posted jobs", error);
      } finally {
        setJobsLoading(false);
      }
    };
    fetchPostedJobs();
  }, []);

  return (
    <Layout>
      <Box sx={{ bgcolor: "#0F172A", color: "#fff", py: 4, textAlign: "center", mb: 5 }}>
        <Container>
          <Typography variant="h4" fontWeight="bold">Manage Your Posted Jobs</Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate("/dashboard")}
          sx={{ mb: 3 }}
        >
          Back to Dashboard
        </Button>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          {jobsLoading ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress color="primary" />
            </Box>
          ) : jobs.length === 0 ? (
            <Alert severity="info">You haven't posted any jobs yet.</Alert>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Logo</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Job Title</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Salary</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Experience</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id} hover>
                      <TableCell>
                        <Avatar
                          src={job.logo ? `http://127.0.0.1:8000${job.logo}` : ""}
                          variant="rounded"
                          sx={{ width: 45, height: 45 }}
                        >
                          <WorkIcon />
                        </Avatar>
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#111" }}>{job.jobname}</TableCell>
                      <TableCell>{job.jobcategory}</TableCell>
                      <TableCell>
                        <Chip
                          label={job.job_type}
                          size="small"
                          color={job.job_type === "Full Time" ? "primary" : "secondary"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{job.salarypackage || "N/A"}</TableCell>
                      <TableCell>{job.location || "N/A"}</TableCell>
                      <TableCell>{job.experience} Yrs</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

export default ManageJobsPage;
