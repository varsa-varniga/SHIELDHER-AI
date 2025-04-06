import React, { useState, useEffect, createContext, useContext } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Autocomplete,
  Snackbar,
  Alert,
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Backdrop,
  CircularProgress,
  Avatar,
  Chip,
  Divider,
  useTheme,
  styled,
} from "@mui/material";
import {
  ReportProblem,
  ContactSupport,
  Security,
  Check,
  Verified,
  Shield,
  GavelRounded,
  Person,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Bolt,
  Lock,
  Public,
} from "@mui/icons-material";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../chatbot/config";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";
import { submitCyberReport } from "../api/reportService";

// Cyberpunk color palette
const colors = {
  deepSpace: "#0a0e17",
  cosmicPurple: "#1a1a2e",
  nebulaBlue: "#16213e",
  cyberViolet: "#4a148c",
  matrixGreen: "#00ff9d",
  electricBlue: "#00d1ff",
  plasmaPink: "#ff00aa",
  starlight: "#e6f1ff",
  cosmicDust: "#7f8c8d",
  voidBlack: "#000000",
  hackerGreen: "#39ff14",
};

// CyberGlass effect
const CyberGlassBox = styled(Box)(({ theme }) => ({
  background: "rgba(10, 14, 23, 0.7)",
  border: "1px solid rgba(0, 255, 157, 0.2)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
  borderRadius: "16px",
  padding: theme.spacing(4),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
  },
}));

const CyberTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: colors.starlight,
    borderRadius: "12px",
    "& fieldset": {
      borderColor: `${colors.matrixGreen}50`,
      transition: "all 0.3s ease",
    },
    "&:hover fieldset": {
      borderColor: `${colors.matrixGreen}80`,
      boxShadow: `0 0 10px ${colors.matrixGreen}30`,
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.matrixGreen,
      boxShadow: `0 0 15px ${colors.matrixGreen}50`,
    },
  },
  "& .MuiInputLabel-root": {
    color: `${colors.cosmicDust} !important`,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: `${colors.matrixGreen} !important`,
  },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: `0 0 0 100px ${colors.deepSpace} inset`,
    WebkitTextFillColor: colors.starlight,
    borderRadius: "12px",
    caretColor: colors.starlight,
  },
});

const CyberButton = styled(Button)({
  position: "relative",
  overflow: "hidden",
  border: "1px solid transparent",
  background: `linear-gradient(${colors.deepSpace}, ${colors.deepSpace}) padding-box, 
                linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%) border-box`,
  color: colors.starlight,
  fontWeight: "bold",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: `0 10px 20px ${colors.matrixGreen}30`,
    background: `linear-gradient(${colors.deepSpace}, ${colors.deepSpace}) padding-box, 
                    linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.plasmaPink} 100%) border-box`,
  },
  "&:disabled": {
    background: `${colors.deepSpace} !important`,
    border: `1px solid ${colors.cosmicDust} !important`,
    color: `${colors.cosmicDust} !important`,
  },
  "&:after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, transparent, ${colors.matrixGreen}20, transparent)`,
    transform: "translateX(-100%)",
    transition: "transform 0.6s ease",
  },
  "&:hover:after": {
    transform: "translateX(100%)",
  },
});

const CyberAutocomplete = styled(Autocomplete)({
  "& .MuiAutocomplete-inputRoot": {
    color: colors.starlight,
    "& .MuiAutocomplete-input": {
      color: colors.starlight,
      borderRadius: "12px",
    },
  },
  "& .MuiInputLabel-root": {
    color: colors.cosmicDust,
    "&.Mui-focused": {
      color: colors.matrixGreen,
    },
  },
  "& .MuiAutocomplete-popper": {
    "& .MuiAutocomplete-listbox": {
      backgroundColor: `${colors.nebulaBlue} !important`,
      color: colors.starlight,
      border: `1px solid ${colors.matrixGreen}50`,
      borderRadius: "12px",
    },
    "& .MuiAutocomplete-option": {
      color: colors.starlight,
      "&.Mui-focused": {
        backgroundColor: `${colors.matrixGreen}20 !important`,
      },
    },
  },
});

const CyberText = styled(Typography)({
  background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
  fontWeight: "bold",
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: colors.nebulaBlue,
  borderRadius: "16px",
  boxShadow: `0 10px 30px ${colors.voidBlack}80`,
  p: 4,
  border: `1px solid ${colors.matrixGreen}50`,
  animation: "pulse 2s infinite",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "5px",
    background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
  },
};

