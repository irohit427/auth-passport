import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Context } from '../context';

export default function Login() {
  const { dispatch } = React.useContext(Context);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const sumbitHandler = (e: any) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/login', {
      username, password
    }).then((res: any) => {
      console.log('Response: ', res)
      if (res.data && res.data.success && !!res.data.token) {
        dispatch({
          type: "LOGIN",
          payload: res.data
        })
        history.push('/home');
      }
    }).catch(err => console.log(err))
  }
  return (
    <div className="container" style={{width: '50%'}}>
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            className="form-control" 
            id="username" 
            onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={sumbitHandler}>Submit</button>
      </form>
    </div>
  )
}
