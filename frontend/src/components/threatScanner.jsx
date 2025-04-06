import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip,
  Divider,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useDropzone } from "react-dropzone";
import LinkIcon from "@mui/icons-material/Link";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ScanAnimation from "./ScanAnimation";
import {
  checkPhishingLink,
  scanFile,
} from "../services/PhishingScannerService";
import { styled } from "@mui/material/styles";

// Using the same color palette from the landing page
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

// Glass morphism effect
const glassEffect = {
  background: "rgba(10, 14, 23, 0.7)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(0, 255, 157, 0.2)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
};

// Cyberpunk styled components
const CyberButton = styled(Button)({
  position: "relative",
  overflow: "hidden",
  border: "1px solid transparent",
  background: `linear-gradient(${colors.deepSpace}, ${colors.deepSpace}) padding-box, 
              linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%) border-box`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: `0 10px 20px ${colors.matrixGreen}30`,
    background: `linear-gradient(${colors.deepSpace}, ${colors.deepSpace}) padding-box, 
                linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.plasmaPink} 100%) border-box`,
  },
  "&:active": {
    transform: "translateY(0)",
  },
});

const CyberTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: colors.starlight,
    "& fieldset": {
      borderColor: `${colors.matrixGreen}50`,
    },
    "&:hover fieldset": {
      borderColor: `${colors.matrixGreen}80`,
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.matrixGreen,
    },
  },
  "& .MuiInputLabel-root": {
    color: `${colors.starlight}90`,
  },
});

const CyberPaper = styled(Paper)({
  background: `linear-gradient(145deg, ${colors.nebulaBlue} 0%, ${colors.cosmicPurple} 100%)`,
  border: "1px solid rgba(0, 255, 157, 0.1)",
  borderRadius: "16px",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  overflow: "hidden",
  position: "relative",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `linear-gradient(45deg, transparent 45%, ${colors.matrixGreen}20 50%, transparent 55%)`,
    backgroundSize: "300% 300%",
    opacity: 0,
    transition: "all 0.5s ease",
  },
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: `0 15px 30px ${colors.matrixGreen}20`,
    border: `1px solid ${colors.matrixGreen}50`,
    "&:before": {
      opacity: 0.5,
      backgroundPosition: "100% 100%",
    },
  },
});

const CyberTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: colors.matrixGreen,
    height: "3px",
  },
});

const CyberTab = styled(Tab)({
  color: `${colors.starlight} !important`,
  opacity: 0.7,
  "&.Mui-selected": {
    color: `${colors.matrixGreen} !important`,
    opacity: 1,
  },
});

