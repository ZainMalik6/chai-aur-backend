// asyncHandler karega kiya sirf ek method banai ga or is ko export kr dega 

const asyncHandler = (requestHandler)=>{
    (req,res,next){
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=> next(err))
    }
}

export {asyncHandler}


// hum promise or try catch dono function bana kr dekhe ge phele hum try catch wala use karege

// const asyncHandler = ()=>{}
// const asyncHandler = (func)=>()=>{}
// const asyncHandler = (func)=> async ()=> {} reper function


// ye function kuch kr nahi raha lekin hum ek reper function bana rahe hai hum aage use karege ap ko hr jagga ye code dekhne ko milega lekin kuch code base me asa nah dekhe ye try catch wala tha promise wala kasie karege uper krte hai


// const asyncHandler = (fn) => async (req,res,next) => {
//     try{
//         await fn(req, res, next)
//     }
//     catch (error){
//         res.status(err.code || 5000).json({
//             success: false,
//             meesage: err.meesage
//         })
//     }
// }


