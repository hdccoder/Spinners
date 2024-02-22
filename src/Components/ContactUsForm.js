import React from 'react';
import { useForm } from 'react-hook-form';

const ContactUsForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2>Does our selection have your head spinning? Well, ring our bell!</h2>
        
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            style={{ width: '300px' }}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
            style={{ width: '300px' }}
         />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="message" style={{ marginBottom: '5px' }}>Message:</label>
          {errors.message && <p>{errors.message.message}</p>}
          <textarea
            id="message"
            {...register('message', { required: 'Message is required' })}
            style={{ height: '200px', width: '600px', marginTop: '5px', resize: 'none' }}
          />
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactUsForm;