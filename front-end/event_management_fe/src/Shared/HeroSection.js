import React from 'react'
import { Button } from './Button'
import './HeroSection.css'
import '../App.css'

function HeroSection() {
    return (
        <div className='hero-container'>
            <video src="/videos/video-1.mp4" autoPlay loop muted />
            <h1>ASTROPHOTOGRAPHY ANYONE?</h1>
            <p>Grab your camera and go compete!</p>
            <div className="hero-btns">
            <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Join In
        </Button>
                <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'> Info <i class="fas fa-info-circle"></i> </Button>
            </div>
        </div>
    )
}

export default HeroSection
