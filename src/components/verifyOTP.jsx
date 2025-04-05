import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  CircularProgress
} from '@mui/material';
import authService from '../api/auth';

const VerifyOTP = () => {
  const location = useLocation();
  const { state } = location;
  const email = state?.email || '';
  
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await authService.verifyOTP(email, otp);
      setMessage(response.message || 'OTP verified successfully');
      setVerified(true);
    } catch (err) {
      setError(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const proceedToReset = () => {
    navigate('/resetPassword', { 
      state: { 
        email, 
        otp,
        message: 'OTP verified. Please set your new password.' 
      } 
    });
  };

  if (!email) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: 4,
          boxShadow: 3,
          border: '1px solid grey',
          borderRadius: 2,
          backgroundColor: 'transparent'
        }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3, color: 'whitesmoke' }}>
            Session Expired
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'whitesmoke', textAlign: 'center' }}>
            Please restart the password reset process.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/forgot-password')}
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
      <Box sx={{ 
        marginTop: 8, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: 4,
        boxShadow: 3,
        border: '1px solid grey',
        borderRadius: 2,
        backgroundColor: 'transparent'
      }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3, color: 'whitesmoke' }}>
          Verify OTP
        </Typography>
        
        {message && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="body1" sx={{ mb: 3, color: 'whitesmoke', textAlign: 'center' }}>
          Enter the 6-digit OTP sent to {email}
        </Typography>

        <Box component="form" onSubmit={handleVerify} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="otp"
            label="OTP"
            name="otp"
            autoComplete="off"
            autoFocus
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
              setOtp(value.slice(0, 6)); // Limit to 6 digits
            }}
            inputProps={{ maxLength: 6 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'whitesmoke',
                  borderRadius: '10px'
                },
                '&:hover fieldset': {
                  borderColor: 'whitesmoke'
                }
              },
              '& .MuiInputLabel-root': {
                color: 'whitesmoke'
              },
              '& .MuiInputBase-input': {
                color: 'white'
              }
            }}
          />

          <Button
            type={verified ? "button" : "submit"}
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={verified ? proceedToReset : null}
            sx={{ 
              mt: 3, 
              mb: 2, 
              py: 1.5,
              borderRadius: '10px',
              fontWeight: 600,
              height: '48px'
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : verified ? (
              'Proceed to Reset Password'
            ) : (
              'Verify OTP'
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default VerifyOTP;