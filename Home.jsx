import React from 'react';
import AddHotel from '../components/AddHotel';
import Header from '../components/Header';
import HotelList from '../components/HotelList';

const Home = () => {
    return(
     <div> 
        <Header/>
        <AddHotel/>
        <HotelList/>
        
    </div>);
    
};

export default Home;