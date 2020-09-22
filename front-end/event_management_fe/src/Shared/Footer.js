import React from 'react'
import { Button } from './Button'
import "./Footer.css"
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className="footer-container">
            <section className="footer-susbcription">
                <p className="footer-subscription-heading">
                    Subscribe to the newsletter to get the latest scoop on what is happening around campus
                </p>
                <p className="footer-subscription-text">
                    You will be able to unsubscribe at any time
                </p>
                <div className="input-areas">
                    <form>
                        <input type="email" name="email" placeholder="Your Email" className="footer-input"/>
                        <Button buttonStyle="btn--outline">Subscribe</Button>
                    </form>
                </div>
            </section>
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                    <h2>About Us</h2>
                    <Link to="/login">How it works</Link>
                    <Link to="/all-events">Events</Link>
                    <Link to="/all-events">Terms of Use</Link>
                    </div>
                    <div className="footer-link-items">
                    <h2>Help</h2>
                    <Link to="/login">How to Set up a chat room</Link>
                    <Link to="/all-events">Cyber Safety</Link>
                    <Link to="/all-events">Letter of Safety</Link>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                    <h2>2nd row</h2>
                    <Link to="/login">How it works</Link>
                    <Link to="/all-events">Events</Link>
                    <Link to="/all-events">Terms of Use</Link>
                    </div>
                </div>
            </div>
            <section className="social-media">
            <div className="social-media-wrap">
                <div className="footer-logo">
                    <Link to='/' className="social-logo">
                        UTS:EVENTS <i class="fas fa-glass-cheers"/>
                    </Link>
                </div>
                <small className="website-rights">UTS:EVENTS 2020</small>
                <div className="social-icons">
                    <Link className="social-icon-link facebook" to='/' target="_blank" aria_label="Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </Link>
                    <Link className="social-icon-link instagram" to='/' target="_blank" aria_label="Instagram">
                        <i className="fab fa-instagram"></i>
                    </Link>
                    <Link className="social-icon-link twitter" to='/' target="_blank" aria_label="Twitter">
                        <i className="fab fa-twitter"></i>
                    </Link>
                </div>
            </div>
          </section>
        </div>
    )
}

export default Footer
