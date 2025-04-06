import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import CybersecuritySidebar from "./src/screens/sidebar";
import Dashboard from "./src/components/dashboard";
import ThreatScanner from "./src/components/threatscanner";
import CyberSafetyGuide from "./src/components/cybersecurity";
import EmergencyHelp from "./src/components/emergency";
import Header from "./src/screens/header";
import Login from "./src/components/login";
import SignUp from "./src/components/signUp";
import ForgotPassword from "./src/components/forgetPassword";
import VerifyOTP from "./src/components/verifyOTP";
import ResetPassword from "./src/components/resetPassword";
import LandingPage from "./src/components/landingPage";
import CybersecurityQuiz from "./src/components/CyberSecurityQuiz";
import CitizenManualPage from "./src/components/Guides";
import CyberSafetyTips from "./src/components/CyberSafetyTips";
import ProfileSettings from "./src/components/settings";

function Layout({ isExpanded, setIsExpanded, manuals }) {
  const location = useLocation();
  const isAuthPage = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-otp",
    "/resetPassword",
  ].includes(location.pathname);
  const isLandingPage = location.pathname === "/";

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#1a2634",
        color: "#ffffff",
      }}
    >
      {location.pathname === "/" && <Header />}

      {!isAuthPage && (
        <CybersecuritySidebar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      )}

      <main
        style={{
          flexGrow: 1,
          padding: "20px",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: "#1a2634",
          transition: "background-color 0.3s ease",
        }}
      >
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/resetPassword" element={<ResetPassword />} />

          {/* Protected App Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/threat-scanner" element={<ThreatScanner />} />
          <Route path="/safety-guide" element={<CyberSafetyGuide />} />
          <Route path="/emergency" element={<EmergencyHelp />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="/cyberquiz" element={<CybersecurityQuiz />} />
          <Route path="/cyber-safety-tips" element={<CyberSafetyTips />} />

          {/* Manual Pages */}
          <Route
            path="/cyber-guide"
            element={
              <CitizenManualPage
                title="Cyber Guide Manuals"
                manuals={manuals[0]}
              />
            }
          />
          <Route
            path="/cyber-awareness"
            element={
              <CitizenManualPage
                title="Cyber Awareness Manuals"
                manuals={manuals[1]}
              />
            }
          />
          <Route
            path="/cyber-dailydigest"
            element={
              <CitizenManualPage
                title="Cyber Daily Digest Manuals"
                manuals={manuals[2]}
              />
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default Layout;
