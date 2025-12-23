const asyncHandler = (requestHandler)=>{ //This will throw an error that Express can't catch
   return (req, res, next)=>{
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
   }
}

export default asyncHandler


// const asyncHandler = ()=>{}
//    const asyncHandler = (fun)=> {()=>{}}

// const asyncHandler = (fn)=> async(req, res, next)=>{
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 400).json(
//             {
//                 success : false,
//                 message : err.message,
//             }
//         )
//     }
// }
