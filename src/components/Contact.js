import React, { useState } from 'react'
import Swal from 'sweetalert2';

function Contact() {
   const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
		e.preventDefault();

		// Send form data to server
		fetch(`https://ticket-rjnl.onrender.com/messages`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				message,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.status === "created") {
					// Show success message
					Swal.fire({
						icon: "success",
						title: "Thank you!",
						text: "Your message has been received. We'll get back to you",
						confirmButtonText: "OK",
					});
					setName("");
					setEmail("");
					setMessage("");
				} else {
					// Show error message
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: `There were some errors: ${response.errors}`,
						confirmButtonText: "OK",
					});
				}
			});
	}


  return (
		<div>
			{/* contact section */}
			<div className='about-section mt-4'>
				<div className='container-md'>
					<div className='row'>
						<h1
							className='section-header'
							style={{
								color: "#1E90FF",
								fontSize: "20px",
								textTransform: "uppercase",
							}}
						>
							Contact us
						</h1>
						<div className='col p-6'>
							<div>
								<form onSubmit={handleSubmit}>
									<h3
										style={{
											textAlign: "left",
											fontsize: "10px",
											marginLeft: "0px",
											padding: "0",
											fontWeight: "200",
										}}
									>
										Send us a message
									</h3>

									<div className='form-group col-md-12'>
										<label htmlFor='name'>Name:</label>
										<input
											type='text'
											className='form-control'
											id='name'
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
									<div className='form-group col-md-12'>
										<label htmlFor='email'>Email:</label>
										<input
											type='email'
											className='form-control'
											id='email'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									<div className='form-group col-md-12'>
										<label htmlFor='message'>Message:</label>
										<textarea
											className='form-control'
											id='message'
											rows='3'
											value={message}
											onChange={(e) => setMessage(e.target.value)}
										></textarea>
									</div>
									<button
										type='submit'
										className='btn btn-primary'
										style={{ marginTop: "20px" }}
									>
										Submit
									</button>
								</form>
							</div>
						</div>
						<div className='col p-5'>
							<p>
								"Have a question, comment, or feedback for us? We're all ears!
								Our team is dedicated to providing you with the best possible
								experience, and we're always eager to hear from our clients.
								Whether you're looking for advice, have a suggestion for how we
								can improve, or just want to say hello, we would love to hear
								from you. At our company, we value your input and believe that
								open communication is the key to building strong relationships
								with our clients. So don't hesitate to reach out to us using the
								contact details below. Our friendly experts are standing by,
								ready to assist you with whatever you need. We look forward to
								hearing from you!"
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* end of contact section */}
		</div>
	);
}
export default Contact;