import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import api from "../services/api";
import AllJob from "../components/AllJob";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";

function JobListPage() {
    const [jobs, setJobs] = useState([]);
    const fetchJobs = async () => {
        try {
        const res = await api.get("/jobs/");
        setJobs(res.data);
        } catch (err) {
        console.log(err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

 

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