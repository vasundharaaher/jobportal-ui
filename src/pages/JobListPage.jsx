import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import AllJob from "../components/AllJob";
import Layout from "../components/Layout";

function JobListPage() {
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
            Job List
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Home / Pages / Job List
          </Typography>
        </Container>
      </Box>

      <AllJob />
        
    
    </Layout>
  );
}

export default JobListPage;