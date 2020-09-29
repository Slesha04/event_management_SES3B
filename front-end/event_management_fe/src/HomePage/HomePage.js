import React, {Component} from 'react';
import axios from "axios";
import { getHeaderToken, getToken } from "../Login/JwtConfig";
import Cookies from "js-cookie";

import './HomePage.css'
import '../App.css'
import HeroSection from '../Shared/HeroSection'
import Cards from '../Shared/Cards';
import Footer from '../Shared/Footer';
 

export default class homePage extends Component{
    componentDidMount() {
  
        axios
          .get("/protected", { headers: { Authorization: getHeaderToken() } })
          .then((res) => {
            this.setState({
              user: res.data,
            });
            Cookies.set("username", res.data['name']);
            Cookies.set("userid", res.data['id']);
            // this.getCreatedTasks();
          });
      }
    render(){
        return(
            <div>
            <HeroSection />
              <Cards />
            <Footer />
        </div>
        )
    }        
}
 