import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { HotelContextProvider } from './context/HotelContexts';
import Home from './routes/Home';
import HotelDetailPage from './routes/HotelDetailPage';
import UpdatePage from './routes/UpdatePage';

const App = () => {
    return(
        <HotelContextProvider>
            <div className="container">
                <div>
                    <Router>
                        <Routes>
                            <Route exact path="/" element={<Home/>}/> 
                            <Route exact path="/hotels/:id/update" element={<UpdatePage/>}/>
                            <Route exact path="/hotels/:id" element={<HotelDetailPage/>}/>
                        </Routes>
                    </Router>
                </div>
            </div>
        </HotelContextProvider>
    ) 
}

export default App;