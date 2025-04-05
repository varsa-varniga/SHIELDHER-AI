import { Grid, Card, CardContent, Typography } from "@mui/material";
import ManualIcon from "@mui/icons-material/MenuBook";
import ShieldIcon from "@mui/icons-material/Security";
import ComputerIcon from "@mui/icons-material/Computer";
import ArticleIcon from "@mui/icons-material/Article";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";
import UseFullLink from "../components/UseFullLink";
import CybersecurityQuiz from "../components/CyberSecurityQuiz.jsx";
import CButton from "../components/Button.jsx";
import { Button } from "@mui/material";
const cardData = [
  {
    title: "CITIZEN MANUAL",
    description:
      "It is a document to describe the functionalities and workflow that is provided to citizens on the cybercrime portal for reporting cybercrimes.",
    icon: <ManualIcon fontSize="large" />,
    bgColor: "rgba(56, 189, 248, 0.15)", // Bright blue
    borderColor: "#38BDF8",
    iconColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    link: "/cyber-guide",
  },
  {
    title: "CYBER SAFETY TIPS",
    description:
      "To stay safe in the online world, it is important to follow important cyber safety practices which may help in protecting ourselves and our families from imminent threats that may harm our data and devices.",
    icon: <ShieldIcon fontSize="large" />,
    bgColor: "rgba(56, 189, 248, 0.15)",
    borderColor: "#38BDF8",
    iconColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    link: "/cyber-safety-tips",
  },
  {
    title: "CYBER AWARENESS",
    description:
      "Cyber awareness is an ongoing process of educating employees and citizens about the threats that lurk in cyberspace and how to act responsibly.",
    icon: <ComputerIcon fontSize="large" />,
    bgColor: "rgba(56, 189, 248, 0.15)",
    borderColor: "#38BDF8",
    iconColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    link: "/cyber-awareness",
  },
  {
    title: "DAILY DIGEST",
    description:
      "Comprehensive document prepared by Indian Cybercrime Coordination Centre (I4C) to aware employees and citizens about cyber fraud modus operandi.",
    icon: <ArticleIcon fontSize="large" />,
    bgColor: "rgba(56, 189, 248, 0.15)",
    borderColor: "#38BDF8",
    iconColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    link: "/cyber-dailydigest",
  },

];

export default function CyberSecurityGuide() {
  const navigate = useNavigate();
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white p-10" overflow="hidden">
      <Typography
        variant="h3"
        className="text-center mb-10 font-bold relative"
        sx={{
          fontSize: "2.5rem",
          background: 'linear-gradient(45deg, #38BDF8, #818CF8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 5px rgba(56, 189, 248, 0.5)',
          marginBottom: '20px',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #38BDF8, transparent)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #38BDF8, transparent)',
          },
        }}
      >
        Learning Corner
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <div className="group [perspective:1000px]">
              <Card
                onClick={() => navigate(card.link)}
                className="relative w-full transition-transform duration-500 group-hover:rotate-y-6 group-hover:scale-105 rounded-xl shadow-xl cursor-pointer backdrop-blur-lg"
                sx={{
                  background: card.bgColor,
                  height: "320px",
                  border: `2px solid ${card.borderColor}`,
                  position: "relative",
                  transformStyle: "preserve-3d",
                  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3)`,
                  transition: "transform 0.6s ease, box-shadow 0.6s ease",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "12px",
                    padding: "2px",
                    background: `linear-gradient(45deg, transparent, ${card.glowColor})`,
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  },
                  "&:hover": {
                    transform: "rotateY(15deg) translateZ(40px)",
                    boxShadow: `0 20px 40px ${card.glowColor}`,
                  },
                }}
              >
                <CardContent className="absolute inset-0 flex flex-col justify-between p-6">
                  <div>
                    <div className="mb-4" style={{ color: card.iconColor }}>
                      {card.icon}
                    </div>
                    <Typography
                      variant="h5"
                      className="font-bold mb-2"
                      sx={{
                        background: `linear-gradient(45deg, ${card.borderColor}, white)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        lineHeight: "1.5",
                      }}
                    >
                      {card.description}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Grid>
        ))}
      </Grid>
  <CButton/>

      <UseFullLink />
      
    </div>
  );
}