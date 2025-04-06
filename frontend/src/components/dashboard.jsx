import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Chip,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Modal,
  CircularProgress,
} from "@mui/material";
import {
  SecurityOutlined as SecurityIcon,
  WarningAmberOutlined as WarningIcon,
  CheckCircleOutlined as CheckCircleIcon,
  SearchOutlined as ScanIcon,
  BuildOutlined as ImproveIcon,
  EmojiEmotionsOutlined as EmpowerIcon,
  ShieldOutlined as ShieldIcon,
  WarningOutlined as ThreatIcon,
  StarOutlined as StarIcon,
  DeleteOutline as DeleteIcon,
  HistoryOutlined as HistoryIcon,
  EmailOutlined as EmailIcon,
  LockOutlined as LockIcon,
} from "@mui/icons-material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import FirewallRules from "./firewall";

// Define the cyberpunk theme colors based on the landing page
const colors = {
  deepSpace: "#0a0e17",
  cosmicPurple: "#1a1a2e",
  nebulaBlue: "#16213e",
  cyberViolet: "#4a148c",
  matrixGreen: "#00ff9d",
  electricBlue: "#00d1ff",
  plasmaPink: "#FF0000",
  starlight: "#e6f1ff",
  cosmicDust: "#7f8c8d",
  voidBlack: "#000000",
  hackerGreen: "#39ff14",
};

