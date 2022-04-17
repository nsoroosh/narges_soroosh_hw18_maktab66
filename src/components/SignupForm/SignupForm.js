import React, {useState, useEffect, useCallback} from 'react';
import { useFormik } from 'formik';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import axios from 'axios'

function validate(values) {
    const errors = {};
    if (!values.name) errors.name = 'این فیلد ضروری است'
    if (!values.family) errors.family = 'این فیلد ضروری است'
    if (!values.city) errors.city = 'این فیلد ضروری است'
    if (!values.province) errors.province = 'این فیلد ضروری است'
    if (values.education) {
        if (!values.eduPlace) errors.eduPlace = 'این فیلد ضروری است'
    }
    if (!values.email) {
        errors.email = 'این فیلد ضروری است';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'آدرس ایمیل نامعتبر است';
    }
    if(!values.password){
        errors.password = 'این فیلد ضروری است'
    }else if(values.password.length < 6){
        errors.password = "رمز عبور وارد شده خیلی کوتاه هست"
    }else if(values.password.length > 50) {
        errors.password = "رمز عبور وارد شده خیلی بلند هست"
    }
    return errors;
}

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [eduPlaceShow, setEduPlaceShow] = useState(false)
    const [iranstates, setIranStates] = useState({})
    const [activeCities, setActiveCities] = useState([])

    const handlePassword = useCallback(() => setShowPassword(!showPassword))
    const handleCities = useCallback(province => setActiveCities(iranstates[province]))
    const handleEduPlace = useCallback(e => {
        setEduPlaceShow(e.target.value.length === 0 ? false : true)}
    )

    useEffect(() => {
        axios.get("/db/iranstates.json")
            .then((res) => setIranStates(res.data))
            .catch((err) => console.log(err));
        return () => setIranStates([])
    }, [])

    const formik = useFormik({
        initialValues: {
          name: '',
          family: '',
          email: '',
          password: '',
          education: '',
          eduPlace: '',
          province: '',
          city: ''
        },
        validate: validate,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            await axios.post('http://localhost:3001/users', values)
                .catch(err => console.log(err))
                .then(alert('ثبت نام شما با موفقیت انجام شد!'))
            resetForm()
        }
      });

      return (
        <form onSubmit={formik.handleSubmit}>
        <div className='container-width_50'>
            <div className='field width_50'>
                <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder='* نام'
                />
                <p className='error'>
                    {formik.errors.name && formik.touched.name && formik.errors.name}
                </p>
            </div>
            <div className='field width_50'>
                <input
                    type="text"
                    name="family"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.family}
                    placeholder='* نام خانوادگی'
                />
                <p className='error'>
                    {formik.errors.family && formik.touched.family && formik.errors.family}
                </p>
            </div>
        </div>
        <div className='field'>
            <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder='* ایمیل'
            />
        </div>
        <p className='error'>
            {formik.errors.email && formik.touched.email && formik.errors.email}
        </p>
        <div className='field'>
            <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder='* رمز عبور'
            />
            {showPassword ? 
                <BsFillEyeFill className='stylePass' onClick={handlePassword}/> :
                <BsFillEyeSlashFill className='stylePass' onClick={handlePassword}/>}
        </div>
        <p className='error'>
            {formik.errors.password && formik.touched.password && formik.errors.password}
        </p>
        <div className='container-width_50'>
            <div className='field width_50'>
                <select
                    name="education"
                    value={formik.values.education}
                    onChange={e => {
                        formik.handleChange(e)
                        handleEduPlace(e)
                    }}
                    onBlur={formik.handleBlur}
                >
                    <option value="" label="تحصیلات"></option>
                    <option value="دیپلم" label="دیپلم"></option>
                    <option value="کاردانی" label="کاردانی"></option>
                    <option value="کارشناسی" label="کارشناسی"></option>
                    <option value="کارشناسی ارشد" label="کارشناسی ارشد"></option>
                    <option value="دکترا" label="دکترا"></option>
                </select>
            </div>
            {eduPlaceShow ? 
            <div className='field width_50'>
                <input
                    name="eduPlace"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.eduPlace}
                    placeholder='* محل تحصیل'
                />
                <p className='error'>
                    {formik.errors.eduPlace && formik.touched.eduPlace && formik.errors.eduPlace}
                </p>
            </div> : null}
        </div>
        <div className='container-width_50'>
            <div className='field width_50'>
                <select
                    name="province"
                    value={formik.values.province}
                    onChange={e => {
                        formik.handleChange(e)
                        handleCities(e.target.value)
                    }}
                    onBlur={formik.handleBlur}
                >
                    <option value="" label="* استان"></option>
                    {Object.keys(iranstates).map(province => {
                        return <option 
                                    value={province} 
                                    label={province} 
                                    key={province}>
                                </option>})}
                </select>
                <p className='error'>
                    {formik.errors.province && formik.touched.province && formik.errors.province}
                </p>
            </div>
            <div className='field width_50'>
                <select
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="" label="* شهرستان"></option>
                    {activeCities.map(city => {
                        return <option value={city} label={city} key={city}></option>
                    })}
                </select>
                <p className='error'>
                    {formik.errors.city && formik.touched.city && formik.errors.city}
                </p>
            </div>
        </div>
          <button type="submit" disabled={formik.isSubmitting} className='submit'>
             ثبت نام
           </button>
        </form>
      );
}

export default Register;
