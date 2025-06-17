

const Footer = () => {
    return (
        <div className="container-fluid bg-primary text-secondary px-5">
            <div className="row gx-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="col-lg-8 col-md-6">
                    <div className="row gx-5">
                        <div className="col-lg-4 col-md-12 pt-5 mb-5">
                            <h3 className="text-light mb-4">Get In Touch</h3>
                            <div className="d-flex mb-2">
                                <i className="bi bi-geo-alt text-primary me-2" />
                                <p className="mb-0">123 Street, New York, USA</p>
                            </div>
                            <div className="d-flex mb-2">
                                <i className="bi bi-envelope-open text-primary me-2" />
                                <p className="mb-0">info@example.com</p>
                            </div>
                            <div className="d-flex mb-2">
                                <i className="bi bi-telephone text-primary me-2" />
                                <p className="mb-0">+012 345 67890</p>
                            </div>
                            <div className="d-flex mt-4">
                                <a className="btn btn-primary btn-square rounded-circle me-2" href="#"><i className="fab fa-twitter" /></a>
                                <a className="btn btn-primary btn-square rounded-circle me-2" href="#"><i className="fab fa-facebook-f" /></a>
                                <a className="btn btn-primary btn-square rounded-circle me-2" href="#"><i className="fab fa-linkedin-in" /></a>
                                <a className="btn btn-primary btn-square rounded-circle" href="#"><i className="fab fa-instagram" /></a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 pt-0 pt-lg-5 mb-5">
                            <h3 className="text-light mb-4">Quick Links</h3>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="text-secondary mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Home</a>
                                <a className="text-secondary mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />About Us</a>
                                <a className="text-secondary mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Food Menu</a>
                                <a className="text-secondary mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Our Chefs</a>
                                <a className="text-secondary mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Latest Blog</a>
                                <a className="text-secondary" href="#"><i className="bi bi-arrow-right text-primary me-2" />Contact Us</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 pt-0 pt-lg-5 mb-5">
                            <h3 className="text-light mb-4">More Links</h3>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="text-secondary mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Home</a>
                                <a className="text-secondary mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />About Us</a>
                                <a className="text-secondary mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Food Menu</a>
                                <a className="text-secondary mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Our Chefs</a>
                                <a className="text-secondary mb-2" href="#"><i className="bi bi-arrow-right text-primary me-2" />Latest Blog</a>
                                <a className="text-secondary" href="#"><i className="bi bi-arrow-right text-primary me-2" />Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="d-flex flex-column align-items-center justify-content-center text-center h-100 p-5" style={{ background: '#111111' }}>
                        <h3 className="text-white mb-4">Newsletter</h3>
                        <h6 className="text-uppercase text-light mb-2">Subscribe Our Newsletter</h6>
                        <p className="small text-secondary">Amet justo diam dolor rebum lorem sit stet sea justo kasd</p>
                        <form action>
                            <div className="input-group">
                                <input type="text" className="form-control border-white p-3" placeholder="Your Email" />
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer