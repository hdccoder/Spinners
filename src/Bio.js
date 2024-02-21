import React from 'react';
import { Container, Typography, Paper, Grid } from "@mui/material";

const Bio = () => {
  return (
    <Container maxWidth="md" style={{ padding: '20px', marginTop: '20px', paddingBottom: '80px' }} >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* Image */}
            <img src="/public/assets/BioPic.jpg" alt="BioPic" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12}>
            {/* Paragraph */}
            <Typography variant="body1">
            Hi there, my name is Vanessa, and I'm the proud owner of one of the most popular vinyl stores in NYC. I've always had a deep passion for music, and vinyl records have always held a special place in my heart. To me, vinyl records are an art form that should be cherished and preserved, and I'm dedicated to sharing my love for music with the community.

My store is more than just a place to buy records - it's a space where music lovers can come together, share their favorite artists and albums, and discover new music. I'm always eager to chat with customers about their favorite music and help them expand their collections.

In addition to running my store, I'm also an active member of the NYC music community. I attend concerts and shows regularly, and I'm always on the lookout for the latest and greatest artists. My knowledge and expertise have made me a go-to source for music recommendations for my customers and friends alike.

Whether you're a seasoned collector or new to the world of vinyl, I'm here to help guide you on your musical journey. With my infectious enthusiasm and deep love for all things music, I guarantee you'll leave my store feeling inspired and energized.
            </Typography>
             {/* Signature */}
          <div style={{ position: 'absolute', bottom: -210, left: '75%', transform: 'translateX(-50%)', marginTop: '10px' }}>
            <img src="/public/assets/BlackSig.png" alt="YourSignature" style={{ width: '75%', height: 'auto' }} />
          </div>
          </Grid>
        </Grid>
    </Container>
  );
};

export default Bio

