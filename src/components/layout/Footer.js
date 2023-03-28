import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div className='py-4 footer' style={{background:"linear-gradient(to right, #00356B,#1D2951, #131E3A)"}}>
      <div className='container-md'>
        <div className='row'>
          <div className='col-lg-3 col-sm-12' style={{color:"#FBFBFF"}}>
            <h2 className=''style={{textTransform:"uppercase", fontWeight:"900" ,fontSize:"20px"}}>Ticket-<span>Tide</span></h2>
            <div>
                <p>
                  TicketTide is the ultimate solution for
                  event-goers looking for hassle-free ways to purchase
                  tickets to their favorite events and concerts.
                </p>
            </div>
        </div>
          <div className='col-lg-3 col-sm-12'>
            <h2 className='footer-h2'>Quick Links</h2>
            <div>
              <div><Link to='/' style={{color:"#FBFBFF",textDecoration:"none",fontSize:"1rem",padding:"10px"}}>Home</Link></div>
              <div><Link to='/' style={{color:"#FBFBFF",textDecoration:"none",fontSize:"1rem",padding:"10px"}}>Events</Link></div>
            </div>
        </div>
          <div className='col-lg-3 col-sm-12' style={{color:"#FBFBFF"}}>
            <h2 className='footer-h2'>Contact</h2>
            <div>
              <p><i className="bi bi-geo-alt-fill" style={{ fontSize: '1rem', color: '#1E90FF', paddingRight:"2px" }}/>Unit 3 24K Mansion 45 Nairobi City, Kenya</p>
              <p><i className="bi bi-telephone-fill" style={{ fontSize: '1rem', color: '#1E90FF', paddingRight:"4px" }}/>092367459</p>
              <p><i className="bi bi-envelope-fill" style={{ fontSize: '1rem', color: '#1E90FF', paddingRight:"4px" }}/>info_tickettide@gmail.com</p>
            </div>
        </div>
          <div className='col-lg-3 col-sm-12'>
            <h2 className='footer-h2'>Find us on our socials</h2>
            <div >
              <span className="bi bi-facebook" style={{padding:"5px", color:"white", fontSize:"2rem"}}></span>
              <span className="bi bi-whatsapp green-color" style={{padding:"5px", color:"green", fontSize:"2rem"}}> </span>
              <span className="bi bi-twitter blue-color" style={{padding:"5px", color:"blue", fontSize:"2rem"}}> </span>
                <span className="bi bi-youtube red-color" style={{padding:"5px", color:"red", fontSize:"2rem"}}> </span>
            </div>
        </div>
      </div>
        <hr style={{ color: "#fff" }} />
        <div className='footer_at' style={{ display: 'flex', justifyContent: 'center', fontSize:"1.5rem" }}>
  <p style={{color:"#fff"}}><i className="bi bi-shield-lock" style={{fontSize:"1.5rem"}}></i> &copy; 2023 TicketTide</p>
</div>
        </div>
    </div>
  )
}
export default Footer