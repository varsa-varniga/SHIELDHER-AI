import { AppBar, Button, Toolbar } from '@mui/material'
import { Box } from 'lucide-react'
import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      sx={{
        backgroundColor: '#243447',
        py: 1
      }}>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 'xl',
        mx: 'auto',
        width: '100%',
        px: { xs: 2, sm: 4 }
      }}>
        <img
          src={logo}
          alt="ShieldHer Logo"
          style={{ height: '40px' }}
        />
        
      <Button
      variant='outlined'
      onClick={() => navigate('/login')}
      sx={{border:'1px solid grey',
        color:'white',
        px:4,py:1,
        fontWeight:600,
        transition:'translate(-1px)'
      }}
      >login</Button>

      </Toolbar>


    </AppBar>
  )
}

export default Header