import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Book as BookIcon,
  Help as HelpCircleIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  AccountCircle as AccountIcon,
  Email as EmailIcon,
  Logout as LogoutIcon
} from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider,
  Avatar,
  styled
} from "@mui/material";
import logo from "../assets/logo.png";

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

// CyberGlass effect for the drawer
const CyberDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    background: 'rgba(10, 14, 23, 0.85)',
    borderRight: `1px solid ${colors.matrixGreen}30`,
    boxShadow: `0 0 30px ${colors.matrixGreen}20`,
    backdropFilter: 'blur(10px)',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflowX: 'hidden',
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
  }
});

// Cyberpunk styled components
const CyberListItemButton = styled(ListItemButton)(({ selected }) => ({
  minHeight: 48,
  borderRadius: '8px',
  margin: '8px 12px',
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 0.3s ease',
  border: selected ? `1px solid ${colors.matrixGreen}` : `1px solid ${colors.matrixGreen}20`,
  background: selected 
    ? `linear-gradient(135deg, ${colors.matrixGreen}20 0%, ${colors.electricBlue}10 100%)` 
    : 'transparent',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 5px 15px ${colors.matrixGreen}30`,
    background: `linear-gradient(135deg, ${colors.matrixGreen}10 0%, ${colors.electricBlue}05 100%)`,
    '&::after': {
      transform: 'translateX(0)'
    }
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${colors.matrixGreen}15, transparent)`,
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease'
  },
  '& .MuiListItemIcon-root': {
    color: selected ? colors.matrixGreen : colors.starlight,
    minWidth: '36px'
  },
  '& .MuiListItemText-primary': {
    fontWeight: selected ? 'bold' : 'normal',
    color: selected ? colors.matrixGreen : colors.starlight,
    letterSpacing: '0.05em'
  }
}));

const CyberDivider = styled(Divider)({
  background: `linear-gradient(90deg, transparent, ${colors.matrixGreen}50, transparent)`,
  height: '1px',
  border: 'none',
  margin: '16px 0'
});

const CyberAvatar = styled(Avatar)({
  border: `2px solid ${colors.matrixGreen}`,
  boxShadow: `0 0 10px ${colors.matrixGreen}50`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: `0 0 20px ${colors.matrixGreen}`
  }
});

const CyberMenuButton = styled(IconButton)({
  color: colors.matrixGreen,
  transition: 'all 0.3s ease',
  '&:hover': {
    color: colors.electricBlue,
    transform: 'rotate(90deg)'
  }
});

const CyberLogo = styled('img')({
  filter: 'drop-shadow(0 0 4px rgba(0, 255, 157, 0.7))',
  transition: 'all 0.3s ease',
  '&:hover': {
    filter: 'drop-shadow(0 0 7px rgba(0, 255, 157, 1))'
  }
});

