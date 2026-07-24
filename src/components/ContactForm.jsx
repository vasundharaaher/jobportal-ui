import { useState } from "react";

import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Call API here
  };

  return (
    <Container maxWidth="md" sx={{ mb: 8 }}>
      <Paper
        elevation={4}
        sx={{
          p: 5,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={4}
        >
          Send Message
        </Typography>

        <Grid
          container
          spacing={3}
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Your Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                py: 1.5,
                backgroundColor: "#2aba79",
                "&:hover": {
                  backgroundColor: "#229966",
                },
              }}
            >
              Send Message
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}