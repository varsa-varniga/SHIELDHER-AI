import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Fade,
  Slide,
  CircularProgress,
  InputAdornment,
  Container,
} from "@mui/material";
import {
  Edit,
  Visibility,
  VisibilityOff,
  Lock,
  Security,
  Delete,
  Person,
  Email,
  Description,
  Dangerous,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import axios from "axios";

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
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `linear-gradient(45deg, transparent 45%, ${colors.matrixGreen}20 50%, transparent 55%)`,
    opacity: 0.3,
    pointerEvents: "none",
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

const DangerButton = styled(CyberButton)({
  background: `linear-gradient(${colors.deepSpace}, ${colors.deepSpace}) padding-box, 
              linear-gradient(135deg, ${colors.plasmaPink} 0%, ${colors.cyberViolet} 100%) border-box`,
  "&:hover": {
    background: `linear-gradient(${colors.deepSpace}, ${colors.deepSpace}) padding-box, 
                linear-gradient(135deg, ${colors.plasmaPink} 0%, ${colors.cyberViolet} 100%) border-box`,
  },
});

const CyberTab = styled(Tab)({
  color: `${colors.cosmicDust} !important`,
  "&.Mui-selected": {
    color: `${colors.matrixGreen} !important`,
  },
  "&.Mui-disabled": {
    color: `${colors.cosmicDust}50 !important`,
  },
});

const ProfileTabPanel = ({ children, value, index, ...other }) => (
  <div hidden={value !== index} {...other}>
    {value === index && (
      <Box sx={{ p: 3 }}>
        <Fade in={value === index} timeout={300}>
          <div>{children}</div>
        </Fade>
      </Box>
    )}
  </div>
);

const ProfileSettings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user.id;
  const [formData, setFormData] = useState({
    name: user.username || user.name || "",
    email: user.email || "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [isGoogleUser] = useState(false);
  const [alerts, setAlerts] = useState({
    error: "",
    success: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/users/${userId}`,
        {
          username: formData.name,
          email: formData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update local storage with new user data
      const updatedUser = {
        ...user,
        username: formData.name,
        email: formData.email,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setEditMode(false);
      setAlerts({
        ...alerts,
        success: "Profile updated successfully!",
        error: "",
      });
      setTimeout(() => setAlerts({ ...alerts, success: "" }), 4000);
    } catch (error) {
      setAlerts({
        ...alerts,
        error: error.response?.data?.message || "Failed to update profile",
        success: "",
      });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.new !== passwordData.confirm) {
      setAlerts({
        ...alerts,
        error: "New passwords do not match",
        success: "",
      });
      return;
    }

    if (passwordData.new.length < 8) {
      setAlerts({
        ...alerts,
        error: "Password must be at least 8 characters",
        success: "",
      });
      return;
    }

    setLoading(true);
    setAlerts({ error: "", success: "" });

    try {
      const response = await axios.put(
        `/api/users/${userId}/password`,
        {
          currentPassword: passwordData.current,
          newPassword: passwordData.new,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAlerts({
        ...alerts,
        success: "Password changed successfully!",
        error: "",
      });
      setPasswordData({ current: "", new: "", confirm: "" });
      setTimeout(() => setAlerts({ ...alerts, success: "" }), 4000);
    } catch (error) {
      setAlerts({
        ...alerts,
        error: error.response?.data?.message || "Failed to change password",
        success: "",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you absolutely sure? This will permanently delete your account and all data."
      )
    ) {
      try {
        await axios.delete(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Clear user data and redirect
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
      } catch (error) {
        setAlerts({
          ...alerts,
          error: error.response?.data?.message || "Failed to delete account",
          success: "",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${colors.deepSpace}, ${colors.cosmicPurple})`,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Slide direction="down" in={true} timeout={500}>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                letterSpacing: "0.05em",
                background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
                textTransform: "uppercase",
              }}
            >
              USER PROFILE TERMINAL
            </Typography>
            <Typography variant="subtitle1" sx={{ color: colors.cosmicDust }}>
              SECURE ACCESS TO ACCOUNT CONFIGURATION
            </Typography>
          </Box>
        </Slide>

        {/* Main Content */}
        <CyberGlassBox>
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            {/* Sidebar */}
            <Paper
              sx={{
                width: { md: 280 },
                background: "rgba(20, 20, 30, 0.7)",
                borderRadius: "12px",
                border: "1px solid rgba(0, 255, 157, 0.2)",
                mr: { md: 3 },
                mb: { xs: 3, md: 0 },
              }}
            >
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(0, 255, 157, 0.1)",
                }}
              >
                <Avatar
                  src="/profile-female.jpg"
                  sx={{
                    width: 64,
                    height: 64,
                    mr: 2,
                    border: `2px solid ${colors.matrixGreen}`,
                  }}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: colors.starlight }}
                  >
                    {formData.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: colors.matrixGreen }}
                  >
                    {isGoogleUser ? "GOOGLE ACCOUNT" : "SECURE ACCOUNT"}
                  </Typography>
                </Box>
              </Box>

              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                orientation="vertical"
                variant="scrollable"
                sx={{
                  "& .MuiTabs-indicator": {
                    left: 0,
                    backgroundColor: colors.matrixGreen,
                  },
                }}
              >
                <CyberTab
                  label="USER PROFILE"
                  icon={<Person sx={{ fontSize: 20 }} />}
                  iconPosition="start"
                  sx={{
                    justifyContent: "flex-start",
                    minHeight: 48,
                  }}
                />
                <CyberTab
                  label="SECURITY SETTINGS"
                  icon={<Security sx={{ fontSize: 20 }} />}
                  iconPosition="start"
                  sx={{
                    justifyContent: "flex-start",
                    minHeight: 48,
                  }}
                  disabled={isGoogleUser}
                />
                <CyberTab
                  label="DANGER ZONE"
                  icon={<Dangerous sx={{ fontSize: 20 }} />}
                  iconPosition="start"
                  sx={{
                    justifyContent: "flex-start",
                    minHeight: 48,
                    color: `${colors.plasmaPink} !important`,
                    "&.Mui-selected": {
                      color: `${colors.plasmaPink} !important`,
                    },
                  }}
                />
              </Tabs>
            </Paper>

            {/* Content Area */}
            <Box sx={{ flex: 1 }}>
              {/* Alerts */}
              {alerts.error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {alerts.error}
                </Alert>
              )}
              {alerts.success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {alerts.success}
                </Alert>
              )}

              {/* Profile Tab */}
              <ProfileTabPanel value={tabValue} index={0}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 4,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: colors.starlight,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    USER PROFILE DATA
                  </Typography>
                  {!editMode ? (
                    <CyberButton
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={() => setEditMode(true)}
                    >
                      EDIT PROFILE
                    </CyberButton>
                  ) : (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={() => setEditMode(false)}
                        sx={{
                          color: colors.starlight,
                          borderColor: `${colors.matrixGreen}50`,
                          "&:hover": {
                            borderColor: colors.matrixGreen,
                          },
                        }}
                      >
                        CANCEL
                      </Button>
                      <CyberButton
                        variant="contained"
                        onClick={handleProfileSubmit}
                      >
                        SAVE CHANGES
                      </CyberButton>
                    </Box>
                  )}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 4,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: colors.cosmicDust,
                          mb: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Person fontSize="small" /> USERNAME
                      </Typography>
                      {editMode ? (
                        <CyberTextField
                          fullWidth
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{
                            color: colors.starlight,
                            p: 1.5,
                            borderRadius: "8px",
                            backgroundColor: "rgba(0, 255, 157, 0.05)",
                            border: "1px solid rgba(0, 255, 157, 0.1)",
                          }}
                        >
                          {formData.name}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: colors.cosmicDust,
                          mb: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Email fontSize="small" /> EMAIL ADDRESS
                      </Typography>
                      {editMode ? (
                        <CyberTextField
                          fullWidth
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{
                            color: colors.starlight,
                            p: 1.5,
                            borderRadius: "8px",
                            backgroundColor: "rgba(0, 255, 157, 0.05)",
                            border: "1px solid rgba(0, 255, 157, 0.1)",
                          }}
                        >
                          {formData.email}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: colors.cosmicDust,
                          mb: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Description fontSize="small" /> USER BIO
                      </Typography>
                      {editMode ? (
                        <CyberTextField
                          fullWidth
                          name="bio"
                          multiline
                          rows={4}
                          value={formData.bio}
                          onChange={handleChange}
                        />
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{
                            color: colors.starlight,
                            p: 1.5,
                            borderRadius: "8px",
                            backgroundColor: "rgba(0, 255, 157, 0.05)",
                            border: "1px solid rgba(0, 255, 157, 0.1)",
                            whiteSpace: "pre-wrap",
                            minHeight: "120px",
                          }}
                        >
                          {formData.bio || "No bio provided"}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </ProfileTabPanel>

              {/* Security Tab */}
              <ProfileTabPanel value={tabValue} index={1}>
                {isGoogleUser ? (
                  <Box
                    sx={{
                      p: 4,
                      textAlign: "center",
                      backgroundColor: "rgba(0, 255, 157, 0.05)",
                      borderRadius: 2,
                      border: "1px solid rgba(0, 255, 157, 0.1)",
                    }}
                  >
                    <Lock
                      sx={{ fontSize: 48, color: colors.matrixGreen, mb: 2 }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: colors.starlight, mb: 1 }}
                    >
                      GOOGLE-AUTHENTICATED ACCOUNT
                    </Typography>
                    <Typography sx={{ color: colors.cosmicDust }}>
                      Security management is handled through your Google
                      account.
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Typography
                      variant="h5"
                      sx={{
                        color: colors.starlight,
                        fontWeight: 600,
                        mb: 4,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      SECURITY CONFIGURATION
                    </Typography>

                    <Box sx={{ mb: 6 }}>
                      <Typography
                        variant="h6"
                        sx={{ color: colors.starlight, mb: 3 }}
                      >
                        CHANGE ACCESS CODE
                      </Typography>
                      <Box component="form" onSubmit={handlePasswordSubmit}>
                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: colors.cosmicDust,
                              mb: 1,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Lock fontSize="small" /> CURRENT ACCESS CODE
                          </Typography>
                          <CyberTextField
                            fullWidth
                            name="current"
                            type={showPasswords.current ? "text" : "password"}
                            value={passwordData.current}
                            onChange={handlePasswordChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      togglePasswordVisibility("current")
                                    }
                                    edge="end"
                                    sx={{ color: colors.matrixGreen }}
                                  >
                                    {showPasswords.current ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: colors.cosmicDust,
                              mb: 1,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Lock fontSize="small" /> NEW ACCESS CODE
                          </Typography>
                          <CyberTextField
                            fullWidth
                            name="new"
                            type={showPasswords.new ? "text" : "password"}
                            value={passwordData.new}
                            onChange={handlePasswordChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      togglePasswordVisibility("new")
                                    }
                                    edge="end"
                                    sx={{ color: colors.matrixGreen }}
                                  >
                                    {showPasswords.new ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>

                        <Box sx={{ mb: 4 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: colors.cosmicDust,
                              mb: 1,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Lock fontSize="small" /> CONFIRM NEW ACCESS CODE
                          </Typography>
                          <CyberTextField
                            fullWidth
                            name="confirm"
                            type={showPasswords.confirm ? "text" : "password"}
                            value={passwordData.confirm}
                            onChange={handlePasswordChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      togglePasswordVisibility("confirm")
                                    }
                                    edge="end"
                                    sx={{ color: colors.matrixGreen }}
                                  >
                                    {showPasswords.confirm ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>

                        <CyberButton
                          type="submit"
                          variant="contained"
                          disabled={loading}
                          sx={{
                            height: "48px",
                            width: "250px",
                          }}
                        >
                          {loading ? (
                            <>
                              <CircularProgress
                                size={24}
                                color="inherit"
                                sx={{ mr: 1 }}
                              />
                              UPDATING...
                            </>
                          ) : (
                            "UPDATE ACCESS CODE"
                          )}
                        </CyberButton>
                      </Box>
                    </Box>
                  </>
                )}
              </ProfileTabPanel>

              {/* Danger Zone Tab */}
              <ProfileTabPanel value={tabValue} index={2}>
                <Box
                  sx={{
                    backgroundColor: "rgba(255,0,106,0.1)",
                    border: "1px solid rgba(255,0,106,0.3)",
                    borderRadius: 2,
                    p: 4,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: colors.plasmaPink,
                      fontWeight: 600,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    <Dangerous /> DANGER ZONE
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: colors.cosmicDust, mb: 3 }}
                  >
                    WARNING: These actions are irreversible. Proceed with
                    extreme caution.
                  </Typography>

                  <CyberGlassBox
                    sx={{
                      backgroundColor: "rgba(255,0,106,0.1)",
                      border: "1px solid rgba(255,0,106,0.3)",
                      mb: 3,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: colors.plasmaPink, mb: 1 }}
                    >
                      ACCOUNT TERMINATION
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: colors.cosmicDust, mb: 2 }}
                    >
                      This will permanently delete your account and all
                      associated data. This action cannot be undone.
                    </Typography>
                    <DangerButton
                      variant="contained"
                      onClick={handleDeleteAccount}
                      startIcon={<Delete />}
                    >
                      TERMINATE ACCOUNT
                    </DangerButton>
                  </CyberGlassBox>
                </Box>
              </ProfileTabPanel>
            </Box>
          </Box>
        </CyberGlassBox>
      </Container>
    </Box>
  );
};

export default ProfileSettings;
