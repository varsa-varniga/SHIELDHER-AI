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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import authService from "../api/auth";

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
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            boxShadow: 3,
            border: "1px solid grey",
            borderRadius: 2,
            backgroundColor: "transparent",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: 3, color: "whitesmoke" }}
          >
            Invalid Request
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: "whitesmoke", textAlign: "center" }}
          >
            Please follow the password reset process from the beginning.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/forgot-password")}
            sx={{ mt: 2 }}
          >
            Go to Forgot Password
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          boxShadow: 3,
          border: "1px solid grey",
          borderRadius: 2,
          backgroundColor: "transparent",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 3, color: "whitesmoke" }}
        >
          Reset Password
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

        <Typography
          variant="body1"
          sx={{ mb: 3, color: "whitesmoke", textAlign: "center" }}
        >
          Create a new password for {email}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "whitesmoke",
                  borderRadius: "10px",
                },
                "&:hover fieldset": {
                  borderColor: "whitesmoke",
                },
              },
              "& .MuiInputLabel-root": {
                color: "whitesmoke",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "whitesmoke" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "whitesmoke",
                  borderRadius: "10px",
                },
                "&:hover fieldset": {
                  borderColor: "whitesmoke",
                },
              },
              "& .MuiInputLabel-root": {
                color: "whitesmoke",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    sx={{ color: "whitesmoke" }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              borderRadius: "10px",
              fontWeight: 600,
              height: "48px",
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
