import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Paper,
  Divider,
  Chip,
  Grid,
  useTheme,
} from "@mui/material";
import bannerImage from "../assets/bannerImage.jpg";
import { testimonials } from "../data/testimonial";
import { faqs } from "../data/faqs";
import { features } from "../data/features";
import { howItWorks } from "../data/howItWorks";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import BoltIcon from "@mui/icons-material/Bolt";
import ShieldIcon from "@mui/icons-material/Shield";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";

// Custom futuristic cyberpunk-inspired color palette
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

// Glass morphism effect
const glassEffect = {
  background: "rgba(10, 14, 23, 0.7)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(0, 255, 157, 0.2)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
};

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  background: `linear-gradient(135deg, ${colors.deepSpace} 0%, ${colors.cosmicPurple} 100%)`,
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 20% 30%, ${colors.cyberViolet}20 0%, transparent 50%)`,
  },
  "&:after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 80% 70%, ${colors.plasmaPink}10 0%, transparent 50%)`,
  },
}));

const CyberButton = styled(Button)({
  position: "relative",
  overflow: "hidden",
  border: "1px solid transparent",
  background: `linear-gradient(${colors.deepSpace}, ${colors.deepSpace}) padding-box, 
                linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%) border-box`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: `0 10px 20px ${colors.matrixGreen}30`,
    background: `linear-gradient(${colors.deepSpace}, ${colors.deepSpace}) padding-box, 
                    linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.plasmaPink} 100%) border-box`,
  },
  "&:active": {
    transform: "translateY(0)",
  },
});

const CyberCard = styled(Card)({
  background: `linear-gradient(145deg, ${colors.nebulaBlue} 0%, ${colors.cosmicPurple} 100%)`,
  border: "1px solid rgba(0, 255, 157, 0.1)",
  borderRadius: "16px",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  overflow: "hidden",
  position: "relative",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `linear-gradient(45deg, transparent 45%, ${colors.matrixGreen}20 50%, transparent 55%)`,
    backgroundSize: "300% 300%",
    opacity: 0,
    transition: "all 0.5s ease",
  },
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: `0 15px 30px ${colors.matrixGreen}20`,
    border: `1px solid ${colors.matrixGreen}50`,
    "&:before": {
      opacity: 1,
      backgroundPosition: "100% 100%",
    },
  },
});

const CyberAccordion = styled(Accordion)({
  background: `linear-gradient(145deg, ${colors.nebulaBlue} 0%, ${colors.cosmicPurple} 100%)`,
  border: "1px solid rgba(0, 255, 157, 0.1)",
  borderRadius: "8px !important",
  marginBottom: "16px",
  transition: "all 0.3s ease",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    border: `1px solid ${colors.matrixGreen}50`,
    boxShadow: `0 5px 15px ${colors.matrixGreen}10`,
  },
});

const CyberText = styled(Typography)({
  background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
  fontWeight: "bold",
});

const CyberDivider = styled(Divider)({
  background: `linear-gradient(90deg, transparent, ${colors.matrixGreen}50, transparent)`,
  height: "1px",
  border: "none",
});

