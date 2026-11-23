import { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  InputAdornment,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import companyService from "../../services/companyService";
import Layout from "../../components/Layout";

const CompanyProfile = () => {
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    company_name: "",
    state: "",
    city: "",
    contact: "",
    address: "",
    website: "",
    country: "",
    companydscription: "",
    companycategory: "",
    companygstno: "",
    logo_pic: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await companyService.getProfile();
        setFormData({
          fname: data.firstname || data.fname || "",
          lname: data.lastname || data.lname || "",
          email: data.email || "",
          company_name: data.company_name || "",
          state: data.state || "",
          city: data.city || "",
          contact: data.contact || "",
          address: data.address || "",
          website: data.website || "",
          country: data.country || "",
          companydscription: data.companydscription || "",
          companycategory: data.companycategory || "",
          companygstno: data.companygstno || "",
          logo_pic: null,
        });
        if (data.logo_pic) {
          setPreview(`http://127.0.0.1:8000${data.logo_pic}`);
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo_pic") {
      setFormData({
        ...formData,
        logo_pic: files[0],
      });

      if (files[0]) {
        setPreview(URL.createObjectURL(files[0]));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (key === "logo_pic" && !formData[key]) return;
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await companyService.updateProfile(data);
      if (response.data.success) {
        setMsg({ type: "success", text: response.data.message });
      } else {
        setMsg({ type: "error", text: response.data.message || "Failed to update" });
      }
    } catch (error) {
      console.error(error);
      const responseData = error.response?.data;
      const errorMessage =
        responseData?.message ||
        responseData?.detail ||
        (responseData ? JSON.stringify(responseData) : error.message) ||
        "Error updating profile";
      setMsg({ type: "error", text: errorMessage });
    }
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper elevation={4} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            mb={4}
          >
            Company Profile
          </Typography>

          {msg.text && (
            <Alert severity={msg.type} sx={{ mb: 3 }}>
              {msg.text}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  slotProps={{
                    input: {
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockOutlinedIcon
                          fontSize="small"
                          color="action"
                          aria-label="Email is read-only"
                        />
                      </InputAdornment>
                    ),
                    },
                  }}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  multiline
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  select
                  fullWidth
                  label="Company Category"
                  name="companycategory"
                  value={formData.companycategory}
                  onChange={handleChange}
                >
                  <MenuItem value="InformationTechnology">Information Technology (IT)</MenuItem>
                  <MenuItem value="Healthcare">Healthcare</MenuItem>
                  <MenuItem value="FinanceBanking">Finance & Banking</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                  <MenuItem value="RetailEcommerce">Retail & E-commerce</MenuItem>
                  <MenuItem value="Telecommunications">Telecommunications</MenuItem>
                  <MenuItem value="RealEstate">Real Estate</MenuItem>
                  <MenuItem value="Construction">Construction</MenuItem>
                  <MenuItem value="Automobile">Automobile</MenuItem>
                  <MenuItem value="MediaEntertainment">Media & Entertainment</MenuItem>
                  <MenuItem value="HospitalityTourism">Hospitality & Tourism</MenuItem>
                  <MenuItem value="LogisticsSupplyChain">Logistics & Supply Chain</MenuItem>
                  <MenuItem value="Government">Government</MenuItem>
                  <MenuItem value="NGONonProfit">NGO / Non-Profit</MenuItem>
                  <MenuItem value="Agriculture">Agriculture</MenuItem>
                  <MenuItem value="EnergyUtilities">Energy & Utilities</MenuItem>
                  <MenuItem value="Pharmaceuticals">Pharmaceuticals</MenuItem>
                  <MenuItem value="Consulting">Consulting</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Company Description"
                  name="companydscription"
                  multiline
                  rows={4}
                  value={formData.companydscription}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Company GST No"
                  name="companygstno"
                  value={formData.companygstno}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <Button
                  variant="outlined"
                  component="label"
                >
                  Upload Company Logo

                  <input
                    hidden
                    type="file"
                    name="logo_pic"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Button>

                {preview && (
                  <Box sx={{ mt: 2 }}>
                    <img
                      src={preview}
                      alt="Preview"
                      width={150}
                      style={{
                        borderRadius: 10,
                      }}
                    />
                  </Box>
                )}
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                  }}
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default CompanyProfile;
