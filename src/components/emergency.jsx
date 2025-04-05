import React, { useState, useEffect } from "react";
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
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { submitCyberReport } from "../api/reportService";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../chatbot/config";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";

// Constants
const CYBER_POLICE_PHONE = "8072964586";
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_CONTACT_LENGTH = 20;
const MAX_EMAIL_LENGTH = 100;

// Styles
const autocompleteStyles = {
  width: "100%",
  marginBottom: "20px",
  "& .MuiAutocomplete-root": { color: "#fff !important" },
  "& .MuiAutocomplete-inputRoot": {
    color: "#fff !important",
    "& .MuiAutocomplete-input": { color: "#fff !important" },
  },
  "& .MuiInputLabel-root": { color: "#fff !important" },
  "& .MuiAutocomplete-popper": {
    "& .MuiAutocomplete-listbox": {
      backgroundColor: "#253242 !important",
      color: "#fff !important",
    },
    "& .MuiAutocomplete-option": {
      color: "#fff !important",
      "&.Mui-focused": {
        backgroundColor: "#007bff !important",
        color: "#fff !important",
      },
    },
  },
};

const textFieldStyles = {
  width: "100%",
  marginBottom: "20px",
  "& .MuiInputLabel-root": { color: "#fff !important" },
  "& .MuiOutlinedInput-root": {
    color: "#fff !important",
    "& input, & textarea": { color: "#fff !important" },
    "& fieldset": { borderColor: "#fff" },
    "&:hover fieldset": { borderColor: "#fff" },
    "&.Mui-focused fieldset": { borderColor: "#007bff" },
  },
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#1A2133",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  p: 4,
  border: "1px solid rgba(66, 153, 225, 0.5)",
  animation: "pulse 2s infinite",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "5px",
    background: "linear-gradient(90deg, #3182CE 0%, #63B3ED 100%)",
  },
};

// Component abstractions
const CyberPoliceModal = ({ open, onClose, actions, phone, onHelpRequest }) => (
  <Modal
    open={open}
    onClose={onClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
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
            <Shield sx={{ fontSize: 40, mr: 2, color: "#63B3ED" }} />
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                display: "flex",
                alignItems: "center",
              }}
            >
              Cyber Police Division
              <Verified
                sx={{
                  ml: 1,
                  color: "#4caf50",
                  animation: "pulse 1.5s infinite",
                }}
              />
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "#0A2342",
              color: "#fff",
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
          sx={{ color: "#B2CADE", mb: 3, fontWeight: "medium" }}
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
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Check sx={{ color: "#4caf50", mr: 1, fontSize: 20 }} />
                    {action.text}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: "#B2CADE", fontSize: "14px" }}>
                    {action.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            onClick={onHelpRequest}
            sx={{
              py: 1.5,
              px: 6,
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #3182CE 0%, #63B3ED 100%)",
              boxShadow: "0 4px 14px rgba(49, 130, 206, 0.5)",
              transition: "all 0.3s",
              "&:hover": {
                background: "linear-gradient(90deg, #2B6CB0 0%, #4299E1 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(49, 130, 206, 0.7)",
              },
            }}
            startIcon={<PhoneIcon />}
          >
            Call Cyber Police Now
          </Button>
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
          bgcolor: "#1A2133",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          p: 4,
          textAlign: "center",
          border: "1px solid rgba(66, 153, 225, 0.5)",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <div
            style={{
              width: "150px",
              height: "150px",
              margin: "0 auto",
              backgroundColor: "#3182CE",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              animation: "pulse 1.5s infinite",
            }}
          >
            <PhoneIcon sx={{ fontSize: 80, color: "#fff" }} />
          </div>
        </Box>
        <Typography
          variant="h5"
          sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}
        >
          Connecting to Cyber Police
        </Typography>
        <Typography variant="body1" sx={{ color: "#B2CADE" }}>
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
        backgroundColor: "#1A3B5C",
        color: "#fff",
        "& .MuiAlert-icon": { color: "#fff" },
        "& .MuiAlert-message": { color: "#fff" },
        "& .MuiAlert-action": { color: "#fff" },
      }}
    >
      {message}
    </Alert>
  </Snackbar>
);

