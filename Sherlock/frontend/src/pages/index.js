import Head from "next/head";
import Script from "next/script";

const Home = () => {
  return (
    <>
      <head>
        <link rel="stylesheet" href="css/bootstrap.min.css" />
        <link rel="stylesheet" href="css/style.css" />
        <link rel="stylesheet" href="css/responsive.css" />
        <link rel="stylesheet" href="css/jquery.mCustomScrollbar.min.css" />
        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css" media="screen" />
        <Script src="js/jquery.min.js"></Script>
        <Script src="js/popper.min.js"></Script>
        <Script src="js/bootstrap.bundle.min.js"></Script>
        <Script src="js/jquery-3.0.0.min.js"></Script>

        <Script src="js/jquery.mCustomScrollbar.concat.min.js"></Script>
        <Script src="js/custom.js"></Script>
      </head>

      <div className="main-layout">

        {/* <div className="loader_bg">
          <div className="loader"><img src="images/loading1.gif" alt="#" /></div>
        </div> */}

        <section className="banner_main">
          <a href="/map" className="route_btn"></a>

          <div id="banner1" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#banner1" data-slide-to="0" className="active"></li>
              <li data-target="#banner1" data-slide-to="1"></li>
              <li data-target="#banner1" data-slide-to="2"></li>
              <li data-target="#banner1" data-slide-to="3"></li>
            </ol>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="carousel-caption">
                    <div className="row d_flex">
                      <div className="col-md-7">
                        <div className="text-bg">
                          <h1>Safety Prioritization<br /></h1>
                          <p>The platform empowers you to elevate safety as a top consideration in your travel decisions,
                            ensuring peace of mind during your journey. With the user-friendly interface, one can effortlessly visualize
                            routes and area ratings, allowing to make informed decisions tailored to their safety preferences. </p>
                          <a href="/map">Explore Safe Routes</a>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="text_img">
                          <figure>
                            <img src="/images/logo2.png" alt="#" />
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="carousel-item">
                <div className="container">
                  <div className="carousel-caption">
                    <div className="row d_flex">
                      <div className="col-md-7">
                        <div className="text-bg">
                          <h1>Route Safety Scoring</h1>
                          <p>It assigns area safety ratings on a scale of 0-5. These scores are
                            calculated from user reviews and sentiment analysis. Safety scores for multiple route options are
                            calculated based on area ratings, ensuring users are presented with the safest and quickest routes for their journey.
                          </p>
                          <a href="/map">Explore Safe Routes</a>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="text_img">
                          <figure>
                            <img src="/images/logo2.png" alt="#" />
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container">
                  <div className="carousel-caption">
                    <div className="row d_flex">
                      <div className="col-md-7">
                        <div className="text-bg">
                          <h1>Top Routes Recommendations</h1>
                          <p>The top three areas are suggested by the platform for safe and time-efficient travel. These routes are
                            displayed on a map, with safety ratings for each area along the path. This visual representation aids
                            users in making well-informed decisions about their travel routes.
                          </p>
                          <a href="/map">Explore Safe Routes </a>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="text_img">
                          <figure>
                            <img src="/images/logo2.png" alt="#" />
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container">
                  <div className="carousel-caption">
                    <div className="row d_flex">
                      <div className="col-md-7">
                        <div className="text-bg">
                          <h1>Community Engagement</h1>
                          <p>User reviews play a pivotal role in our platform, fostering community engagement and the
                            exchange of valuable safety-related information. This collective effort further enriches the safety ecosystem.
                          </p>
                          <a href="/map">Explore Safe Routes </a>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="text_img">
                          <figure>
                            <img src="/images/logo2.png" alt="#" />
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="#banner1" role="button" data-slide="prev">
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </a>
            <a className="carousel-control-next" href="videopop/index.html" role="button" data-slide="next">
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </a>
          </div>
        </section>

        <div className="team">
          <div className="container">
            <div className="row d_flex">
              <div className="col-md-5">
                <div className="team_img">
                  <figure><img src="/images/about1.webp" alt="#" /></figure>
                </div>
              </div>
              <div className="col-md-6 offset-md-1">
                <div className="titlepage">
                  <h2>About Us</h2>
                  <p>Safe Route Navigator is a safety-focused navigation platform designed to prioritize secure journeys for travelers and commuters. By integrating user-generated safety ratings, sentiment analysis, and route safety calculations, it ensure that every route not only gets you to your destination efficiently, but also keeps your well-being in mind. It equips users with the means to make well-informed decisions by displaying safety ratings and user reviews for searched areas. </p>
                  <h3>Explore the world with confidence</h3>
                  <strong> <span className="yellow"></span></strong>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="testimonial">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="titlepage">
                  <h2>Why SafeRoute Navigator?</h2>
                  <p>Here are some facts cause of which we exist</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 ">
                <div className="test_box margin_bottom">
                  <p>According to recent studies, 87% of travelers and commuters express a heightened need for safety-aware navigation tools. However, existing navigation systems primarily prioritize speed and distance, neglecting the importance of safety and the quality of the areas traversed.
                  </p>

                </div>
              </div>
              <div className="col-md-6">
                <div className="test_box">
                  <p>Studies show that areas with higher crime rates often rank as top concerns for commuters' safety during travel. This year, more than two thirds, 69% of respondents ranked crime atop their three greatest traveling threats. Nearly half, 47% reported their concerns would impact their plans.  </p>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="titlepage">
                  <h2>Request A Call Back</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form id="request" className="main_form">
                  <div className="row">
                    <div className="col-md-12 ">
                      <input className="contactus" placeholder="Name" type="text" name="Name" />
                    </div>
                    <div className="col-md-12">
                      <input className="contactus" placeholder="Email" type="email" name="Email" />
                    </div>
                    <div className="col-md-12">
                      <input className="contactus" placeholder="Phone Number" type="tel" name="Phone Number" />
                    </div>
                    <div className="col-md-12">
                      <input className="contactus1" placeholder="Message" type="text" name="messgae" />
                    </div>
                    <div className="col-md-12">
                      <button className="send_btn">Send</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <div className="map">
                  <figure><img src="/images/map_img.png" alt="#" /></figure>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <div className="footer">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                  <img className="logo1" src="/images/logo.png" alt="#" />
                  <ul className="about_us">
                    <li></li>
                  </ul>
                  <ul className="social_icon">
                    <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-linkedin-square" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                  </ul>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                  <h3>Useful Link</h3>
                  <ul className="link_menu">
                    <li><a href="https://www.travelhelpline.com/">Travel Helpline</a></li>
                    <li><a href="https://www.transport.nsw.gov.au//">Transport for NSW</a></li>
                    <li><a href="https://indianhelpline.com/">Indian Helpline</a></li>
                    <li><a href="https://commuterbenefits.com/programs/">Commuter check programs</a></li>

                  </ul>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                  {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.805694257388!2d77.22943297529034!3d28.665536075646738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd0683919c3b%3A0xf5fc331b74c2b9e2!2sIndira%20Gandhi%20Delhi%20Technical%20University%20for%20Women!5e0!3m2!1sen!2sin!4v1698525755453!5m2!1sen!2sin" width="500" height="200" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                  <iframe id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.805694257388!2d77.22943297529034!3d28.665536075646738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd0683919c3b%3A0xf5fc331b74c2b9e2!2sIndira%20Gandhi%20Delhi%20Technical%20University%20for%20Women!5e0!3m2!1sen!2sin!4v1698525755453!5m2!1sen!2sin" width="500" height="250" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">

                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;