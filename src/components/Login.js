import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext)
  
    const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic here

    login(email, password)

  };
  return (
      <div>
      <div className='hero pt-5'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
      <div>
        <label htmlFor="username">Password</label><br/>
        <input
          type="text"
          id="username"
          name="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label><br/>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <button style={{ border:"none",
              borderRadius: "5px",
              padding: "5px"}} disabled={!email || !password}>Sign In</button>
      </div>
      <div>
        <p>Don't have an account? <Link to="/register">Register here</Link>.</p>
      </div>
    </form>
      </div>
    </div>
  )
}
export default Login