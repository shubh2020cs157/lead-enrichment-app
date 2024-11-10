import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import GoogleLoginButton from "./GoogleLoginButton";
import LeadCaptureForm from "./LeadCaptureForm";
import { User } from "firebase/auth";  

const LeadEnrichment: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); 

  return (
    <Box sx={{ padding: 3 }}>
      {!user ? (
        <GoogleLoginButton onLoginSuccess={(user) => setUser(user)} />
      ) : (
        <>
          <Typography variant="h5" align="center" sx={{ mb: 3 }}>
            Welcome, {user.displayName}
          </Typography>
          <LeadCaptureForm user={user} />  
        </>
      )}
    </Box>
  );
};

export default LeadEnrichment;
