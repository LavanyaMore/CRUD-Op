import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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

const createLanguageOption = (label, value) => {
  return {
    label,
    value,
    
  };
};

const languages = [
  {
    groupLabel: 'Indian Languages',
    options: [
      createLanguageOption('Hindi', 1 ),
      createLanguageOption('Marathi', 2, ),
      createLanguageOption('Gujarati', 4 ),
      createLanguageOption('Punjabi', 5),
      createLanguageOption('Tamil', 8 ),
      createLanguageOption('Telugu', 9 ),
      createLanguageOption('Kannada', 6),
      createLanguageOption('Malyalam', 7),
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

  // if (values.lang.length === 0) {
  //   errors.lang = 'At least one language is required.';
  // }

  return errors;
};
const createEducationOption = (label, value) => {
  return {
    label,
    value,
  };
};


const Create = () => {
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    lang: [],
    education : '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(0);

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
      lang: selectedOptions.map((option) => option.value),
    }));
  };
  
  return (
    <div className="d-flex w-75 vh-50 justify-content-end align-items-center bg-light">
      <div className="w-75 border bg-white text-dark p-5">
        <h1>Add a User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              onChange={handlInput}
            />
            {errors.name && (
              <p style={{ color: 'red' }}>{errors.name}</p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={handlInput}
            />
            {errors.email && (
              <p style={{ color: 'red' }}>{errors.email}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter Phone Number"
              onChange={handlInput}
            />
            {errors.phone && (
              <p style={{ color: 'red' }}>{errors.phone}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="gender">Gender:</label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={(e) =>
                setValues({ ...values, gender: e.target.value })
              }
            />{' '}
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={(e) =>
                setValues({ ...values, gender: e.target.value })
              }
            />{' '}
            Female
            <input
              type="radio"
              name="gender"
              value="Other"
              onChange={(e) =>
                setValues({ ...values, gender: e.target.value })
              }
            />{' '}
            Other
            {errors.gender && (
              <p style={{ color: 'red' }}>{errors.gender}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="lang">Languages Known:</label>
            <Select
              name="lang"
              options={languages.flatMap((group) => group.options)}
              labelField="label"
              valueField="value"
              // components={{ MultiValueRemove, Group }}
              value={values.lang.map((value) => {
                const option = languages.flatMap((group) => group.options)
                  .find((option) => option.value === value);
                return option;
              })}
              onChange={handleSelectChange}
              isMulti
            />
          </div>
          <div className="mb-3">
            <label htmlFor="education">Education:</label>
              <Select
              name="education"
              options={educationLevels.map((label) =>
                createEducationOption(label, label)
              )}
              labelField="label"
              valueField="value"
              value={values.education}
              onChange={(e) => setValues({ ...values, education: e.value })}
            />
          </div>
          <button className="btn btn-success m-3">Submit</button>{' '}
          <Link to="/" className="btn btn-primary m-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Create