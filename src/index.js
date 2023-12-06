import dotenv from "dotenv"
import connectDB from "./db/index.js";


dotenv.config({
    path:"./env"
})
// humne sub ki baat kari lekin dotenv ki baat nahi kari dontenv kia hai hum kiya chahte hai jitni jaldi application load ho itni jaldi saare environment variable hr jagga hona chaiye take ager main file me available ho gai tu is k bad db k under index file likhi hai kai or bi use kr rahe hai tu sub ko is k access mil jai tu jo first file load ho rahi hai is hi me hum kosish krte hai wahi pr humare environment variable load ho jai ab kis tarha se ye bol raha hai require('dotenv').config() requrie wala syntax use karo ab problem kiya hai waise tu koi problem nahi hai lekin humare code ki consistency nahi rahi tu ap is ko or improve kr k likh sakhte ho kaise import dotenv from "dotenv" lekin ye abhi chalega nahi kio k dotenv ko config bi krna parta hai ye ek method hai object leta is k under ap path add kr do root directry k under hi humne environment variable rakhe hai tu sub kuch le lena ye jo feature hai isko hum experiment feature ki tarha use kr sakhte hai kio k ye documentation me nahi hai package.json me jai scripts me likhna hai 
// "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"

connectDB()
.then(()=>{
    // then k under bi apko call back milega ab yaha pr kiya hai hum is app k use karege or is app ko listen karege tabhi tu humara server start hoga abhi tu mongodb connected howa but humari application ne is database k use krte howe listen krna shoro nahi kiya tha tu is k liye kiya krte hai 
    
    // app.on("error", (error) =>{
    //     console.log("ERROR:", error)
    //     throw error
    // })

    app.listen(process.env.PORT || 8000, ()=>{
        console.log(` Server is running at port : ${process.env.PORT}`)
    })
    // jo mene last me choti se cheez discuss kari thi k app.listen e phele kai bar error k liye bi listen krna chate hai tu ye jo on.listen hai ye kam me ap pr chorta ho k ye wala code 
    // app.on("error", (error) =>{
    //     console.log("ERROR:", error)
    //     throw error
    // }) ager apko theek lage tu ye bi krye ga 
})
.catch((err)=>{
    // db connection error hi hai ye console.log kr dete hai
    console.log("Mongo db connection faild !!!", err)
})
