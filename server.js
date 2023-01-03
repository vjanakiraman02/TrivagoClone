//Nodemon: restart application everytime change is made

//downloaded dotenv -- import
require("dotenv").config();
const express = require("express");
const cors = require("cors"); //import cors becasue the front end and back end are running on different ports
const db = require("./db"); //automatically looks for index.js
const morgan = require("morgan"); //3rd party middleware
//create instance of express app and store in variable
const app = express();

//Middleware --> order matters (reads top down)

    /* app.use((req, res, next) =>  {
        console.log("yay our middleware");
        next();
     }); 

    app.use((req, res, next) =>  {
        res.status(404).json({
        status: "fail",
        });
    }); */
    
    //app.use(morgan("dev")); // tiny --> predefined format string

app.use(cors());
app.use(express.json())

//http://localhost:3001//api/v1/hotels
//get all hotels
app.get("/api/v1/hotels", async (req,res) => { //app.get(url, callback function)
                                    //app.get(url, (request, response)) stored in request, response stores in response
    try{
        //const results = await db.query("select * from hotels");
        const hotelRatingData = await db.query
        ("select * from hotels left join (select hotel_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by hotel_id) reviews on hotels.id = reviews.hotel_id");
        res.status(200).json({
            status: "success",
            results: hotelRatingData.rows.length,
            data:{
                hotels: hotelRatingData.rows,
            },
    
        }); 
    }catch(err){
        console.log(err);
    }

});

//Get one hotel
app.get("/api/v1/hotels/:id", async (req,res) =>{ // :id stores in params
    console.log(req.params.id);
    try{
        const hotel = await db.query("select * from hotels left join (select hotel_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by hotel_id) reviews on hotels.id = reviews.hotel_id where id = $1",
        [req.params.id]); //parameterized queries --> prevents vulnerability from sql injection attacks
        const reviews = await db.query("select * from reviews where hotel_id = $1", [req.params.id])
        res.status(200).json({
            status: "success",
            data:{
                hotel: hotel.rows[0],
                reviews: reviews.rows,
            },
        })
    }catch(err){
        console.log(err);
    }
});

//Create hotel

app.post("/api/v1/hotels", async (req, res) =>{
    console.log(req.body);
    try{
        const results = await db.query("INSERT INTO hotels(name, location, price) values ($1, $2, $3) returning *",
        [req.body.name, req.body.location, req.body.price] );
        res.status(201).json({
            status: "success",
            data:{
                hotel: "Four Seasons",
            },
        });
    }catch(err){
        console.log(err);
    }
});

//update hotel
app.put("/api/v1/hotels/:id", async (req,res) =>{ 
    console.log(req.params.id);
    console.log(req.body);
    try{
        const results = await db.query("UPDATE hotels SET name = $1, location = $2, price = $3 WHERE id = $4 returning *", 
        [req.body.name, req.body.location, req.body.price, req.params.id]);

        res.status(200).json({
            status: "success",
            data:{
                hotel: "Four Seasons",
            },
        });


    }catch(err){
        console.log(err);
    }

});

//delete hotel
app.delete("/api/v1/hotels/:id", async (req, res) =>{
    try{
        const results = await db.query("DELETE FROM hotels where id = $1 ", 
        [req.params.id])
        res.status(204).json({
            status: "success",
        });

    }catch(err){
        console.log(err);
    }
});

app.post("/api/v1/hotels/:id/addReview", async(req,res) => {
    try {
       const newReview = await db.query("INSERT INTO reviews (hotel_id, name, review, rating) values ($1, $2, $3, $4) returning *;" ,
        [req.params.id, req.body.name, req.body.review, req.body.rating]);
        console.log(newReview);
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0],
            },
        });
    } catch (err) {
        console.log(err)  
    }

})

//listen on specific port (port, callback function)
const port = 3001 ; //use environment variable instead of hardcoding || default
app.listen(port, ( )=> {
    console.log(`server is up and listening on port ${port}`);
});