import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Rating,
  TextField,
  Typography,
  Paper, // Import Paper component
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ProductReview = ({ products }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [ratings, setRatings] = useState(0);
  const [hover, setHover] = useState(-1);

  const labels = {
    0.5: 'Terribly Awful',
    1: 'Awful',
    1.5: 'Terrible',
    2: 'Bad',
    2.5: 'Meh',
    3: 'Ok',
    3.5: 'Good',
    4: 'Great',
    4.5: 'Excellent',
    5: 'Masterpiece',
  };

  const { id } = useParams();
  const product = products?.find((product) => {
    return product.id === id;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = {
      title,
      comments,
      ratings,
      product_id: product.id,
      product_image: product.image
    };

    const addreview = async (productId) => {
      await api.addProductReview(review, productId);
    };
    addreview(product.id);

    setRatings('');
    setTitle('');
    setComments('');

    navigate("/thankyou?sentFrom=Review");
  };

  return (
    <Container
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', // Center the content horizontally
        mt: 2 // Add margin from the top
      }}
      maxWidth="xl"
    >
      <Card sx={{ mt: "1rem", width: '100%', maxWidth: 600 }}>
        <Typography variant="h5" marginLeft={1} margin={2} mb={1} textAlign="center">Tell it Like it is!</Typography>
        <CardMedia
          sx={{ p: "1rem", width: "200px", height: "200px", mx: "auto" }} // Center the image
          image={product?.image}
          component="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" textAlign="center"> {/* Center the text */}
            {product?.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            {product?.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            {product?.price}
          </Typography>

          <Paper elevation={0}>
            <Box sx={{ mt: 1, width: '100%', textAlign: "left" }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}> {/* Center the rating stars */}
                <Rating
                  name="productRating"
                  style={{ color: 'yellow' }}
                  placeholder="Rating is Required"
                  value={ratings}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setRatings(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                />
                {ratings !== null && (
                  <Box sx={{ ml: ".35rem" }}>{labels[hover !== -1 ? hover : ratings]}</Box>
                )}
              </Box>
              <Typography variant="h5" marginLeft={1} margin={2} mb={1} >Title:</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Add a headline for review"
                inputProps={{ minLength: 5, maxLength: 20 }}
                name="title"
                autoFocus
                autoComplete="none"
                value={title}
                onChange={(event) => { setTitle(event.target.value) }}
                placeholder="Review is Required"
              />

              <Typography variant="h6">Add a photo or video</Typography>
              <Typography variant="body2">Shoppers find images and videos more helpful than text alone.</Typography>
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload file
                <input type="file" hidden />
              </Button>
              <Typography variant="h5" marginLeft={1} margin={2} mb={1} >Comment:</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="comments"
                label="Add a review"
                id="comments"
                rows={4}
                autoFocus
                autoComplete="none"
                inputProps={{ minLength: 15, maxLength: 100 }}
                value={comments}
                onChange={(event) => { setComments(event.target.value) }}
                placeholder="Review is Required"
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit Review
              </Button>
            </Box>
          </Paper>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductReview;