import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const {login } = useContext(AuthContext)
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic here
    login(username, password)
  };
  return (
      <div>
      <div className='hero pt-5'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
      <div>
        <label htmlFor="username">Username</label><br/>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
              padding: "5px"}} disabled={!username || !password}>Sign In</button>
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