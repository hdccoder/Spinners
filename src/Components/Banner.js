import React from 'react';
import { Container, Box } from '@mui/material';

const Banner = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: "3rem", mb: 4 }}>
      <Box
        component="img"
        sx={{
          width: '100%', // Resize image to 100% of the container width
          height: 'auto', // Maintain aspect ratio
          zIndex: 2,
        }}
        alt="COME SPIN WITH US"
        src="/public/assets/Spinners LB.png"
      />
    </Container>
  );
};

export default Banner;
