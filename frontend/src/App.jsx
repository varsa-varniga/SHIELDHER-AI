import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "../layout";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [manuals] = useState([
    [
      {
        title: "Citizen Manual Report CPRGR complaints",
        link: "https://cybercrime.gov.in/UploadMedia/MHA-CitizenManualReportCPRGRcomplaints-v10.pdf",
        isNew: false,
      },
      {
        title: "Citizen Manual REPORT CYBER CRIME",
        link: "https://cybercrime.gov.in/UploadMedia/MHA-CitizenManualReportOtherCyberCrime-v10.pdf",
        isNew: true,
      },
      {
        title:
          "Citizen Manual Financial Cyber Frauds Reporting and Management System",
        link: "https://cybercrime.gov.in/UploadMedia/instructions_citizenreportingcyberfrauds.pdf",
        isNew: false,
      },
    ],
    [
      { title: "Manual 1B", link: "#", isNew: true },
      { title: "Manual 2B", link: "#", isNew: false },
      { title: "Manual 3B", link: "#", isNew: true },
    ],
    [
      { title: "Manual 1C", link: "#", isNew: false },
      { title: "Manual 2C", link: "#", isNew: true },
      { title: "Manual 3C", link: "#", isNew: false },
    ],
  ]);

  useEffect(() => {
    console.log("Google Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
  }, []);

  return (
    // <AuthProvider>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        onScriptLoadError={() =>
          console.error("Google OAuth script failed to load")
        }
        onScriptLoadSuccess={() =>
          console.log("Google OAuth script loaded successfully")
        }
      >
        <Router>
          <CssBaseline />
          <Layout
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            manuals={manuals}
          />
        </Router>
      </GoogleOAuthProvider>
    // </AuthProvider>
  );
}

export default App;
