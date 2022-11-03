import User from "../models/UserModel.js";

export const getBooks = async(req, res) => { 
    try {
        const books = await User.find().populate('books');
         res.json(JSON.stringify(books));
        // console.log(JSON.stringify(books))
    }catch(error){
    res.status(500).json({message: error.message})
    }
};