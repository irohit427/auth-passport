import React from 'react'
import { UserInterface } from '../interface/UserInterface'

export default function Home() {
  const user: UserInterface = JSON.parse(localStorage.getItem('user')!);
  return (
    <div className="container" style={{width: '50%'}}>
      <h1>Home</h1>
      <div className="card" style={{width: '26rem'}}>
        <div className="card-body">
          <h5 className="card-title">Name: {user.firstName}</h5>
          <p className="card-text">Username: {user.username}</p>
        </div>
      </div>
    </div>
  )
}
