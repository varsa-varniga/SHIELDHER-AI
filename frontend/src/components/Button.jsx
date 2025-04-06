import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, styled } from "@mui/material";

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

const CButton = ({
  label = "Attempt Quiz",
  to = "/cyberquiz",
  type = "button",
  fullWidth = false,
  disabled = false,
  loading = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <CyberButton
      type={type}
      fullWidth={fullWidth}
      variant="contained"
      disabled={disabled || loading}
      onClick={handleClick}
      sx={{
        mt: 3,
        mb: 2,
        py: 1.5,
        borderRadius: "12px",
        mx: "auto",
        display: "flex",
        justifyContent: "center",
        minWidth: "250px",
      }}
    >
      {loading ? "INITIATING..." : label}
    </CyberButton>
  );
};

export default CButton;
