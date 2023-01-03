import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import HotelFinder from '../APIs/HotelFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { HotelContext } from '../context/HotelContexts';

const HotelDetailPage = () =>{
    const {id} = useParams()
    const {selectedHotel, setSelectedHotel} = useContext(HotelContext)

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await HotelFinder.get(`/${id}`);
                setSelectedHotel(response.data.data.hotel);

            }catch(err){
                console.log(err)
            }
        };
        fetchData();
    }, []);
    return <div>
        {selectedHotel && (
            <>
                <h1 className='text-center display-1'>
                    {selectedHotel.hotel.name}
                </h1>
                <div className='text-center'>
                    <StarRating rating={selectedHotel.hotel.average_rating} />
                </div>
                <div className='mt-3'>
                    <Reviews/>
                </div>
                <AddReview/>
            </>
        )}
    </div>
}
export default HotelDetailPage;


/* 
CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    hotel_id BIGINT NOT NULL REFERENCES hotels(id),
    name varchar(50) NOT NULL,
    rating INT NOT NULL check(rating >=0 and rating <=5),
    review TEXT NOT NULL  );
*/