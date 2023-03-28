import React, { useState} from "react";
import { NavLink } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [mobile, setMobile] = useState(false);
  // const { user, logout } = useContext(AuthContext);
  // console.log(user)
  
	return (
		<div>
		  <nav className='navbar' style={{background: "linear-gradient(to right, #00356B,#1D2951, #131E3A)"}}>
			<div className='container'>
				<h3 className='logo' style={{ textTransform: "uppercase", fontWeight: "900" }}>Ticket-<span>Tide</span></h3>
					<ul className={mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
						<NavLink  className='active' to='/'>
							<li>Home</li>
						</NavLink>
						<NavLink className='active' to='/events'>
							<li>Events</li>
						</NavLink>
						<NavLink
							className='mx-3 rounded-full'
							style={{ background: "#1E90FF" }}
							to='/register'>
							<li>Create Account</li>
            			</NavLink>
						<NavLink className='active' to='/login'>
							<li>Login</li>
						</NavLink>
					</ul>
					<button
						className='mobile-menu-icon'
						onClick={() => setMobile(!mobile)}
					>
						{mobile ? (
							<i
								className='bi bi-x-square'
								style={{ color: "#131E3A", fontSize: "2rem" }}
							/>
						) : (
							<i className='bi bi-list' style={{ fontSize: "2rem" }} />
						)}
					</button>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
