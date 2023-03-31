import React, { useState, useContext } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
	// const navigate = useNavigate()
	
	const [mobile, setMobile] = useState(false);
	const { logout ,currentUser} = useContext(AuthContext);
	const isLoggedIn = sessionStorage.getItem("jwtToken") ? true : false;
	const level = sessionStorage.getItem("level");
	// const id = sessionStorage.getItem('user_id')



	return (
		<div>

			<nav
				className='navbar'
				style={{
					background: "linear-gradient(to right, #00356B,#1D2951, #131E3A)",
				}}
			>
				<div className='container'>
					<h3
						className='logo'
						style={{ textTransform: "uppercase", fontWeight: "900" }}
					>
						Ticket-<span>Tide</span>
					</h3>
					<ul
						className={mobile ? "nav-links-mobile" : "nav-links"}
						onClick={() => setMobile(false)}
					>
						<NavLink exact activeClassName='active' to='/'>

		  
							<li>Home</li>
						</NavLink>
						<NavLink className='active' to='/events'>
							<li>Events</li>
						</NavLink>

						{level === "admin" ? (
							<>
								<NavLink
									activeClassName='active'
									className='mx-3'
									style={{ background: "#1E90FF" }}
									to='/new'
								>
									<li>Create</li>
								</NavLink>
							</>
						) : null}


						{isLoggedIn ? (
							<>
								<li className='dropdown'>
									<a
										className='dropdown-toggle d-flex'
										href='!#'
										role='button'
										id='navbarDropdownMenuLink'
										data-toggle='dropdown'
										aria-haspopup='true'
										aria-expanded='false'
									>
										<img
											className='avatar'
											style={{
												width: "35px",
												height: "35px",
												borderRadius: "50%",
												border: "2px solid #fbfbff",
												marginRight: "3px",
											}}
											src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
											alt='Alternative avatar'
										/>
										{currentUser.last_name}
									</a>
									<div
										className='dropdown-menu'
										aria-labelledby='navbarDropdownMenuLink'
									>
										<a className='dropdown-item' href='/profile'>
											<i class='bi bi-person-square'>
												Profile
											</i>
										</a>
										<a
											className='dropdown-item'
											href='#!'
											onClick={() => logout()}
										>
											<i class='bi bi-door-closed-fill'> Logout</i>
										</a>
									</div>
								</li>
							</>
						) : (
							<>
								<NavLink activeClassName='active' to='/login'>
									<li>Login</li>
								</NavLink>
							</>
						)}

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
