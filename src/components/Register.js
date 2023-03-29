import React,{useState,useContext} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
function Register() {
    const {user, setUser, register, error} = useContext(AuthContext)
    const [email, setEmail] = useState(user ? user.email : "");
    const [password, setPassword] = useState(user ? user.password : "");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
// handle user signUp
  function handleSignUp(e) {
    e.preventDefault()
    //console.log(email,firstName,lastName,password,phone)
    register({email, password, phone,firstName,lastName})
  }
  return (
    <div className='hero pt-5'>
      <form onSubmit={handleSignUp}>
        <h1>Sign-up</h1>
          <div>
            <label htmlFor="first-name">First Name</label><br/>
              <input
                type="text"
                id="first-name"
                name="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
          </div>
            <div>
              <label htmlFor="last-name">Last Name</label><br/>
              <input
                type="text"
                id="last-name"
                name="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          <div>
              <label htmlFor="email">Email</label><br/>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label><br/>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            <input type="submit" value="Sign Up" />
            <div>
          <p>Have an account? <Link to="/LOGIN">Login here</Link>.</p>
        </div>
      </form>
    </div>
  )
}
export default Register