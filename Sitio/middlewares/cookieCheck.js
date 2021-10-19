module.exports = (req,res,next)=> {
    if(req.cookies.interioresBelo){
        req.session.userLogin = req.cookies.interioresBelo
    }
    next()
}