const CyberPoliceModal = ({ open, onClose, actions, phone, onHelpRequest }) => (
  <Modal
    open={open}
    onClose={onClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      sx: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(5px)",
      },
    }}
  >
    <Fade in={open}>
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Shield sx={{ fontSize: 40, mr: 2, color: colors.electricBlue }} />
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: colors.starlight,
                display: "flex",
                alignItems: "center",
              }}
            >
              Cyber Police Division
              <Verified
                sx={{
                  ml: 1,
                  color: colors.matrixGreen,
                  animation: "pulse 1.5s infinite",
                }}
              />
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: colors.cyberViolet,
              color: colors.starlight,
              px: 2,
              py: 0.5,
              borderRadius: "20px",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <PhoneIcon sx={{ mr: 1, fontSize: 16 }} />
            {phone}
          </Box>
        </Box>

        <Typography
          variant="body1"
          sx={{ color: colors.cosmicDust, mb: 3, fontWeight: "medium" }}
        >
          Our cyber police unit is ready to assist with your online emergency.
        </Typography>

        <List>
          {actions.map((action, index) => (
            <ListItem
              key={index}
              sx={{
                bgcolor: "rgba(30, 64, 104, 0.4)",
                borderRadius: "8px",
                mb: 2,
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "rgba(30, 64, 104, 0.6)",
                  transform: "translateX(5px)",
                },
              }}
            >
              <ListItemIcon>{action.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      color: colors.starlight,
                      fontWeight: "bold",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Check
                      sx={{ color: colors.matrixGreen, mr: 1, fontSize: 20 }}
                    />
                    {action.text}
                  </Typography>
                }
                secondary={
                  <Typography
                    sx={{ color: colors.cosmicDust, fontSize: "14px" }}
                  >
                    {action.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CyberButton
            variant="contained"
            onClick={onHelpRequest}
            sx={{
              py: 1.5,
              px: 6,
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
              boxShadow: `0 4px 14px ${colors.matrixGreen}50`,
              "&:hover": {
                background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.plasmaPink} 100%)`,
                transform: "translateY(-2px)",
                boxShadow: `0 6px 20px ${colors.matrixGreen}70`,
              },
            }}
            startIcon={<PhoneIcon />}
          >
            Call Cyber Police Now
          </CyberButton>
        </Box>
      </Box>
    </Fade>
  </Modal>
);

const ConfirmationModal = ({ open, phone }) => (
  <Modal open={open} closeAfterTransition BackdropComponent={Backdrop}>
    <Fade in={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: colors.nebulaBlue,
          borderRadius: "16px",
          boxShadow: `0 10px 30px ${colors.voidBlack}80`,
          p: 4,
          textAlign: "center",
          border: `1px solid ${colors.matrixGreen}50`,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <div
            style={{
              width: "150px",
              height: "150px",
              margin: "0 auto",
              background: `linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              animation: "pulse 1.5s infinite",
            }}
          >
            <PhoneIcon sx={{ fontSize: 80, color: colors.starlight }} />
          </div>
        </Box>
        <Typography
          variant="h5"
          sx={{ color: colors.starlight, fontWeight: "bold", mb: 2 }}
        >
          Connecting to Cyber Police
        </Typography>
        <Typography variant="body1" sx={{ color: colors.cosmicDust }}>
          Initiating call to {phone}. Please stay on the line.
        </Typography>
      </Box>
    </Fade>
  </Modal>
);

const Notification = ({ open, message, severity, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  >
    <Alert
      onClose={onClose}
      severity={severity}
      sx={{
        width: "100%",
        backgroundColor: colors.nebulaBlue,
        color: colors.starlight,
        border: `1px solid ${colors.matrixGreen}50`,
        "& .MuiAlert-icon": { color: colors.starlight },
        "& .MuiAlert-message": { color: colors.starlight },
        "& .MuiAlert-action": { color: colors.starlight },
      }}
    >
      {message}
    </Alert>
  </Snackbar>
);

// Create a simple AuthContext if none exists
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return { user: { email: "", id: "" } };
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Constants
const CYBER_POLICE_PHONE = "8072964586";
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_CONTACT_LENGTH = 20;
const MAX_EMAIL_LENGTH = 100;

const EmergencyCyberHelpPage = () => {
  const theme = useTheme();
  const auth = useAuth();
  const user = auth?.user || null;

  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [incidentType, setIncidentType] = useState(null);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [cyberPoliceModalOpen, setCyberPoliceModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({
    incidentType: "",
    email: "",
    contactNumber: "",
    description: "",
  });

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const actionButtons = [
    {
      label: "Report an Incident",
      color: "error",
      icon: <ReportProblem />,
      description: "Immediate threat reporting",
    },
    {
      label: "AI Chatbot Help",
      color: "success",
      icon: <ContactSupport />,
      description: "Instant cyber guidance",
      onClick: () => setIsChatbotVisible(!isChatbotVisible),
    },
    {
      label: "Connect with Cyber Police",
      color: "primary",
      icon: <Security />,
      description: "Official support",
      onClick: () => setCyberPoliceModalOpen(true),
    },
  ];

  const incidentTypes = [
    { label: "Blackmail" },
    { label: "Harassment" },
    { label: "Phishing" },
    { label: "Other" },
  ];

  const cyberPoliceActions = [
    {
      text: "Identify the scammer",
      icon: <Person sx={{ color: colors.matrixGreen }} />,
      description: "Our cyber forensics team can trace digital footprints",
    },
    {
      text: "Help remove leaked content",
      icon: <GavelRounded sx={{ color: colors.matrixGreen }} />,
      description: "We work with platforms to remove harmful content",
    },
  ];

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!incidentType) {
      errors.incidentType = "Incident type is required";
      isValid = false;
    }

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    } else if (email.length > MAX_EMAIL_LENGTH) {
      errors.email = `Email must be less than ${MAX_EMAIL_LENGTH} characters`;
      isValid = false;
    }

    if (contactNumber && contactNumber.length > MAX_CONTACT_LENGTH) {
      errors.contactNumber = `Contact number must be less than ${MAX_CONTACT_LENGTH} characters`;
      isValid = false;
    }

    if (description && description.length > MAX_DESCRIPTION_LENGTH) {
      errors.description = `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters`;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const reportData = {
        incidentType: incidentType.label,
        description: description.substring(0, MAX_DESCRIPTION_LENGTH),
        email: email.substring(0, MAX_EMAIL_LENGTH),
        contactNumber: contactNumber
          ? contactNumber.substring(0, MAX_CONTACT_LENGTH)
          : "",
        userId: user?.id,
      };

      const response = await submitCyberReport(reportData);

      showNotification(
        response.message || "Report submitted successfully!",
        "success"
      );
      resetForm();
    } catch (error) {
      console.error("Report submission error:", error);

      let errorMsg = error.message;
      if (error.response?.data?.errors) {
        errorMsg = error.response.data.errors.join(", ");
      } else if (error.message.includes("500")) {
        errorMsg = "Server error. Please try again later.";
      } else if (error.message.includes("Network Error")) {
        errorMsg = "Network connection issue. Please check your internet.";
      }

      showNotification(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const resetForm = () => {
    setIncidentType(null);
    setDescription("");
    setContactNumber("");
    setFormErrors({
      incidentType: "",
      email: "",
      contactNumber: "",
      description: "",
    });
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const handleRequestCyberPoliceHelp = () => {
    setCyberPoliceModalOpen(false);
    setConfirmationModalOpen(true);

    setTimeout(() => {
      setConfirmationModalOpen(false);
      window.location.href = `tel:${CYBER_POLICE_PHONE}`;
      showNotification(
        `Connecting you to Cyber Police at ${CYBER_POLICE_PHONE}.`,
        "success"
      );
    }, 3000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${colors.deepSpace} 0%, ${colors.cosmicPurple} 100%)`,
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 20% 30%, ${colors.cyberViolet}20 0%, transparent 50%)`,
        },
        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 80% 70%, ${colors.plasmaPink}10 0%, transparent 50%)`,
        },
      }}
    >
      <Box sx={{ maxWidth: "1200px", width: "100%", p: 3 }}>
        <CyberGlassBox>
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Chip
                label="Emergency Response"
                sx={{
                  background: `linear-gradient(90deg, ${colors.matrixGreen}20, ${colors.electricBlue}20)`,
                  color: colors.matrixGreen,
                  mb: 2,
                  px: 2,
                  py: 1,
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                }}
                icon={<Bolt sx={{ color: colors.matrixGreen }} />}
              />
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  mb: 1,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  lineHeight: 1.2,
                  letterSpacing: "-0.03em",
                  color: colors.starlight,
                }}
              >
                <CyberText sx={{ fontSize: "inherit" }}>
                  CYBER EMERGENCY
                </CyberText>{" "}
                RESPONSE
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  color: colors.cosmicDust,
                  lineHeight: 1.6,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                Immediate action for online threats – Report & Get Help Now!
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                flexWrap: "wrap",
                mb: 4,
              }}
            >
              {actionButtons.map((btn) => (
                <CyberButton
                  key={btn.label}
                  variant="contained"
                  startIcon={btn.icon}
                  onClick={btn.onClick}
                  sx={{
                    px: 6,
                    py: 1,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    minWidth: "250px",
                    ...(btn.label === "Report an Incident" && {
                      background: `linear-gradient(135deg, ${colors.plasmaPink} 0%, ${colors.cyberViolet} 100%)`,
                    }),
                    ...(btn.label === "AI Chatbot Help" && {
                      background: `linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
                    }),
                    ...(btn.label === "Connect with Cyber Police" && {
                      background: `linear-gradient(135deg, ${colors.electricBlue} 0%, ${colors.cyberViolet} 100%)`,
                    }),
                  }}
                >
                  {btn.label}
                </CyberButton>
              ))}
            </Box>

            <Box
              sx={{
                background: `linear-gradient(145deg, ${colors.nebulaBlue} 0%, ${colors.cosmicPurple} 100%)`,
                border: `1px solid ${colors.matrixGreen}30`,
                borderRadius: "16px",
                p: 4,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: `${colors.matrixGreen}20`,
                    color: colors.matrixGreen,
                    width: 60,
                    height: 60,
                    mr: 3,
                  }}
                >
                  <ReportProblem fontSize="large" />
                </Avatar>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: colors.starlight,
                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                  }}
                >
                  INCIDENT REPORT
                </Typography>
              </Box>

              <Divider
                sx={{
                  background: `linear-gradient(90deg, transparent, ${colors.matrixGreen}50, transparent)`,
                  height: "1px",
                  border: "none",
                  my: 4,
                }}
              />

              <form onSubmit={handleReportSubmit}>
                <CyberAutocomplete
                  disablePortal
                  id="incident-type"
                  options={incidentTypes}
                  value={incidentType}
                  renderInput={(params) => (
                    <CyberTextField
                      {...params}
                      label="What happened?"
                      required
                      fullWidth
                      error={!!formErrors.incidentType}
                      helperText={formErrors.incidentType}
                      sx={{ mb: 4 }}
                    />
                  )}
                  onChange={(event, value) => setIncidentType(value)}
                />

                <CyberTextField
                  id="email"
                  label="Your Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  InputProps={{
                    startAdornment: (
                      <EmailIcon
                        sx={{ color: colors.matrixGreen, mr: 1, fontSize: 20 }}
                      />
                    ),
                  }}
                  sx={{ mb: 4 }}
                  fullWidth
                />

                <CyberTextField
                  id="contactNumber"
                  label="Your Contact Number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  error={!!formErrors.contactNumber}
                  helperText={formErrors.contactNumber}
                  InputProps={{
                    startAdornment: (
                      <PhoneIcon
                        sx={{ color: colors.matrixGreen, mr: 1, fontSize: 20 }}
                      />
                    ),
                  }}
                  sx={{ mb: 4 }}
                  fullWidth
                />

                <CyberTextField
                  id="description"
                  label="Describe the issue (optional)"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                  InputProps={{
                    sx: {
                      alignItems: "flex-start", // Better alignment for multiline
                    },
                  }}
                  inputProps={{
                    maxLength: MAX_DESCRIPTION_LENGTH,
                  }}
                  FormHelperTextProps={{
                    sx: {
                      textAlign: "right",
                      marginLeft: 0,
                    },
                  }}
                  sx={{
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                      alignItems: "flex-start", // Ensures proper multiline alignment
                    },
                  }}
                  fullWidth
                />

                <CyberButton
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    width: "100%",
                    py: 1,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    background: `linear-gradient(135deg, ${colors.plasmaPink} 0%, ${colors.cyberViolet} 100%)`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${colors.cyberViolet} 0%, ${colors.plasmaPink} 100%)`,
                    },
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "SUBMIT REPORT"
                  )}
                </CyberButton>
              </form>
            </Box>
          </Box>
        </CyberGlassBox>

        {/* Chatbot Modal */}
        {isChatbotVisible && (
          <div
            style={{
              position: "fixed",
              bottom: 30,
              right: 20,
              zIndex: 1000,
            }}
          >
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>
        )}

        <CyberPoliceModal
          open={cyberPoliceModalOpen}
          onClose={() => setCyberPoliceModalOpen(false)}
          actions={cyberPoliceActions}
          phone={CYBER_POLICE_PHONE}
          onHelpRequest={handleRequestCyberPoliceHelp}
        />

        <ConfirmationModal
          open={confirmationModalOpen}
          phone={CYBER_POLICE_PHONE}
        />

        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </Box>
    </Box>
  );
};

export default EmergencyCyberHelpPage;
