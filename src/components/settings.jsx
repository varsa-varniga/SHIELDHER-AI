import React, { useState, useEffect } from "react";
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
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Styled Components
const GradientPaper = styled(Paper)(({ theme }) => ({
  background:
    "linear-gradient(135deg, rgba(30,30,40,0.9) 0%, rgba(45,45,60,0.9) 100%)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  overflow: "hidden",
}));

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
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginAlerts: true,
    backupCodes: false,
  });
  const [notifications, setNotifications] = useState({
    security: true,
    updates: false,
    newsletters: true,
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
        maxWidth: "1200px",
        mx: "auto",
        py: 6,
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Header */}
      <Slide direction="down" in={true} timeout={500}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              background:
                "linear-gradient(90deg,rgb(54, 183, 197),rgb(170, 212, 211))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Your Secure Profile
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "rgba(255,255,255,0.7)" }}
          >
            Manage your account settings and security preferences
          </Typography>
        </Box>
      </Slide>

      {/* Main Content */}
      <GradientPaper>
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          {/* Sidebar */}
          <Paper
            sx={{
              width: { md: 280 },
              background: "rgba(20, 20, 30, 0.7)",
              borderRadius: 0,
              borderRight: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Box
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Avatar
                src="/profile-female.jpg"
                sx={{
                  width: 64,
                  height: 64,
                  mr: 2,
                  border: "3px solid rgba(255,255,255,0.2)",
                }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ color: "white" }}>
                  {formData.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {securitySettings.twoFactorAuth
                    ? "Verified Account"
                    : "Basic Account"}
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
                  backgroundColor: "#ff6b6b",
                },
              }}
            >
              <Tab
                label="Profile"
                icon={<Person sx={{ fontSize: 20 }} />}
                iconPosition="start"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  "&.Mui-selected": { color: "white" },
                  justifyContent: "flex-start",
                  minHeight: 48,
                }}
              />
              <Tab
                label="Change Password"
                icon={<Security sx={{ fontSize: 20 }} />}
                iconPosition="start"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  "&.Mui-selected": { color: "white" },
                  justifyContent: "flex-start",
                  minHeight: 48,
                }}
                disabled={isGoogleUser}
              />

              <Tab
                label="Danger Zone"
                icon={<Delete sx={{ fontSize: 20 }} />}
                iconPosition="start"
                sx={{
                  color: "rgba(255,107,107,0.8)",
                  "&.Mui-selected": { color: "#ff6b6b" },
                  justifyContent: "flex-start",
                  minHeight: 48,
                }}
              />
            </Tabs>
          </Paper>

          {/* Content Area */}
          <Box sx={{ flex: 1 }}>
            {/* Alerts */}
            {alerts.error && (
              <Alert severity="error" sx={{ mx: 3, mt: 3 }}>
                {alerts.error}
              </Alert>
            )}
            {alerts.success && (
              <Alert severity="success" sx={{ mx: 3, mt: 3 }}>
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
                  sx={{ color: "white", fontWeight: 600 }}
                >
                  Personal Information
                </Typography>
                {!editMode ? (
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => setEditMode(true)}
                    sx={{
                      background: "linear-gradient(90deg, #ff6b6b, #ff8e8e)",
                      "&:hover": {
                        background: "linear-gradient(90deg, #ff5e5e, #ff7b7b)",
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setEditMode(false)}
                      sx={{
                        color: "white",
                        borderColor: "rgba(255,255,255,0.3)",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleProfileSubmit}
                      sx={{
                        background: "linear-gradient(90deg, #ff6b6b, #ff8e8e)",
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, #ff5e5e, #ff7b7b)",
                        },
                      }}
                    >
                      Save Changes
                    </Button>
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
                        color: "rgba(255,255,255,0.7)",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Person fontSize="small" /> Username
                    </Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="name"
                        value={formData.name | formData.username}
                        onChange={handleChange}
                        sx={textFieldStyles}
                      />
                    ) : (
                      <Typography
                        variant="body1"
                        sx={{
                          color: "white",
                          p: 1.5,
                          borderRadius: 1,
                          backgroundColor: "rgba(255,255,255,0.05)",
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
                        color: "rgba(255,255,255,0.7)",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Email fontSize="small" /> Email Address
                    </Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={textFieldStyles}
                      />
                    ) : (
                      <Typography
                        variant="body1"
                        sx={{
                          color: "white",
                          p: 1.5,
                          borderRadius: 1,
                          backgroundColor: "rgba(255,255,255,0.05)",
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
                        color: "rgba(255,255,255,0.7)",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Description fontSize="small" /> Bio
                    </Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="bio"
                        multiline
                        rows={4}
                        value={formData.bio}
                        onChange={handleChange}
                        sx={textFieldStyles}
                      />
                    ) : (
                      <Typography
                        variant="body1"
                        sx={{
                          color: "white",
                          p: 1.5,
                          borderRadius: 1,
                          backgroundColor: "rgba(255,255,255,0.05)",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {formData.bio}
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
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: 2,
                  }}
                >
                  <Lock
                    sx={{ fontSize: 48, color: "rgba(255,255,255,0.3)", mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                    Google-Authenticated Account
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Password management is handled through your Google account.
                  </Typography>
                </Box>
              ) : (
                <>
                  <Typography
                    variant="h5"
                    sx={{ color: "white", fontWeight: 600, mb: 4 }}
                  >
                    Account Security
                  </Typography>

                  <Box sx={{ mb: 6 }}>
                    <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
                      Change Password
                    </Typography>
                    <Box component="form" onSubmit={handlePasswordSubmit}>
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            mb: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Lock fontSize="small" /> Current Password
                        </Typography>
                        <TextField
                          fullWidth
                          name="current"
                          type={showPasswords.current ? "text" : "password"}
                          value={passwordData.current}
                          onChange={handlePasswordChange}
                          sx={textFieldStyles}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    togglePasswordVisibility("current")
                                  }
                                  edge="end"
                                  sx={{ color: "rgba(255,255,255,0.5)" }}
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
                            color: "rgba(255,255,255,0.7)",
                            mb: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Lock fontSize="small" /> New Password
                        </Typography>
                        <TextField
                          fullWidth
                          name="new"
                          type={showPasswords.new ? "text" : "password"}
                          value={passwordData.new}
                          onChange={handlePasswordChange}
                          sx={textFieldStyles}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    togglePasswordVisibility("new")
                                  }
                                  edge="end"
                                  sx={{ color: "rgba(255,255,255,0.5)" }}
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
                            color: "rgba(255,255,255,0.7)",
                            mb: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Lock fontSize="small" /> Confirm New Password
                        </Typography>
                        <TextField
                          fullWidth
                          name="confirm"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={passwordData.confirm}
                          onChange={handlePasswordChange}
                          sx={textFieldStyles}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    togglePasswordVisibility("confirm")
                                  }
                                  edge="end"
                                  sx={{ color: "rgba(255,255,255,0.5)" }}
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

                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                          background:
                            "linear-gradient(90deg, #ff6b6b, #ff8e8e)",
                          "&:hover": {
                            background:
                              "linear-gradient(90deg, #ff5e5e, #ff7b7b)",
                          },
                          height: "48px",
                          width: "200px",
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </Box>
                  </Box>
                </>
              )}
            </ProfileTabPanel>

            {/* Danger Zone Tab */}
            <ProfileTabPanel value={tabValue} index={2}>
              <Box
                sx={{
                  backgroundColor: "rgba(255,107,107,0.1)",
                  border: "1px solid rgba(255,107,107,0.3)",
                  borderRadius: 2,
                  p: 4,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#ff6b6b",
                    fontWeight: 600,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Delete /> Danger Zone
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "rgba(255,255,255,0.8)", mb: 3 }}
                >
                  These actions are irreversible. Please proceed with caution.
                </Typography>

                <Box
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                    borderRadius: 1,
                    p: 3,
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#ff6b6b", mb: 1 }}>
                    Delete Account
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)", mb: 2 }}
                  >
                    This will permanently delete your account and all associated
                    data. You won't be able to recover any information after
                    deletion.
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteAccount}
                    sx={{
                      background: "linear-gradient(90deg, #ff3d3d, #ff6b6b)",
                      "&:hover": {
                        background: "linear-gradient(90deg, #ff2d2d, #ff5b5b)",
                      },
                    }}
                  >
                    Delete My Account
                  </Button>
                </Box>
              </Box>
            </ProfileTabPanel>
          </Box>
        </Box>
      </GradientPaper>
    </Box>
  );
};

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.2)",
      borderRadius: "8px",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.3)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff6b6b",
      boxShadow: "0 0 0 2px rgba(255,107,107,0.2)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.7)",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(255,255,255,0.5)",
    opacity: 1,
  },
};

export default ProfileSettings;
