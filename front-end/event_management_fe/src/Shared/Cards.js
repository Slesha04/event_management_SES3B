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
                        <CardItem />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
