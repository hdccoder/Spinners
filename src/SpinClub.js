import { Box, Container, Grid, Paper, Typography, Button, Card, CardMedia,styled } from "@mui/material";
import React from "react";
import DisplayReviews from "./DisplayReviews";
import { useNavigate } from "react-router-dom";


const ButtonStyled = styled(Button)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: fit-content;
  height: 40px;
  display: none;
`;

const ContainerStyled = styled("div")`
  position: relative;
  &:hover {
    .test-button {
      display: block;
    }
  }  
}`;




const SpinClub = ({reviews}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/bio`) 
    console.log('Button Clicked!');
  }

  return (
    <Grid container spacing={2} paddingTop={3} >
         <Grid item xs={8}>
    <ContainerStyled justifyContent="center" sx={{ mt: "3rem", mb: 4 }} >
       
                <img src="/public/assets/Vinyl Club.png" alt="COME SPIN WITH US" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        
        
        <ButtonStyled variant="contained" className="test-button" onClick={handleButtonClick}>
            Vanessa's Bio
          </ButtonStyled>
      </ContainerStyled>
    </Grid>
    <Grid item xs={4}>
   
          
            <Container sx={{ mt: "1rem", p: "1rem" }} variant="outlined">
             <DisplayReviews reviews={reviews}/>
            </Container>
       
  
    </Grid>
    </Grid>
  )
} 

export default SpinClub;