import User from "../models/UserModel.js";
import Books from "../models/Books.js";

export const getUsers = async (req, res) => {
    try{
        const users = await User.find().populate('books');
        res.json(users);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserById = async (req, res) => {
  
    try{
        const user = await User.findById(req.params.id).populate('books');  // populate buat ambil realtion
        res.status(201).json(user);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const saveUser = async (req, res) => {
    const newUser = {
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender, // harus pake (,) diakhir
    };
    const user = new User(newUser);
    const newBooks = {
        title:req.body.title,
        subtitle:req.body.subtitle,
        author:user._id
    }
    const books = new Books(newBooks);
    try{
        const inserteduser = await user.save();
        const insertbooks = await books.save();
         user.books.push(insertbooks);
         await inserteduser.save();
        res.status(201).json(inserteduser);
    }catch (error) { 
        res.status(400).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    const newUser ={
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
    }

    const user = await User.findById(req.params.id);
    const newBooks ={
        title:req.body.title,
        subtitle:req.body.subtitle,
        author:user._id
    }
    // const books = await Books.find({ author: user._id });

    const updateBooks = await Books.updateMany({author: user._id}, {$set: newBooks});
    const updateUser = await User.updateMany({_id:user._id}, {$set: newUser});
    const booksRes = await Books.find({ author: user._id });


     Promise.all([updateBooks,updateUser])
    .then((result) => {
        // console.log("books after "+JSON.stringify(result))
        return res.status(200).json(booksRes);
    }).catch((err) => {
        return res.status(400).json({message: err.message});
    });
    // try{
        
    //     const updateBooks = await Books.updateMany({author: user._id}, {$set: newBooks});
    //     const updateUser = await User.updateMany({_id:user._id}, {$set: newUser});
    //     res.status(200).json(books);
    // }catch (error) {
    //     res.status(400).json({message: error.message});
    // }
}

export const deleteUser = async (req, res) => { 
    const newUser ={
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
    }
    const user = await User.findById(req.params.id);
    const newBooks ={
        title:req.body.title,
        subtitle:req.body.subtitle,
        author:user._id
    }
    const deleteBooks = await Books.deleteOne({author: user._id},{$set: newBooks});
     const deleteUser = await User.deleteOne({author: user._id}, {$set:newUser});
     const books = await Books.find({author: user._id});



     Promise.all([deleteBooks,deleteUser])
     .then((result) =>{
        return res.status(200).json('Response : "Deleted Succesfully"');
     }).catch((err) =>{
        return res.status(404).json({message: err.message});
     });

    // try {
    //     const deleteBooks = await Books.deleteOne({_id:req.params.id})
    //     const deleteUser = await User.deleteOne({_id:req.params.id});
    //     res.status(200).json(deleteUser);
    // }catch (error) {
    //     res.status(400).json({message: error.message});
    // }
}