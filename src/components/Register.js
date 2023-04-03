import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';



function Register() {
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
  const [level, setLevel] = useState('user');
 
  // const { register } = useContext(AuthContext);
// handle user signUp
  function handleSignUp(e) {
    e.preventDefault();
    const last_name = lastName
    const first_name = firstName

    // register(email, password, first_name, last_name, phone);
    // console.log(email, password, first_name, last_name, password)
    fetch("/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				last_name,
				first_name,
				phone,
				email,
        password,
        level
			}),
		})
			.then((response) => response.json())
			.then((data) => {
			navigate('/login')
			});
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