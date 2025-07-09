const jwt = require("jsonwebtoken")


let isLogedIn = (req, res, next) => {
    //req.headers['authorization'] this thing retrive the token send by client fron authentication header and it look like this {Authorization: Bearer YOUR_TOKEN_HERE} ? checks for token is present or not if not return undefined then
    // now split seprate the word Bearer and token with space and give array of them with this [1] access the 2nd part which is token 
    let token = req.headers['authorization']?.split(' ')[1];

    if (req.params.token) {
        token = req.params.token
    }

    if (!token) {
        return res.status(403).json({ msg: "Please Login First" })
    }

    jwt.verify(token, "something to make token strong", (error, decode) => {
        if (error) {
            return res.status(401).json({ msg: 'Invalid or expired token!' });
        }

        req.UserID = decode.ID
        // console.log("is login" + req.UserID)
        // console.log("Token: ", token);
        // console.log("Decoded UserID: ", decode.ID);
        next()
    })
}

module.exports = {
    isLogedIn: isLogedIn
}