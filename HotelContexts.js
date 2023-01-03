import React, {useState, createContext} from 'react'

// create context
export const HotelContext = createContext();

//create context provider, wrap application
export const HotelContextProvider = props =>
{   const[hotels, setHotels] = useState([]);
    const[selectedHotel, setSelectedHotel] = useState(null)
    const addHotels = (hotel) => {
        setHotels([...hotels, hotel]);
    };
    return(
        <HotelContext.Provider value={{
            hotels, 
            setHotels, 
            addHotels,
            selectedHotel,
            setSelectedHotel
        }}>
            {props.children}
        </HotelContext.Provider>
    );
};