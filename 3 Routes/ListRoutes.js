let CheckLogin = require("../5 MiddleWares/isLogedIn")
let ListController = require("../2 Controller/ListController")
let DeleteMW = require("../5 MiddleWares/AutoDelete")



module.exports = (app) => {
    app.post("/api/inserttask/list", CheckLogin.isLogedIn, ListController.createList)

    app.get("/api/getlists/:id", ListController.display)// it is not used any where 

    app.get("/login/to/display/:token",  CheckLogin.isLogedIn, DeleteMW.AutoDelte, ListController.display)

    app.delete("/api/delete/:id", CheckLogin.isLogedIn, ListController.deleteTask);
    
    app.patch("/api/todo/update", CheckLogin.isLogedIn, ListController.updateTask)
}

