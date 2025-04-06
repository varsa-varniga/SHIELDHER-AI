import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  styled,
} from "@mui/material";
import ManualIcon from "@mui/icons-material/MenuBook";
import ShieldIcon from "@mui/icons-material/Security";
import ComputerIcon from "@mui/icons-material/Computer";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";
import UseFullLink from "../components/UseFullLink";
import CybersecurityQuiz from "../components/CyberSecurityQuiz.jsx";
import CButton from "../components/Button.jsx";

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
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
  },
}));

const CyberText = styled(Typography)({
  background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
  fontWeight: "bold",
});

const CyberCard = styled(Card)(({ card }) => ({
  position: "relative",
  overflow: "hidden",
  background: "rgba(22, 33, 62, 0.7)",
  border: `1px solid ${card.borderColor}`,
  borderRadius: "16px",
  height: "100%",
  minHeight: "300px",
  cursor: "pointer",
  transition: "all 0.4s ease",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: `0 10px 20px ${card.glowColor}`,
    "&::before": {
      opacity: 1,
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "16px",
    background: `linear-gradient(135deg, ${card.glowColor} 0%, transparent 100%)`,
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: -1,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${card.borderColor} 0%, ${card.iconColor} 100%)`,
  },
}));

const cardData = [
  {
    title: "CITIZEN MANUAL",
    description:
      "It is a document to describe the functionalities and workflow that is provided to citizens on the cybercrime portal for reporting cybercrimes.",
    icon: <ManualIcon fontSize="large" />,
    borderColor: colors.matrixGreen,
    iconColor: colors.matrixGreen,
    glowColor: "rgba(0, 255, 157, 0.2)",
    link: "/cyber-guide",
  },
  {
    title: "CYBER SAFETY TIPS",
    description:
      "To stay safe in the online world, it is important to follow important cyber safety practices which may help in protecting ourselves and our families from imminent threats that may harm our data and devices.",
    icon: <ShieldIcon fontSize="large" />,
    borderColor: colors.electricBlue,
    iconColor: colors.electricBlue,
    glowColor: "rgba(0, 209, 255, 0.2)",
    link: "/cyber-safety-tips",
  },
  {
    title: "CYBER AWARENESS",
    description:
      "Cyber awareness is an ongoing process of educating employees and citizens about the threats that lurk in cyberspace and how to act responsibly.",
    icon: <ComputerIcon fontSize="large" />,
    borderColor: colors.plasmaPink,
    iconColor: colors.plasmaPink,
    glowColor: "rgba(255, 0, 170, 0.2)",
    link: "/cyber-awareness",
  },
  {
    title: "DAILY DIGEST",
    description:
      "Comprehensive document prepared by Indian Cybercrime Coordination Centre (I4C) to aware employees and citizens about cyber fraud modus operandi.",
    icon: <ArticleIcon fontSize="large" />,
    borderColor: colors.cyberViolet,
    iconColor: colors.cyberViolet,
    glowColor: "rgba(74, 20, 140, 0.2)",
    link: "/cyber-dailydigest",
  },
];

export default function CyberSecurityGuide() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: `linear-gradient(135deg, ${colors.deepSpace} 0%, ${colors.cosmicPurple} 100%)`,
      }}
    >
      <CyberGlassBox sx={{ mb: 4 }}>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                mb: 1,
                fontSize: { xs: "2rem", md: "2.5rem" },
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                color: colors.starlight,
              }}
            >
              <CyberText sx={{ fontSize: "inherit" }}>LEARNING</CyberText>{" "}
              CORNER
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                color: colors.cosmicDust,
                lineHeight: 1.6,
                fontSize: { xs: "0.9rem", md: "1.1rem" },
              }}
            >
              Enhance your cybersecurity knowledge with our comprehensive
              resources
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {cardData.map((card, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                sx={{ display: "flex" }}
              >
                <CyberCard card={card} onClick={() => navigate(card.link)}>
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: 3,
                    }}
                  >
                    <div>
                      <Box
                        sx={{
                          mb: 2,
                          color: card.iconColor,
                          "& svg": {
                            fontSize: "2rem",
                          },
                        }}
                      >
                        {card.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          mb: 2,
                          background: `linear-gradient(90deg, ${card.borderColor}, ${card.iconColor})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontSize: "1.1rem",
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.cosmicDust,
                          fontSize: "0.85rem",
                          lineHeight: "1.5",
                        }}
                      >
                        {card.description}
                      </Typography>
                    </div>
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: card.iconColor,
                          fontWeight: "bold",
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        Learn More →
                      </Typography>
                    </Box>
                  </CardContent>
                </CyberCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CyberGlassBox>

      <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        <CButton />
        <UseFullLink />
      </Box>
    </Box>
  );
}
