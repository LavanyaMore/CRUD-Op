import axios from 'axios';
import { Link , useParams, useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import Select, { components } from 'react-select';

const MultiValueRemove = ({ data, ...props }) => {
  return (
    <components.MultiValueRemove {...props}>
      <div className={'bg-light text-dark px-2 border rounded-right'}>
        {data.abbr}
      </div>
    </components.MultiValueRemove>
  );
};

const Group = ({ children, ...props }) => {
  return (
    <components.Group {...props}>
      <span className="text-primary font-weight-bold">{props.label}</span>
      {children}
    </components.Group>
  );
};

const createLanguageOption = (label, value, abbr) => {
  return {
    label,
    value,
    abbr,
  };
};

const languages = [
  {
    groupLabel: 'Indian Languages',
    options: [
      createLanguageOption('Hindi', 1, 'Hi'),
      createLanguageOption('Marathi', 2, 'Mr'),
      createLanguageOption('Gujarati', 4, 'Gu'),
      createLanguageOption('Punjabi', 5, 'Pj'),
      createLanguageOption('Tamil', 8, 'Tm'),
      createLanguageOption('Telugu', 9, 'Tg'),
      createLanguageOption('Kannada', 6, 'Kn'),
      createLanguageOption('Malyalam', 7, 'Ml'),
    ],
  },
  {
    groupLabel: 'Other Languages',
    options: [createLanguageOption('English', 3, 'En')],
  },
];

const educationLevels = [
  "SSC",
  "HSC",
  "Graduate",
  "Post-Graduate",
  "PhD"
];

const createEducationOption = (label, value) => {
  return {
    label,
    value,
  };
};

const Update= () => {
  const navigate = useNavigate();
  
  const { id } = useParams();
  const [ setError] = useState(null);
  const [values, setValues]= useState({
    name:'',
    email:'',
    phone:'',
    gender:'',
    lang: [],
    education: null,
})

useEffect(() => {
  const errors = Validation(values);
  setErrors(errors);
}, [values]);

console.log(values,'VALUE')

  useEffect(() => {
    axios.get('http://localhost:3001/users/' +id)
      .then(res => {
        setValues(res.data);
      }
      )
      .catch(err => setError(err));
  }, []);

  const  handleUpdate = (event) => {
    console.log(event,'evet')
      event.preventDefault();
      axios.put('http://localhost:3001/users/' +id, values )
      .then(res => {
        console.log(res);
        
      })
      .catch(err => setError(err));

  }
  const VALID_NAME_REGEX = /^[a-zA-Z\s]{2,30}$/;
  const VALID_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const VALID_PHONE_REGEX = /^\d{10}$/;
  
  const Validation = (values) => {
    const errors = {};
    if (!values.name.trim()) {
      errors.name = 'The Name is required';
    } else if (!VALID_NAME_REGEX.test(values.name)) {
      errors.name = 'Name is invalid.';
    }
  
    if (!values.email.trim()) {
      errors.email = 'The Email Id is Required';
    } else if (!VALID_EMAIL_REGEX.test(values.email)) {
      errors.email = 'Email is invalid.';
    }
  
    if (!values.phone.trim()) {
      errors.phone = 'The Phone No is Required';
    } else if (!VALID_PHONE_REGEX.test(values.phone)) {
      errors.phone = 'Phone is invalid.';
    }
  
    if (values.gender === '') {
      errors.gender = 'Select the Gender';
    }
  
    if (values.lang.length === 0) {
      errors.lang = 'At least one language is required.';
    }
  
    return errors;
  };

  const [errors, setErrors] = useState({});
  
  const handlInput = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]:event.target.value,
    }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    setValues((prevValues) => ({
      ...prevValues,
      lang: values.lang.map((option) => option.value),
    }));
    const errors = Validation(values);
    setErrors(errors);
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = Validation(values);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      axios
        .post('http://localhost:3001/users', values)
        .then((res) => {
          console.log(res);
          navigate('/');
        })
        .catch((err) => setError(err));
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setValues((prevValues) => ({
      ...prevValues,
      lang: selectedOptions.length > 0 ? selectedOptions.map((option) => option.value) : [],
    }));
  };

  return (
    <div>
      <div className='d-flex w-75 vh-50 justify-content-end align-items-center bg-light'>
        <div className='w-75  border bg-white text-dark p-5'>
          <h1>Update the User</h1>
            <form onSubmit={handleUpdate}> 
                <div className='mb-2'>
                    <label htmlFor="name" >Name:</label>
                    <input type="text" name='name' className='form-control' placeholder= 'Update Name'
                    value={values.name} onChange={e => setValues({...values, name: e.target.value}) }/>
                     {errors.name && (<p style={{ color: 'red' }}>{errors.name}</p>)}
                </div>
                <div className='mb-2'>
                    <label htmlFor="email" >Email:</label>
                    <input type="email" name='email' className='form-control' placeholder= 'Update Email'
                    value={values.email} onChange={e => setValues({...values, email: e.target.value}) }/>
                    {errors.email && (<p style={{ color: 'red' }}>{errors.email}</p>)}
                </div>
                <div className='mb-3'>
                    <label htmlFor="phone" >Phone:</label>
                    <input type="text" name='phone' className='form-control' placeholder= 'Update Phone Number'
                    value={values.phone} onChange={e => setValues({...values, phone: e.target.value}) }/>
                    {errors.phone && (<p style={{ color: 'red' }}>{errors.phone}</p>)}

                <div className='mb-3'>
                    <label htmlFor="gender" >Gender:</label>
                    <input type="radio" name='gender'  value='Male'
                    checked={values.gender === 'Male'}
                    onChange={e=> setValues({...values, gender: e.target.value})}/> Male
                    <input type="radio" name='gender'  value='Female'
                    checked={values.gender === 'Female'}
                     onChange={e=> setValues({...values, gender: e.target.value})}/> Female
                    <input type="radio" name='gender' value='Other'
                    checked={values.gender === 'Other'}
                    onChange={e=> setValues({...values, gender: e.target.value})}/> Other
                    {errors.gender && (<p style={{ color: 'red' }}>{errors.gender}</p>)}
                </div>
                <div className="mb-3">
            <label htmlFor="lang">Languages Known:</label>
            <Select
                  name="lang"
                  options={languages.flatMap((group) => group.options)}
                  labelField="label"
                  valueField="value"
                  components={{ MultiValueRemove, Group }}
                  value={values.lang.map((value) => {
                    return {
                      value: value,
                      label: languages.flatMap((group) => group.options)
                        .find((option) => option.value === value)?.label
                    };
                  })}
                  onChange={handleSelectChange}
                  isMulti
                />
          </div>
          <div className="mb-3">
            <label htmlFor="education">Education:</label>
            <Select
                name="education"
                options={educationLevels.map((label) => ({
                  value: label,
                  label: label
                }))}
                labelField="label"
                valueField="value"
                value={values.education ? { value: values.education, label: values.education } : ''}
                onChange={(e) => setValues({ ...values, education: e.value })}
              />
                </div>
                    <button  type="submit" className='btn btn-success m-3'>Update</button>  
                    <Link to="/" className='btn btn-primary m-3'> Back </Link>
                </div>
            </form>
        </div>
    </div>
  </div>
  )
}

export default Update
