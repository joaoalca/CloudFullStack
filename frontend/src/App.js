import React, { useState, useEffect } from 'react';
import './App.css';
import User from './components/User.js';

function App() {

  const [data, setData] = useState([]);


  // useEffect(() => {

  //   teste();

  // });

  useEffect(() => {
    fetch('http://ec2-3-217-115-32.compute-1.amazonaws.com:8000/users')
    .then(response => console.log(response.json()))
    .then(data => setData(data.json()));
  },


  //  []);

  // const teste = async () => {
  //   console.log('teste');
  //   const url = 'http://ec2-3-217-115-32.compute-1.amazonaws.com:8000/users';
  //   console.log(url);
  //   const response = await fetch(url);
  //   console.log("passou");
  //   let data = await r

  // }

  let users = data.map((user) => {
    return <User key={user.id} name={user.name} age={user.age} date={user.data} />
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const age = e.target.age.value;
    const newUser = {name, age};
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
