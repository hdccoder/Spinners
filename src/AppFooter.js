import React from "react";
import { Box, Container, IconButton, Link, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        Spinners
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const AppFooter = () => {
  return (
    <Box component={'footer'} position="sticky" sx={{ display: 'flex', zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'primary.light', height: "9rem" }}>
      <Container sx={{ flexGrow: 1, textAlign: 'center' }} maxWidth="sm">
        <Typography variant="body1">
          Visit us at: 2148 N. Soho, NewYork, NY 60611
        </Typography>
        <Typography variant="body1">
          Call us at: (312) 555-PLAY
        </Typography>
        <Typography variant="body1">
          Store Hours: M-F 10am-2pm, Sat 10am-2pm, Sun Closed
        </Typography>
        <IconButton href="https://www.facebook.com/" color="inherit">
          <FacebookIcon fontSize='large' />
        </IconButton>
        <IconButton href= "https://www.instagram.com/"color="inherit">
          <InstagramIcon fontSize='large' />
        </IconButton>
        <IconButton href="https://www.pinterest.com/" color="inherit">
          <PinterestIcon fontSize='large' />
        </IconButton> 
        <Copyright />
      </Container>
    </Box>
  )
}

export default AppFooter;
