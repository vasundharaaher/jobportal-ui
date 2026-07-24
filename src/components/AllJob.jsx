import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  AccessTime,
  AttachMoney,
  Business,
  FavoriteBorder,
  LocationOn,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import api from "../services/api";

function AllJob() {
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
    <>
      {/* Hero Section */}
      {/* <Box
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
      </Box> */}

      {/* Jobs */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          mb={5}
        >
          Job Listing
        </Typography>

        {jobs.map((job) => (
          <Card
            key={job.id}
            sx={{
              mb: 3,
              borderRadius: 3,
              transition: ".3s",
              "&:hover": {
                boxShadow: 8,
                transform: "translateY(-4px)",
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
                      <Typography variant="h6" fontWeight="bold">
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
                    <Button variant="outlined">
                      <FavoriteBorder />
                    </Button>

                    <Button
                      component={Link}
                      to={`/apply/${job.id}`}
                      variant="contained"
                      sx={{
                        bgcolor: "#2aba79",
                        "&:hover": {
                          bgcolor: "#239a64",
                        },
                      }}
                    >
                      Apply Now
                    </Button>
                  </Stack>

                  <Typography color="text.secondary">
                    Deadline: 01 Jan 2045
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default AllJob;