export default function LandingPage() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: colors.deepSpace,
        color: colors.starlight,
        overflowX: "hidden",
      }}
    >
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12} md={6}>
              <Chip
                label="Next Gen Protection"
                sx={{
                  background: `linear-gradient(90deg, ${colors.matrixGreen}20, ${colors.electricBlue}20)`,
                  color: colors.matrixGreen,
                  mb: 3,
                  px: 2,
                  py: 1,
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                }}
                icon={<BoltIcon sx={{ color: colors.matrixGreen }} />}
              />
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  lineHeight: 1.2,
                  letterSpacing: "-0.03em",
                }}
              >
                Secure Your{" "}
                <CyberText sx={{ fontSize: "32px" }}>
                  Digital Universe
                </CyberText>{" "}
                with Advanced Threat Shield
              </Typography>
              <Typography
                variant="h5"
                component="p"
                sx={{
                  mb: 4,
                  color: colors.cosmicDust,
                  lineHeight: 1.6,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                Real-time AI-powered protection against phishing, malware, and
                cyber threats. Browse with confidence in the ever-expanding
                digital cosmos.
              </Typography>
              <Box sx={{ display: "flex", gap: 3, mt: 4 }}>
                <CyberButton
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/signup"
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontWeight: "bold",
                  }}
                >
                  Activate Shield
                </CyberButton>
                <Button
                  variant="text"
                  size="large"
                  component={Link}
                  to="/demo"
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontWeight: "bold",
                    color: colors.matrixGreen,
                    "&:hover": {
                      backgroundColor: `${colors.matrixGreen}10`,
                    },
                  }}
                >
                  Live Demo
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: "-20px",
                    left: "-20px",
                    right: "-20px",
                    bottom: "-20px",
                    border: `2px solid ${colors.matrixGreen}30`,
                    borderRadius: "24px",
                    zIndex: -1,
                    animation: "pulse 6s infinite alternate",
                  },
                  "@keyframes pulse": {
                    "0%": { opacity: 0.3 },
                    "100%": { opacity: 0.7 },
                  },
                }}
              >
                <Box
                  component="img"
                  src={bannerImage}
                  alt="Shield Dashboard"
                  sx={{
                    width: "100%",
                    borderRadius: "16px",
                    border: `1px solid ${colors.matrixGreen}30`,
                    boxShadow: `0 20px 50px ${colors.voidBlack}`,
                    transform: "perspective(1000px) rotateY(-5deg)",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "perspective(1000px) rotateY(0deg)",
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Box
        sx={{
          py: 10,
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(180deg, ${colors.deepSpace} 0%, ${colors.nebulaBlue} 100%)`,
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "radial-gradient(circle at 30% 50%, rgba(74, 20, 140, 0.1) 0%, transparent 50%)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              <CyberText sx={{ fontSize: "25px" }}>Quantum</CyberText> Security
              Features
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                maxWidth: 700,
                mx: "auto",
                color: colors.cosmicDust,
                lineHeight: 1.6,
              }}
            >
              Our cutting-edge technology combines AI, machine learning, and
              blockchain to provide unparalleled protection across all digital
              dimensions.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CyberCard>
                  <CardContent
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        mb: 3,
                        width: 60,
                        height: 60,
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${colors.matrixGreen}20 0%, ${colors.electricBlue}20 100%)`,
                        border: `1px solid ${colors.matrixGreen}30`,
                      }}
                    >
                      {React.cloneElement(feature.icon, {
                        sx: {
                          fontSize: 28,
                          color: colors.matrixGreen,
                        },
                      })}
                    </Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        color: colors.starlight,
                        mb: 2,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: colors.cosmicDust,
                        flexGrow: 1,
                        mb: 2,
                      }}
                    >
                      {feature.description}
                    </Typography>
                    <Box sx={{ mt: "auto" }}>
                      <Button
                        endIcon={<BoltIcon />}
                        sx={{
                          color: colors.matrixGreen,
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: `${colors.matrixGreen}10`,
                          },
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </CardContent>
                </CyberCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          py: 10,
          background: `linear-gradient(135deg, ${colors.cyberViolet} 0%, ${colors.nebulaBlue} 100%)`,
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "radial-gradient(circle at 70% 30%, rgba(0, 255, 157, 0.1) 0%, transparent 70%)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                }}
              >
                Trusted by{" "}
                <CyberText sx={{ fontSize: "25px" }}>Millions</CyberText> Across
                the Galaxy
              </Typography>
              <CyberDivider sx={{ mb: 3 }} />
              <Typography
                variant="body1"
                sx={{
                  color: colors.starlight,
                  opacity: 0.9,
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                Our security protocols are battle-tested across multiple digital
                frontiers, providing impenetrable defense against even the most
                sophisticated cyber threats.
              </Typography>
              <CyberButton
                variant="contained"
                size="large"
                component={Link}
                to="/case-studies"
                sx={{
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                }}
              >
                View Case Studies
              </CyberButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={4}>
                {[
                  {
                    value: "10M+",
                    label: "Threats Neutralized",
                    icon: (
                      <ShieldIcon
                        sx={{
                          fontSize: 40,
                          color: colors.matrixGreen,
                          marginRight: "10px",
                        }}
                      />
                    ),
                  },
                  {
                    value: "99.99%",
                    label: "Detection Accuracy",
                    icon: (
                      <VerifiedUserIcon
                        sx={{
                          fontSize: 40,
                          color: colors.electricBlue,
                          marginRight: "10px",
                        }}
                      />
                    ),
                  },
                  {
                    value: "24/7",
                    label: "Quantum Monitoring",
                    icon: (
                      <PublicIcon
                        sx={{
                          fontSize: 40,
                          color: colors.plasmaPink,
                          marginRight: "10px",
                        }}
                      />
                    ),
                  },
                  {
                    value: "500K+",
                    label: "Protected Systems",
                    icon: (
                      <LockIcon
                        sx={{
                          fontSize: 40,
                          color: colors.hackerGreen,
                          marginRight: "10px",
                        }}
                      />
                    ),
                  },
                ].map((stat, index) => (
                  <Grid item xs={6} key={index}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: "12px",
                        background: "rgba(10, 14, 23, 0.5)",
                        border: "1px solid rgba(0, 255, 157, 0.1)",
                        height: "100%",
                        textAlign: "center",
                      }}
                    >
                      {stat.icon}
                      <CyberText
                        variant="h3"
                        sx={{ fontWeight: "bold", my: 1 }}
                      >
                        {stat.value}
                      </CyberText>
                      <Typography
                        variant="body1"
                        sx={{ color: colors.starlight }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Box
        sx={{
          py: 10,
          background: `linear-gradient(180deg, ${colors.nebulaBlue} 0%, ${colors.deepSpace} 100%)`,
          position: "relative",
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              <CyberText sx={{ fontSize: "25px" }}>
                Zero-Configuration
              </CyberText>{" "}
              Protection
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                maxWidth: 700,
                mx: "auto",
                color: colors.cosmicDust,
                lineHeight: 1.6,
              }}
            >
              Get enterprise-grade security with just a few clicks. Our system
              adapts to your digital footprint automatically.
            </Typography>
          </Box>

          <Box
            sx={{
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "2px",
                height: "100%",
                background: `linear-gradient(transparent, ${colors.matrixGreen}, transparent)`,
                [theme.breakpoints.down("md")]: {
                  display: "none",
                },
              },
            }}
          >
            {howItWorks.map((step, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  mb: 6,
                  position: "relative",
                  flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                  [theme.breakpoints.down("md")]: {
                    flexDirection: "column",
                  },
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    p: 4,
                    [theme.breakpoints.down("md")]: {
                      order: 2,
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: "16px",
                      background: `linear-gradient(145deg, ${colors.nebulaBlue} 0%, ${colors.cosmicPurple} 100%)`,
                      border: `1px solid ${colors.matrixGreen}20`,
                      boxShadow: `0 10px 30px ${colors.voidBlack}80`,
                      height: "100%",
                      position: "relative",
                      overflow: "hidden",
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "4px",
                        height: "100%",
                        background: `linear-gradient(${colors.matrixGreen}, ${colors.electricBlue})`,
                        opacity: 0.8,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: `linear-gradient(135deg, ${colors.matrixGreen}20 0%, ${colors.electricBlue}20 100%)`,
                          border: `1px solid ${colors.matrixGreen}30`,
                          mr: 3,
                        }}
                      >
                        {React.cloneElement(step.icon, {
                          sx: {
                            fontSize: 24,
                            color: colors.matrixGreen,
                          },
                        })}
                      </Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                          fontWeight: 700,
                          color: colors.starlight,
                        }}
                      >
                        {step.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: colors.cosmicDust,
                        lineHeight: 1.8,
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    [theme.breakpoints.down("md")]: {
                      order: 1,
                      mb: 4,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(135deg, ${colors.matrixGreen}10 0%, ${colors.electricBlue}10 100%)`,
                      border: `2px solid ${colors.matrixGreen}30`,
                      position: "relative",
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        top: -10,
                        left: -10,
                        right: -10,
                        bottom: -10,
                        borderRadius: "50%",
                        border: `2px solid ${colors.matrixGreen}20`,
                        animation: "ripple 3s infinite ease-out",
                        "@keyframes ripple": {
                          "0%": { transform: "scale(1)", opacity: 1 },
                          "100%": { transform: "scale(1.5)", opacity: 0 },
                        },
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: "bold",
                        background: `linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {index + 1}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box
        sx={{
          py: 10,
          background: `linear-gradient(135deg, ${colors.deepSpace} 0%, ${colors.cyberViolet} 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Voices from the{" "}
              <CyberText sx={{ fontSize: "25px" }}>Digital Frontier</CyberText>
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                maxWidth: 700,
                mx: "auto",
                color: colors.cosmicDust,
                lineHeight: 1.6,
              }}
            >
              Don't take our word for it. Here's what cyber warriors across the
              galaxy say about our shields.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    height: "100%",
                    position: "relative",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: "16px",
                      background: `linear-gradient(135deg, ${colors.matrixGreen}10 0%, ${colors.electricBlue}10 100%)`,
                      transform: "rotate(2deg)",
                      zIndex: -1,
                    },
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: "100%",
                      background: `linear-gradient(145deg, ${colors.nebulaBlue} 0%, ${colors.cosmicPurple} 100%)`,
                      border: `1px solid ${colors.matrixGreen}30`,
                      borderRadius: "16px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: `0 15px 30px ${colors.voidBlack}80`,
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Avatar
                        alt={testimonial.name}
                        src={testimonial.avatar}
                        sx={{
                          width: 60,
                          height: 60,
                          mr: 3,
                          border: `2px solid ${colors.matrixGreen}`,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ color: colors.starlight }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: colors.matrixGreen }}
                        >
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: colors.cosmicDust,
                        lineHeight: 1.8,
                        position: "relative",
                        fontStyle: "italic",
                        "&:before, &:after": {
                          content: '"\\""',
                          fontSize: "2rem",
                          color: `${colors.matrixGreen}50`,
                          lineHeight: 0,
                          verticalAlign: "middle",
                        },
                        "&:before": {
                          mr: 1,
                        },
                        "&:after": {
                          ml: 1,
                        },
                      }}
                    >
                      {testimonial.quote}
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box
        sx={{
          py: 10,
          background: `linear-gradient(180deg, ${colors.cyberViolet} 0%, ${colors.deepSpace} 100%)`,
          position: "relative",
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              <CyberText sx={{ fontSize: "25px" }}>Frequently</CyberText> Asked
              Questions
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                maxWidth: 700,
                mx: "auto",
                color: colors.cosmicDust,
                lineHeight: 1.6,
              }}
            >
              Answers to common questions about our quantum security protocols.
            </Typography>
          </Box>

          <Box>
            {faqs.map((faq, index) => (
              <CyberAccordion key={index} elevation={0}>
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon sx={{ color: colors.matrixGreen }} />
                  }
                  sx={{
                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                      color: colors.starlight,
                      flexGrow: 1,
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    sx={{
                      color: colors.cosmicDust,
                      lineHeight: 1.8,
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </CyberAccordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          py: 12,
          background: `linear-gradient(135deg, ${colors.nebulaBlue} 0%, ${colors.cyberViolet} 100%)`,
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "radial-gradient(circle at 70% 30%, rgba(0, 255, 157, 0.1) 0%, transparent 70%)",
            zIndex: 0,
          },
          "&:after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "radial-gradient(circle at 30% 70%, rgba(0, 209, 255, 0.1) 0%, transparent 70%)",
            zIndex: 0,
          },
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 900,
              mb: 3,
              fontSize: { xs: "2rem", md: "2.75rem" },
              color: colors.starlight,
            }}
          >
            Ready to <CyberText sx={{ fontSize: "25px" }}>Activate</CyberText>{" "}
            Your Digital Shield?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 5,
              color: colors.cosmicDust,
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Join the thousands of systems already protected by our quantum
            security network. Get started in under 5 minutes.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <CyberButton
              variant="contained"
              size="large"
              component={Link}
              to="/signup"
              sx={{
                px: 6,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              Deploy Shield Now
            </CyberButton>
            <Button
              variant="text"
              size="large"
              component={Link}
              to="/pricing"
              sx={{
                px: 6,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: colors.matrixGreen,
                "&:hover": {
                  backgroundColor: `${colors.matrixGreen}10`,
                },
              }}
            >
              Pricing Plans
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
