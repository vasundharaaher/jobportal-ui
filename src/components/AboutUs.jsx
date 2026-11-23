import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import about1 from "../assets/images/aboutus/about-1.jpg";
import about2 from "../assets/images/aboutus/about-2.jpg";
import about3 from "../assets/images/aboutus/about-3.jpg";
import about4 from "../assets/images/aboutus/about-4.jpg";

function AboutUs() {
  return (

    <Container sx={{ py: 8 }} id="about">
      <Grid container spacing={6} sx={{ alignItems: "center" }}>

        {/* Left Side Images */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Box
                component="img"
                src={about1}
                alt="About 1"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                }}
              />
            </Grid>

            <Grid size={6}>
              <Box
                component="img"
                src={about2}
                alt="About 2"
                sx={{
                  width: "85%",
                  mt: 6,
                  borderRadius: 2,
                }}
              />
            </Grid>

            <Grid size={6}>
              <Box
                component="img"
                src={about3}
                alt="About 3"
                sx={{
                  width: "85%",
                  ml: "auto",
                  display: "block",
                  borderRadius: 2,
                }}
              />
            </Grid>

            <Grid size={6}>
              <Box
                component="img"
                src={about4}
                alt="About 4"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Side Content */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            We Help You Find the Best Job and the Right Talent
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, lineHeight: 1.8 }}
          >
            SkillScouter connects talented professionals with top companies.
            Whether you're searching for your dream job or looking to hire the
            best candidates, our platform makes recruitment faster, easier, and
            more effective.
          </Typography>

          {[
            "Thousands of verified job opportunities",
            "Connect with top companies",
            "Quick and easy application process",
          ].map((item, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <CheckCircleIcon
                sx={{
                  color: "#2aba79",
                  mr: 2,
                }}
              />

              <Typography>{item}</Typography>
            </Box>
          ))}
        </Grid>

      </Grid>
    </Container>

  );
}

export default AboutUs;