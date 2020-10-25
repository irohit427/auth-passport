import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory();
  const submitForm = async (e : any) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/register', {
      firstName, lastName, username, password, email
    }).then(res => {
      if (!!res.data.u._id) {
        history.push('/login');
      }
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <div className="container" style={{width: '50%'}}>
      <h1>Register</h1>
      <form>
        <div className="form-group row">
          <label htmlFor="firstName">First Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="firstName" 
            onChange={e => setFirstName(e.target.value)} />
        </div>
        <div className="form-group row">
          <label htmlFor="lastName">Last Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="lastName" 
            onChange={e => setLastName(e.target.value)} />
        </div>
        <div className="form-group row">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            className="form-control" 
            id="username" 
            onChange={e => setUsername(e.target.value)} />
        </div>

        <div className="form-group row">
          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group row">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={submitForm}>Submit</button>
      </form>
    </div>
  )
}
