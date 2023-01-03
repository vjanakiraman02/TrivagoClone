import React , {useContext, useEffect, useHistory} from 'react'
import HotelFinder from '../APIs/HotelFinder'
import { useNavigate } from "react-router-dom"
import { HotelContext } from '../context/HotelContexts'
import StarRating from './StarRating'

const HotelList = (props) => {
    let navigate = useNavigate();
    const {hotels, setHotels} = useContext(HotelContext)
    useEffect(() =>{ // use effect should not return anything ** do not use async await because it returns a promis
        const fetchData = async () => { //make a function instead and that can return values
            try{
                const response = await HotelFinder.get("/");
                setHotels(response.data.data.hotels)
            }catch(err){
    
            }
        };

        fetchData();
    }, []) // [] --> only runs hook when component mounts

    const handleDelete = async(e, id) => {
        e.stopPropagation()
        try{
            const response = await HotelFinder.delete(`/${id}`); //use template string ``
            console.log(response)
            setHotels(hotels.filter(hotel => {
                return hotel.id !== id //delete restaurant w given id
            }))
        }catch(err){

        }
    }

    const handleUpdate = async(e, id) => {
        
        e.stopPropagation()
        navigate(`/hotels/${id}/update`)
    }

    const handleHotelSelect = (id) => {
        navigate(`/hotels/${id}`)
    }

    const renderRating = (hotel) => {
        if(!hotel.count){
            return <span className='text-warning'> 0 reviews</span>
        }
      return (
      <>
        <StarRating rating={hotel.id} />
        <span className="text-warning ml-1">({hotel.count})</span>
      </>
      )
    }

    return(
        <div>
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col" className="font-weight-bold" >Hotel</th>
                        <th scope="col" className="font-weight-bold">Location</th>
                        <th scope="col" className="font-weight-bold">Price Range</th>
                        <th scope="col" className="font-weight-bold">Ratings</th>
                        <th scope="col" className="font-weight-bold">Edit</th>
                        <th scope="col" className="font-weight-bold">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels && hotels.map((hotel, index) =>{  {/* "hotels &&" if restaurants exist then return the rest of the code */}
                        return(
                            <tr onClick={() => handleHotelSelect(hotel.id)} key={hotel.id}>
                            <td>{hotel.name}</td>
                            <td>{hotel.location}</td>
                            <td>{"$".repeat(hotel.price)}</td>
                            <td>{renderRating(hotel)}</td>
                            <td><button onClick={e => handleUpdate(e, hotel.id)} className="btn btn-warning">Update</button></td>
                            <td><button onClick={e => handleDelete(e, hotel.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                        )
                    })}
                            
                        
                    {/* <tr>
                        <td>Marriott</td>
                        <td>Los Angeles</td>
                        <td>$$$$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                    <tr>
                        <td>Marriott</td>
                        <td>Los Angeles</td>
                        <td>$$$$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default HotelList