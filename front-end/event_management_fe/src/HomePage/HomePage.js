import React from 'react';

import './HomePage.css'
import '../App.css'
import HeroSection from '../Shared/HeroSection'
import Cards from '../Shared/Cards';
import Footer from '../Shared/Footer';

const homePage = (props) =>{
    return(
        <div>
            <HeroSection />
            <Cards />
            <Footer />
        </div>
    )
}
export default homePage;