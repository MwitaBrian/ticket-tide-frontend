import React, { useState, useContext} from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
	const [mobile, setMobile] = useState(false);
	const { logout } = useContext(AuthContext);
	const isLoggedIn = sessionStorage.getItem("jwtToken") ? true : false;
	const level = sessionStorage.getItem("level")
	
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
						Ticket-
						<span>Tide</span>
					</h3>
					<ul
						className={mobile ? "nav-links-mobile" : "nav-links"}
						onClick={() => setMobile(false)}
					>
						<NavLink exact activeClassName='active' to='/'>
							<li>Home</li>
						</NavLink>
						<NavLink activeClassName='active' to='/events'>
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
								<li className='d-flex' onClick={logout}>
									<img
										className='avatar'
										style={{
											width: "35px",
											height: "35px",
											borderRadius: "50%",
											border: "2px solid #fbfbff",
											marginRight: "3px",
										}}
										src=''
										alt=''
									/>
									Logout
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
