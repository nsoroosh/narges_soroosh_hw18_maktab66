import React from 'react';
import { Formik } from 'formik';
import { useContext ,useEffect,useState} from 'react';
import axios from 'axios';
import { user } from '../App';


const LoginForm = () => {
    const [data, setData] = useState({})
    const [Loading, setLoading] = useState(false)
    const {context, setContext}  = useContext(user)
    useEffect(() => {
        const fetchData = async () =>{
          setLoading(true);
          try {
            const {data: response} = await axios.get('http://localhost:3001/users');
            setData(response);
            
          } catch (error) {
            console.error(error.message);
          }
          setLoading(false);
        }
        fetchData();
      }, []);
      useEffect(() => {
        console.log(data);
      }, [data]);
    
    
    return(
  <div>
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
        console.log(data);
        for (const i of data) {
            if(i.email===values.email&&i.password===values.password){
                console.log("hello")
                setContext(values)
            }
        }
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor='email'>ایمیل</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          </div>
          <div>
              <label htmlFor='password'>کلمه ی عبور</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);
      }
export default LoginForm;