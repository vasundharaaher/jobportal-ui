import Layout from "../components/Layout";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import CategorySection from "../components/CategorySection";
import JobList from "../components/JobList";
import ContactInfo from "../components/ContactInfo";

function Home() {
  return (
    <Layout>
      <Hero />
      <CategorySection />
      <AboutUs />
      <JobList />
      <ContactInfo />
    </Layout>
  );
}

export default Home;