const CybersecuritySidebar = ({ isExpanded, setIsExpanded }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { name, username, email, picture } = user;

  const navItems = [
    { icon: <HomeIcon />, label: "Dashboard", route: "/dashboard" },
    { icon: <SearchIcon />, label: "Threat Scanner", route: "/threat-scanner" },
    { icon: <BookIcon />, label: "Cyber Guide", route: "/safety-guide" },
    { icon: <HelpCircleIcon />, label: "Emergency", route: "/emergency" },
    { icon: <SettingsIcon />, label: "Settings", route: "/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const getAvatarContent = () => {
    if (picture) return null;
    const displayName = username || name;
    return displayName ? displayName.charAt(0).toUpperCase() : "U";
  };

  return (
    <CyberDrawer
      variant="permanent"
      sx={{
        width: isExpanded ? 280 : 80,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isExpanded ? 280 : 80,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        },
      }}
    >
      <Box>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          p: 2,
          borderBottom: `1px solid ${colors.matrixGreen}20`,
          minHeight: 64
        }}>
          {isExpanded ? (
            <CyberLogo
              src={logo}
              alt="logo"
              style={{ borderRadius: '6px' }}
              width={180}
              height={45}
            />
          ) : (
            <Box sx={{ width: 40 }} /> // Spacer to balance the menu button
          )}
          <CyberMenuButton 
            onClick={() => setIsExpanded(!isExpanded)}
            size="large"
            sx={{ ml: isExpanded ? 0 : 'auto' }}
          >
            <MenuIcon sx={{ fontSize: "32px" }} />
          </CyberMenuButton>
        </Box>

        <List sx={{ p: 2 }}>
          {navItems.map((item) => (
            <ListItem 
              key={item.route}
              disablePadding
              sx={{
                display: 'block',
                mb: 1
              }}
            >
              <CyberListItemButton
                selected={location.pathname === item.route}
                onClick={() => navigate(item.route)}
                sx={{
                  justifyContent: 'center',
                  px: 2.5,
                  py: 1.5,
                  ...(isExpanded && {
                    justifyContent: 'initial',
                    px: 3
                  })
                }}
              >
                <ListItemIcon sx={{ 
                  justifyContent: 'center',
                  minWidth: 'auto',
                  ...(isExpanded && { 
                    justifyContent: 'flex-start',
                    minWidth: 36 
                  })
                }}>
                  {item.icon}
                </ListItemIcon>
                {isExpanded && (
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.9rem'
                    }}
                    sx={{ ml: 1 }}
                  />
                )}
              </CyberListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* User Profile Footer */}
      <Box sx={{ p: 2 }}>
        <CyberDivider />

        {/* Logout Button */}
        <ListItem disablePadding>
          <CyberListItemButton
            onClick={handleLogout}
            sx={{
              justifyContent: 'center',
              px: 2.5,
              py: 1.5,
              mb: 2,
              ...(isExpanded && {
                justifyContent: 'initial',
                px: 3
              })
            }}
          >
            <ListItemIcon sx={{ 
              justifyContent: 'center',
              minWidth: 'auto',
              ...(isExpanded && { 
                justifyContent: 'flex-start',
                minWidth: 36 
              })
            }}>
              <LogoutIcon />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Logout" sx={{ ml: 1 }} />}
          </CyberListItemButton>
        </ListItem>

        {/* User Profile */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 1,
          borderRadius: '8px',
          border: `1px solid ${colors.matrixGreen}20`,
          background: `linear-gradient(135deg, ${colors.deepSpace} 0%, ${colors.cosmicPurple}30 100%)`,
          '&:hover': {
            boxShadow: `0 0 15px ${colors.matrixGreen}30`
          },
          justifyContent: 'center',
          ...(isExpanded && {
            justifyContent: 'initial'
          })
        }}>
          <ListItemIcon sx={{ 
            display: 'flex',
            justifyContent: 'center',
            minWidth: 'auto',
            ...(isExpanded && { 
              justifyContent: 'flex-start',
              minWidth: 40 
            })
          }}>
            {picture ? (
              <CyberAvatar src={picture} alt={name} sx={{ width: 40, height: 40 }} />
            ) : (
              <CyberAvatar sx={{
                width: 40,
                height: 40,
                bgcolor: colors.cyberViolet,
                color: colors.starlight
              }}>
                {getAvatarContent()}
              </CyberAvatar>
            )}
          </ListItemIcon>
          {isExpanded && (
            <Box sx={{ 
              ml: 1, 
              overflow: "hidden",
              textOverflow: 'ellipsis',
              flex: 1
            }}>
              <Typography 
                variant="subtitle2" 
                noWrap
                sx={{
                  color: colors.matrixGreen,
                  fontWeight: 'bold'
                }}
              >
                {username || name || "User"}
              </Typography>
              <Typography 
                variant="caption" 
                noWrap
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: colors.cosmicDust,
                  fontSize: '0.7rem'
                }}
              >
                <EmailIcon sx={{ fontSize: 14, mr: 0.5 }} />
                {email || "no-email@domain.com"}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </CyberDrawer>
  );
};

export default CybersecuritySidebar;