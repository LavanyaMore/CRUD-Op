import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, useNavigate , useParams} from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState(null);
  
  
  
  useEffect(() => {
    axios.get('http://localhost:3001/users' )
      .then(res => setData(res.data))
      .catch(err => setError(err));
  }, []);

  if (error) {
    return (
      <div>
        Error: {error.message}
      </div>
    );
  }
  function handleDelete(id) {
    const confirm = window.confirm("Would you like to delete? ");
    if (confirm) {
      axios.delete('http://localhost:3001/users/' + id)
        .then(res => {
          navigate(0);

        }).catch(err => setError(err));
    }
  }
  const handleRowClick = (id) => {
    console.log("Person ID:", id);
    navigate(`/update/${id}`);
  };
  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-50'>
      <h1>List of Users</h1>
      {/* <div className='w-100 rounded bg-white border shadow p-4'></div> */}
      <button type="submit" onClick={() => navigate('/Create')}className='btn btn-success '>    Add+    </button>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            {/* <th>Languages Known</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            // <tr key={i} >
            <tr key={i} onClick={() => handleRowClick(d.id)}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>{d.phone}</td>
              <td>{d.gender}</td>
              {/* <td>{d.lang}</td> */}

              <td>
                {/* <Link to={`/read/${d.id}`} className='btn btn-sm btn-info me-2'>Read</Link> */}
                

                <Link to={`/Update/${d.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                <button onClick={e => handleDelete(d.id)} className='btn btn-sm btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default Home;