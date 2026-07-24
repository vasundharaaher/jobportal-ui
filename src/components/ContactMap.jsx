import { Container, Paper, Typography } from "@mui/material";

export default function ContactMap() {
  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      <Paper
        elevation={3}
        sx={{
          overflow: "hidden",
          borderRadius: 3,
        }}
      >
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.160085715665!2d73.856255!3d18.52043"
          width="100%"
          height="450"
          style={{
            border: 0,
          }}
          loading="lazy"
        />

       
        </Paper>
        <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            mb={5}
        >
            Address Information
        </Typography>
    </Container>
  );
}