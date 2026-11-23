import { Box, Container, Typography } from "@mui/material";
import Layout from "../../components/Layout";
import AllJob from "../../components/AllJob";

function CandidateJobsPage() {
  return (
    <Layout>
      <Box
        sx={{
          bgcolor: "#0F172A",
          color: "#fff",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold">
            Jobs for You
          </Typography>
        </Container>
      </Box>
      <AllJob audience="candidate" />
    </Layout>
  );
}

export default CandidateJobsPage;
