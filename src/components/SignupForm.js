import React from 'react';
import { useFormik } from 'formik';
import axios from "axios"
import { useState } from 'react';
const SignupForm = () => {
  const [info, setinfo] = useState("")
  axios.post('http://localhost:3001/users',{
    "id":"3",
    "email": "hossein@gmail.com",
    "password": "1234"
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error)
  })
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
     
      setinfo(JSON.stringify(values, null, 2));
      console.log(info)
    },
  });
  return (
    
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <button type="submit">Submit</button>
    </form>
    
  );
}


export default SignupForm