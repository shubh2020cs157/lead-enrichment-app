import { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import GoogleLoginButton from "./components/GoogleLoginButton"; // Ensure the correct path to GoogleLoginButton component
import { User } from "firebase/auth"; // Import User type from Firebase

const App = () => {
  const [companyName, setCompanyName] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [enrichedData, setEnrichedData] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null); // Add user state to store logged-in user

  const handleFormSubmit = async () => {
    if (!companyName || !websiteURL) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setEnrichedData(null);

    try {
      const response = await axios.post("http://localhost:5000/api/enrich", {
        company_name: companyName,
        website: websiteURL,
      });
      setEnrichedData(response.data);
    } catch (error: any) {
      setError(
        error.response?.data?.error || "Failed to retrieve enriched data."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (user: User) => {
    setUser(user); // Set user state upon successful login
  };

  return (
    <Box sx={{ padding: 3 }}>

      {/* Show Google Login button if user is not logged in */}
      {!user ? (
        <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Welcome, {user.displayName}!
        </Typography>
      )}

      {/* Lead Enrichment Form */}
      {user && (
        <>
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            sx={{ my: 2 }}
          />
          <TextField
            label="Website URL"
            variant="outlined"
            fullWidth
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
            sx={{ my: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFormSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Enrich Lead"}
          </Button>

          {error && <Typography color="error">{error}</Typography>}

          {enrichedData && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Enriched Data</Typography>
              <Typography>Name: {enrichedData.name}</Typography>
              <Typography>Description: {enrichedData.description}</Typography>
              <Typography>Website: {enrichedData.website}</Typography>
              <Typography>Followers: {enrichedData.followers}</Typography>
              <Typography>Industry: {enrichedData.industry}</Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default App;
