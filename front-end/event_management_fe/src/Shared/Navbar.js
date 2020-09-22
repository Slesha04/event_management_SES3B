import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Button } from './Button';
import './Navbar.css'

function Navbar() {
    const [click, setClick]= useState(false);
    const [button,setButton] = useState(true)

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false)
        }else{
            setButton(true)}
    };

    window.addEventListener('resize', showButton);

    return (
        <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    UTS:EVENTS <i class="fas fa-glass-cheers"/>
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/global-chat' className='nav-links' onClick={closeMobileMenu}>
                            Chat
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                            Profile
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>
                            Sign In
                        </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
            </div>
        </nav>
        
        </>
    )
}

export default Navbar
