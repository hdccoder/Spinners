import React from "react";
import { useSearchParams } from 'react-router-dom'
import { Box, Link, Typography, } from "@mui/material";

const ThankYou = ()=>{
    const [queryParams] = useSearchParams();
    const previousPage = queryParams.get('sentFrom');
    
    const inputArray = [
        {   
            name: 'SignUp',
            reason: `for joining Spinners`,
            request: `Please `,
            sendTo: '/#/sign-in',
            location: 'log in' 
        },
        {
            name: 'Review',
            reason: 'for leaving a review',
            request: `Review other purchases? `,
            sendTo: '/#/orders',
            location: 'Go to orders.'
        },
        {
            name: 'Contact',
            reason: 'for your request',
            request: `We will be in touch. `,
            sendTo: '/#/products',
            location: 'Continue shopping'
        }
    ]

    const inputToDisplay = inputArray.find((previous) => {
        return previous.name === previousPage
    })

  return(
    <>
        <Box 
            sx={{ 
                mx: 'auto',
                p: 1,
                m: 1,
                textAlign: 'center'
            }}
        >           
            <Typography variant="h1">
                Thank you
            </Typography>
            <Typography variant="h3" >
                {inputToDisplay.reason}
            </Typography>   
            <Box
                component="img"
                sx={{
                    height: 800,
                    width: 900,
                    maxHeight: {xs: 800, md: 550},
                    m: 2
                }}
                alt="graphic two girls admiring viny"
                src="/public/assets/Typg2.png"
            >
            </Box>
            <Typography variant="h4" sx={{mt: 1}}>
                {inputToDisplay.request} 
                <Link href={inputToDisplay.sendTo} variant="inherit" underline= 'none' sx={{color: 'blue'}}>
                    {inputToDisplay.location}
                </Link>
            </Typography> 

        </Box>
    </>
  )
}

export default ThankYou;