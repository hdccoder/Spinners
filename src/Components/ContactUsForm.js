import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField, Button, Paper, InputLabel } from '@mui/material';
import { styled } from '@mui/system';

const ContactContainer = styled(Paper)(({ theme }) => ({
  backgroundImage: 'url("/public/assets/CONTACTPG1.jpg")',
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '90vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginTop:'450px',
  width: '80%',
  top: '50%',
  left: '50%',
 
  transform: 'translate(-50%, -50%)', // Center the container

}));

const TransparentTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
}));

const ContactFormContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  padding: theme.spacing(2),
  width: '37%',
  height: '60%', // Adjust the height of the form
  position: 'absolute',
  left: '23%',
  top: '69%',
  transform: 'translate(-50%, -50%)',
}));

const TransparentInputLabel = styled(InputLabel)(({ theme }) => ({
  color: 'black',
  marginBottom: theme.spacing(1), // Adjust the margin at the bottom for spacing
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
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '-.35cm' }}>
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