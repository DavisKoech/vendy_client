import "./Footer.scss"

const Footer = () => {
  return (
    <div className='footer'>
        <div className="container">
           <div className="top">
               <div className="left">
                   <h4>payment methods</h4>
                   <div className="data">
                      <img src="/mpesa.png" alt="" />
                      <h6>M-Pesa</h6>
                   </div>
                   <div className="data">
                      <img src="/airtel.png" alt="" />
                      <h6>Airtel Money</h6>
                   </div>
                   <div className="data">
                      <img src="/paypal.png" alt="" />
                      <h6>Paypal</h6>
                   </div>
                   <div className="data">
                      <img src="/master.png" alt="" />
                      <h6>Master Card</h6>
                   </div>
                   <div className="data">
                      <img src="/visa.png" alt="" />
                      <h6>Visa</h6>
                   </div>
                   <div className="data">
                      <img src="/bitcoin.png" alt="" />
                      <h6>Bitcoin</h6>
                   </div>
                </div>
                <div className="center">
                     <h4>Adress & Contact Info</h4>
                     <div className="dataplace">
                         <img src="/place.png" alt="" />
                         <div className="place">
                           <h3>10th floor abc place,</h3>
                           <h4>Waiyaki way,Nairobi</h4>
                         </div>
                     </div>
                     <div className="data">
                        <img src="/call.png" alt="" />
                        <h5> +254743894571</h5>
                     </div>
                     <div className="data">
                        <img src="/whatsapp.png" alt="" />
                        <h5> +254743894571</h5>
                     </div>

                     <div className="data">
                        <img src="/mail.png" alt="" />
                        <h5> Info@vendykenya.co.ke</h5>
                     </div>
                </div>
                <div className="center2">
                     <h4>Get to Know Us</h4>
                     <h6>About Us</h6>
                     <h6>Careers</h6>
                     <h6>FAQS</h6>
                     <h6>Company Blog</h6>
                     <h6>Return Policy</h6>
                     <h6>Customer Support</h6>
                     <h6>Delivery</h6>
                     <h6>Terms & Conditions</h6>
                </div>
                <div className="center2">
                     <h4>Features</h4>
                     <h6>Vendy Agent </h6>
                     <h6>Lipia PolePole</h6>
                     <h6>Rent a Shelf</h6>
                     <h6>Tracking Order</h6>
                     <h6>Official Brands</h6>
                     <h6>Store Management System</h6>
                     <h6>Report Store</h6>
                </div>
                <div className="right">
                     <h4>Social Links</h4>
                     <div className="socialAccounts">
                     <div className="data">
                           <img src="/twitter.png" alt="" />
                       </div>
                     <div className="data">
                          <img src="/linkedin.png" alt="" />
                     </div>
                      <div className="data">
                         <img src="/facebook.png" alt="" />
                      </div>
                      <div className="data">
                        <img src="/instagram.png" alt="" />
                     </div>
                     <div className="data">
                        <img src="/tiktok.png" alt="" />
                     </div>
                     <div className="data">
                        <img src="/youtube.png" alt="" />
                     </div>
                     </div>
                    </div>
              </div>
           <div className="bottom">
            <span> © Copyright 2024 VendyMarketplace, Inc. All rights reserved</span>
           </div>
        </div>
    </div>
  )
}

export default Footer