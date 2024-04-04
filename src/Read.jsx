
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link , useParams } from 'react-router-dom';


function Read() {
  // const navigate = useNavigate();
  const [data, setData] = useState({ name: '', email: '', phone: '', gender:'', lang: [], education: '' });
  const { id } = useParams();
    const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/users/' + id)
      .then(res => setData(res.data))
      .catch(err => setError(err));
  }, [])
  return (
    <div className='d-flex w-100 vh-100 flex-column justify-content-center align-items-center bg-light'>
      <h1>Details of Users</h1>
    {/* <div className='w-75 rounded bg-white border shadow px-5 pt-5 pb-5'></div> */}
      <div className='mb-2'>
        <strong>Name: {data.name}</strong>
      </div>
      <div className='mb-2'>
        <strong>Email: {data.email}</strong>
      </div>
      <div className='mb-2'>
        <strong>Phone: {data.phone}</strong>
      </div>
      <div className='mb-2'>
        <strong>Gender: {data.gender}</strong>
      </div>
      <div className='mb-3'>
        <strong>Languages Known: {data.lang}</strong>
      </div>
      <div className='mb-3'>
        <strong>Education: {data.education}</strong>
      </div>
      
      {/* <Link to={`/Update/${id}`} className='btn btn-success ms-3'>Edit</Link>    */}
      <Link to="/" className='btn btn-primary ms-3'> Back </Link>
    
    </div>
  )
}

export default Read
