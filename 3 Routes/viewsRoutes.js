module.exports = (app) => {

    app.get("/signup", (req,res)=>{
        res.render("Signup", {msg: ""})
    })

    app.get("/login", (req,res)=>{
        res.render("Login", {msg: "", token: ""})
    })

    app.get("/home", (req,res)=>{
        res.render("home")
    })

    app.get("/forms", (req,res)=>{
        res.render("forms")
    })

}