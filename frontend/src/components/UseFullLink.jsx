import React from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import link1 from "../assets/link1.jpg";
import link2 from "../assets/link2.jpg";
import ncpr from "../assets/ncpr.png";
import link3 from "../assets/link3.jpg";
import link4 from "../assets/link4.jpg";
import link5 from "../assets/link5.jpg";
import link6 from "../assets/link6.jpg";

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

const links = [
  { img: ncpr, alt: "NCPCR", url: "https://www.ncpcr.gov.in" },
  { img: link1, alt: "CERT-IN", url: "https://www.cert-in.org.in" },
  { img: link2, alt: "India Portal", url: "https://www.india.gov.in/" },
  { img: link3, alt: "Cyber Dost", url: "https://twitter.com/Cyberdost" },
  { img: link6, alt: "CyTrain", url: "https://cytrain.nic.in" },
  { img: link4, alt: "ISEA", url: "https://www.isea.gov.in" },
  { img: link5, alt: "ISEA2", url: "https://www.isea.gov.in" },
];

const UseFullLink = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        px: 2,
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
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            mb: 6,
            fontWeight: 900,
            fontSize: { xs: "2rem", md: "3rem" },
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            color: colors.starlight,
            textShadow: `0 0 10px ${colors.matrixGreen}80`,
            position: "relative",
            display: "inline-block",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              height: "4px",
              background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
              borderRadius: "4px",
            },
          }}
        >
          <Box
            component="span"
            sx={{
              background: `linear-gradient(90deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            🔗 USEFUL CYBER RESOURCES
          </Box>
        </Typography>

        <Box
          sx={{
            ".slick-dots li button:before": {
              color: `${colors.matrixGreen} !important`,
              fontSize: "10px",
            },
            ".slick-dots li.slick-active button:before": {
              color: `${colors.electricBlue} !important`,
            },
            ".slick-prev:before, .slick-next:before": {
              color: colors.matrixGreen,
              fontSize: "30px",
            },
            ".slick-prev": { left: -35 },
            ".slick-next": { right: -25 },
          }}
        >
          <Slider {...settings}>
            {links.map((link, index) => (
              <Box
                key={index}
                sx={{
                  px: 2,
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Card
                  component="a" // Change the Card to act as an anchor
                  href={link.url} // Add the URL here
                  target="_blank" // Open in new tab
                  rel="noopener noreferrer"
                  sx={{
                    height: 150,
                    mx: 1,
                    padding: 2,
                    background: `rgba(22, 33, 62, 0.7)`,
                    backdropFilter: "blur(10px)",
                    borderRadius: 2,
                    border: `1px solid ${colors.matrixGreen}30`,
                    boxShadow: `0 5px 15px ${colors.voidBlack}80`,
                    transition: "all 0.3s ease-in-out",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                    textDecoration: "none", // Remove underline from link
                    cursor: "pointer", // Change cursor to pointer
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: `0 8px 25px ${colors.matrixGreen}50`,
                      border: `1px solid ${colors.matrixGreen}`,
                      "&:before": {
                        opacity: 1,
                      },
                    },
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(135deg, ${colors.matrixGreen}20 0%, ${colors.electricBlue}20 100%)`,
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={link.img}
                    alt={link.alt}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: 1,
                      filter: "drop-shadow(0 0 5px rgba(0, 255, 157, 0.3))",
                      transition: "filter 0.3s ease",
                      "&:hover": {
                        filter: "drop-shadow(0 0 10px rgba(0, 255, 157, 0.5))",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: `linear-gradient(to top, ${colors.deepSpace}, transparent)`,
                      padding: 1,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: colors.starlight,
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                        textShadow: `0 0 5px ${colors.voidBlack}`,
                      }}
                    >
                      {link.alt}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default UseFullLink;
