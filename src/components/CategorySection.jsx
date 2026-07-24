import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SchoolIcon from "@mui/icons-material/School";
import BrushIcon from "@mui/icons-material/Brush";

import api from "../services/api";

// Map category names to icons
const iconMap = {
  Marketing: <EmailOutlinedIcon sx={{ fontSize: 45, color: "#2aba79" }} />,
  Customer_Service: (
    <SupportAgentIcon sx={{ fontSize: 45, color: "#2aba79" }} />
  ),
  Human_Resource: (
    <PeopleAltIcon sx={{ fontSize: 45, color: "#2aba79" }} />
  ),
  Project_Management: (
    <AssignmentTurnedInIcon sx={{ fontSize: 45, color: "#2aba79" }} />
  ),
  Business_Development: (
    <TrendingUpIcon sx={{ fontSize: 45, color: "#2aba79" }} />
  ),
  Sales_and_Communication: (
    <HandshakeIcon sx={{ fontSize: 45, color: "#2aba79" }} />
  ),
  Teaching_and_Education: (
    <SchoolIcon sx={{ fontSize: 45, color: "#2aba79" }} />
  ),
  Design_and_Creative: (
    <BrushIcon sx={{ fontSize: 45, color: "#2aba79" }} />
  ),
};

function CategorySection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/index/");

        const categoryArray = Object.entries(response.data.categories).map(
          ([title, jobs]) => ({
            title: title.replace(/_/g, " "),
            jobs,
            icon:
              iconMap[title] || (
                <EmailOutlinedIcon
                  sx={{ fontSize: 45, color: "#2aba79" }}
                />
              ),
          })
        );

        setCategories(categoryArray);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container sx={{ py: 8 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 5,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Explore By Category
      </Typography>

      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                textAlign: "center",
                p: 3,
                borderRadius: 3,
                transition: "0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Box mb={2}>{category.icon}</Box>

                <Typography variant="h6" fontWeight={600}>
                  {category.title}
                </Typography>

                <Typography color="text.secondary" mt={1}>
                  {category.jobs} Jobs
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CategorySection;