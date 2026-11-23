import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import candidateService from "../../services/candidateService";

function AppliedJobsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchAppliedJobs = async () => {
      try {
        const appliedJobs = await candidateService.getAppliedJobs();
        if (isMounted) {
          setApplications(appliedJobs);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Unable to load applied jobs."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAppliedJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Applied Jobs
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : applications.length === 0 ? (
          <Alert severity="info">You have not applied to any jobs yet.</Alert>
        ) : (
          applications.map((application, index) => {
            const job =
              application.job && typeof application.job === "object"
                ? application.job
                : application;

            return (
              <Card key={application.id ?? index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {job.jobname || application.job_name || "Job"}
                  </Typography>
                  <Typography color="text.secondary">
                    {job.companyname || application.company_name || ""}
                  </Typography>
                  {application.status && (
                    <Typography sx={{ mt: 1 }}>
                      Status: {application.status}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}

        <Button component={Link} to="/candidate/jobs" sx={{ mt: 2 }}>
          Browse Jobs
        </Button>
      </Container>
    </Layout>
  );
}

export default AppliedJobsPage;
