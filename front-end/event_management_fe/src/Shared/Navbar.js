import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Button } from './Button';
import './Navbar.css'
 import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
 import axios from "axios";
import { getHeaderToken } from "../Login/JwtConfig";
import { useHistory } from 'react-router-dom';

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
   //avis code
   const history = useHistory();

    useEffect(() => {
        // Update the document title using the browser API
        axios
        .get("/protected", { headers: { Authorization: getHeaderToken() } })
        .then((res) => {
          this.setState({
            user: res.data,
            userType: res.data["userType"],
          });
          console.log("NAVBAR", res.data["userType"]);
        });
      });
      
    const logout = () => {
        Cookies.remove("auth-cookie");
        history.push('/login')   
       };
    
  //------------------------------------------------------------

    useEffect(()=>{
        showButton();
    },[]);

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
                        <i class="fas fa-home"></i>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/global-chat' className='nav-links' onClick={closeMobileMenu}>
                        <i class="fas fa-comment-alt"></i>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                        <i class="fas fa-user-alt"></i>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <button className='nav-links-mobile'  onClick={logout}
                  class="button"
                  type="submit">
                            logout
                        </button>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'><i class="fas fa-sign-in-alt"></i></Button>}
            </div>
        </nav>
        
        </>
    )
}

export default Navbar
