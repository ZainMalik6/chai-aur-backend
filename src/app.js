import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))// waise yaha tak theek hai lekin production pr jaoge ye bankend se connection k liye hota hai frontend ko 
// CORS_ORIGIN ko env me define karege phele CORS_ORIGIN=* kai log is me * laga dete hai k theek hai kai se bi aai request chalega ye achi baaat nahi hai apko speacifically mention krna hai ap k url jaha se aa raha hai verser ki app se aa raha hai kai or host kiya hai but abhi k liye theek hai itna chala lege

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended:true, limit: "16kb"}))

app.use(express.static("public"))

app.use(cookieParser())




export { app } 
