import { Box, Container, Grid,Rating, Paper, Typography, Button, Card, CardMedia,styled, CardContent } from "@mui/material";
import { yellow } from "@mui/material/colors";
import React from "react";

const reviews = [
    {  rating: 5, title: 'Best Vinyl Store', comments: 'I am a Vinyl Club member and Proud to be, Spinners is more than a store it is a Community.' },
    {  rating: 5, title: 'Awesome', comments: 'Somehow they always have the records noone else has.'},
    { rating: 5, title: 'The Sound, The Quailty, The Culture', comments: 'If your looking for an amazing experience you have come to the right place, there is always good vibes at Spinners one of the best place in the City.' },
    { rating: 5, title: 'I love this place', comments: 'I love the Thursdays here and they really have the BEST events for Vinyl lovers.' },
    { rating: 5, title: 'Good Times Good Vibes Great Music', comments: 'If you find the time come to one of their events! You will not regret!' },
    {  rating: 5, title: 'Hide Gem', comments: 'Definietly, a must stop of NYC, this place is fool of culture, and the staff is SO MUCH FUN!!!'},
  ];

const DisplayReviews = () => {
    
  const filteredReviews = reviews.filter(review => review.rating === 5);
  return (
    <div>
      {filteredReviews.map(review => (
        <Card key={review.id} style={{ marginBottom: '30px' }} >
         <Rating
          
            name="read-only"
            value={Number(review.rating)}
            precision={0.5}
            readOnly
            style={{ color: 'yellow', paddingTop: 4, marginTop: "20px", marginLeft:"10px" }} // Set the color to yellow
          />
          <CardContent>
            <Typography variant="h5">{review.title}</Typography>
            <Typography>{review.comments}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );}

export default DisplayReviews