// Custom theme configuration with cyberpunk colors
const theme = createTheme({
  palette: {
    background: {
      default: colors.deepSpace,
      paper: colors.nebulaBlue,
    },
    text: {
      primary: colors.starlight,
      secondary: colors.cosmicDust,
    },
    primary: {
      main: colors.matrixGreen,
    },
    secondary: {
      main: colors.electricBlue,
    },
    success: {
      main: colors.hackerGreen,
    },
    error: {
      main: colors.plasmaPink,
    },
    warning: {
      main: "#feca57", // Keeping this for contrast
    },
    threatColors: {
      high: {
        main: colors.plasmaPink,
        light: `${colors.plasmaPink}20`,
        contrastText: colors.starlight,
      },
      medium: {
        main: colors.electricBlue,
        light: `${colors.electricBlue}20`,
        contrastText: colors.starlight,
      },
      low: {
        main: colors.matrixGreen,
        light: `${colors.matrixGreen}20`,
        contrastText: colors.voidBlack,
      },
    },
  },
  typography: {
    fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          padding: "10px 20px",
          background: `linear-gradient(135deg, ${colors.nebulaBlue} 0%, ${colors.cosmicPurple} 100%)`,
          border: `1px solid ${colors.matrixGreen}30`,
          boxShadow: `0 8px 32px 0 ${colors.deepSpace}80`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          background: `linear-gradient(90deg, ${colors.matrixGreen}, ${colors.electricBlue})`,
          color: colors.deepSpace,
          fontWeight: "bold",
          "&:hover": {
            background: `linear-gradient(90deg, ${colors.electricBlue}, ${colors.matrixGreen})`,
            boxShadow: `0 0 15px ${colors.matrixGreen}`,
          },
        },
        outlined: {
          borderColor: colors.matrixGreen,
          color: colors.matrixGreen,
          "&:hover": {
            borderColor: colors.electricBlue,
            color: colors.electricBlue,
            boxShadow: `0 0 10px ${colors.matrixGreen}50`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${colors.matrixGreen}30`,
        },
      },
    },
  },
});

// Email Authentication Modal Component
const EmailAuthModal = ({ open, onClose, onAuthenticate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update this in the EmailAuthModal component
  const BACKEND_URL = "http://127.0.0.1:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // This would call your API endpoint that handles email authentication
      const response = await fetch(`${BACKEND_URL}/api/authenticate-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      // If authentication is successful, scan emails
      if (data.success) {
        console.log("Authentication successful, scanning emails...");
        const scanResponse = await fetch(`${BACKEND_URL}/api/scan-emails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const scanData = await scanResponse.json();

        if (!scanResponse.ok) {
          throw new Error(scanData.message || "Failed to scan emails");
        }
        console.log("Scan successful, found threats:", scanData.threats);

        onAuthenticate(scanData.threats || []);
        onClose();
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      setError(err.message || "Failed to authenticate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="email-auth-modal"
      aria-describedby="connect-email-account"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: colors.nebulaBlue,
          border: `1px solid ${colors.matrixGreen}50`,
          boxShadow: `0 0 25px ${colors.matrixGreen}30`,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="email-auth-modal"
          variant="h6"
          component="h2"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            color: colors.matrixGreen,
          }}
        >
          <EmailIcon sx={{ mr: 1 }} /> Connect Your Email
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          Provide your email credentials to scan for phishing emails and improve
          your security
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: `${colors.matrixGreen}50`,
                },
                "&:hover fieldset": {
                  borderColor: colors.matrixGreen,
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.electricBlue,
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.cosmicDust,
              },
              "& .MuiInputBase-input": {
                color: colors.starlight,
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: `${colors.matrixGreen}50`,
                },
                "&:hover fieldset": {
                  borderColor: colors.matrixGreen,
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.electricBlue,
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.cosmicDust,
              },
              "& .MuiInputBase-input": {
                color: colors.starlight,
              },
            }}
          />
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <LockIcon />}
          >
            {loading ? "Connecting..." : "Connect & Scan"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

const SecurityDashboard = () => {
  // Using constant value instead of state since it's not being updated
  const userName = "Mayuri Ilango";
  const [securityScore, setSecurityScore] = useState(75);

  const [securitySuggestions, setSecuritySuggestions] = useState([
    {
      id: 1,
      title: "Two-Factor Authentication",
      description: "Enable 2FA for enhanced account security",
      completed: false,
    },
    {
      id: 2,
      title: "Password Strength",
      description: "Update to a stronger, unique password",
      completed: false,
    },
    {
      id: 3,
      title: "Device Management",
      description: "Review and remove unused connected devices",
      completed: true,
    },
  ]);

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Dummy threats for when email is not connected
  const dummyThreats = [
    {
      id: 1,
      type: "network",
      description: "Unauthorized access attempt from unknown IP address",
      risk: "High",
    },
    {
      id: 2,
      type: "password",
      description: "Weak password detected for critical account",
      risk: "Medium",
    },
    {
      id: 3,
      type: "software",
      description: "Outdated security software requires immediate update",
      risk: "Medium",
    },
  ];

  // Use separate state for actual threats and a flag for email connection
  const [emailConnected, setEmailConnected] = useState(false);
  const [actualThreats, setActualThreats] = useState([]);

  // Computed threats based on email connection status
  const threats = emailConnected ? actualThreats : dummyThreats;

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { name, username } = user;

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [threatHistory, setThreatHistory] = useState([
    {
      id: 5,
      date: "2024-03-15",
      type: "Phishing Attempt",
      description: "Suspicious email from unknown sender",
      risk: "High",
      action: "Blocked and Reported",
      resolvedBy: "Automated System",
    },
    {
      id: 2,
      date: "2024-03-10",
      type: "Malware Detection",
      description: "Potential malware in downloaded file",
      risk: "High",
      action: "Quarantined and Deleted",
      resolvedBy: "Security Team",
    },
    {
      id: 3,
      date: "2024-03-05",
      type: "Unauthorized Access",
      description: "Login attempt from unknown IP",
      risk: "Medium",
      action: "IP Blocked",
      resolvedBy: "Firewall",
    },
    {
      id: 4,
      date: "2024-02-28",
      type: "Software Vulnerability",
      description: "Outdated security software",
      risk: "Low",
      action: "Auto-Updated",
      resolvedBy: "System Update",
    },
  ]);

  // Email authentication states
  const [emailAuthModalOpen, setEmailAuthModalOpen] = useState(false);

  const toggleSuggestionCompletion = (suggestionId) => {
    setSecuritySuggestions((currentSuggestions) =>
      currentSuggestions.map((suggestion) =>
        suggestion.id === suggestionId
          ? { ...suggestion, completed: !suggestion.completed }
          : suggestion
      )
    );

    setNotification({
      open: true,
      message: "Security suggestion status updated",
      severity: "success",
    });
  };

  const startSecurityScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    const simulateScan = setInterval(() => {
      setScanProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(simulateScan);
          setIsScanning(false);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 300);
  };

  const handleMarkAsSafe = (threatId) => {
    if (emailConnected) {
      setActualThreats((prevThreats) =>
        prevThreats.filter((threat) => threat.id !== threatId)
      );
    } else {
      // Do nothing for dummy threats or show a notification that this is demo data
      setNotification({
        open: true,
        message: "This is demo data. Connect your email to see real threats.",
        severity: "info",
      });
      return;
    }

    setNotification({
      open: true,
      message: "Threat marked as safe successfully",
      severity: "success",
    });
  };

  const handleReportThreat = (threat) => {
    // Add to threat history
    addThreatToHistory({
      date: new Date().toISOString().split("T")[0],
      type: threat.type === "phishing" ? "Phishing Attempt" : threat.type,
      description: threat.description,
      risk: threat.risk,
      action: "Reported",
      resolvedBy: "Security Team",
    });

    // Remove from active threats if email is connected (real threats)
    if (emailConnected) {
      setActualThreats((prevThreats) =>
        prevThreats.filter((t) => t.id !== threat.id)
      );
    } else {
      // Show notification for dummy threats
      setNotification({
        open: true,
        message: "This is demo data. Connect your email to see real threats.",
        severity: "info",
      });
      return;
    }

    setNotification({
      open: true,
      message: `Threat "${threat.description}" reported to security team`,
      severity: "warning",
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "default";
    }
  };

  const getProgressColor = (score) => {
    if (score < 50) return colors.plasmaPink;
    if (score < 75) return colors.electricBlue;
    return colors.matrixGreen;
  };

  const removeThreatFromHistory = (threatId) => {
    setThreatHistory((prevHistory) =>
      prevHistory.filter((threat) => threat.id !== threatId)
    );

    setNotification({
      open: true,
      message: "Threat history entry removed",
      severity: "info",
    });
  };

  const addThreatToHistory = (newThreat) => {
    setThreatHistory((prevHistory) => [
      {
        ...newThreat,
        id:
          prevHistory.length > 0
            ? Math.max(...prevHistory.map((t) => t.id)) + 1
            : 1,
      },
      ...prevHistory,
    ]);
  };

  // Handle email authentication and scanning
  const handleEmailConnect = () => {
    setEmailAuthModalOpen(true);
  };

  const handleEmailAuthSuccess = (emailThreats) => {
    setEmailConnected(true);

    // Format email threats to match our threats structure
    const formattedEmailThreats = emailThreats.map((threat, index) => ({
      id: index + 1, // Use simple sequential IDs
      type: "phishing",
      description: threat.description,
      risk: threat.risk,
      sender: threat.sender,
      subject: threat.subject,
      date: threat.date,
      probability: threat.probability,
    }));

    // Replace dummy threats with real email threats
    setActualThreats(formattedEmailThreats);

    // Update security score based on number of threats
    const newScore = Math.max(30, 100 - formattedEmailThreats.length * 5);
    setSecurityScore(newScore);

    setNotification({
      open: true,
      message: `Email connected successfully. Found ${formattedEmailThreats.length} potential phishing threats.`,
      severity: formattedEmailThreats.length > 0 ? "warning" : "success",
    });

    // Add email connection suggestion if it doesn't exist
    if (!securitySuggestions.find((s) => s.title === "Email Scanning")) {
      setSecuritySuggestions((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          title: "Email Scanning",
          description: "Regular scanning of emails for phishing attempts",
          completed: true,
        },
      ]);
    }
  };

  // Cyber text animation effect for headers
  // Cyber text animation effect for headers
  const CyberTextStyles = {
    position: "relative",
    color: colors.matrixGreen,
    fontWeight: 900,
    letterSpacing: "1px",
    display: "inline",
  };

  // Cyber card glow effect
  const cyberCardGlow = {
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      background: `linear-gradient(45deg, ${colors.matrixGreen}, ${colors.electricBlue}, ${colors.plasmaPink})`,
      borderRadius: "14px",
      zIndex: -1,
      opacity: 0.3,
      animation: "glowPulse 5s linear infinite",
    },
    "@keyframes glowPulse": {
      "0%": { opacity: 0.3 },
      "50%": { opacity: 0.6 },
      "100%": { opacity: 0.3 },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100vh",
          p: 4,
          color: "text.primary",
          backgroundImage: `radial-gradient(circle at 10% 20%, ${colors.cosmicPurple}90 0%, ${colors.deepSpace} 80%)`,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${colors.matrixGreen}' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            opacity: 0.6,
            zIndex: 0,
          },
        }}
      >
        {/* Cyber grid lines */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(90deg, ${colors.matrixGreen}03 1px, transparent 1px), 
                        linear-gradient(${colors.matrixGreen}03 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            zIndex: 0,
          }}
        />

        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 700,
            color: "text.primary",
            position: "relative",
            zIndex: 1,
            textShadow: `0 0 10px ${colors.deepSpace}`,
            display: "flex",
            alignItems: "center",
            "&::after": {
              content: '""',
              display: "inline-block",
              width: "50px",
              height: "3px",
              background: `linear-gradient(90deg, ${colors.matrixGreen}, transparent)`,
              marginLeft: "15px",
            },
          }}
        >
          Welcome,{" "}
          <Box component="span" sx={CyberTextStyles}>
            {username || name || "Cyber Defender"}
          </Box>
        </Typography>

        <Grid container spacing={3} sx={{ position: "relative", zIndex: 1 }}>
          {/* Security Score */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                ...cyberCardGlow,
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 330,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mt: -1 }}>
                  <SecurityIcon sx={{ mr: 2, color: colors.matrixGreen }} />
                  <Typography
                    variant="h6"
                    sx={{
                      background: `linear-gradient(90deg, ${colors.matrixGreen}, ${colors.electricBlue})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Security Score
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: 1,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${getProgressColor(
                        securityScore
                      )}20 0%, transparent 70%)`,
                      zIndex: 0,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 180,
                      height: 180,
                      mb: 1,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <CircularProgressbar
                      value={securityScore}
                      text={`${securityScore}%`}
                      styles={buildStyles({
                        textColor: colors.starlight,
                        pathColor: getProgressColor(securityScore),
                        trailColor: "rgba(255,255,255,0.1)",
                        textSize: "24px",
                      })}
                    />
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  Your security is {securityScore}% strong
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EmailIcon />}
                  onClick={handleEmailConnect}
                  sx={{
                    mt: 2,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: -100,
                      width: "50px",
                      height: "100%",
                      background: `linear-gradient(90deg, transparent, ${colors.matrixGreen}40, transparent)`,
                      animation: "cyberscan 2s infinite",
                      zIndex: 0,
                      display: emailConnected ? "block" : "none",
                    },
                    "@keyframes cyberscan": {
                      "0%": { left: -100 },
                      "100%": { left: "100%" },
                    },
                  }}
                >
                  {emailConnected ? "Rescan Email" : "Connect Email"}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "16px",
                position: "relative",
                boxShadow: `0 0 15px ${colors.matrixGreen}40, 0 0 30px ${colors.electricBlue}20`,
                border: `1px solid ${colors.matrixGreen}30`,
                ...cyberCardGlow,
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  mt: -1,
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", mb: 2, mt: -1 }}
                >
                  <EmpowerIcon sx={{ mr: 2, color: colors.hackerGreen }} />
                  <Typography
                    variant="h6"
                    sx={{
                      background: `linear-gradient(90deg, ${colors.matrixGreen}, ${colors.electricBlue})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Your Safety, Our Priority
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, color: colors.starlight }}
                >
                  We're committed to providing you with the most comprehensive
                  and trustworthy security experience. Every feature is designed
                  to give you peace of mind and protect what matters most to
                  you.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: `${colors.matrixGreen}15`,
                      borderRadius: 2,
                      p: 2,
                      border: `1px solid ${colors.matrixGreen}30`,
                    }}
                  >
                    <StarIcon sx={{ mr: 2, color: colors.hackerGreen }} />
                    <Typography
                      variant="body2"
                      sx={{ color: colors.starlight }}
                    >
                      Your trust is our greatest security measure. We
                      continuously evolve to stay ahead of potential threats.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: `${colors.matrixGreen}15`,
                      borderRadius: 2,
                      p: 2,
                      border: `1px solid ${colors.matrixGreen}30`,
                    }}
                  >
                    <StarIcon sx={{ mr: 2, color: colors.hackerGreen }} />
                    <Typography
                      variant="body2"
                      sx={{ color: colors.starlight }}
                    >
                      {emailConnected
                        ? "Email connected! We're actively monitoring for phishing attempts."
                        : "New! Our email phishing detection uses advanced ML to identify and protect against sophisticated email threats."}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Security Suggestions */}
          <Grid item xs={12}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${colors.deepSpace}, ${colors.nebulaBlue})`,
                boxShadow: `0 0 15px ${colors.matrixGreen}30, 0 0 30px ${colors.electricBlue}15`,
                border: `1px solid ${colors.matrixGreen}30`,
                borderRadius: "16px",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CheckCircleIcon sx={{ mr: 2, color: colors.hackerGreen }} />
                  <Typography
                    variant="h6"
                    sx={{
                      background: `linear-gradient(90deg, ${colors.matrixGreen}, ${colors.electricBlue})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Security Recommendations
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {securitySuggestions.map((suggestion) => (
                    <Grid item xs={12} md={4} key={suggestion.id}>
                      <Box
                        sx={{
                          border: "1px solid",
                          borderColor: suggestion.completed
                            ? colors.matrixGreen
                            : colors.electricBlue,
                          borderRadius: 2,
                          p: 2,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          background: `${colors.deepSpace}`,
                          boxShadow: suggestion.completed
                            ? `0 0 10px ${colors.matrixGreen}40`
                            : `0 0 10px ${colors.electricBlue}40`,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            color: suggestion.completed
                              ? colors.matrixGreen
                              : colors.electricBlue,
                          }}
                        >
                          {suggestion.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            flexGrow: 1,
                            color: colors.starlight,
                          }}
                        >
                          {suggestion.description}
                        </Typography>
                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 1,
                          }}
                        >
                          {suggestion.completed ? (
                            <CheckCircleIcon
                              sx={{ color: colors.matrixGreen }}
                            />
                          ) : (
                            <Typography
                              variant="body2"
                              sx={{ color: colors.electricBlue }}
                            >
                              Action Required
                            </Typography>
                          )}
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              borderColor: suggestion.completed
                                ? colors.matrixGreen
                                : colors.electricBlue,
                              color: suggestion.completed
                                ? colors.matrixGreen
                                : colors.electricBlue,
                              "&:hover": {
                                backgroundColor: suggestion.completed
                                  ? `${colors.matrixGreen}20`
                                  : `${colors.electricBlue}20`,
                                borderColor: suggestion.completed
                                  ? colors.matrixGreen
                                  : colors.electricBlue,
                              },
                            }}
                            onClick={() =>
                              toggleSuggestionCompletion(suggestion.id)
                            }
                          >
                            {suggestion.completed ? "Undo" : "Mark Complete"}
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Real-Time Threat Alerts */}
          <Grid item xs={12}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${colors.deepSpace}, ${colors.nebulaBlue})`,
                boxShadow: `0 0 15px ${colors.matrixGreen}30, 0 0 30px ${colors.electricBlue}15`,
                border: `1px solid ${colors.matrixGreen}30`,
                borderRadius: "16px",
              }}
            >
              <CardContent>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      background: `linear-gradient(90deg, ${colors.matrixGreen}, ${colors.electricBlue})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    <ThreatIcon sx={{ mr: 2, color: colors.hackerGreen }} />{" "}
                    Real-Time Threat Alerts
                    {!emailConnected && (
                      <Chip
                        label="Demo Data"
                        size="small"
                        sx={{
                          ml: 2,
                          backgroundColor: `${colors.electricBlue}30`,
                          color: colors.electricBlue,
                          border: `1px solid ${colors.electricBlue}60`,
                        }}
                      />
                    )}
                  </Typography>
                  {isScanning ? (
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: 200, height: 200, mb: 2 }}>
                        <CircularProgressbar
                          value={scanProgress}
                          text={`${scanProgress}%`}
                          styles={buildStyles({
                            textColor: colors.starlight,
                            pathColor: colors.hackerGreen,
                            trailColor: "rgba(255,255,255,0.1)",
                            textSize: "24px",
                          })}
                        />
                      </Box>
                      <Typography variant="h6" sx={{ color: colors.starlight }}>
                        Security Scan in Progress
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: colors.cosmicDust }}
                      >
                        Analyzing system for potential threats...
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<ScanIcon />}
                        onClick={startSecurityScan}
                        sx={{
                          mt: 2,
                          background: `linear-gradient(90deg, ${colors.matrixGreen}, ${colors.electricBlue})`,
                          color: colors.deepSpace,
                          fontWeight: "bold",
                          "&:hover": {
                            boxShadow: `0 0 15px ${colors.matrixGreen}`,
                          },
                        }}
                      >
                        {isScanning ? "Scanning..." : "Scan for Threats"}
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      {threats.length === 0 ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 4,
                          }}
                        >
                          <CheckCircleIcon
                            sx={{
                              fontSize: 80,
                              color: colors.hackerGreen,
                              mb: 2,
                            }}
                          />
                          <Typography
                            variant="h6"
                            sx={{ mb: 1, color: colors.starlight }}
                          >
                            No Active Threats Detected
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: "center",
                              color: colors.cosmicDust,
                            }}
                          >
                            Your system is secure and no immediate threats have
                            been identified.
                          </Typography>
                          <Button
                            variant="contained"
                            startIcon={<ScanIcon />}
                            onClick={startSecurityScan}
                            sx={{
                              mt: 2,
                              background: `linear-gradient(90deg, ${colors.matrixGreen}, ${colors.electricBlue})`,
                              color: colors.deepSpace,
                              fontWeight: "bold",
                              "&:hover": {
                                boxShadow: `0 0 15px ${colors.matrixGreen}`,
                              },
                            }}
                          >
                            Perform Security Scan
                          </Button>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            maxHeight: "400px",
                            overflowY: "auto",
                            paddingRight: "8px",
                            "&::-webkit-scrollbar": {
                              width: "4px",
                              backgroundColor: "transparent",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "rgba(255,255,255,0.2)",
                              borderRadius: "4px",
                            },
                          }}
                        >
                          {threats.map((threat) => (
                            <Box
                              key={threat.id}
                              sx={{
                                backgroundColor: `${colors.cosmicPurple}`,
                                border: `1px solid ${
                                  threat.risk === "High"
                                    ? colors.plasmaPink
                                    : threat.risk === "Medium"
                                    ? colors.electricBlue
                                    : colors.matrixGreen
                                }`,
                                borderRadius: 2,
                                p: 2,
                                mb: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                boxShadow: `0 0 10px ${
                                  threat.risk === "High"
                                    ? `${colors.plasmaPink}40`
                                    : threat.risk === "Medium"
                                    ? `${colors.electricBlue}40`
                                    : `${colors.matrixGreen}40`
                                }`,
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    color:
                                      threat.risk === "High"
                                        ? colors.plasmaPink
                                        : threat.risk === "Medium"
                                        ? colors.electricBlue
                                        : colors.matrixGreen,
                                  }}
                                >
                                  {threat.description}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: 1,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <Chip
                                    label={`${threat.risk} Risk`}
                                    size="small"
                                    sx={{
                                      backgroundColor:
                                        threat.risk === "High"
                                          ? `${colors.plasmaPink}30`
                                          : threat.risk === "Medium"
                                          ? `${colors.electricBlue}30`
                                          : `${colors.matrixGreen}30`,
                                      color:
                                        threat.risk === "High"
                                          ? colors.plasmaPink
                                          : threat.risk === "Medium"
                                          ? colors.electricBlue
                                          : colors.matrixGreen,
                                      border: `1px solid ${
                                        threat.risk === "High"
                                          ? `${colors.plasmaPink}60`
                                          : threat.risk === "Medium"
                                          ? `${colors.electricBlue}60`
                                          : `${colors.matrixGreen}60`
                                      }`,
                                    }}
                                  />
                                  <Chip
                                    label={
                                      threat.type === "phishing"
                                        ? "Phishing Email"
                                        : threat.type
                                    }
                                    size="small"
                                    sx={{
                                      backgroundColor: `${colors.electricBlue}30`,
                                      color: colors.electricBlue,
                                      border: `1px solid ${colors.electricBlue}60`,
                                    }}
                                  />
                                  {threat.probability && (
                                    <Chip
                                      label={`${(
                                        threat.probability * 100
                                      ).toFixed(0)}% Confidence`}
                                      size="small"
                                      sx={{
                                        backgroundColor: `${colors.matrixGreen}30`,
                                        color: colors.matrixGreen,
                                        border: `1px solid ${colors.matrixGreen}60`,
                                      }}
                                    />
                                  )}
                                  {!emailConnected && (
                                    <Chip
                                      label="Demo Data"
                                      variant="outlined"
                                      size="small"
                                      sx={{
                                        backgroundColor: "transparent",
                                        color: colors.cosmicDust,
                                        border: `1px solid ${colors.cosmicDust}`,
                                      }}
                                    />
                                  )}
                                </Box>
                                {threat.sender && (
                                  <Typography
                                    variant="body2"
                                    sx={{ mt: 1, color: colors.cosmicDust }}
                                  >
                                    From: {threat.sender}
                                  </Typography>
                                )}
                                {threat.subject && (
                                  <Typography
                                    variant="body2"
                                    sx={{ color: colors.cosmicDust }}
                                  >
                                    Subject: {threat.subject}
                                  </Typography>
                                )}
                              </Box>
                              <Box>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  sx={{
                                    mr: 1,
                                    borderColor: colors.electricBlue,
                                    color: colors.electricBlue,
                                    "&:hover": {
                                      backgroundColor: `${colors.electricBlue}20`,
                                      borderColor: colors.electricBlue,
                                    },
                                  }}
                                  onClick={() => handleMarkAsSafe(threat.id)}
                                >
                                  Mark as Safe
                                </Button>
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    background: `linear-gradient(90deg, ${colors.electricBlue}, ${colors.plasmaPink})`,
                                    color: colors.deepSpace,
                                    fontWeight: "bold",
                                    "&:hover": {
                                      boxShadow: `0 0 10px ${colors.electricBlue}`,
                                    },
                                  }}
                                  onClick={() => handleReportThreat(threat)}
                                >
                                  Report
                                </Button>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${colors.deepSpace}, ${colors.nebulaBlue})`,
                boxShadow: `0 0 15px ${colors.matrixGreen}30, 0 0 30px ${colors.electricBlue}15`,
                border: `1px solid ${colors.matrixGreen}30`,
                borderRadius: "16px",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <HistoryIcon sx={{ mr: 2, color: colors.hackerGreen }} />
                    <Typography
                      variant="h6"
                      sx={{
                        background: `linear-gradient(90deg, ${colors.matrixGreen}, ${colors.electricBlue})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Threat Resolution History
                    </Typography>
                  </Box>
                </Box>
                <TableContainer
                  component={Paper}
                  sx={{
                    backgroundColor: colors.deepSpace,
                    boxShadow: "none",
                    border: `1px solid ${colors.matrixGreen}30`,
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow
                        sx={{ backgroundColor: `${colors.cosmicPurple}` }}
                      >
                        <TableCell
                          sx={{
                            color: colors.electricBlue,
                            fontWeight: "bold",
                            borderBottom: `1px solid ${colors.electricBlue}40`,
                          }}
                        >
                          S.No
                        </TableCell>
                        <TableCell
                          sx={{
                            color: colors.electricBlue,
                            fontWeight: "bold",
                            borderBottom: `1px solid ${colors.electricBlue}40`,
                          }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          sx={{
                            color: colors.electricBlue,
                            fontWeight: "bold",
                            borderBottom: `1px solid ${colors.electricBlue}40`,
                          }}
                        >
                          Threat Type
                        </TableCell>
                        <TableCell
                          sx={{
                            color: colors.electricBlue,
                            fontWeight: "bold",
                            borderBottom: `1px solid ${colors.electricBlue}40`,
                          }}
                        >
                          Description
                        </TableCell>
                        <TableCell
                          sx={{
                            color: colors.electricBlue,
                            fontWeight: "bold",
                            borderBottom: `1px solid ${colors.electricBlue}40`,
                          }}
                        >
                          Risk
                        </TableCell>
                        <TableCell
                          sx={{
                            color: colors.electricBlue,
                            fontWeight: "bold",
                            borderBottom: `1px solid ${colors.electricBlue}40`,
                          }}
                        >
                          Action Taken
                        </TableCell>
                        <TableCell
                          sx={{
                            color: colors.electricBlue,
                            fontWeight: "bold",
                            borderBottom: `1px solid ${colors.electricBlue}40`,
                          }}
                        >
                          Resolved By
                        </TableCell>
                        <TableCell
                          sx={{
                            color: colors.electricBlue,
                            fontWeight: "bold",
                            borderBottom: `1px solid ${colors.electricBlue}40`,
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {threatHistory.map((threat, index) => (
                        <TableRow
                          key={threat.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            backgroundColor: colors.nebulaBlue,
                            borderBottom: `1px solid ${colors.electricBlue}20`,
                            "&:hover": {
                              backgroundColor: `${colors.cosmicPurple}90`,
                              boxShadow: `inset 0 0 8px ${colors.electricBlue}40`,
                            },
                          }}
                        >
                          <TableCell
                            sx={{
                              color: colors.starlight,
                              borderBottom: "none",
                            }}
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: colors.starlight,
                              borderBottom: "none",
                            }}
                          >
                            {threat.date}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: colors.starlight,
                              borderBottom: "none",
                            }}
                          >
                            {threat.type}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: colors.starlight,
                              borderBottom: "none",
                            }}
                          >
                            {threat.description}
                          </TableCell>
                          <TableCell sx={{ borderBottom: "none" }}>
                            <Chip
                              label={`${threat.risk} Risk`}
                              size="small"
                              sx={{
                                backgroundColor:
                                  threat.risk === "High"
                                    ? `${colors.plasmaPink}30`
                                    : threat.risk === "Medium"
                                    ? `${colors.electricBlue}30`
                                    : `${colors.matrixGreen}30`,
                                color:
                                  threat.risk === "High"
                                    ? colors.plasmaPink
                                    : threat.risk === "Medium"
                                    ? colors.electricBlue
                                    : colors.matrixGreen,
                                border: `1px solid ${
                                  threat.risk === "High"
                                    ? `${colors.plasmaPink}60`
                                    : threat.risk === "Medium"
                                    ? `${colors.electricBlue}60`
                                    : `${colors.matrixGreen}60`
                                }`,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              color: colors.starlight,
                              borderBottom: "none",
                            }}
                          >
                            {threat.action}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: colors.starlight,
                              borderBottom: "none",
                            }}
                          >
                            {threat.resolvedBy}
                          </TableCell>
                          <TableCell sx={{ borderBottom: "none" }}>
                            <IconButton
                              size="small"
                              sx={{
                                color: colors.plasmaPink,
                                "&:hover": {
                                  backgroundColor: `${colors.plasmaPink}20`,
                                },
                              }}
                              onClick={() => removeThreatFromHistory(threat.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
            <FirewallRules threats={actualThreats} />
          </Grid>
        </Grid>
      </Box>
      <EmailAuthModal
        open={emailAuthModalOpen}
        onClose={() => setEmailAuthModalOpen(false)}
        onAuthenticate={handleEmailAuthSuccess}
      />

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default SecurityDashboard;