const ThreatScanner = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileScanResults, setFileScanResults] = useState([]);
  const [folderUploaded, setFolderUploaded] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const theme = useTheme();

  const knownCategories = [
    "adobe",
    "amazon",
    "apple",
    "dropbox",
    "facebook",
    "google",
    "microsoft",
    "paypal",
    "twitter",
    "linkedin",
    "instagram",
  ];

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setScanResult(null);
    setFileScanResults([]);
    setErrorMessage("");
    setShowError(false);
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      console.error("Invalid URL:", error);
      return false;
    }
  };

  const handleScan = async () => {
    const urlToScan = inputValue.trim();

    if (!urlToScan) {
      setErrorMessage("Please enter a URL to scan");
      setShowError(true);
      return;
    }

    if (!isValidURL(urlToScan)) {
      const urlWithProtocol = urlToScan.includes("://")
        ? urlToScan
        : `http://${urlToScan}`;

      if (!isValidURL(urlWithProtocol)) {
        setErrorMessage("Invalid URL! Please enter a valid link");
        setShowError(true);
        return;
      }

      setInputValue(urlWithProtocol);
    }

    setLoading(true);
    setScanResult(null);

    try {
      const response = await checkPhishingLink(urlToScan);

      if (response.error) {
        throw new Error(response.error);
      }

      setScanResult({
        status: response.isPhishing ? "Phishing Detected" : "Clean",
        riskScore: response.riskScore || 0,
        prediction: response.prediction,
        note: response.note,
      });
    } catch (error) {
      console.error("Error scanning URL:", error);
      setErrorMessage(`Error scanning URL: ${error.message}`);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    setFolderUploaded(true);
    handleFileScan(acceptedFiles);
  };

  const handleFileScan = async (uploadedFiles) => {
    setLoading(true);
    setFileScanResults([]);

    let results = [];

    try {
      for (const file of uploadedFiles) {
        if (!file.type.startsWith("image/")) {
          results.push({
            name: file.name,
            status: "Unsupported",
            riskScore: 0,
            note: "Only image files are supported for scanning",
          });
          continue;
        }

        const formData = new FormData();
        formData.append("image", file);

        const response = await scanFile(formData);

        if (response.error) {
          throw new Error(response.error);
        }

        const isKnownCategory = knownCategories.includes(
          response.predicted_category.toLowerCase()
        );
        const isPhishing =
          response.predicted_category === "other" || !isKnownCategory;

        const riskScore = isPhishing
          ? Math.round(response.confidence * 100)
          : 20;

        results.push({
          name: file.name,
          status: isPhishing ? "Phishing Detected" : "Clean",
          category: response.predicted_category,
          riskScore: riskScore,
          confidence: response.confidence,
          note: isPhishing
            ? `Suspicious pattern detected with ${Math.round(
                response.confidence * 100
              )}% confidence`
            : `Identified as ${response.predicted_category} with ${Math.round(
                response.confidence * 100
              )}% confidence`,
        });
      }
    } catch (error) {
      console.error("Error scanning files:", error);
      setErrorMessage(`Error scanning files: ${error.message}`);
      setShowError(true);
    } finally {
      setFileScanResults(results);
      setLoading(false);
    }
  };

  const getRiskColor = (score, status) => {
    if (status === "Clean") return colors.matrixGreen;
    if (status === "Unsupported") return colors.cosmicDust;
    if (score > 80) return colors.plasmaPink;
    if (score > 50) return "#ffa000";
    return colors.electricBlue;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
  });

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 5,
        mb: 5,
        p: 4,
        borderRadius: "16px",
        ...glassEffect,
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 30%, ${colors.cyberViolet}20 0%, transparent 50%)`,
          zIndex: -1,
        },
        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 80% 70%, ${colors.plasmaPink}10 0%, transparent 50%)`,
          zIndex: -1,
        },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 800,
          mb: 3,
          background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
        {tabIndex === 0 ? (
          <>
            <LinkIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            URL Threat Scanner
          </>
        ) : (
          <>
            <InsertDriveFileIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            File Threat Scanner
          </>
        )}
      </Typography>

      <Typography
        variant="body1"
        align="center"
        sx={{
          mb: 4,
          color: colors.cosmicDust,
          lineHeight: 1.6,
        }}
      >
        {tabIndex === 0
          ? "Scan a URL you want to visit to detect malware, fake websites, and phishing attacks."
          : "Scan your image files for phishing content using AI detection."}
      </Typography>

      <CyberTabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        sx={{ mb: 4 }}
      >
        <CyberTab label="URL Scanner" />
        <CyberTab label="File Scanner" />
      </CyberTabs>

      {tabIndex === 0 && (
        <Box textAlign="center" mt={3}>
          <CyberTextField
            label="Enter URL to Scan"
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="https://example.com"
          />
          <CyberButton
            variant="contained"
            onClick={handleScan}
            disabled={loading}
            sx={{
              px: 5,
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            {loading ? "Scanning..." : "Scan URL"}
          </CyberButton>

          {loading && (
            <Box
              sx={{
                mt: 4,
                p: 4,
                borderRadius: "16px",
                background: `linear-gradient(145deg, ${colors.nebulaBlue} 0%, ${colors.cosmicPurple} 100%)`,
                border: `1px solid ${colors.matrixGreen}30`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "200px",
              }}
            >
              <ScanAnimation />
            </Box>
          )}

          {scanResult && !loading && (
            <CyberPaper
              elevation={3}
              sx={{
                p: 3,
                mt: 4,
                textAlign: "center",
                background: `linear-gradient(145deg, ${colors.nebulaBlue} 0%, ${colors.cosmicPurple} 100%)`,
                border: `1px solid ${getRiskColor(
                  scanResult.riskScore,
                  scanResult.status
                )}50`,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                {scanResult.status === "Clean" ? (
                  <CheckCircleIcon
                    sx={{ color: colors.matrixGreen, fontSize: 40, mr: 1 }}
                  />
                ) : (
                  <ErrorIcon
                    sx={{ color: colors.plasmaPink, fontSize: 40, mr: 1 }}
                  />
                )}
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color:
                      scanResult.status === "Clean"
                        ? colors.matrixGreen
                        : colors.plasmaPink,
                  }}
                >
                  {scanResult.status}
                </Typography>
              </Box>
              <Chip
                label={`Risk Score: ${Math.round(scanResult.riskScore)}/100`}
                sx={{
                  background: `linear-gradient(90deg, ${colors.matrixGreen}20, ${colors.electricBlue}20)`,
                  color: colors.starlight,
                  mb: 2,
                  fontWeight: "bold",
                }}
              />
              {scanResult.note && (
                <Typography
                  variant="body1"
                  sx={{
                    color: colors.cosmicDust,
                    fontStyle: "italic",
                    mt: 2,
                  }}
                >
                  {scanResult.note}
                </Typography>
              )}
            </CyberPaper>
          )}
        </Box>
      )}

      {tabIndex === 1 && (
        <Box textAlign="center" mt={3}>
          <Box
            {...getRootProps()}
            sx={{
              p: 4,
              border: `2px dashed ${colors.matrixGreen}`,
              borderRadius: "16px",
              textAlign: "center",
              cursor: "pointer",
              background: `linear-gradient(145deg, ${colors.nebulaBlue} 0%, ${colors.cosmicPurple} 100%)`,
              transition: "all 0.3s ease",
              "&:hover": {
                border: `2px dashed ${colors.electricBlue}`,
                boxShadow: `0 0 20px ${colors.matrixGreen}30`,
              },
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon
              sx={{ fontSize: 50, color: colors.matrixGreen, mb: 1 }}
            />
            <Typography variant="h6" sx={{ color: colors.starlight, mb: 1 }}>
              Drag & Drop Images Here
            </Typography>
            <Typography variant="body2" sx={{ color: colors.cosmicDust }}>
              or click to browse files (JPG, PNG supported)
            </Typography>
          </Box>

          {loading && (
            <Box
              sx={{
                mt: 4,
                p: 4,
                borderRadius: "16px",
                background: `linear-gradient(145deg, ${colors.nebulaBlue} 0%, ${colors.cosmicPurple} 100%)`,
                border: `1px solid ${colors.matrixGreen}30`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "200px",
              }}
            >
              <ScanAnimation />
            </Box>
          )}

          {fileScanResults.length > 0 && !loading && (
            <Box sx={{ mt: 4 }}>
              <Divider
                sx={{
                  background: `linear-gradient(90deg, transparent, ${colors.matrixGreen}50, transparent)`,
                  height: "1px",
                  border: "none",
                  mb: 3,
                }}
              />
              <Typography
                variant="h6"
                sx={{ color: colors.starlight, textAlign: "left", mb: 2 }}
              >
                Scan Results
              </Typography>
              <List sx={{ p: 0 }}>
                {fileScanResults.map((file, index) => (
                  <CyberPaper
                    key={index}
                    sx={{
                      mb: 2,
                      p: 2,
                      background: `linear-gradient(145deg, ${colors.nebulaBlue} 0%, ${colors.cosmicPurple} 100%)`,
                      border: `1px solid ${getRiskColor(
                        file.riskScore,
                        file.status
                      )}50`,
                    }}
                  >
                    <ListItem sx={{ p: 0 }}>
                      <Avatar
                        sx={{
                          bgcolor: `${getRiskColor(
                            file.riskScore,
                            file.status
                          )}20`,
                          color: getRiskColor(file.riskScore, file.status),
                          mr: 2,
                        }}
                      >
                        {file.status === "Clean" ? (
                          <CheckCircleIcon />
                        ) : file.status === "Unsupported" ? (
                          <ErrorIcon />
                        ) : (
                          <ErrorIcon />
                        )}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle1"
                            sx={{ color: colors.starlight }}
                          >
                            {file.name}
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{
                                display: "inline-block",
                                color: getRiskColor(
                                  file.riskScore,
                                  file.status
                                ),
                                fontWeight: "bold",
                                mr: 1,
                              }}
                            >
                              {file.status}
                            </Typography>
                            {file.category && (
                              <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: colors.cosmicDust, mr: 1 }}
                              >
                                • {file.category}
                              </Typography>
                            )}
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ color: colors.cosmicDust }}
                            >
                              • {file.note}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <Chip
                        label={`${Math.round(file.confidence * 100)}%`}
                        sx={{
                          background: `${getRiskColor(
                            file.riskScore,
                            file.status
                          )}30`,
                          color: getRiskColor(file.riskScore, file.status),
                          fontWeight: "bold",
                        }}
                      />
                    </ListItem>
                  </CyberPaper>
                ))}
              </List>
            </Box>
          )}
        </Box>
      )}

      <Snackbar
        open={folderUploaded || imageUploaded}
        autoHideDuration={3000}
        onClose={() => {
          setFolderUploaded(false);
          setImageUploaded(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          sx={{
            background: colors.matrixGreen,
            color: colors.deepSpace,
            fontWeight: "bold",
          }}
        >
          {folderUploaded
            ? "Files uploaded successfully!"
            : "Image uploaded successfully!"}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          onClose={() => setShowError(false)}
          sx={{
            background: colors.plasmaPink,
            color: colors.deepSpace,
            fontWeight: "bold",
          }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ThreatScanner;
