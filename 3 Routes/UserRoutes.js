const UserController = require("../2 Controller/UserController")



module.exports  = (app) => {
    
    app.post("/api/signup", UserController.signup)

    app.post("/api/login", UserController.login)
}

