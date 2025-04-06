import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import authService from "../api/auth";
import { styled } from "@mui/material/styles";

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
}));

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

const OtpInput = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "12px",
  margin: "24px 0",
  "& input": {
    width: "48px",
    height: "48px",
    textAlign: "center",
    fontSize: "24px",
    borderRadius: "8px",
    background: "rgba(26, 26, 46, 0.5)",
    border: `1px solid ${colors.matrixGreen}50`,
    color: colors.starlight,
    outline: "none",
    transition: "all 0.3s ease",
    "&:focus": {
      borderColor: colors.matrixGreen,
      boxShadow: `0 0 10px ${colors.matrixGreen}50`,
      transform: "translateY(-2px)",
    },
  },
});

const VerifyOTP = () => {
  const location = useLocation();
  const { state } = location;
  const email = state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current input is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
      if (pasteData.length === 6) {
        inputRefs.current[5].focus();
      } else {
        inputRefs.current[pasteData.length].focus();
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authService.verifyOTP(email, otpString);
      setMessage(response.message || "OTP verified successfully");
      setVerified(true);
    } catch (err) {
      setError(err.message || "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const proceedToReset = () => {
    navigate("/resetPassword", {
      state: {
        email,
        otp: otp.join(""),
        message: "OTP verified. Please set your new password.",
      },
    });
  };

  if (!email) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${colors.deepSpace} 0%, ${colors.cosmicPurple} 100%)`,
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `radial-gradient(circle at 20% 30%, ${colors.cyberViolet}20 0%, transparent 50%)`,
          },
          "&:after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `radial-gradient(circle at 80% 70%, ${colors.plasmaPink}10 0%, transparent 50%)`,
          },
        }}
      >
        <Container maxWidth="sm">
          <CyberGlassBox>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: 800,
                letterSpacing: "0.05em",
                background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SESSION EXPIRED
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: colors.cosmicDust, mb: 4 }}
            >
              Please restart the password reset process
            </Typography>
            <CyberButton
              variant="contained"
              onClick={() => navigate("/forgot-password")}
              fullWidth
            >
              GO TO FORGOT PASSWORD
            </CyberButton>
          </CyberGlassBox>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${colors.deepSpace} 0%, ${colors.cosmicPurple} 100%)`,
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 20% 30%, ${colors.cyberViolet}20 0%, transparent 50%)`,
        },
        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 80% 70%, ${colors.plasmaPink}10 0%, transparent 50%)`,
        },
      }}
    >
      <Container maxWidth="sm">
        <CyberGlassBox>
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              mb: 4,
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: 800,
                letterSpacing: "0.05em",
                background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              VERIFY ACCESS CODE
            </Typography>
            <Typography variant="body2" sx={{ color: colors.cosmicDust }}>
              Enter the 6-digit code sent to {email}
            </Typography>

            {message && (
              <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
                {message}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleVerify}
              sx={{ width: "100%" }}
            >
              <OtpInput onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </OtpInput>

              <CyberButton
                type={verified ? "button" : "submit"}
                fullWidth
                variant="contained"
                disabled={loading}
                onClick={verified ? proceedToReset : null}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  borderRadius: "12px",
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      size={24}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                    VERIFYING...
                  </>
                ) : verified ? (
                  "PROCEED TO RESET"
                ) : (
                  "VERIFY CODE"
                )}
              </CyberButton>
            </Box>

            <Box
              sx={{
                textAlign: "center",
                mt: 3,
                position: "relative",
                zIndex: 1,
              }}
            >
              <Typography variant="body2" sx={{ color: colors.cosmicDust }}>
                Didn't receive code?{" "}
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  sx={{
                    fontWeight: "bold",
                    color: colors.matrixGreen,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Resend OTP
                </Link>
              </Typography>
            </Box>
          </Box>
        </CyberGlassBox>
      </Container>
    </Box>
  );
};

export default VerifyOTP;
