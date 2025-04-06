import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Divider,
  Link,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import { Link as RouterLink } from "react-router-dom";
import authService from "../api/auth";
import { styled } from "@mui/material/styles";
import { jwtDecode } from "jwt-decode";

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

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      const response = await authService.register(userData);
      if (response) {
        navigate("/dashboard");
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleLoading(true);
    setApiError("");

    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, name, picture } = decoded;

      const response = await authService.googleLogin({
        email,
        name,
        picture,
        credential: credentialResponse.credential,
      });

      if (response) {
        navigate("/dashboard");
      }
    } catch (err) {
      setApiError(err.message || "Google login failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setApiError("Google login failed. Please try again.");
  };

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
                mb: 1.5,
                fontWeight: 800,
                letterSpacing: "0.05em",
                background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              REGISTER ACCESS
            </Typography>
            <Typography variant="body2" sx={{ color: colors.cosmicDust }}>
              Create your account to initiate security protocol
            </Typography>

            {apiError && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {apiError}
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
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                disabled={loading || googleLoading}
              />

              <CyberTextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                disabled={loading || googleLoading}
              />

              <CyberTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                disabled={loading || googleLoading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: colors.matrixGreen }}
                        disabled={loading || googleLoading}
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
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                disabled={loading || googleLoading}
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
                        disabled={loading || googleLoading}
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
                disabled={loading || googleLoading}
                sx={{
                  mt: 2,
                  mb: 1.5,
                  py: 1.5,
                  borderRadius: "12px",
                }}
              >
                {loading ? "INITIATING..." : "REGISTER"}
              </CyberButton>

              <Divider
                sx={{
                  my: 2,
                  fontWeight: "bold",
                  color: "whitesmoke",
                  "&::before, &::after": {
                    borderColor: `${colors.matrixGreen}50`,
                  },
                }}
              >
                OR
              </Divider>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                  pointerEvents: loading || googleLoading ? "none" : "auto",
                  opacity: loading || googleLoading ? 0.7 : 1,
                }}
              >
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="400"
                  locale="en_US"
                  theme="filled_black"
                />
              </Box>

              <Box
                sx={{
                  textAlign: "center",
                  mt: 2,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Typography variant="body2" sx={{ color: colors.cosmicDust }}>
                  Already have an account?{" "}
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
                      pointerEvents: loading || googleLoading ? "none" : "auto",
                    }}
                  >
                    Login Access
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </CyberGlassBox>
      </Container>
    </Box>
  );
};

export default SignUp;
