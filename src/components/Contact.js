import React,{useState} from 'react'
function Contact() {
   const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with form data
  };
  return (
      <div>
          {/* contact section */}
      <div className='about-section mt-4'>
        <div className='container-md'>
          <div className='row'>
             <div className='col p-5'>
              <h1 style={{ color: "#1E90FF", fontSize: "20px", textTransform: "uppercase" }}>Contact us</h1>
              <h1>Ready to Get Started</h1>
              <p style={{ fontSize:"17px"}}>
                <div>
                    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-md-6">
          <input
            type="text"
            className="form-control"
                          id="first-name"
                          placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group col-md-6">
          <input
            type="text"
            className="form-control"
                          id="last-name"
                          placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6">
          <input
            type="email"
            className="form-control"
                          id="email"
                          placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group col-md-6">
          <input
            type="tel"
            className="form-control"
                          id="phone"
                          placeholder='Phone Number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-12">
          <textarea 
            className="form-control"
            id="message"
                          rows="3"
                          placeholder='Message'
            value={message}
                          onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>
        Submit
      </button>
    </form>
                </div>
              </p>
            </div>
            <div className='col p-5'>
              <img src='https://img.freepik.com/premium-photo/3d-rendering-metallic-telephone-word-contact-us-wooden-surface_190619-1133.jpg?size=338&ext=jpg&ga=GA1.2.2021238082.1676881974&semt=ais' alt='about'  width="500" height="400" style={{borderRadius:"20px",marginTop:"20px"}}/>
            </div>
          </div>
        </div>
        </div>
      {/* end of contact section */}
    </div>
  )
}
export default Contact