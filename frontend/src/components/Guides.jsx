import React from 'react';
import { Grid, Typography, Box, Chip } from '@mui/material';
import { Download } from 'react-feather';

const CitizenManualPage = ({ manuals }) => {  // Accept 'manuals' as props
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: 'auto',
        mt: 6,
        mb: 6,
        p: 8,
        borderRadius: '32px',
        boxShadow: '0 15px 15px rgba(0, 255, 255, 0.3)',
        backgroundColor: '#1a2634',
        border: '1px solid #3f4a5a',
      }}
    >
      <Typography
        variant="h3"
        className="text-center mb-10 font-bold relative"
        sx={{
          fontSize: "2.5rem",
          background: 'linear-gradient(45deg, #38BDF8, #818CF8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 20px rgba(56, 189, 248, 0.5)',
          marginBottom: '20px',
          padding: '10px',
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
        Citizen Manuals
      </Typography>

      <Grid container direction="column" spacing={3}>
      {manuals.flat().map((manual, index) => (
 
          <Grid
            item
            key={index}
            sx={{
              p: 3,
              borderRadius: '16px',
              backgroundColor: '#253242',
              mb: index !== manuals.length - 1 ? '20px' : '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: '0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 2, color: '#00ffff' }}>
                <Download size={24} />
              </Box>

              <a
                href={manual.link}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  flexGrow: 1,
                }}
              >
                {manual.title}
              </a>
            </Box>

            {manual.isNew && (
              <Chip
                label="NEW"
                sx={{
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  fontWeight: 'bold',
                  ml: 2,
                  boxShadow: '0 0 12px rgba(255, 107, 107, 0.7)',
                }}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CitizenManualPage;
