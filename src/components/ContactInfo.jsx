import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const contactInfo = [
  {
    icon: <LocationOnIcon  sx= {{color:"#3ae296" ,fontSize: 40}} />,
    title: "Address",
    value: "Pune, Maharashtra, India",
  },
  {
    icon: <EmailIcon  sx= {{color:"#3ae296" , fontSize: 40 }} />,
    title: "Email",
    value: "skillscouter@gmail.com",
  },
  {
    icon: <PhoneIcon sx= {{color:"#3ae296" , fontSize: 40}} />,
    title: "Phone",
    value: "+91 9876543210",
  },
];

export default function ContactInfo() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={5}
      >
        Contact Information
      </Typography> */}

      <Grid container spacing={3}>
        {contactInfo.map((item, index) => (
          <Grid key={index} size={{ xs: 12, md: 4 }}>
            <Card
              elevation={3}
              sx={{
                textAlign: "center",
                borderRadius: 3,
                py: 3,
                transition: ".3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardContent>
                <Box mb={2}>{item.icon}</Box>

                <Typography variant="h6" fontWeight="bold">
                  {item.title}
                </Typography>

                <Typography color="text.secondary" mt={1}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}