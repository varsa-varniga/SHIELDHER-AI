import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Collapse,
  IconButton,
  Tooltip,
  Grid,
  Paper,
  Divider,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Shield as ShieldIcon,
  Block as BlockIcon,
  Check as CheckIcon,
  Security as SecurityIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  InfoOutlined as InfoIcon,
  FilterAlt as FilterIcon,
  History as HistoryIcon,
  DeleteOutline as DeleteIcon,
  SaveAlt as SaveIcon,
} from "@mui/icons-material";

const FirewallRules = ({ threats }) => {
  const [activeRules, setActiveRules] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [isBlocking, setIsBlocking] = useState(false);
  const [blockSuccess, setBlockSuccess] = useState(false);
  const [expandedRules, setExpandedRules] = useState({});
  const [blockedIps, setBlockedIps] = useState([]);
  const [customBlockRule, setCustomBlockRule] = useState({
    ipAddress: "",
    description: "",
  });
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    show: false,
    message: "",
    severity: "info",
  });
  const [autoBlockEnabled, setAutoBlockEnabled] = useState(true);

  // Generate random IPs for threats that don't have them
  useEffect(() => {
    if (threats && threats.length > 0) {
      const enhancedThreats = threats.map((threat) => {
        if (!threat.ip) {
          // Generate a random IP address
          const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(
            Math.random() * 255
          )}.${Math.floor(Math.random() * 255)}.${Math.floor(
            Math.random() * 255
          )}`;
          return { ...threat, ip, blocked: false };
        }
        return { ...threat, blocked: false };
      });
      setActiveRules(enhancedThreats);
    }
  }, [threats]);

  // Auto-block high risk threats if enabled
  useEffect(() => {
    if (autoBlockEnabled && activeRules.length > 0) {
      const highRiskThreats = activeRules.filter(
        (rule) =>
          rule.risk === "High" && !rule.blocked && !blockedIps.includes(rule.ip)
      );

      if (highRiskThreats.length > 0) {
        // Show alert about auto-blocking
        setAlertMessage({
          show: true,
          message: `Auto-blocked ${highRiskThreats.length} high-risk threats`,
          severity: "warning",
        });

        // Add to blocked IPs
        const newBlockedIps = [...blockedIps];
        highRiskThreats.forEach((threat) => {
          if (!newBlockedIps.includes(threat.ip)) {
            newBlockedIps.push(threat.ip);
          }
        });
        setBlockedIps(newBlockedIps);

        // Update rules to show as blocked
        const updatedRules = activeRules.map((rule) => {
          if (rule.risk === "High") {
            return { ...rule, blocked: true };
          }
          return rule;
        });
        setActiveRules(updatedRules);
      }
    }
  }, [autoBlockEnabled, activeRules, blockedIps]);

  const handleOpenBlockDialog = (threat) => {
    setSelectedThreat(threat);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedThreat(null);
    setBlockSuccess(false);
  };

  const handleBlockIp = () => {
    if (!selectedThreat) return;

    setIsBlocking(true);

    // Simulate API call to block IP
    setTimeout(() => {
      // Add IP to blocked list
      if (!blockedIps.includes(selectedThreat.ip)) {
        setBlockedIps([...blockedIps, selectedThreat.ip]);
      }

      // Update rules to show as blocked
      const updatedRules = activeRules.map((rule) => {
        if (rule.id === selectedThreat.id) {
          return { ...rule, blocked: true };
        }
        return rule;
      });
      setActiveRules(updatedRules);

      setIsBlocking(false);
      setBlockSuccess(true);

      // Close dialog after a delay
      setTimeout(() => {
        handleCloseDialog();
        // Show success message
        setAlertMessage({
          show: true,
          message: `Successfully blocked IP: ${selectedThreat.ip}`,
          severity: "success",
        });
      }, 1500);
    }, 2000);
  };

  const toggleExpandRule = (ruleId) => {
    setExpandedRules((prev) => ({
      ...prev,
      [ruleId]: !prev[ruleId],
    }));
  };

  const handleCustomBlockSubmit = () => {
    if (!customBlockRule.ipAddress) {
      setAlertMessage({
        show: true,
        message: "Please enter a valid IP address",
        severity: "error",
      });
      return;
    }

    // Add to blocked IPs
    if (!blockedIps.includes(customBlockRule.ipAddress)) {
      setBlockedIps([...blockedIps, customBlockRule.ipAddress]);

      setAlertMessage({
        show: true,
        message: `Successfully blocked custom IP: ${customBlockRule.ipAddress}`,
        severity: "success",
      });

      // Reset form
      setCustomBlockRule({ ipAddress: "", description: "" });
      setShowCustomForm(false);
    } else {
      setAlertMessage({
        show: true,
        message: `IP ${customBlockRule.ipAddress} is already blocked`,
        severity: "warning",
      });
    }
  };

  const unblockIp = (ip) => {
    // Remove from blocked IPs
    const updatedBlockedIps = blockedIps.filter(
      (blockedIp) => blockedIp !== ip
    );
    setBlockedIps(updatedBlockedIps);

    // Update any rules that used this IP
    const updatedRules = activeRules.map((rule) => {
      if (rule.ip === ip) {
        return { ...rule, blocked: false };
      }
      return rule;
    });
    setActiveRules(updatedRules);

    setAlertMessage({
      show: true,
      message: `Unblocked IP: ${ip}`,
      severity: "info",
    });
  };

  const handleAlertClose = () => {
    setAlertMessage({ ...alertMessage, show: false });
  };

  if (!threats || (threats.length === 0 && blockedIps.length === 0)) {
    return (
      <Card
        sx={{
          mt: 3,
          backgroundColor: "rgba(32, 44, 62, 0.8)",
          borderRadius: 2,
          border: "1px solid rgba(79, 209, 197, 0.3)",
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <ShieldIcon sx={{ color: "#4FD1C5", mr: 1, fontSize: 28 }} />
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff" }}>
              Firewall Protection
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: "#fff" }}>
            🔐 No firewall rules yet. Connect your email to detect phishing
            threats.
          </Typography>
          <Button
            startIcon={<SecurityIcon />}
            variant="outlined"
            sx={{
              mt: 2,
              color: "#4FD1C5",
              borderColor: "#4FD1C5",
              "&:hover": {
                borderColor: "#38A89D",
                backgroundColor: "rgba(79, 209, 197, 0.1)",
              },
            }}
            onClick={() => setShowCustomForm(true)}
          >
            Add Custom Rule
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12}>
        <Card
          sx={{
            backgroundColor: "rgba(32, 44, 62, 0.95)",
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Box display="flex" alignItems="center">
                <ShieldIcon sx={{ color: "#4FD1C5", mr: 1, fontSize: 30 }} />
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: "#fff" }}
                >
                  Firewall Protection System
                </Typography>
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoBlockEnabled}
                      onChange={(e) => setAutoBlockEnabled(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography sx={{ color: "#fff", fontSize: 14 }}>
                      Auto-block high risk threats
                    </Typography>
                  }
                />
                <Button
                  startIcon={<FilterIcon />}
                  variant="outlined"
                  size="small"
                  sx={{
                    ml: 2,
                    color: "#4FD1C5",
                    borderColor: "#4FD1C5",
                    "&:hover": {
                      borderColor: "#38A89D",
                      backgroundColor: "rgba(79, 209, 197, 0.1)",
                    },
                  }}
                  onClick={() => setShowCustomForm(!showCustomForm)}
                >
                  {showCustomForm ? "Hide Custom Rule" : "Add Custom Rule"}
                </Button>
              </Box>
            </Box>

            <Collapse in={showCustomForm}>
              <Paper
                sx={{ p: 2, mb: 3, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 2, color: "#4FD1C5" }}
                >
                  Create Custom Blocking Rule
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={5}>
                    <TextField
                      label="IP Address"
                      variant="outlined"
                      fullWidth
                      value={customBlockRule.ipAddress}
                      onChange={(e) =>
                        setCustomBlockRule({
                          ...customBlockRule,
                          ipAddress: e.target.value,
                        })
                      }
                      placeholder="e.g. 192.168.1.1"
                      size="small"
                      InputLabelProps={{
                        style: { color: "#adbac7" },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(173, 186, 199, 0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "#4FD1C5",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#4FD1C5",
                          },
                          "& input": {
                            color: "#fff",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <TextField
                      label="Description (Optional)"
                      variant="outlined"
                      fullWidth
                      value={customBlockRule.description}
                      onChange={(e) =>
                        setCustomBlockRule({
                          ...customBlockRule,
                          description: e.target.value,
                        })
                      }
                      placeholder="Reason for blocking"
                      size="small"
                      InputLabelProps={{
                        style: { color: "#adbac7" },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(173, 186, 199, 0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "#4FD1C5",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#4FD1C5",
                          },
                          "& input": {
                            color: "#fff",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      startIcon={<BlockIcon />}
                      variant="contained"
                      fullWidth
                      onClick={handleCustomBlockSubmit}
                      sx={{
                        backgroundColor: "#4FD1C5",
                        "&:hover": {
                          backgroundColor: "#38A89D",
                        },
                      }}
                    >
                      Block IP
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Collapse>

            <Collapse in={alertMessage.show}>
              <Alert
                severity={alertMessage.severity}
                onClose={handleAlertClose}
                sx={{ mb: 2 }}
              >
                {alertMessage.message}
              </Alert>
            </Collapse>

            <Typography variant="subtitle1" sx={{ mb: 2, color: "#adbac7" }}>
              <SecurityIcon
                sx={{ mr: 1, fontSize: 18, verticalAlign: "text-bottom" }}
              />
              Active Firewall Rules ({activeRules.length})
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {activeRules.map((rule, index) => (
                <Card
                  key={rule.id || index}
                  sx={{
                    width: 320,
                    borderLeft: `5px solid ${
                      rule.blocked ? "#FF4757" : "#4FD1C5"
                    }`,
                    backgroundColor: rule.blocked
                      ? "rgba(255, 71, 87, 0.1)"
                      : "rgba(32, 44, 62, 0.8)",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                    borderRadius: 2,
                    opacity: rule.blocked ? 0.9 : 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <Box display="flex" alignItems="center">
                        <ShieldIcon
                          sx={{
                            color: rule.blocked ? "#FF4757" : "#4FD1C5",
                            mr: 1,
                          }}
                        />
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ color: "#fff" }}
                        >
                          Rule #{index + 1}
                        </Typography>
                      </Box>
                      <Chip
                        label={rule.blocked ? "Blocked" : "Active"}
                        size="small"
                        sx={{
                          backgroundColor: rule.blocked ? "#FF4757" : "#4FD1C5",
                          color: "#fff",
                        }}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ color: "#adbac7" }}
                    >
                      <strong>Sender:</strong> {rule.sender || "Unknown"}
                    </Typography>

                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ color: "#adbac7" }}
                    >
                      <strong>Subject:</strong> {rule.subject || "N/A"}
                    </Typography>

                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{
                        color: rule.blocked ? "#FF4757" : "#adbac7",
                        fontWeight: rule.blocked ? "bold" : "normal",
                      }}
                    >
                      <strong>IP Address:</strong> {rule.ip || "Unidentified"}
                    </Typography>

                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ color: "#adbac7" }}
                    >
                      <strong>Risk Level:</strong>{" "}
                      <Chip
                        label={rule.risk || "Medium"}
                        size="small"
                        sx={{
                          backgroundColor:
                            rule.risk === "High"
                              ? "#FF4757"
                              : rule.risk === "Medium"
                              ? "#FFA502"
                              : "#4FD1C5",
                          color: "#fff",
                          fontSize: 10,
                          height: 20,
                        }}
                      />
                    </Typography>

                    <Collapse in={expandedRules[rule.id]}>
                      <Box
                        sx={{
                          mt: 2,
                          p: 1,
                          backgroundColor: "rgba(0,0,0,0.2)",
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          gutterBottom
                          sx={{ color: "#adbac7" }}
                        >
                          <strong>Date Detected:</strong>{" "}
                          {rule.date || new Date().toLocaleDateString()}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          sx={{ color: "#adbac7" }}
                        >
                          <strong>Probability:</strong>{" "}
                          {rule.probability
                            ? `${(rule.probability * 100).toFixed(1)}%`
                            : "N/A"}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          sx={{ color: "#adbac7" }}
                        >
                          <strong>Status:</strong>{" "}
                          {rule.blocked ? "IP Blocked" : "Monitoring"}
                        </Typography>
                      </Box>
                    </Collapse>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Button
                        size="small"
                        startIcon={
                          expandedRules[rule.id] ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )
                        }
                        onClick={() => toggleExpandRule(rule.id)}
                        sx={{ color: "#adbac7" }}
                      >
                        {expandedRules[rule.id] ? "Less" : "More"}
                      </Button>

                      {rule.blocked ? (
                        <Button
                          size="small"
                          startIcon={<CheckIcon />}
                          variant="outlined"
                          sx={{
                            color: "#FF4757",
                            borderColor: "#FF4757",
                            "&:hover": {
                              borderColor: "#FF6B6B",
                              backgroundColor: "rgba(255, 71, 87, 0.1)",
                            },
                          }}
                          onClick={() => unblockIp(rule.ip)}
                        >
                          Unblock IP
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          startIcon={<BlockIcon />}
                          variant="contained"
                          sx={{
                            backgroundColor: "#4FD1C5",
                            "&:hover": {
                              backgroundColor: "#38A89D",
                            },
                          }}
                          onClick={() => handleOpenBlockDialog(rule)}
                        >
                          Block IP
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Blocked IPs Section */}
            {blockedIps.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 2,
                    color: "#adbac7",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BlockIcon sx={{ mr: 1, fontSize: 18, color: "#FF4757" }} />
                  Currently Blocked IPs ({blockedIps.length})
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {blockedIps.map((ip, index) => (
                    <Chip
                      key={index}
                      label={ip}
                      onDelete={() => unblockIp(ip)}
                      deleteIcon={<DeleteIcon />}
                      sx={{
                        backgroundColor: "rgba(255, 71, 87, 0.2)",
                        color: "#FF4757",
                        borderColor: "#FF4757",
                        border: "1px solid",
                        mb: 1,
                      }}
                    />
                  ))}
                </Box>

                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                  <Button
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    size="small"
                    sx={{
                      color: "#4FD1C5",
                      borderColor: "#4FD1C5",
                    }}
                    onClick={() => {
                      setAlertMessage({
                        show: true,
                        message: "Firewall rules saved successfully",
                        severity: "success",
                      });
                    }}
                  >
                    Save Configuration
                  </Button>

                  <Button
                    startIcon={<HistoryIcon />}
                    variant="outlined"
                    size="small"
                    sx={{
                      color: "#adbac7",
                      borderColor: "#adbac7",
                    }}
                    onClick={() => {
                      setAlertMessage({
                        show: true,
                        message:
                          "View logs feature will be available in the next update",
                        severity: "info",
                      });
                    }}
                  >
                    View Logs
                  </Button>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Block IP Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            backgroundColor: "#253242",
            borderRadius: 8,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <DialogTitle sx={{ color: "#fff" }}>
          <Box display="flex" alignItems="center">
            <BlockIcon sx={{ mr: 1, color: "#FF4757" }} />
            Block Malicious IP?
          </Box>
        </DialogTitle>

        <DialogContent>
          {selectedThreat && (
            <>
              <Typography variant="body1" sx={{ mb: 2, color: "#adbac7" }}>
                Are you sure you want to block the following IP address?
              </Typography>

              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#FF4757", fontWeight: "bold" }}
                >
                  {selectedThreat.ip}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1, color: "#adbac7" }}>
                  <strong>Detected From:</strong>{" "}
                  {selectedThreat.sender || "Unknown sender"}
                </Typography>

                <Typography variant="body2" sx={{ color: "#adbac7" }}>
                  <strong>Risk Level:</strong> {selectedThreat.risk || "Medium"}
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ color: "#adbac7" }}>
                Blocking this IP will prevent any further communication from
                this address. This action can be reversed later.
              </Typography>
            </>
          )}

          {blockSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              IP successfully blocked!
            </Alert>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} sx={{ color: "#adbac7" }}>
            Cancel
          </Button>

          <Button
            variant="contained"
            startIcon={
              isBlocking ? <CircularProgress size={16} /> : <BlockIcon />
            }
            onClick={handleBlockIp}
            disabled={isBlocking || blockSuccess}
            sx={{
              backgroundColor: "#FF4757",
              "&:hover": {
                backgroundColor: "#FF6B6B",
              },
            }}
          >
            {isBlocking ? "Blocking..." : "Block IP"}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default FirewallRules;
