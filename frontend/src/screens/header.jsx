import { AppBar, Toolbar, Button, Box, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

// Cyberpunk color palette
const colors = {
  deepSpace: '#0a0e17',
  cosmicPurple: '#1a1a2e',
  nebulaBlue: '#16213e',
  cyberViolet: '#4a148c',
  matrixGreen: '#00ff9d',
  electricBlue: '#00d1ff',
  plasmaPink: '#ff00aa',
  starlight: '#e6f1ff',
  cosmicDust: '#7f8c8d',
  voidBlack: '#000000',
  hackerGreen: '#39ff14'
};

// CyberGlass effect for AppBar
const CyberAppBar = styled(AppBar)({
  background: 'rgba(10, 14, 23, 0.85) !important',
  borderBottom: `1px solid ${colors.matrixGreen}30`,
  boxShadow: `0 0 30px ${colors.matrixGreen}20 !important`,
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${colors.deepSpace} 0%, ${colors.cosmicPurple} 100%)`,
    zIndex: -1,
  }
});

// Cyberpunk styled button
const CyberButton = styled(Button)({
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid transparent',
  background: `linear-gradient(${colors.deepSpace}, ${colors.deepSpace}) padding-box, 
              linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%) border-box`,
  color: colors.starlight,
  fontWeight: 'bold',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 10px 20px ${colors.matrixGreen}30`,
    background: `linear-gradient(${colors.deepSpace}, ${colors.deepSpace}) padding-box, 
                linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.plasmaPink} 100%) border-box`
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${colors.matrixGreen}20, transparent)`,
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease'
  },
  '&:hover:after': {
    transform: 'translateX(100%)'
  }
});

// Cyberpunk styled logo
const CyberLogo = styled('img')({
  filter: 'drop-shadow(0 0 5px rgba(0, 255, 157, 0.7))',
  transition: 'all 0.3s ease',
  height: '40px',
  '&:hover': {
    filter: 'drop-shadow(0 0 10px rgba(0, 255, 157, 1))',
    transform: 'scale(1.05)'
  }
});

const Header = () => {
  const navigate = useNavigate();

  return (
    <CyberAppBar>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 'xl',
        mx: 'auto',
        width: '100%',
        px: { xs: 2, sm: 4 },
        py: 1
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 2
        }}>
          <CyberLogo
            src={logo}
            alt="ShieldHer Logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
          <Typography variant="h6" sx={{
            background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            letterSpacing: '0.05em',
            display: { xs: 'none', md: 'block' }
          }}>
            SHIELDHER
          </Typography>
        </Box>
        
        <CyberButton
          variant='outlined'
          onClick={() => navigate('/login')}
          sx={{
            px: 4,
            py: 1,
            fontWeight: 600,
            borderRadius: '12px'
          }}
        >
          Login
        </CyberButton>
      </Toolbar>
    </CyberAppBar>
  );
};

export default Header;