const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserSchema = require("../1 Model/UserModel")

let signup = async (req, res) => {

    let newUser = {
        UserName: req.body.UserName,
        Email: req.body.Email,
        Password: bcrypt.hashSync(req.body.Password, 8)
    }
    try {
        let createdUser = await UserSchema.create(newUser)
    }
    catch (error) {
        if (error.code === 11000) { //it is duplication error code of mongoose
            return res.status(400).render("Signup", { msg: "Email exist already", })
        }

        //when error accurs monggose create a error object and in case of validation
        //name of object is ValidationError and errors is nested object which contain error regarding each field 
        //.map extract messages from these object and create array of them
        if (error.name == "ValidationError") {
            let message = Object.values(error.errors).map(err => err.message)
            return res.status(400).render("Signup", { msg: message })
        }
    }

    res.status(200).render("Login", { msg: "" , token: "" })
};

let login = async (req, res) => {
    if (!(req.body.Email && req.body.Password)) {
        return res.status(400).render("Login", { msg: "Please Enter Email And Password", token: "" })
    }

    let findUser;

    try {
        findUser = await UserSchema.findOne({ Email: req.body.Email })
        if (!findUser) {
            return res.status(400).render("Login", { msg: "Invalid Email! User Not Found", token: "" })
        }

        let comparePass = bcrypt.compareSync(req.body.Password, findUser.Password)

        if (!comparePass) {
            return res.status(404).render("Login", { msg: "Password Not Match!", token: "" })
        }
    }
    catch (err) {
        console.log("ERROR" + err)
        return res.status(400).render("Login", { msg: "Error While Login", token: "" })
    }

    let token = jwt.sign({ ID: findUser._id }, "something to make token strong", { expiresIn: 10000 })
    console.log("Token: " + token);
    return res.render("Login", { msg: "", token: token })
}


module.exports = {
    signup: signup,
    login: login
}