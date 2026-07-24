import { Box, Container, Typography } from "@mui/material";

function ContactHero() {
  return (
    <Box
      sx={{
        bgcolor: "#122041",
        color: "#fff",
        py: 10,
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Contact Us
        </Typography>

        <Typography variant="h6">
          We'd love to hear from you.
        </Typography>
      </Container>
    </Box>
  );
}

export default ContactHero;