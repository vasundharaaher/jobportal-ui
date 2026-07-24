import {
  Box,
  Button,
  Card,
  CardContent,

  Container,
  Grid,
  Stack,
  Typography,
  Tabs, 
  Tab, 
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  LocationOn,
  AccessTime,
  Business,
  AttachMoney,
  FavoriteBorder,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import api from "../services/api"; //


function JobList() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const response = await api.get("/index/");
      setJobs(response.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

    fetchJobs();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        Job Listing
      </Typography>

     <Tabs
        value={0}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 5 }}
      >
        <Tab label="Featured Jobs" />
        <Tab label="Full Time" />
        <Tab label="Part Time" />
      </Tabs>

      {jobs.map((job) => (
        <Card
          key={job.id}
          elevation={3}
          sx={{
            mb: 3,
            borderRadius: 3,
            transition: ".3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 6,
            },
          }}
        >
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              {/* Left */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Stack direction="row" spacing={3}>
                  <Box
                    component="img"
                    src={job.logo}
                    alt={job.companyname}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      objectFit: "cover",
                      border: "1px solid #ddd",
                    }}
                  />

                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {job.jobname}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={2}
                      flexWrap="wrap"
                      mt={2}
                    >
                      <Stack direction="row" spacing={0.5}>
                        <LocationOn color="primary" fontSize="small" />
                        <Typography>{job.location}</Typography>
                      </Stack>

                      <Stack direction="row" spacing={0.5}>
                        <AccessTime color="primary" fontSize="small" />
                        <Typography>{job.job_type}</Typography>
                      </Stack>

                      <Stack direction="row" spacing={0.5}>
                        <Business color="primary" fontSize="small" />
                        <Typography>{job.companyname}</Typography>
                      </Stack>

                      <Stack direction="row" spacing={0.5}>
                        <AttachMoney color="primary" fontSize="small" />
                        <Typography>{job.salarypackage}</Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Grid>

              {/* Right */}
              <Grid
                size={{ xs: 12, md: 4 }}
                sx={{
                  textAlign: {
                    xs: "left",
                    md: "right",
                  },
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={{
                    xs: "flex-start",
                    md: "flex-end",
                  }}
                  mb={2}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                  >
                    <FavoriteBorder />
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      background: "#2aba79",
                      "&:hover": {
                        background: "#239a64",
                      },
                    }}
                  >
                    Apply Now
                  </Button>
                </Stack>

                <Typography color="text.secondary">
                  Deadline: {job.deadline}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Box sx={{textAlign:"center", mt:5}}>
        <Button
          component={Link}
          to="/joblist"
          variant="contained"
          size="large"
          sx={{
            background: "#2aba79",
            px: 5,
            "&:hover": {
              background: "#239a64",
            },
          }}
        >
          Browse More Jobs
        </Button>
      </Box>
    </Container>
  );
}

export default JobList;