

const express = require("express")
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const userbooks = require ("./models/database");
const userMovies = require ("./models/Movies"); 


mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log("Connected to MongoDB successfully");
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to the Book and Movie Collection API");
})

app.post("/addbooks" , async (req,res)=>{
    const bookData  =   await userbooks.create(req.body)
    res.json({message: "Book added successfully", book: bookData})

})


app.get("/getbooks" , async (req,res)=>{
    const books = await userbooks.find();
    res.json(books);
})
 

app.get("/getbook/:id" , async (req,res)=>{
    const book = await userbooks.findById(req.params.id);
    res.json(book);
}           
)

app.put("/updatebook/:id" , async (req,res)=>{
    const updatedBook = await userbooks.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({message: "Book updated successfully", book: updatedBook});
}   )

app.delete("/deletebook/:id" , async (req,res)=>{
    await userbooks.findByIdAndDelete(req.params.id);
    res.json({message: "Book deleted successfully"});
}   )   


app.post("/addmovies" , async (req,res)=>{
    const movieData  =   await userMovies.create(req.body)
    res.json({message: "Movie added successfully", movie: movieData})       

}   )   

app.get("/getmovies" , async (req,res)=>{
    const movies = await userMovies.find();
    res.json(movies);
}   
)


app.get("/getmovie/:id" , async (req,res)=>{
    const movie = await userMovies.findById(req.params.id);
    res.json(movie);
}           
)   

app.put("/updatemovie/:id" , async (req,res)=>{     
    const updatedMovie = await userMovies.findByIdAndUpdate(req.params.id, req.body, { new: true });        
    res.json({message: "Movie updated successfully", movie: updatedMovie});
}
    )
app.delete("/deletemovie/:id" , async (req,res)=>{
    await userMovies.findByIdAndDelete(req.params.id);
    res.json({message: "Movie deleted successfully"});
}   )   





app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}       )