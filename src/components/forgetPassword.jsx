import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  Link,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import authService from '../api/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await authService.sendOTP(email);
      setMessage(response.message || "OTP sent successfully");
      
      // Navigate to OTP verification only if email exists
      if (response.success) {
        setTimeout(() => {
          navigate('/verify-otp', { state: { email } });
        }, 1500);
      }
    } catch (err) {
      console.error('OTP Send Error:', err);
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          Forgot Password
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
          Enter your email address to receive an OTP for password reset.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
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
            ) : (
              'Send OTP'
            )}
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Link 
            component={RouterLink} 
            to="/login" 
            sx={{ 
              color: 'whitesmoke',
              fontWeight: 'bold',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Back to Login
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;