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

  // List of known brand categories that should be considered safe
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
      // Try adding http:// prefix if missing
      const urlWithProtocol = urlToScan.includes("://")
        ? urlToScan
        : `http://${urlToScan}`;

      if (!isValidURL(urlWithProtocol)) {
        setErrorMessage("Invalid URL! Please enter a valid link");
        setShowError(true);
        return;
      }

      // Update the input value with the fixed URL
      setInputValue(urlWithProtocol);
    }

    setLoading(true);
    setScanResult(null);

    try {
      // Call backend API
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
        // Only process image files - backend currently only supports images
        if (!file.type.startsWith("image/")) {
          results.push({
            name: file.name,
            status: "Unsupported",
            riskScore: 0,
            note: "Only image files are supported for scanning",
          });
          continue;
        }

        // Call backend API for each image file
        const formData = new FormData();
        formData.append("image", file);

        const response = await scanFile(formData);

        if (response.error) {
          throw new Error(response.error);
        }

        // MODIFIED LOGIC:
        // If the category is "other" or not in known categories, mark as phishing
        // If the category is in known categories, mark as clean
        const isKnownCategory = knownCategories.includes(
          response.predicted_category.toLowerCase()
        );
        const isPhishing =
          response.predicted_category === "other" || !isKnownCategory;

        // For known categories, lower risk score; for unknown or "other", higher risk score
        const riskScore = isPhishing
          ? Math.round(response.confidence * 100)
          : 20;

        results.push({
          name: file.name,
          // If it's a known category, show "Clean" with the category name
          // If it's "other" or unknown, show "Phishing Detected"
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
    // Modified to consider both score and status
    // For "Clean" status, always return green
    if (status === "Clean") return "#32cd32"; // Green for known categories
    if (score > 80) return "#ff4d4d"; // Red for high risk
    if (score > 50) return "#ffa000"; // Orange for medium risk
    return "#32cd32"; // Green for low risk
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [], // Backend currently only supports images
    },
    onDrop,
  });

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 5,
        mb: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "#2C3E50", // Dark navy blue
        color: "white",
      }}
    >
      <Typography
        variant="body1"
        align="center"
        mt={2}
        fontSize={"2.5rem"}
        color="white"
      >
        {tabIndex === 0 ? (
          <LinkIcon sx={{ fontSize: "2.5rem", verticalAlign: "middle" }} />
        ) : (
          <InsertDriveFileIcon
            sx={{ fontSize: "2.5rem", verticalAlign: "middle" }}
          />
        )}
        <strong>
          {" "}
          {tabIndex === 0 ? "Is this link safe?" : "Is this file safe?"}
        </strong>
      </Typography>

      <Typography textAlign={"center"} fontSize={"1rem"} color="white">
        {tabIndex === 0
          ? "Scan a URL you want to visit to detect malware, fake websites, and phishing attacks."
          : "Scan your image files for phishing content using AI detection."}
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        indicatorColor="primary"
        textColor="inherit"
        sx={{ mb: 3 }}
      >
        <Tab label="URL Scanner" />
        <Tab label="File Scanner" />
      </Tabs>

      {tabIndex === 0 && (
        <Box textAlign="center" mt={3}>
          <TextField
            label="Enter URL to Scan"
            variant="outlined"
            fullWidth
            sx={{
              mb: 2,
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#3f7afc" },
              },
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="https://example.com"
          />
          <Button
            variant="contained"
            onClick={handleScan}
            disabled={loading}
            sx={{
              mt: 2,
              backgroundColor: "#3f7afc",
              "&:hover": { backgroundColor: "#3160d8" },
            }}
          >
            {loading ? "Scanning..." : "Scan URL"}
          </Button>

          {loading && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100vw"
              height="100vh"
              position={"absolute"}
              zIndex={999}
              bgcolor="rgba(0, 0, 0, 0.5)"
              borderRadius={2}
              top={0}
              left={0}
            >
              <ScanAnimation />
            </Box>
          )}

          {scanResult && !loading && (
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mt: 3,
                bgcolor: getRiskColor(scanResult.riskScore, scanResult.status),
                color: "white",
                textAlign: "center",
              }}
            >
              <Typography variant="h6">
                {scanResult.status === "Clean" ? (
                  <CheckCircleIcon />
                ) : (
                  <ErrorIcon />
                )}{" "}
                {scanResult.status}
              </Typography>
              <Typography>
                Risk Score: {Math.round(scanResult.riskScore)}/100
              </Typography>
              {scanResult.note && (
                <Typography mt={2} fontStyle="italic">
                  Note: {scanResult.note}
                </Typography>
              )}
            </Paper>
          )}
        </Box>
      )}

      {tabIndex === 1 && (
        <Box textAlign="center" mt={3}>
          <Box
            {...getRootProps()}
            sx={{
              p: 4,
              border: "2px dashed #3f7afc",
              borderRadius: 2,
              textAlign: "center",
              cursor: "pointer",
              bgcolor: "rgba(135, 206, 250, 0.1)",
              "&:hover": { bgcolor: "rgba(135, 206, 250, 0.2)" },
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 50, color: "#3f7afc" }} />
            <Typography variant="body1" mt={1} color="white">
              Drag & Drop Images Here or Click to Browse
            </Typography>
            <Typography variant="body2" color="lightgray">
              Currently supported file types: Images (JPG, PNG)
            </Typography>
          </Box>

          {fileScanResults.length > 0 && (
            <List sx={{ mt: 2 }}>
              {fileScanResults.map((file, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor:
                      file.status === "Unsupported"
                        ? "#555555"
                        : getRiskColor(file.riskScore, file.status),
                    borderRadius: 2,
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={file.name}
                    secondary={
                      <React.Fragment>
                        {file.status === "Unsupported" ? (
                          file.note
                        ) : (
                          <span>
                            <span>Status: {file.status}</span>
                            {file.status === "Clean" && (
                              <span>, Category: {file.category}</span>
                            )}
                            , Probability: {Math.round(file.confidence * 100)}%
                          </span>
                        )}
                      </React.Fragment>
                    }
                    secondaryTypographyProps={{ color: "white" }}
                  />
                </ListItem>
              ))}
            </List>
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
        <Alert severity="success" variant="filled">
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
          variant="filled"
          onClose={() => setShowError(false)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ThreatScanner;
