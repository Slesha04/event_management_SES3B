import React from 'react';

import './HomePage.css'
import '../App.css'
import HeroSection from '../Shared/HeroSection'
import Cards from '../Shared/Cards';

const homePage = (props) =>{
    return(
        <div>
            <HeroSection />
            <Cards />
        </div>
    )
}
export default homePage;