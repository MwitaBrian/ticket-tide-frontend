import React from 'react'
import Contact from './Contact'
import Upcoming from './Upcoming'
function Home({ events }) {
  return (

    <div style={{marginTop:"10vh"}}>
      <div className="hero-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor: 'rgba(128, 128, 128, 0.5)' }}>
  <div className='container-md'>
<h1 style={{ textAlign: 'center', color: '#fbfbff', textTransform:"uppercase", fontWeight:"900" }}>
  Discover the best events near you
</h1>
  </div>
</div>
      <Upcoming/>
       {/* about section */}
      <div className='about-section mt-4' style={{background:"linear-gradient(to right, #00356B,#1D2951, #131E3A)"}}>
        <div className='container-md'>
          <div className='row'>
            <div className='col-lg-6 p-5'>
              <img src='https://img.freepik.com/free-photo/cheerful-diverse-people-holding-music-icons_53876-65661.jpg?size=626&ext=jpg&ga=GA1.1.2021238082.1676881974&semt=ais' alt='about' width="400" height="300" style={{borderRadius:"20px"}}/>
            </div>
            <div className='col-lg-6  p-5'>
              <h1 style={{ color: "#1E90FF", fontSize: "20px", textTransform: "uppercase" }}>About us</h1>
              <p style={{color:"#fff", fontSize:"17px"}}>
                "Experience the thrill of a lifetime with our exclusive concert ticket package!
                With VIP seating and backstage access,
                you'll get up close and personal with your favorite artists.
                And don't forget to capture the memories with our professional photo booth and autographed merchandise.
                Get your tickets today and make unforgettable memories!"              </p>
              <button style={{ padding: "5px", borderRadius: "30px", background: "#1E90FF", color: "#fff", border: "none", width:"140px" }}>Read More</button>
            </div>
          </div>
        </div>
        </div>
      {/* end of about section */}
       <Contact/>
      </div>

  )
}
export default Home