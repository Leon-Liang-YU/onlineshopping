function viewHelpers(req, res, next){

    res.locals.isAdminLoggedIn = ()=>{
        if (req.session.userId===1){
            return true
        } else {
            return false
        }

    }
    next()
}

module.exports=viewHelpers