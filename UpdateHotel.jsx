import React from 'react'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import HotelFinder from '../APIs/HotelFinder'
import { HotelContext } from '../context/HotelContexts'
import { useNavigate } from "react-router-dom"


const UpdateHotel = (props) => {
    const {id} = useParams()
    let navigate = useNavigate(); //not useHistory() anymore
    const {hotels} = useContext(HotelContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [price, setPrice ] = useState("Price")

    useEffect(() => {
        const fetchData = async() => {
            try{
            const response = await HotelFinder.get(`/${id}`)
            setName(response.data.data.hotel.name)
            setLocation(response.data.data.hotel.location)
            setPrice(response.data.data.hotel.price)

            }catch(err){

            }
        }
        fetchData()
    }, []) // [] is the empty dependency array so we only run when component mounts
    const handleSubmit = async() => {
        try{
            //e.preventDefault()
            const updatedHotel = await HotelFinder.put(`/${id}` , {
                name,
                location,
                price: price,
            });
            }catch(err){

            }
            navigate("/")
    }
    return(
        <div>
            <form action = ''>
                <div className = 'form-group'>
                    <label htmlFor ='name'>Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id='name' className='form-control' type='text' />
                </div>

                <div className = 'form-group'>
                    <label htmlFor='location'>Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id='location' className='form-control' type='text' />
                </div>

                <div className = 'form-group'>
                <label htmlFor='price'>Price</label>
                    <select value={price} onChange={e => setPrice(e.target.value)} className='custom-select my-0.5 mr-sm-1' required>
                        <option disabled>Price</option> 
                        <option value = '1'>1</option>
                        <option value = '2'>2</option>
                        <option value = '3'>3</option>
                        <option value = '4'>4</option>
                        <option value = '5'>5</option>
                    </select>
                </div>
                <button type='button' onClick={handleSubmit} className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateHotel