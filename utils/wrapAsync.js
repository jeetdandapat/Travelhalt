module.exports=(fn)=>{
    return function(req,res,next){
        fn(req,res,next).catch(next);
    }
}

// function wrapAsync(fn) {
//     return function (req, res, next) {
//         fn(req, res, next).catch(next);
//     };
// }

// module.exports = wrapAsync;

