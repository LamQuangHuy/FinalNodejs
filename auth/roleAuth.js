const checkUserRole = (req, res, next) => {
    const user = req.user

    if(user && user.role === 'admin'){
        next();
    }
    else{
        return res.status(404).json({code: 1, message: 'You are denied to access the register'} )
    }
}
module.exports = checkUserRole;