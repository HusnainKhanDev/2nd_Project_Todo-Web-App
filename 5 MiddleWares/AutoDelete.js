const ListSchema = require("../1 Model/ListModal")

let AutoDelte = async (req, res, next) => {
    
    let Userid = req.UserID
    let CurrentDate = new Date().toISOString().split('T')[0]; //ISO format ko string ma tor raha han
    try{
        console.log("Working: " + CurrentDate)
        let deleted = await ListSchema.deleteMany({user: Userid, endDate:{$lt: CurrentDate}})
        if(deleted.deletedCount > 0){  
            next()
        }
        
    }
    catch(err){
        console.log("server error Error while Deleteion")
        res.status(500).json({ msg: "Error while cleaning up expired tasks." });
    }
}

module.exports = {
    AutoDelte:AutoDelte
}