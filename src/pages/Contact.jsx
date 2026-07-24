import Layout from "../components/Layout";
import ContactHero from "../components/ContactHero";
import ContactInfo from "../components/ContactInfo";
import ContactMap from "../components/ContactMap";
import ContactForm from "../components/ContactForm";
import {Container, Grid} from "@mui/material";

export default function Contact() {
  return (
    <Layout>
      <ContactHero />

      <ContactInfo />

       <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ContactMap />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ContactForm />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}