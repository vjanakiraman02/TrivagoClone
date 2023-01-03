import React from 'react';
import HotelFinder from '../APIs/HotelFinder';
import { HotelContext } from '../context/HotelContexts';

const AddHotel = () => {
    const {addHotels} = React.useContext(HotelContext);
    const [name, setName] = React.useState("")
    const [location, setLocation] = React.useState("")
    const [price, setPrice] = React.useState("Price Range")

    const handleSubmit = async (e) => {
        //e.preventDefault() //default is to reload page but we NEVER want to reload page w react bc it leads to losing the state
        try{
            const response = await HotelFinder.post("/", {
                name: name,
                location: location,
                price: price,
            })
            addHotels(response.data.data.hotel)
            console.log(response)
        }catch(err){

        }

    }
    return(
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="name"/>
                    </div>
                    <div className="col">
                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="location"/>
                    </div>
                    <div className="col">
                        <select value={price} onChange={e => setPrice(e.target.value)} className="custom-select my-0.5 mr-sm-1">
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} type="submit"className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddHotel;