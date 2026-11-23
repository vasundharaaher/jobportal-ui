import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Avatar,
  List,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  PostAdd as PostAddIcon,
  Work as WorkIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import companyService from "../../services/companyService";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const CompanyDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({ jobs_count: 0, applications_count: 0 });
  const [statsLoading, setStatsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        const [postedJobs, applicants] = await Promise.all([
          companyService.getJobs(),
          companyService.getApplicants(),
        ]);
        if (isMounted) {
          setJobs(postedJobs);
          setStats({
            jobs_count: postedJobs.length,
            applications_count: applicants.length,
          });
        }
      } catch (error) {
        console.error("Failed to load company dashboard data", error);
      } finally {
        if (isMounted) {
          setStatsLoading(false);
          setJobsLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const statCards = [
    {
      label: "Jobs Posted",
      value: stats.jobs_count,
      color: "#3ae296",
      bgColor: "rgba(58, 226, 150, 0.15)",
      icon: <WorkIcon fontSize="large" />,
    },
    {
      label: "Applications Received",
      value: stats.applications_count,
      color: "#38bdf8",
      bgColor: "rgba(56, 189, 248, 0.15)",
      icon: <PeopleIcon fontSize="large" />,
    },
  ];

  return (
    <Layout>
      {/* Header Banner */}
      <Box
        sx={{
          bgcolor: "#0F172A",
          color: "#fff",
          py: 4,
          textAlign: "center",
          mb: 3,
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold">
            Company Dashboard
          </Typography>
          <Typography sx={{ mt: 1, color: "#94A3B8" }}>
            Overview of your jobs and applicants
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 8, justifyContent: "center" }}>
        {/* Dashboard Cards Grid */}

        <Grid
          container
          spacing={4}
          mb={5}
          justifyContent="center"
          alignItems="stretch"
          sx={{ mx: "auto" }}
        >
          {statCards.map((card) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={card.label}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: 350,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 4,
                  boxShadow: 6,
                  background:
                    "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                  color: "#fff",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 4, width: "100%" }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                  >
                    <Box mb={2}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "#94a3b8",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: 1
                        }}
                      >
                        {card.label}
                      </Typography>

                      {statsLoading ? (
                        <CircularProgress
                          size={24}
                          sx={{ color: card.color, mt: 2 }}
                        />
                      ) : (
                        <Typography
                          variant="h2"
                          sx={{
                            fontWeight: "bold",
                            mt: 1,
                            color: card.color,
                          }}
                        >
                          {card.value}
                        </Typography>
                      )}
                    </Box>

                    <Avatar
                      sx={{
                        bgcolor: card.bgColor,
                        color: card.color,
                        width: 64,
                        height: 64,
                        mt: 1,
                      }}
                    >
                      {card.icon}
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions and Recent Postings */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 5 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom mb={2}>
            Quick Actions
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
          >
            <Button
              fullWidth
              variant="contained"
              startIcon={<PostAddIcon />}
              onClick={() => navigate("/dashboard/post-job")}
              sx={{
                flex: 1,
                bgcolor: "#2aba79",
                py: 2,
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": { bgcolor: "#239a64" },
              }}
            >
              Post Job
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<WorkIcon />}
              onClick={() => navigate("/dashboard/manage-jobs")}
              sx={{
                flex: 1,
                py: 2,
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Manage Jobs
            </Button>

            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              startIcon={<PeopleIcon />}
              onClick={() => navigate("/dashboard/applications")}
              sx={{
                flex: 1,
                py: 2,
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Applications
            </Button>
          </Stack>
        </Paper>

        <Paper elevation={3} sx={{ mt: 5, p: 3, borderRadius: 3 }}>
          {/* Recent Jobs */}
          <Grid item xs={12} md={7}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Recent Job Listings
            </Typography>

            {jobsLoading ? (
              <Box display="flex" justifyContent="center" py={3}>
                <CircularProgress size={24} />
              </Box>
            ) : jobs.length === 0 ? (
              <Typography color="text.secondary">
                No job postings found.
              </Typography>
            ) : (
              <List sx={{ p: 0 }}>
                {jobs.slice(0, 3).map((job) => (
                  <Box key={job.id}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      py={1}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          src={job.logo ? `http://127.0.0.1:8000${job.logo}` : ""}
                          variant="rounded"
                          sx={{ width: 40, height: 40 }}
                        />
                        <Box>
                          <Typography fontWeight="bold">
                            {job.jobname}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {job.jobcategory} • {job.job_type}
                          </Typography>
                        </Box>
                      </Box>

                      <Button
                        size="small"
                        onClick={() => navigate("/dashboard/manage-jobs")}
                      >
                        Manage
                      </Button>
                    </Box>

                    <Divider />
                  </Box>
                ))}
              </List>
            )}
          </Grid>

        </Paper>
      </Container>
    </Layout >
  );
};

export default CompanyDashboard;
