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
      { title: "Financial Fraud", link: "https://cybercrime.gov.in/pdf/Financial%20Fraud%20Brochures%20final.pdf", isNew: true },
      { title: "Job Fraud", link: "https://cybercrime.gov.in/pdf/Financial%20Fraud%20Brochures%20final.pdf", isNew: false },
      { title: "Matrimonial Fraud", link: "https://cybercrime.gov.in/pdf/Matrimonial%20fraud%20brochure%20final.pdf", isNew: true },
    ],
    [
      { title: "Cyber Hygiene for Cyber Space", link: "https://cybercrime.gov.in/pdf/Final_English_Manual_Basic.pdf", isNew: false },
      { title: "Safe use of social Media Platform", link: "https://cybercrime.gov.in/pdf/Safe%20Use%20of%20social%20Media%20Platform%20Brochure%20final.pdf", isNew: true },
      { title: "Cyber Crime", link: "https://cybercrime.gov.in/pdf/Cyber%20Security%20Awareness%20Booklet%20for%20Citizens.pdf", isNew: false },
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
