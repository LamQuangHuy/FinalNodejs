const usersLogin = require('./user/login.router')

function route(app) {
    // [user] LOGIN
    app.use('/users', usersLogin)

    
}

module.exports = route
