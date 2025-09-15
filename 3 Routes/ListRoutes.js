let CheckLogin = require("../5 MiddleWares/isLogedIn")
let ListController = require("../2 Controller/ListController")
let DeleteMW = require("../5 MiddleWares/AutoDelete")



module.exports = (app) => {
    app.post("/api/inserttask/list", CheckLogin.isLogedIn, ListController.createList)

    app.get("/login/to/display/:token",  CheckLogin.isLogedIn, ListController.display)

    app.delete("/api/delete/:id", CheckLogin.isLogedIn, ListController.deleteTask);
    
    app.patch("/api/todo/update", CheckLogin.isLogedIn, ListController.updateTask)
}

