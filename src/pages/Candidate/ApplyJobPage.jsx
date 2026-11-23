import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import Layout from "../../components/Layout";
import candidateService from "../../services/candidateService";

function ApplyJobPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleApply = async () => {
    setError("");
    setLoading(true);

    try {
      await candidateService.applyToJob(jobId);
      setSubmitted(true);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Unable to submit your application."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Apply for Job
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {submitted ? (
            <>
              <Alert severity="success" sx={{ mb: 2 }}>
                Your application was submitted.
              </Alert>
              <Button onClick={() => navigate("/candidate/applied-jobs")}>
                View Applied Jobs
              </Button>
            </>
          ) : (
            <>
              <Typography color="text.secondary" mb={3}>
                Confirm that you want to apply for this job.
              </Typography>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  onClick={handleApply}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Confirm Application"}
                </Button>
                <Button onClick={() => navigate("/candidate/jobs")}>
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Layout>
  );
}

export default ApplyJobPage;
