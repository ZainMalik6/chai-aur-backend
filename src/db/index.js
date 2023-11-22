import mongoose from "mongoose";
import { DB_NAME} from "../constants.js";

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST:
        ${connectionInstance.connection.host}`);// ap k jo pura mongodb
        //  k jo url hai jaha pr connection ho raha hai wo le le ecsar 
        // ye is liye karwaya jata hai take me ager galti se kahi production
        // ki jagga kisi or server pr connect ho jao kio k database jo hai production
        // k alag hota hai developent k alag hota hai testing k alag hota hai atleast 
        // kon se host pr connect ho raha hai 

    } catch(error) {
        console.log("MONGODB connection error ",error);
        // phicle wale method me humne error ko throw 
        // kr diya tha lekin tabhi humara process exit ho jata hai
        // but node.js access deta hai process k tu process ap kahi 
        // use kr sakhte hai apko import bi nahi krna parege tu process
        // kiya hai ye jo current jo humari application chal rahi hai 
        // ye ek nah ek process pr chal rahi hai or ye is k reference hai 
        // node me parye ga important hai ap process ko exit bi krwa sakhte ho
        // jo k ek method hai ab exit jo hai wo alag alag tarike se ho sakhta hai
        ///// ye apko parna hai k exit me or kiya kiya hai me exit krwana chahta ho 
        // 1 se alag alag process k exit k code hai ap dekh sakhte ho or kiya kiya code
        // hai yaha pr pe is k bare me or parye ga ye tu baat rahi ap ne error handle kr liya 
        process.exit(1)

    }
}


export default connectDB