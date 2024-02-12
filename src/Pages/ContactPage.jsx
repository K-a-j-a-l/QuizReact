import React from 'react'


const ContactPage = () => {

  const Hero = {
    backgroundImage: "url('https://t4.ftcdn.net/jpg/04/39/13/37/240_F_439133763_FrLdhZsd5aGC23r9ATARuKJBr8ifZjIe.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    paddingTop: '350px',
    backgroundPosition: 'center',
  };

  return (
    <>
      {/* Hero Section */}
      <section>
        <div className='container-fluid pb-5' style={Hero}>
          <div className='container-md p-3 pb-5'>
            <h1 className='quiz-title'>Trying to reach us!</h1>
            <p className='quiz-desc fs-5'>At Brainnies, we're committed to providing you with a seamless experience. <br/>If you're in search of guides and resources or have any feedback to share, we are here to listen and help. </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section>
        <div className='container-fluid mt-5 mb-5'>
          <div className='row'>
            <div className='col-4 p-0'>
              <div className='col p-0' style={{ height: '100%' }}>
                <iframe src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0"
                  style={{ border: "0", width: "100%", height: "100%" }} allowfullscreen title='map'></iframe>
              </div>
            </div>
            <div className='col-4 p-0' style={{ backgroundColor: '#f7f7f7' }}>
              <div className='col p-5'>
                <h1 className='fs-1 mb-4'>Meet Us</h1>
                <div className='row align-items-baseline'>
                  <i className="fa fa-phone col-1" aria-hidden="true"></i>
                  <p className='fs-6 col-11 p-0'>+40724343949</p>
                </div>
                <div className='row  align-items-baseline'>
                  <i className="fa fa-envelope col-1" aria-hidden="true"></i>
                  <p className='fs-6 col-11 p-0'>contact@brandaffair.ro</p>
                </div>
                <div className='row  align-items-baseline'>
                  <i className="fa fa-globe col-1" aria-hidden="true"></i>
                  <p className='fs-6 col-11 p-0'>Amman St, no 35, 4th floor, ap 10, Bucharest</p>
                </div>
              </div>
            </div>
            <div className='col-4 p-0' style={{ backgroundColor: '#ededed' }}>
              <div className='col p-5'>
                <h1 className='fs-1 mb-4'>Contact Us</h1>
                <button type="button" class="btn btn-dark rounded-pill px-5 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Contact Form</button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-3 fw-normal" id="exampleModalLabel">Get in Touch!</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <form id="contact-form" name="myForm" className="form py-3" action="#" onsubmit="return validateForm()" method="POST" role="form">

                          <div class="form-group">
                            <label class="form-label" id="nameLabel" for="name"></label>
                            <input type="text" class="form-control" id="name" name="name" placeholder="Your name" tabindex="1" />
                          </div>

                          <div class="form-group">
                            <label class="form-label" id="emailLabel" for="email"></label>
                            <input type="email" class="form-control" id="email" name="email" placeholder="Your Email" tabindex="2" />
                          </div>

                          <div class="form-group">
                            <label class="form-label" id="subjectLabel" for="sublect"></label>
                            <input type="text" class="form-control" id="subject" name="subject" placeholder="Subject" tabindex="3" />
                          </div>

                          <div class="form-group">
                            <label class="form-label" id="messageLabel" for="message"></label>
                            <textarea rows="6" cols="60" name="message" class="form-control" id="message" placeholder="Your message" tabindex="4"></textarea>
                          </div>

                          <div class="text-center margin-top-25">
                            <button type="submit" class="btn btn-mod btn-border btn-large">Send Message</button>
                          </div>

                        </form>
                        {/* <!-- End form --> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </>
  )
}

export default ContactPage;
