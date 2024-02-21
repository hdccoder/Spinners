import React from "react";
import { Container, Grid, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '5vh', // Adjust the height as needed
  marginTop: 30,
  marginLeft:2,
})

const StyledButton = styled(Button)({
  backgroundColor: (theme) => theme.palette.primary.main,
  color: (theme) => theme.palette.primary.contrastText,
  padding: (theme) => theme.spacing(200), // Reduce padding to minimize space
  fontSize: '1.3rem',
});

const PreOrdersButton = () => {

    const navigate = useNavigate();


    const buttonClick = () => {
        navigate('/preorder') ;
      }

  return (
    <StyledContainer>
      <Grid container>
        <Grid item xs={12}>
          <StyledButton variant="contained" onClick={buttonClick}>
            Vinyl's Available For Pre-Order
          </StyledButton>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default PreOrdersButton;