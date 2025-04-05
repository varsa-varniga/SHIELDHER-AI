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
        py: 4,
        px: 2,
        bgcolor: "#2C3E50",
      }}
    >
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        gutterBottom
        sx={{
          color: 'transparent',
          background: 'linear-gradient(45deg, #38BDF8, #818CF8)',
          backgroundClip: 'text',
          textShadow: '0 0 20px rgba(56, 189, 248, 0.3)',
          mb: 4
        }}
      >
        🔗 Useful Links
      </Typography>

      <Box sx={{ '.slick-dots li button:before': { color: '#38BDF8' } }}>
        <Slider {...settings}>
          {links.map((link, index) => (
            <Box key={index} sx={{ px: 2, position: "relative" }}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    height: 120,
                    mx: 1,
                    padding: 1,
                    background: 'white',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    border: '1px solid rgba(56, 189, 248, 0.1)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',

                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 20px rgba(56, 189, 248, 0.2)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
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
                      borderRadius: 2,
                    }}
                  />
                </Card>
              </a>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default UseFullLink;
