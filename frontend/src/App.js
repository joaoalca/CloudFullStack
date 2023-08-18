import React, { useState, useEffect } from 'react';
import './App.css';
import User from './components/User.js';

function App() {

  const [data, setData] = useState([]);


  useEffect(() => {
    fetch('http://ec2-3-217-115-32.compute-1.amazonaws.com:8000/users')
    .then(response => response.json())
    .then(data => {
      // 'data' is the resolved JSON data from the API response
      if (Array.isArray(data)) {
        // Assuming the array has at least one element
        setData(data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  
  },


   []);

  let users = data.map((user) => {
    return <User key={user.id} name={user.username} age={user.age} date={user.createDate} />
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.name.value;
    const age = e.target.age.value;
    const newUser = {username, age};
    console.log(newUser)
    fetch('http://ec2-3-217-115-32.compute-1.amazonaws.com:8000/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
        credentials: 'same-origin'
      }
    }).then(response => response.json())
      .then(setData([...data, newUser]));
  }

  return (
    <>
      <div className="App" id = "users">
        <h2>Users</h2>
        {users}
      </div>
      <div>
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
        <fieldset>
         <label>
           <p>Name</p>
           <input name="name" />
         </label>
         <label>
           <p>Age</p>
           <input name="age" />
         </label>
       </fieldset>
       <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
