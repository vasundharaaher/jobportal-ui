import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import hero1 from "../assets/images/carousel-1.jpg";
import hero2 from "../assets/images/carousel-2.jpg";

const slides = [
  {
    image: hero1,
    title: "Find The Perfect Job That You Deserve",
    description:
      "Discover thousands of opportunities from top companies and start your career journey today.",
  },
  {
    image: hero2,
    title: "Find The Best Startup Job That Fits You",
    description:
      "Explore exciting startup opportunities and grow your career with innovative companies.",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
    
      sx={{
        height: "85vh",
        backgroundImage: `linear-gradient(rgba(43,57,64,0.55), rgba(43,57,64,0.55)), url(${slides[currentSlide].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        transition: "background-image .8s ease-in-out",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 700 }}>
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontWeight: 700,
              mb: 3,
            }}
          >
            {slides[currentSlide].title}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#f5f5f5",
              mb: 4,
              lineHeight: 1.8,
            }}
          >
            {slides[currentSlide].description}
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#2aba79",
              px: 5,
              py: 1.5,
              "&:hover": {
                bgcolor: "#229966",
              },
            }}
          >
            Search Jobs
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;