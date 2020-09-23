import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

const Cards = () => {
    return (
        <div className='cards'>
            <h1>Check out all these events happening on campus</h1>
            <div className="cards__container">
                <div className= "cards__wrapper">
                    <ul className="cards__items">
                        <CardItem src="images/img-9.jpg"
                        text="Explore the Magical Waterfalls at Wenthworth falls"
                        label="Adventure"
                        path="/all-events"/>
                        <CardItem src="images/img-7.jpg"
                        text="PhotoSoc Photography Bootcamp"
                        label="Photography"
                        path="/all-events"/>
                    </ul>
                    <ul className="cards__items">
                        <CardItem src="images/img-2.jpg"
                        text="Helocopter ride on top of the barreir reef"
                        label="Adventure"
                        path="/all-events"/>
                        <CardItem src="images/img-1.jpg"
                        text="Campint through the Blue Mountains"
                        label="Photography"
                        path="/all-events"/>
                        <CardItem src="images/img-5.jpg"
                        text="Banking 101"
                        label="Finance"
                        path="/all-events"/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
