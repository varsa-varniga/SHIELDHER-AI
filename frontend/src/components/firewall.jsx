import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";

const FirewallRules = ({ threats }) => {
  if (!threats || threats.length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 2, color: "#fff" }}>
        🔐 No firewall rules yet. Connect your email to detect phishing threats.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3 }}>
      {threats.map((threat, index) => (
        <Card
          key={index}
          sx={{
            width: 300,
            borderLeft: "5px solid #4FD1C5",
            backgroundColor: "rgba(32, 44, 62, 0.8)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <ShieldIcon sx={{ color: "#4FD1C5", mr: 1 }} />
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff" }}>
                Rule #{index + 1}
              </Typography>
            </Box>
            <Typography variant="body2" gutterBottom sx={{ color: "#adbac7" }}>
              <strong>Sender:</strong> {threat.sender || "Unknown"}
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ color: "#adbac7" }}>
              <strong>Subject:</strong> {threat.subject || "N/A"}
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ color: "#adbac7" }}>
              <strong>IP Blocked:</strong> {threat.ip || "Unidentified"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1, fontStyle: "italic", color: "#4FD1C5" }}
            >
              🚫 AI-generated firewall rule applied to block phishing attempt.
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default FirewallRules;
