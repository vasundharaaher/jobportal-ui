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
  Stack,
  Chip,
} from "@mui/material";
import { Launch as LaunchIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import companyService from "../../services/companyService";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const ApplicationsPage = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [appsLoading, setAppsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchApplications = async () => {
      try {
        const applicants = await companyService.getApplicants();
        if (isMounted) {
          setApplications(applicants);
        }
      } catch (error) {
        console.error("Failed to load applicants", error);
      } finally {
        if (isMounted) {
          setAppsLoading(false);
        }
      }
    };

    fetchApplications();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Layout>
      <Box sx={{ bgcolor: "#0F172A", color: "#fff", py: 4, textAlign: "center", mb: 5 }}>
        <Container>
          <Typography variant="h4" fontWeight="bold">Incoming Candidate Applications</Typography>
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
          {appsLoading ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress color="primary" />
            </Box>
          ) : applications.length === 0 ? (
            <Alert severity="info">No applications received yet.</Alert>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Job Position</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Candidate</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Education</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Experience</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Gender/Shift</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Expectations</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Resume</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id} hover>
                      <TableCell sx={{ fontWeight: "bold" }}>{app.job_name}</TableCell>
                      <TableCell>
                        <Stack>
                          <Typography variant="body2" fontWeight="medium">
                            {app.candidate_name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {app.candidate_email}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {app.candidate_contact}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{app.education}</TableCell>
                      <TableCell>{app.experience} Yrs</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          <Chip label={app.gender} size="small" variant="outlined" />
                          <Chip label={app.shift} size="small" color="info" variant="outlined" />
                        </Stack>
                      </TableCell>
                      <TableCell>₹{app.expectations.toLocaleString()}</TableCell>
                      <TableCell>
                        {app.resume ? (
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<LaunchIcon />}
                            href={`http://127.0.0.1:8000${app.resume}`}
                            target="_blank"
                            sx={{
                              textTransform: "none",
                              bgcolor: "#2aba79",
                              "&:hover": {
                                bgcolor: "#239a64",
                              },
                            }}
                          >
                            View Resume
                          </Button>
                        ) : (
                          <Typography variant="caption" color="error">
                            No Upload
                          </Typography>
                        )}
                      </TableCell>
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

export default ApplicationsPage;
