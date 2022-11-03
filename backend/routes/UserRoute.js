import  express  from "express";
import {
    getUsers,
    getUserById,
    saveUser,
    updateUser,
    deleteUser
}from "../controller/UserController.js"
import {
    getBooks
}from"../controller/booksController.js";

const router = express.Router();
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', saveUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


router.get('/userandbooks', getBooks);


export default router;