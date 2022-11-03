import express from "express";
import mongose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";

const app = express();
mongose.connect('mongodb://localhost:8089/fullstak_db',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
const db = mongose.connection; 
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected....'));

app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.listen(5000, () => console.log('Server up and running...'));  //localhost port 5000
