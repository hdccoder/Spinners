import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField, Button, Paper, InputLabel } from '@mui/material';
import { styled } from '@mui/system';



const ContactContainer = styled(Paper)(({ theme }) => ({
  backgroundImage: 'url("/public/assets/CONTACTPG1.jpg")',
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const TransparentTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
}));

const ContactFormContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  padding: theme.spacing(4),
  width: '40%',
  marginLeft: theme.spacing(-70),
  marginTop: theme.spacing(40),
}));

const TransparentInputLabel = styled(InputLabel)(({ theme }) => ({
  color: 'black',
}));

const ContactUsForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // Handle the error or display an error message to the user
    }
  };


  return (
    <ContactContainer>
      <ContactFormContainer elevation={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TransparentInputLabel htmlFor="name">Name</TransparentInputLabel>
              <TransparentTextField
                id="name"
                variant="outlined"
                fullWidth
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TransparentInputLabel htmlFor="email">Email</TransparentInputLabel>
              <TransparentTextField
                id="email"
                variant="outlined"
                fullWidth
                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TransparentInputLabel htmlFor="message">Message</TransparentInputLabel>
              <TransparentTextField
                id="message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                {...register('message', { required: 'Message is required' })}
                error={!!errors.message}
                helperText={errors.message?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </ContactFormContainer>
    </ContactContainer>
  );
};

export default ContactUsForm;