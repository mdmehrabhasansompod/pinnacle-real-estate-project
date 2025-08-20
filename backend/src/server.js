import {app} from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv"
dotenv.config({ path: "./.env" });

connectDB().
then(()=>{
    app.on("error",(error)=>{
     console.log("ERROR:",error)
     throw error;
    })

    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is listening at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGODB connection failed !!!",err);
})