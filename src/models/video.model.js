import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";



const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // cloudinary url
            required: true
        },
        thumbnail: {
            type: String, // cloudinary url
            required: true   
        },
        title: {
            type: String, 
            required: true   
        },
        description: {
            type: String, 
            required: true   
        },
        duration: {
            type: Number,// duration bi cloudinary de deta hai
            required:true
        },
        view: {
            type: Number,
            default: 0
        },
        isPublished: {
            //kuch nahi hai video public k liye available hai ya nahi hai
            type: Boolean,
            default: true,
        },
        onwer:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    },
    {
        timestamps: true
    }
)
// ap jaiye mongoose middleware k under documentation me tu mongoose k under kafi middleware likhe ja sakhte hai khud k plugin bi likhe ja sakhte hai jaise kuch plugin hai Pre yani data saved ho raha hai is se just phele kuch karo post just data saved howa hai is k bad kuch karo tu is tarah k middleware hum bi likhna seekhe ge lekin ek jo chez mongoose apko deta hai kuch delete ho tu ye kr do is k elawa ap khud k plugin bi use kr sakhte ho
videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)

