import { Card, CardContent, Typography, Box } from "@mui/material";
import { 
  Link as LinkIcon, 
  Shield as ShieldIcon, 
  WarningAmber as WarningIcon, 
  Error as ErrorIcon, 
  CheckCircle as CheckCircleIcon, 
  TipsAndUpdates as TipsIcon 
} from "@mui/icons-material";

const getRiskColor = (score) => {
  if (score > 70) return { bg: "#ffebee", color: "#d32f2f" }; // High Risk (Red)
  if (score > 40) return { bg: "#fff3e0", color: "#ff9800" }; // Medium Risk (Orange)
  return { bg: "#e8f5e9", color: "#388e3c" }; // Low Risk (Green)
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Safe":
      return <CheckCircleIcon sx={{ color: "green", ml: 1 }} />;
    case "Suspicious":
      return <WarningIcon sx={{ color: "orange", ml: 1 }} />;
    case "Dangerous":
      return <ErrorIcon sx={{ color: "red", ml: 1 }} />;
    default:
      return null;
  }
};

const ScanResultCard = ({ scanResult, loading }) => {
  if (!scanResult || loading) return null;
  
  const riskColors = getRiskColor(scanResult.riskScore);

  return (
    <Card
      sx={{
        mt: 3,
        p: 3,
        textAlign: "left",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        backgroundColor: "background.paper",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "translateY(-5px)" },
      }}
    >
      {/* Title with Icon */}
      <Typography variant="h5" fontWeight="bold" color="primary" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <ShieldIcon sx={{ fontSize: 30, mr: 1 }} /> Results Summary
      </Typography>

      <CardContent>
        {/* Original URL */}
        <Typography variant="body1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
          <LinkIcon sx={{ color: "primary.main", mr: 1 }} />
          <strong>Original URL:</strong>
          <a href={scanResult.originalURL} target="_blank" rel="noopener noreferrer" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold", marginLeft: "8px" }}>
            {scanResult.originalURL}
          </a>
        </Typography>

        {/* Risk Percentage Indicator */}
        <Typography variant="body1" gutterBottom>
          <strong>Risk Score:</strong>
          <Box
            component="span"
            sx={{
              backgroundColor: riskColors.bg,
              color: riskColors.color,
              padding: "6px 12px",
              borderRadius: "8px",
              fontWeight: "600",
              ml: 1,
              display: "inline-block",
            }}
          >
            {scanResult.riskScore}%
          </Box>
        </Typography>

        {/* Status Indicator with Icon */}
        <Typography variant="body1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
          <strong>Status:</strong>
          {getStatusIcon(scanResult.status)}
          <Box
            component="span"
            sx={{
              padding: "6px 12px",
              borderRadius: "8px",
              ml: 1,
              backgroundColor: getRiskColor(scanResult.riskScore).bg,
              color: getRiskColor(scanResult.riskScore).color,
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {scanResult.status}
          </Box>
        </Typography>

        {/* Suggestions Section */}
        <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <TipsIcon sx={{ color: "#ff9800", mr: 1 }} />
          <strong>Suggestions:</strong>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            background: "#f0f4ff",
            color: "#1c3d6e",
            border: "1px solid #cfd8dc",
            padding: "12px",
            borderRadius: "8px",
            mt: 1,
            lineHeight: 1.6,
          }}
        >
          {scanResult.suggestions || "No suggestions available."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ScanResultCard;