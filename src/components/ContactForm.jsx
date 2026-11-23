import { useState } from "react";

import {
  Alert,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import api from "../services/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);

    try {
      const response = await api.post("/contact-us/", formData);
      if (response.data.success) {
        setMsg({ type: "success", text: response.data.message });
        // Reset form on success
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setMsg({ type: "error", text: response.data.message });
      }
    } catch (error) {
      setMsg({
        type: "error",
        text: error.response?.data?.message || "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
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
          <Grid size={12}>
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={12}>
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
              rows={2}
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </Grid>

          {msg.text && (
            <Grid size={12}>
              <Alert severity={msg.type}>{msg.text}</Alert>
            </Grid>
          )}

          <Grid size={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                backgroundColor: "#2aba79",
                "&:hover": {
                  backgroundColor: "#229966",
                },
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}