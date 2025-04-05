import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Tabs, Tab } from "@mui/material";

const UrlScanner = () => {
  const [tab, setTab] = useState(0);
  const [inputValue, setInputValue] = useState("");

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #0D1B2A, #ffffff)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Paper
        elevation={4}
        style={{
          width: "600px",
          padding: "30px",
          textAlign: "center",
          borderRadius: "12px",
          background: "#F5F7FA",
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          fontWeight={600}
          color="#1c3d6e"
          style={{ marginBottom: "15px" }}
        >
          Detect if a URL has a phishing link or is malicious.
        </Typography>

        {/* Tabs Section */}
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          centered
          style={{ marginBottom: "20px" }}
        >
          <Tab label="🔗 URL Scan" style={{ fontWeight: "600" }} />
          <Tab label="📂 File Upload" style={{ fontWeight: "600" }} />
        </Tabs>

        {/* URL Scan Section */}
        {tab === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#E9EDF2",
            }}
          >
         <TextField
  fullWidth
  variant="outlined"
  placeholder="example.com"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  sx={{
    backgroundColor: "primary.light", // Lighter primary color
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    flex: 1,
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "primary.main" }, // Matches theme
      "&:hover fieldset": { borderColor: "primary.dark" },
      "&.Mui-focused fieldset": { borderColor: "primary.dark" },
    },
  }}
  inputProps={{
    style: { padding: "16px", fontSize: "16px", color: "#637381" },
  }}
/>

            <Button
              variant="contained"
              style={{
                background: "#165DFF",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                padding: "14px 24px",
                borderRadius: "0px 8px 8px 0px",
              }}
            >
              Scan
            </Button>
          </div>
        ) : (
          /* File Upload Section */
          <div
            style={{
              padding: "20px",
              background: "#E9EDF2",
              borderRadius: "8px",
              border: "2px dashed #165DFF",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <Typography variant="h6" color="#165DFF" fontWeight="600">
              Drag & Drop or Click to Upload File
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Supports common file formats (e.g., .pdf, .docx, .png)
            </Typography>
          </div>
        )}
      </Paper>
    </div>
  );
};

// eslint-disable-next-line no-irregular-whitespace
export default UrlScanner;