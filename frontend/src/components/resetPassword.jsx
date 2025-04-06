import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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

const ResetPassword = () => {
  const location = useLocation();
  const { state } = location;
  const { email, otp, message: initialMessage } = state || {};

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(initialMessage || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authService.resetPassword(email, otp, password);
      setMessage(response.message || "Password updated successfully");

      // Redirect to login after 2 seconds with success message
      setTimeout(() => {
        navigate("/login", {
          state: {
            message:
              "Password reset successful. Please login with your new password.",
          },
        });
      }, 2000);
    } catch (err) {
      setError(err.message || "Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!email || !otp) {
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
              INVALID REQUEST
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: colors.cosmicDust, mb: 4 }}
            >
              Please follow the password reset process from the beginning
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
              RESET SECURITY CODE
            </Typography>
            <Typography variant="body2" sx={{ color: colors.cosmicDust }}>
              Create a new security code for {email}
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
              onSubmit={handleSubmit}
              sx={{ width: "100%" }}
            >
              <CyberTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Security Code"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: colors.matrixGreen }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <CyberTextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Security Code"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                        sx={{ color: colors.matrixGreen }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <CyberButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
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
                    UPDATING...
                  </>
                ) : (
                  "UPDATE SECURITY CODE"
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
                Remember your code?{" "}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    fontWeight: "bold",
                    color: colors.matrixGreen,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Login Access
                </Link>
              </Typography>
            </Box>
          </Box>
        </CyberGlassBox>
      </Container>
    </Box>
  );
};

export default ResetPassword;
