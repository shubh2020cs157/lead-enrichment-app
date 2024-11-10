import { useState } from "react";
import { Box, Typography, TextField, Button, CircularProgress, Card, CardContent } from "@mui/material";
import axios from "axios";

interface EnrichedData {
  name: string;
  description: string;
  website: string;
  followers: string;
  industry: string;
}

interface LeadCaptureFormProps {
  user: { displayName: string | null } | null; // Assuming user is an object with displayName
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ user }) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [websiteURL, setWebsiteURL] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [enrichedData, setEnrichedData] = useState<EnrichedData | null>(null);

  const fetchEnrichedData = async () => {
    if (!companyName || !websiteURL) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setEnrichedData(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/enrich", {
        company_name: companyName,
        website_url: websiteURL,
      });

      if (response.data) {
        setEnrichedData(response.data);
      } else {
        setError("No data found.");
      }
    } catch {
      setError("Failed to retrieve enriched data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Lead Capture Form</Typography>
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
        onClick={fetchEnrichedData}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Enrich Lead"}
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      {enrichedData && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6">Enriched Data</Typography>
            <Typography>Name: {enrichedData.name}</Typography>
            <Typography>Description: {enrichedData.description}</Typography>
            <Typography>Website: {enrichedData.website}</Typography>
            <Typography>Followers: {enrichedData.followers}</Typography>
            <Typography>Industry: {enrichedData.industry}</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default LeadCaptureForm;
