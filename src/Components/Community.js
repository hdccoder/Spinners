import { Box, Container, Grid, Paper, Typography, Button, Card, CardMedia, styled } from "@mui/material";
import React from "react";

const Community = ({ reviews }) => {
  return (
    <Box>
      <Typography variant='h4' sx={{ mt: 0, paddingTop: 5 }}>
        Spinners Community
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Container justifyContent="center" sx={{ mt: 0, mb: 4 }}>
            <img src="/public/assets/spin flyer 1.png" alt="COME SPIN WITH US" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container sx={{ mt: 0, p: "1rem" }} variant="outlined">
            <img src="/public/assets/SPIN FLYER 2.png" alt="COME SPIN WITH US" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Community;