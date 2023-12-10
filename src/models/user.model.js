import mongoose, {Schema} from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"
const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index:true 
            // jitne bi database hote hai na specailly mongodb me tu kisi bi feild ko searchable banana hai bare optimize tarike se tu is k index true kr do is se kiya hota hai obivously tora expensive ho itna bi nahi ager ap is ko buhat ziada seaching k liye use krne wale ho tu is k index true kr do take ye database ki searching me aane lag jai
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
           // sub ko index nahi krna hai asse performance ki ban bajti hai soch samjh kr rakha jata hai index
        },
        fullName:{
            type: String,
            required: true,// fullname unique nahi hota hai zain name k buhat saare log hote hai
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url use karege4
            required: true
        },
        coverImage: {
            type: String, // cloudinary url use karege4
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"

            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            // refreash token kiya cheez hai access token kiya hote hai ye sub 
            type: String,

        }
    },
    {
        timestamps: true
    }
)

// ye humara pre hook hai is k under kiya milta hai humne dekha tha na app.listen app.error ye kuch is hi tarha k hook hote hai tu kon sa event ap use krna chahte ho ab event apko milte hai ap validate pr krwa sakhte ho save pr remove pr updateOne pr deleteOne tu jo bi apko functionality krni hai mere pass jo functionality hai jab bi data save ho raha ho is se phle kuch kam krwana hai is se phele password encrypt krwana hai is k bad apko milta hia callback ap jab bi call baack likhte ho tu ("save", () => {} ) asse nahi likhna kio k ager apne java script pari ho kio k arrow function k under this k reference nahi hota hai context nahi pata hota hai isse yaha pr context pata hona buhat zarori hai kio k saved event kis pr chal raha hai user pe tu user k under jo apne itna saara likha hai username or email in sub k access bi tu lage ga nah howa tu thori code chalana hai in value ko tu manipulate krna hai ye thora complex hai thora timetaking hai tu is liye async banate hai mene apko paraya tha error request response or next tu yaha next bi chaiye hota hai kio k middleware hai tu middleware k flag k name hai k next k access hona hi hona chaiye ager next yaha pr liya hai tu sub se end me jab ap k kam hogaya hai tu ek bar is next ko call krna parta hai k ye flag ab aage pass kr do ab mujhe kiya krna hai k jab bi mera password yah feild save ho raha ho is e se ek password feild ko lo encrypt kr k save kr do theek hai kr tu doga 
userSchema.pre("save", async function (next) {
    // password feild k access hai kio k apne function use kiya hai is ko pata hai saare feild hook is hi ko bolte hai
    // bcrypt.hash do cheeze magta hai ek this.pasword or phir pochta hai kitne round lagao yaha pr number dena hai ap 8 round bi de sakhte ho
        // ab humne introduce kr di ek problem kiya jab bi ye data save hoga hr bar password ko saved karega ab problem ye hai k suppose krye k koi banda aaya is ne apna avator change kara photo change kari ab kio k pre hook hai jaise is ne saved method button pr click kara k meri photo saved kr do ye wapis se change kr dega password phir pasword tu change krta jaiga kio k is k passs password k access hai tu saare feild k access tu hai hi tu humme kuch is tarha se krna parhe ga k yaar dekho jab me apko password feild bhajo password feild k modification bhajo tabhi is code ko run krna ager is feild me koi password me modification hai hi nahi please is ko run mat karo hr baar password encrypt nahi krwana jab password feild bhajo tab hi encrypt krna password feild kab bhajo ga first time bhajo ga kio k tab password save krwa raha ho ya phir me password update krna chaho new password set krna chaho tab bhajo tu jab me bhajo tab hi is ko krna tu is k liye mujhe ek code or likhna parega ek if condition lagani pari ab if condition kiya krni paregi kiya wo modifeid nahi howa hai tu return kr do next()
        if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)
    
    next()
})
    // password encrypt kr diya password saved kr dya ab humme kuch method yaha pr likhne hoge take hum jab directly User ko import karai tu is se poch le password sahi hai ya nahi hai kio k apne jo database me store kara hai wo tu hai encrypted lekin bahir jo user bhaje ga wo tu 1234 bhajega tu hum kuhc is tarha k method likhte hai jaise kuch method apko milte hai jaise ap model loge updateOne DeleteOne ye method apko milte hai yaha pr is hi tarha k custom method bi design kr sakhta ho custom method kis tarha design krte hai hook tu apko samjh aa gaya hai is k liye bi apko userSchema lena hoga
userSchema.methods.isPasswordCorrect = async function
(password){
    // bcrypt password bi check krti hai ye interesting cheez hai is ki ek method hota hai compare is ko is ko do cheeze chaiye hoti hai ek data do string me user jo bhaj raha hai mujhe jab bi login karega mujhe string me bhajega wo kio encrypt kr k bhajega or dosri jo ye cheez magta hai wo encrypted password de do me dono ko compare kr doga kio k mene tu hi encrypt kara hai mujhe pata hai kitne round mene lagai hai kiya mere secret hai sub me apke use krloga password de diya or this.password yani encrypt wala password ye time leta hai tu is ko await kr dega 
    return await bcrypt.compare(password, this.password)
}

//access token generate krne k method or refresh token 
userSchema.methods.generateAccessToken = function(){
    // jwt.sign generate kr dega accesstoken is ko buhat saari cheeze chaiye hoti hai tu sub se phele me doga payload k kiya kiya information chahta ho k ap rakho sub se phele me doga payload ek information rakho _id hum le lege ap email bi de sakhte ho 
    return jwt.sign(
        {
            _id: this.id,// this.id database se aa rahi hai 
            email: this.email,
            username:this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

// jo uper code kiya hai same hi hota hai lekin hum sirf is me id rakhte hai
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this.id,// this.id database se aa rahi hai 
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}

export const User = mongoose.model("User",userSchema)