const EmergencyCyberHelpPage = () => {
  const { user } = useAuth();
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
      icon: <Person sx={{ color: "#4caf50" }} />,
      description: "Our cyber forensics team can trace digital footprints",
    },
    {
      text: "Help remove leaked content",
      icon: <GavelRounded sx={{ color: "#4caf50" }} />,
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
    <div className="min-h-screen bg-gradient-to-br from-[#0A2342] via-[#1F4068] to-[#1A3B5C] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-5xl w-full space-y-8">
        <h1 className="text-6xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 animate-pulse">
          Emergency Cyber Help
        </h1>

        <p className="text-xl text-gray-200 mb-10 tracking-wide">
          Immediate action for online threats – Report & Get Help Now!
        </p>

        <div className="flex justify-center items-center w-full space-x-8">
          {actionButtons.map((btn) => (
            <Button
              key={btn.label}
              variant="contained"
              color={btn.color}
              startIcon={btn.icon}
              onClick={btn.onClick}
              sx={{
                mx: 2,
                transform: "scale(1)",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                },
              }}
              className={`
                text-lg capitalize py-4 px-6
                ${
                  btn.label === "Report an Incident"
                    ? "bg-red-600"
                    : btn.label === "AI Chatbot Help"
                    ? "bg-green-600"
                    : "bg-blue-600"
                }
              `}
            >
              {btn.label}
            </Button>
          ))}
        </div>

        <Card
          sx={{
            width: "100%",
            padding: "20px",
            backgroundColor: "#253242",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            marginTop: "30px",
          }}
        >
          <CardContent sx={{ mt: -3 }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#fff",
              }}
            >
              Report an Incident
            </h2>

            <form onSubmit={handleReportSubmit}>
              <Autocomplete
                disablePortal
                id="incident-type"
                options={incidentTypes}
                value={incidentType}
                sx={autocompleteStyles}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="What happened?"
                    required
                    fullWidth
                    error={!!formErrors.incidentType}
                    helperText={formErrors.incidentType}
                    sx={textFieldStyles}
                  />
                )}
                onChange={(event, value) => setIncidentType(value)}
              />

              <TextField
                id="email"
                label="Your Email"
                type="email"
                required
                sx={textFieldStyles}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!formErrors.email}
                helperText={formErrors.email}
                InputProps={{
                  style: { color: "#fff" },
                  startAdornment: (
                    <EmailIcon sx={{ color: "#fff", mr: 1, fontSize: 20 }} />
                  ),
                }}
              />

              <TextField
                id="contactNumber"
                label="Your Contact Number"
                sx={textFieldStyles}
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                error={!!formErrors.contactNumber}
                helperText={formErrors.contactNumber}
                InputProps={{
                  style: { color: "#fff" },
                  startAdornment: (
                    <PhoneIcon sx={{ color: "#fff", mr: 1, fontSize: 20 }} />
                  ),
                }}
              />

              <TextField
                id="description"
                label="Describe the issue (optional)"
                multiline
                rows={4}
                sx={textFieldStyles}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!formErrors.description}
                helperText={formErrors.description}
                InputProps={{ style: { color: "#fff" } }}
                inputProps={{
                  maxLength: MAX_DESCRIPTION_LENGTH,
                }}
                FormHelperTextProps={{
                  sx: {
                    textAlign: "right",
                    marginLeft: 0,
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  width: "100%",
                  backgroundColor: "#ff0000",
                  color: "#fff",
                  padding: "10px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#cc0000" },
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit Report"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

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
      </div>
    </div>
  );
};

export default EmergencyCyberHelpPage;
